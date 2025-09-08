const instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);
let idbProxyableTypes;
let cursorAdvanceMethods;
function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const transactionDoneMap = /* @__PURE__ */ new WeakMap();
const transformCache = /* @__PURE__ */ new WeakMap();
const reverseTransformCache = /* @__PURE__ */ new WeakMap();
function promisifyRequest(request) {
  const promise = new Promise((resolve, reject) => {
    const unlisten = () => {
      request.removeEventListener("success", success);
      request.removeEventListener("error", error);
    };
    const success = () => {
      resolve(wrap(request.result));
      unlisten();
    };
    const error = () => {
      reject(request.error);
      unlisten();
    };
    request.addEventListener("success", success);
    request.addEventListener("error", error);
  });
  reverseTransformCache.set(promise, request);
  return promise;
}
function cacheDonePromiseForTransaction(tx) {
  if (transactionDoneMap.has(tx))
    return;
  const done = new Promise((resolve, reject) => {
    const unlisten = () => {
      tx.removeEventListener("complete", complete);
      tx.removeEventListener("error", error);
      tx.removeEventListener("abort", error);
    };
    const complete = () => {
      resolve();
      unlisten();
    };
    const error = () => {
      reject(tx.error || new DOMException("AbortError", "AbortError"));
      unlisten();
    };
    tx.addEventListener("complete", complete);
    tx.addEventListener("error", error);
    tx.addEventListener("abort", error);
  });
  transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
  get(target, prop, receiver) {
    if (target instanceof IDBTransaction) {
      if (prop === "done")
        return transactionDoneMap.get(target);
      if (prop === "store") {
        return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
      }
    }
    return wrap(target[prop]);
  },
  set(target, prop, value) {
    target[prop] = value;
    return true;
  },
  has(target, prop) {
    if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
      return true;
    }
    return prop in target;
  }
};
function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
  if (getCursorAdvanceMethods().includes(func)) {
    return function(...args) {
      func.apply(unwrap(this), args);
      return wrap(this.request);
    };
  }
  return function(...args) {
    return wrap(func.apply(unwrap(this), args));
  };
}
function transformCachableValue(value) {
  if (typeof value === "function")
    return wrapFunction(value);
  if (value instanceof IDBTransaction)
    cacheDonePromiseForTransaction(value);
  if (instanceOfAny(value, getIdbProxyableTypes()))
    return new Proxy(value, idbProxyTraps);
  return value;
}
function wrap(value) {
  if (value instanceof IDBRequest)
    return promisifyRequest(value);
  if (transformCache.has(value))
    return transformCache.get(value);
  const newValue = transformCachableValue(value);
  if (newValue !== value) {
    transformCache.set(value, newValue);
    reverseTransformCache.set(newValue, value);
  }
  return newValue;
}
const unwrap = (value) => reverseTransformCache.get(value);
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
  const request = indexedDB.open(name, version);
  const openPromise = wrap(request);
  if (upgrade) {
    request.addEventListener("upgradeneeded", (event) => {
      upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
    });
  }
  if (blocked) {
    request.addEventListener("blocked", (event) => blocked(
      // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
      event.oldVersion,
      event.newVersion,
      event
    ));
  }
  openPromise.then((db) => {
    if (terminated)
      db.addEventListener("close", () => terminated());
    if (blocking) {
      db.addEventListener("versionchange", (event) => blocking(event.oldVersion, event.newVersion, event));
    }
  }).catch(() => {
  });
  return openPromise;
}
const readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
const writeMethods = ["put", "add", "delete", "clear"];
const cachedMethods = /* @__PURE__ */ new Map();
function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) {
    return;
  }
  if (cachedMethods.get(prop))
    return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, "");
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))
  ) {
    return;
  }
  const method = async function(storeName, ...args) {
    const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
    let target2 = tx.store;
    if (useIndex)
      target2 = target2.index(args.shift());
    return (await Promise.all([
      target2[targetFuncName](...args),
      isWrite && tx.done
    ]))[0];
  };
  cachedMethods.set(prop, method);
  return method;
}
replaceTraps((oldTraps) => ({
  ...oldTraps,
  get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));
const advanceMethodProps = ["continue", "continuePrimaryKey", "advance"];
const methodMap = {};
const advanceResults = /* @__PURE__ */ new WeakMap();
const ittrProxiedCursorToOriginalProxy = /* @__PURE__ */ new WeakMap();
const cursorIteratorTraps = {
  get(target, prop) {
    if (!advanceMethodProps.includes(prop))
      return target[prop];
    let cachedFunc = methodMap[prop];
    if (!cachedFunc) {
      cachedFunc = methodMap[prop] = function(...args) {
        advanceResults.set(this, ittrProxiedCursorToOriginalProxy.get(this)[prop](...args));
      };
    }
    return cachedFunc;
  }
};
async function* iterate(...args) {
  let cursor = this;
  if (!(cursor instanceof IDBCursor)) {
    cursor = await cursor.openCursor(...args);
  }
  if (!cursor)
    return;
  cursor = cursor;
  const proxiedCursor = new Proxy(cursor, cursorIteratorTraps);
  ittrProxiedCursorToOriginalProxy.set(proxiedCursor, cursor);
  reverseTransformCache.set(proxiedCursor, unwrap(cursor));
  while (cursor) {
    yield proxiedCursor;
    cursor = await (advanceResults.get(proxiedCursor) || cursor.continue());
    advanceResults.delete(proxiedCursor);
  }
}
function isIteratorProp(target, prop) {
  return prop === Symbol.asyncIterator && instanceOfAny(target, [IDBIndex, IDBObjectStore, IDBCursor]) || prop === "iterate" && instanceOfAny(target, [IDBIndex, IDBObjectStore]);
}
replaceTraps((oldTraps) => ({
  ...oldTraps,
  get(target, prop, receiver) {
    if (isIteratorProp(target, prop))
      return iterate;
    return oldTraps.get(target, prop, receiver);
  },
  has(target, prop) {
    return isIteratorProp(target, prop) || oldTraps.has(target, prop);
  }
}));
const DB_NAME = "shorelineDB";
const DB_VERSION = 2;
const SHORELINE_STORE = "shorelineData";
const IMAGE_STORE = "satelliteImages";
class IndexedDBService {
  db = null;
  async initialize() {
    try {
      this.db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(SHORELINE_STORE)) {
            db.createObjectStore(SHORELINE_STORE, { keyPath: "id" });
          }
          if (!db.objectStoreNames.contains(IMAGE_STORE)) {
            db.createObjectStore(IMAGE_STORE, { keyPath: "id" });
          }
        },
        blocked() {
          console.warn("Database upgrade blocked. Please close other tabs/windows using this application.");
        },
        blocking() {
          console.warn("Database is blocking other connections. Closing current connection.");
        }
      });
    } catch (error) {
      console.error("Failed to initialize IndexedDB:", error);
      if (error instanceof DOMException && (error.name === "VersionError" || error.message.includes("higher version") || error.message.includes("version requested"))) {
        console.warn("Database version mismatch detected. Recreating database...");
        try {
          await this.deleteDatabase();
          await new Promise((resolve) => setTimeout(resolve, 100));
          return this.initialize();
        } catch (deleteError) {
          console.error("Failed to delete and recreate database:", deleteError);
          throw new Error("Database version conflict. Please refresh the page or clear your browser data.");
        }
      }
      throw new Error("Failed to initialize database storage. Please try again.");
    }
  }
  async deleteDatabase() {
    return new Promise((resolve, reject) => {
      const deleteRequest = indexedDB.deleteDatabase(DB_NAME);
      deleteRequest.onsuccess = () => {
        console.log("Database deleted successfully");
        resolve();
      };
      deleteRequest.onerror = () => {
        console.error("Failed to delete database:", deleteRequest.error);
        reject(deleteRequest.error);
      };
      deleteRequest.onblocked = () => {
        console.warn("Database deletion blocked. Please close other tabs/windows using this application.");
        resolve();
      };
    });
  }
  // Shoreline data methods
  async storeShorelineData(id, data) {
    if (!this.db) {
      await this.initialize();
    }
    try {
      const storeData = {
        id,
        data,
        timestamp: Date.now()
      };
      await this.db.put(SHORELINE_STORE, storeData);
    } catch (error) {
      console.error("Failed to store shoreline data:", error);
      if (error instanceof Error && error.name === "QuotaExceededError") {
        throw new Error("Storage quota exceeded. Please try with a smaller file or clear some space.");
      }
      throw new Error("Failed to store shoreline data. Please try again.");
    }
  }
  async getShorelineData(id) {
    if (!this.db) {
      await this.initialize();
    }
    try {
      const result = await this.db.get(SHORELINE_STORE, id);
      return result ? result.data : null;
    } catch (error) {
      console.error("Failed to retrieve shoreline data:", error);
      throw new Error("Failed to retrieve shoreline data. Please try again.");
    }
  }
  async deleteShorelineData(id) {
    if (!this.db) {
      await this.initialize();
    }
    try {
      await this.db.delete(SHORELINE_STORE, id);
    } catch (error) {
      console.error("Failed to delete shoreline data:", error);
      throw new Error("Failed to delete shoreline data. Please try again.");
    }
  }
  async clearAllShorelineData() {
    if (!this.db) {
      await this.initialize();
    }
    try {
      await this.db.clear(SHORELINE_STORE);
    } catch (error) {
      console.error("Failed to clear shoreline data:", error);
      throw new Error("Failed to clear shoreline data. Please try again.");
    }
  }
  // Satellite image methods
  async storeSatelliteImage(id, data) {
    if (!this.db) {
      await this.initialize();
    }
    try {
      let processedBlob;
      if (data.georaster && data.georaster.toCanvas) {
        try {
          console.log("Georaster info:", {
            width: data.georaster.width,
            height: data.georaster.height,
            numberOfRasters: data.georaster.numberOfRasters,
            mins: data.georaster.mins,
            maxs: data.georaster.maxs,
            ranges: data.georaster.ranges,
            noDataValue: data.georaster.noDataValue
          });
          const canvas = data.georaster.toCanvas({
            width: Math.min(1024, data.georaster.width),
            // Limit size for performance
            height: Math.min(1024, data.georaster.height),
            pixelValuesToColorFn: (values) => {
              if (Math.random() < 1e-3) {
                console.log("Sample pixel values:", values);
              }
              if (values.length >= 3) {
                const [r, g, b] = values;
                const rMin = data.georaster.mins?.[0] || 0;
                const rMax = data.georaster.maxs?.[0] || 255;
                const gMin = data.georaster.mins?.[1] || 0;
                const gMax = data.georaster.maxs?.[1] || 255;
                const bMin = data.georaster.mins?.[2] || 0;
                const bMax = data.georaster.maxs?.[2] || 255;
                const normalizeValue = (val, min, max) => {
                  if (val === null || val === void 0 || !isFinite(val)) return 0;
                  if (val === data.georaster.noDataValue) return 0;
                  const normalized = (val - min) / (max - min) * 255;
                  return Math.max(0, Math.min(255, Math.round(normalized)));
                };
                return `rgb(${normalizeValue(r, rMin, rMax)}, ${normalizeValue(g, gMin, gMax)}, ${normalizeValue(b, bMin, bMax)})`;
              } else if (values.length === 1) {
                const val = values[0];
                if (val === null || val === void 0 || !isFinite(val)) return "rgba(0,0,0,0)";
                if (val === data.georaster.noDataValue) return "rgba(0,0,0,0)";
                const min = data.georaster.mins?.[0] || 0;
                const max = data.georaster.maxs?.[0] || 255;
                const normalized = (val - min) / (max - min) * 255;
                const clampedValue = Math.max(0, Math.min(255, Math.round(normalized)));
                return `rgb(${clampedValue}, ${clampedValue}, ${clampedValue})`;
              }
              return "rgba(0,0,0,0)";
            }
          });
          processedBlob = await new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("Failed to convert canvas to blob"));
              }
            }, "image/png", 0.9);
          });
          console.log("Converted georaster to web-compatible blob format");
        } catch (error) {
          console.warn("Failed to convert georaster to blob, storing metadata only:", error);
        }
      }
      const serializableData = {
        id: data.id,
        name: data.name,
        bounds: data.bounds,
        timestamp: data.timestamp,
        metadata: data.metadata,
        url: null,
        // Will be created on retrieval
        processedBlob
        // Store the processed raster data
        // Don't store the heavy georaster or arrayBuffer objects
      };
      const storeData = {
        id,
        data: serializableData,
        timestamp: Date.now()
      };
      await this.db.put(IMAGE_STORE, storeData);
      console.log("Satellite image stored successfully with processed blob");
    } catch (error) {
      console.error("Failed to store satellite image:", error);
      if (error instanceof Error && error.name === "QuotaExceededError") {
        throw new Error("Storage quota exceeded. Please try with a smaller file or clear some space.");
      }
      throw new Error("Failed to store satellite image. Please try again.");
    }
  }
  async getSatelliteImage(id) {
    if (!this.db) {
      await this.initialize();
    }
    try {
      const result = await this.db.get(IMAGE_STORE, id);
      if (!result) {
        return null;
      }
      const storedData = result.data;
      if (storedData.processedBlob && !storedData.url) {
        try {
          const blob = storedData.processedBlob;
          const reader = new FileReader();
          const dataUrl = await new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(blob);
          });
          storedData.url = dataUrl;
          console.log("Created data URL for stored processed blob");
        } catch (error) {
          console.warn("Failed to create data URL from stored blob:", error);
        }
      }
      return storedData;
    } catch (error) {
      console.error("Failed to retrieve satellite image:", error);
      throw new Error("Failed to retrieve satellite image. Please try again.");
    }
  }
  async getAllSatelliteImages() {
    if (!this.db) {
      await this.initialize();
    }
    try {
      const allImages = await this.db.getAll(IMAGE_STORE);
      const processedImages = await Promise.all(
        allImages.map(async (item) => {
          const storedData = item.data;
          if (storedData.processedBlob && !storedData.url) {
            try {
              const blob = storedData.processedBlob;
              const reader = new FileReader();
              const dataUrl = await new Promise((resolve, reject) => {
                reader.onload = () => resolve(reader.result);
                reader.onerror = () => reject(reader.error);
                reader.readAsDataURL(blob);
              });
              storedData.url = dataUrl;
              console.log("Created data URL for stored processed blob");
            } catch (error) {
              console.warn("Failed to create data URL from stored blob for image:", storedData.id, error);
            }
          }
          return storedData;
        })
      );
      return processedImages;
    } catch (error) {
      console.error("Failed to retrieve satellite images:", error);
      throw new Error("Failed to retrieve satellite images. Please try again.");
    }
  }
  async deleteSatelliteImage(id) {
    if (!this.db) {
      await this.initialize();
    }
    try {
      await this.db.delete(IMAGE_STORE, id);
    } catch (error) {
      console.error("Failed to delete satellite image:", error);
      throw new Error("Failed to delete satellite image. Please try again.");
    }
  }
  async clearAllSatelliteImages() {
    if (!this.db) {
      await this.initialize();
    }
    try {
      await this.db.clear(IMAGE_STORE);
    } catch (error) {
      console.error("Failed to clear satellite images:", error);
      throw new Error("Failed to clear satellite images. Please try again.");
    }
  }
  // General methods
  async clearAllData() {
    if (!this.db) {
      await this.initialize();
    }
    try {
      await this.db.clear(SHORELINE_STORE);
      await this.db.clear(IMAGE_STORE);
    } catch (error) {
      console.error("Failed to clear all data:", error);
      throw new Error("Failed to clear all data. Please try again.");
    }
  }
  // Development utility method to completely reset the database
  async resetDatabase() {
    try {
      if (this.db) {
        this.db.close();
        this.db = null;
      }
      await this.deleteDatabase();
      await this.initialize();
      console.log("Database reset successfully");
    } catch (error) {
      console.error("Failed to reset database:", error);
      throw new Error("Failed to reset database. Please try again.");
    }
  }
}
const indexedDBService = new IndexedDBService();
export {
  indexedDBService as i
};
//# sourceMappingURL=indexedDBService-C0Tzj_Tb.js.map
