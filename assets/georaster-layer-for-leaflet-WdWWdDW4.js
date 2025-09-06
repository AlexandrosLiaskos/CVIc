import { l as leafletSrcExports, a as L } from "./leaflet.draw-BbYLr5w-.js";
import { g as getDefaultExportFromCjs, a as getAugmentedNamespace } from "./index-BHC6KdTH.js";
import { l as lib } from "./index-JjBgob5T.js";
var runtime = { exports: {} };
var hasRequiredRuntime;
function requireRuntime() {
  if (hasRequiredRuntime) return runtime.exports;
  hasRequiredRuntime = 1;
  (function(module) {
    var runtime2 = (function(exports) {
      var Op = Object.prototype;
      var hasOwn = Op.hasOwnProperty;
      var defineProperty = Object.defineProperty || function(obj2, key, desc) {
        obj2[key] = desc.value;
      };
      var undefined$1;
      var $Symbol = typeof Symbol === "function" ? Symbol : {};
      var iteratorSymbol = $Symbol.iterator || "@@iterator";
      var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
      var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
      function define2(obj2, key, value) {
        Object.defineProperty(obj2, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true
        });
        return obj2[key];
      }
      try {
        define2({}, "");
      } catch (err) {
        define2 = function(obj2, key, value) {
          return obj2[key] = value;
        };
      }
      function wrap(innerFn, outerFn, self2, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);
        defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self2, context) });
        return generator;
      }
      exports.wrap = wrap;
      function tryCatch(fn, obj2, arg) {
        try {
          return { type: "normal", arg: fn.call(obj2, arg) };
        } catch (err) {
          return { type: "throw", arg: err };
        }
      }
      var GenStateSuspendedStart = "suspendedStart";
      var GenStateSuspendedYield = "suspendedYield";
      var GenStateExecuting = "executing";
      var GenStateCompleted = "completed";
      var ContinueSentinel = {};
      function Generator() {
      }
      function GeneratorFunction() {
      }
      function GeneratorFunctionPrototype() {
      }
      var IteratorPrototype = {};
      define2(IteratorPrototype, iteratorSymbol, function() {
        return this;
      });
      var getProto = Object.getPrototypeOf;
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
      if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
        IteratorPrototype = NativeIteratorPrototype;
      }
      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
      GeneratorFunction.prototype = GeneratorFunctionPrototype;
      defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: true });
      defineProperty(
        GeneratorFunctionPrototype,
        "constructor",
        { value: GeneratorFunction, configurable: true }
      );
      GeneratorFunction.displayName = define2(
        GeneratorFunctionPrototype,
        toStringTagSymbol,
        "GeneratorFunction"
      );
      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function(method) {
          define2(prototype, method, function(arg) {
            return this._invoke(method, arg);
          });
        });
      }
      exports.isGeneratorFunction = function(genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
      };
      exports.mark = function(genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;
          define2(genFun, toStringTagSymbol, "GeneratorFunction");
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
      };
      exports.awrap = function(arg) {
        return { __await: arg };
      };
      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);
          if (record.type === "throw") {
            reject(record.arg);
          } else {
            var result2 = record.arg;
            var value = result2.value;
            if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
              return PromiseImpl.resolve(value.__await).then(function(value2) {
                invoke("next", value2, resolve, reject);
              }, function(err) {
                invoke("throw", err, resolve, reject);
              });
            }
            return PromiseImpl.resolve(value).then(function(unwrapped) {
              result2.value = unwrapped;
              resolve(result2);
            }, function(error) {
              return invoke("throw", error, resolve, reject);
            });
          }
        }
        var previousPromise;
        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function(resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
        }
        defineProperty(this, "_invoke", { value: enqueue });
      }
      defineIteratorMethods(AsyncIterator.prototype);
      define2(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
      });
      exports.AsyncIterator = AsyncIterator;
      exports.async = function(innerFn, outerFn, self2, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;
        var iter = new AsyncIterator(
          wrap(innerFn, outerFn, self2, tryLocsList),
          PromiseImpl
        );
        return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result2) {
          return result2.done ? result2.value : iter.next();
        });
      };
      function makeInvokeMethod(innerFn, self2, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error("Generator is already running");
          }
          if (state === GenStateCompleted) {
            if (method === "throw") {
              throw arg;
            }
            return doneResult();
          }
          context.method = method;
          context.arg = arg;
          while (true) {
            var delegate = context.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }
            if (context.method === "next") {
              context.sent = context._sent = context.arg;
            } else if (context.method === "throw") {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }
              context.dispatchException(context.arg);
            } else if (context.method === "return") {
              context.abrupt("return", context.arg);
            }
            state = GenStateExecuting;
            var record = tryCatch(innerFn, self2, context);
            if (record.type === "normal") {
              state = context.done ? GenStateCompleted : GenStateSuspendedYield;
              if (record.arg === ContinueSentinel) {
                continue;
              }
              return {
                value: record.arg,
                done: context.done
              };
            } else if (record.type === "throw") {
              state = GenStateCompleted;
              context.method = "throw";
              context.arg = record.arg;
            }
          }
        };
      }
      function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method;
        var method = delegate.iterator[methodName];
        if (method === undefined$1) {
          context.delegate = null;
          if (methodName === "throw" && delegate.iterator["return"]) {
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);
            if (context.method === "throw") {
              return ContinueSentinel;
            }
          }
          if (methodName !== "return") {
            context.method = "throw";
            context.arg = new TypeError(
              "The iterator does not provide a '" + methodName + "' method"
            );
          }
          return ContinueSentinel;
        }
        var record = tryCatch(method, delegate.iterator, context.arg);
        if (record.type === "throw") {
          context.method = "throw";
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }
        var info = record.arg;
        if (!info) {
          context.method = "throw";
          context.arg = new TypeError("iterator result is not an object");
          context.delegate = null;
          return ContinueSentinel;
        }
        if (info.done) {
          context[delegate.resultName] = info.value;
          context.next = delegate.nextLoc;
          if (context.method !== "return") {
            context.method = "next";
            context.arg = undefined$1;
          }
        } else {
          return info;
        }
        context.delegate = null;
        return ContinueSentinel;
      }
      defineIteratorMethods(Gp);
      define2(Gp, toStringTagSymbol, "Generator");
      define2(Gp, iteratorSymbol, function() {
        return this;
      });
      define2(Gp, "toString", function() {
        return "[object Generator]";
      });
      function pushTryEntry(locs) {
        var entry = { tryLoc: locs[0] };
        if (1 in locs) {
          entry.catchLoc = locs[1];
        }
        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }
        this.tryEntries.push(entry);
      }
      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
      }
      function Context(tryLocsList) {
        this.tryEntries = [{ tryLoc: "root" }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }
      exports.keys = function(val) {
        var object = Object(val);
        var keys = [];
        for (var key in object) {
          keys.push(key);
        }
        keys.reverse();
        return function next() {
          while (keys.length) {
            var key2 = keys.pop();
            if (key2 in object) {
              next.value = key2;
              next.done = false;
              return next;
            }
          }
          next.done = true;
          return next;
        };
      };
      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }
          if (typeof iterable.next === "function") {
            return iterable;
          }
          if (!isNaN(iterable.length)) {
            var i = -1, next = function next2() {
              while (++i < iterable.length) {
                if (hasOwn.call(iterable, i)) {
                  next2.value = iterable[i];
                  next2.done = false;
                  return next2;
                }
              }
              next2.value = undefined$1;
              next2.done = true;
              return next2;
            };
            return next.next = next;
          }
        }
        return { next: doneResult };
      }
      exports.values = values;
      function doneResult() {
        return { value: undefined$1, done: true };
      }
      Context.prototype = {
        constructor: Context,
        reset: function(skipTempReset) {
          this.prev = 0;
          this.next = 0;
          this.sent = this._sent = undefined$1;
          this.done = false;
          this.delegate = null;
          this.method = "next";
          this.arg = undefined$1;
          this.tryEntries.forEach(resetTryEntry);
          if (!skipTempReset) {
            for (var name in this) {
              if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                this[name] = undefined$1;
              }
            }
          }
        },
        stop: function() {
          this.done = true;
          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;
          if (rootRecord.type === "throw") {
            throw rootRecord.arg;
          }
          return this.rval;
        },
        dispatchException: function(exception) {
          if (this.done) {
            throw exception;
          }
          var context = this;
          function handle(loc, caught) {
            record.type = "throw";
            record.arg = exception;
            context.next = loc;
            if (caught) {
              context.method = "next";
              context.arg = undefined$1;
            }
            return !!caught;
          }
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            var record = entry.completion;
            if (entry.tryLoc === "root") {
              return handle("end");
            }
            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc");
              var hasFinally = hasOwn.call(entry, "finallyLoc");
              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }
              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else {
                throw new Error("try statement without catch or finally");
              }
            }
          }
        },
        abrupt: function(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }
          if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
            finallyEntry = null;
          }
          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;
          if (finallyEntry) {
            this.method = "next";
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }
          return this.complete(record);
        },
        complete: function(record, afterLoc) {
          if (record.type === "throw") {
            throw record.arg;
          }
          if (record.type === "break" || record.type === "continue") {
            this.next = record.arg;
          } else if (record.type === "return") {
            this.rval = this.arg = record.arg;
            this.method = "return";
            this.next = "end";
          } else if (record.type === "normal" && afterLoc) {
            this.next = afterLoc;
          }
          return ContinueSentinel;
        },
        finish: function(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },
        "catch": function(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;
              if (record.type === "throw") {
                var thrown = record.arg;
                resetTryEntry(entry);
              }
              return thrown;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function(iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName,
            nextLoc
          };
          if (this.method === "next") {
            this.arg = undefined$1;
          }
          return ContinueSentinel;
        }
      };
      return exports;
    })(
      // If this script is executing as a CommonJS module, use module.exports
      // as the regeneratorRuntime namespace. Otherwise create a new empty
      // object. Either way, the resulting object will be used to initialize
      // the regeneratorRuntime variable at the top of this file.
      module.exports
    );
    try {
      regeneratorRuntime = runtime2;
    } catch (accidentalStrictMode) {
      if (typeof globalThis === "object") {
        globalThis.regeneratorRuntime = runtime2;
      } else {
        Function("r", "regeneratorRuntime = r")(runtime2);
      }
    }
  })(runtime);
  return runtime.exports;
}
requireRuntime();
var chroma$2 = { exports: {} };
var chroma$1 = chroma$2.exports;
var hasRequiredChroma;
function requireChroma() {
  if (hasRequiredChroma) return chroma$2.exports;
  hasRequiredChroma = 1;
  (function(module, exports) {
    /**
     * @license
     *
     * chroma.js - JavaScript library for color conversions
     * 
     * Copyright (c) 2011-2017, Gregor Aisch
     * All rights reserved.
     * 
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted provided that the following conditions are met:
     * 
     * 1. Redistributions of source code must retain the above copyright notice, this
     *    list of conditions and the following disclaimer.
     * 
     * 2. Redistributions in binary form must reproduce the above copyright notice,
     *    this list of conditions and the following disclaimer in the documentation
     *    and/or other materials provided with the distribution.
     * 
     * 3. The name Gregor Aisch may not be used to endorse or promote products
     *    derived from this software without specific prior written permission.
     * 
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
     * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
     * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
     * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
     * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
     * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
     * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
     * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
     * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
     * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     *
     */
    (function() {
      var Color, DEG2RAD, LAB_CONSTANTS, PI, PITHIRD, RAD2DEG, TWOPI, _average_lrgb, _guess_formats, _guess_formats_sorted, _input, _interpolators, abs, atan2, bezier, blend, blend_f, brewer, burn, chroma2, clip_rgb, cmyk2rgb, cos, css2rgb, darken, dodge, each, floor, hcg2rgb, hex2rgb, hsi2rgb, hsl2css, hsl2rgb, hsv2rgb, interpolate, interpolate_hsx, interpolate_lab, interpolate_lrgb, interpolate_num, interpolate_rgb, lab2lch, lab2rgb, lab_xyz, lch2lab, lch2rgb, lighten, limit, log2, luminance_x, m, max, multiply2, normal, num2rgb, overlay, pow, rgb2cmyk, rgb2css, rgb2hcg, rgb2hex, rgb2hsi, rgb2hsl, rgb2hsv, rgb2lab, rgb2lch, rgb2luminance, rgb2num, rgb2temperature, rgb2xyz, rgb_xyz, rnd, root, round, screen, sin, sqrt, temperature2rgb, type, unpack, w3cx11, xyz_lab, xyz_rgb, slice = [].slice;
      type = (function() {
        var classToType, len, name, o, ref;
        classToType = {};
        ref = "Boolean Number String Function Array Date RegExp Undefined Null".split(" ");
        for (o = 0, len = ref.length; o < len; o++) {
          name = ref[o];
          classToType["[object " + name + "]"] = name.toLowerCase();
        }
        return function(obj2) {
          var strType;
          strType = Object.prototype.toString.call(obj2);
          return classToType[strType] || "object";
        };
      })();
      limit = function(x, min, max2) {
        if (min == null) {
          min = 0;
        }
        if (max2 == null) {
          max2 = 1;
        }
        if (x < min) {
          x = min;
        }
        if (x > max2) {
          x = max2;
        }
        return x;
      };
      unpack = function(args) {
        if (args.length >= 3) {
          return Array.prototype.slice.call(args);
        } else {
          return args[0];
        }
      };
      clip_rgb = function(rgb) {
        var i, o;
        rgb._clipped = false;
        rgb._unclipped = rgb.slice(0);
        for (i = o = 0; o < 3; i = ++o) {
          if (i < 3) {
            if (rgb[i] < 0 || rgb[i] > 255) {
              rgb._clipped = true;
            }
            if (rgb[i] < 0) {
              rgb[i] = 0;
            }
            if (rgb[i] > 255) {
              rgb[i] = 255;
            }
          } else if (i === 3) {
            if (rgb[i] < 0) {
              rgb[i] = 0;
            }
            if (rgb[i] > 1) {
              rgb[i] = 1;
            }
          }
        }
        if (!rgb._clipped) {
          delete rgb._unclipped;
        }
        return rgb;
      };
      PI = Math.PI, round = Math.round, cos = Math.cos, floor = Math.floor, pow = Math.pow, log2 = Math.log, sin = Math.sin, sqrt = Math.sqrt, atan2 = Math.atan2, max = Math.max, abs = Math.abs;
      TWOPI = PI * 2;
      PITHIRD = PI / 3;
      DEG2RAD = PI / 180;
      RAD2DEG = 180 / PI;
      chroma2 = function() {
        if (arguments[0] instanceof Color) {
          return arguments[0];
        }
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor(), result2 = func.apply(child, args);
          return Object(result2) === result2 ? result2 : child;
        })(Color, arguments, function() {
        });
      };
      chroma2["default"] = chroma2;
      _interpolators = [];
      if (module !== null && module.exports != null) {
        module.exports = chroma2;
      }
      {
        root = exports !== null ? exports : this;
        root.chroma = chroma2;
      }
      chroma2.version = "1.4.1";
      _input = {};
      _guess_formats = [];
      _guess_formats_sorted = false;
      Color = (function() {
        function Color2() {
          var arg, args, chk, len, len1, me, mode, o, w;
          me = this;
          args = [];
          for (o = 0, len = arguments.length; o < len; o++) {
            arg = arguments[o];
            if (arg != null) {
              args.push(arg);
            }
          }
          if (args.length > 1) {
            mode = args[args.length - 1];
          }
          if (_input[mode] != null) {
            me._rgb = clip_rgb(_input[mode](unpack(args.slice(0, -1))));
          } else {
            if (!_guess_formats_sorted) {
              _guess_formats = _guess_formats.sort(function(a, b) {
                return b.p - a.p;
              });
              _guess_formats_sorted = true;
            }
            for (w = 0, len1 = _guess_formats.length; w < len1; w++) {
              chk = _guess_formats[w];
              mode = chk.test.apply(chk, args);
              if (mode) {
                break;
              }
            }
            if (mode) {
              me._rgb = clip_rgb(_input[mode].apply(_input, args));
            }
          }
          if (me._rgb == null) {
            console.warn("unknown format: " + args);
          }
          if (me._rgb == null) {
            me._rgb = [0, 0, 0];
          }
          if (me._rgb.length === 3) {
            me._rgb.push(1);
          }
        }
        Color2.prototype.toString = function() {
          return this.hex();
        };
        return Color2;
      })();
      chroma2._input = _input;
      /**
      	ColorBrewer colors for chroma.js
      
      	Copyright (c) 2002 Cynthia Brewer, Mark Harrower, and The 
      	Pennsylvania State University.
      
      	Licensed under the Apache License, Version 2.0 (the "License"); 
      	you may not use this file except in compliance with the License.
      	You may obtain a copy of the License at	
      	http://www.apache.org/licenses/LICENSE-2.0
      
      	Unless required by applicable law or agreed to in writing, software distributed
      	under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
      	CONDITIONS OF ANY KIND, either express or implied. See the License for the
      	specific language governing permissions and limitations under the License.
      
          @preserve
       */
      chroma2.brewer = brewer = {
        OrRd: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
        PuBu: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"],
        BuPu: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"],
        Oranges: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"],
        BuGn: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"],
        YlOrBr: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"],
        YlGn: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"],
        Reds: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
        RdPu: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"],
        Greens: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"],
        YlGnBu: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
        Purples: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"],
        GnBu: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"],
        Greys: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000"],
        YlOrRd: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"],
        PuRd: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"],
        Blues: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
        PuBuGn: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"],
        Viridis: ["#440154", "#482777", "#3f4a8a", "#31678e", "#26838f", "#1f9d8a", "#6cce5a", "#b6de2b", "#fee825"],
        Spectral: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"],
        RdYlGn: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
        RdBu: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"],
        PiYG: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"],
        PRGn: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"],
        RdYlBu: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
        BrBG: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"],
        RdGy: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"],
        PuOr: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"],
        Set2: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"],
        Accent: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"],
        Set1: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"],
        Set3: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"],
        Dark2: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"],
        Paired: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
        Pastel2: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"],
        Pastel1: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
      };
      (function() {
        var key, results;
        results = [];
        for (key in brewer) {
          results.push(brewer[key.toLowerCase()] = brewer[key]);
        }
        return results;
      })();
      w3cx11 = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflower: "#6495ed",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        laserlemon: "#ffff54",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrod: "#fafad2",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        maroon2: "#7f0000",
        maroon3: "#b03060",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        purple2: "#7f007f",
        purple3: "#a020f0",
        rebeccapurple: "#663399",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
      };
      chroma2.colors = w3cx11;
      lab2rgb = function() {
        var a, args, b, g, l, r, x, y, z;
        args = unpack(arguments);
        l = args[0], a = args[1], b = args[2];
        y = (l + 16) / 116;
        x = isNaN(a) ? y : y + a / 500;
        z = isNaN(b) ? y : y - b / 200;
        y = LAB_CONSTANTS.Yn * lab_xyz(y);
        x = LAB_CONSTANTS.Xn * lab_xyz(x);
        z = LAB_CONSTANTS.Zn * lab_xyz(z);
        r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);
        g = xyz_rgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z);
        b = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);
        return [r, g, b, args.length > 3 ? args[3] : 1];
      };
      xyz_rgb = function(r) {
        return 255 * (r <= 304e-5 ? 12.92 * r : 1.055 * pow(r, 1 / 2.4) - 0.055);
      };
      lab_xyz = function(t) {
        if (t > LAB_CONSTANTS.t1) {
          return t * t * t;
        } else {
          return LAB_CONSTANTS.t2 * (t - LAB_CONSTANTS.t0);
        }
      };
      LAB_CONSTANTS = {
        Kn: 18,
        Xn: 0.95047,
        Yn: 1,
        Zn: 1.08883,
        t0: 0.137931034,
        t1: 0.206896552,
        t2: 0.12841855,
        t3: 8856452e-9
      };
      rgb2lab = function() {
        var b, g, r, ref, ref1, x, y, z;
        ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
        ref1 = rgb2xyz(r, g, b), x = ref1[0], y = ref1[1], z = ref1[2];
        return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
      };
      rgb_xyz = function(r) {
        if ((r /= 255) <= 0.04045) {
          return r / 12.92;
        } else {
          return pow((r + 0.055) / 1.055, 2.4);
        }
      };
      xyz_lab = function(t) {
        if (t > LAB_CONSTANTS.t3) {
          return pow(t, 1 / 3);
        } else {
          return t / LAB_CONSTANTS.t2 + LAB_CONSTANTS.t0;
        }
      };
      rgb2xyz = function() {
        var b, g, r, ref, x, y, z;
        ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
        r = rgb_xyz(r);
        g = rgb_xyz(g);
        b = rgb_xyz(b);
        x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / LAB_CONSTANTS.Xn);
        y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.072175 * b) / LAB_CONSTANTS.Yn);
        z = xyz_lab((0.0193339 * r + 0.119192 * g + 0.9503041 * b) / LAB_CONSTANTS.Zn);
        return [x, y, z];
      };
      chroma2.lab = function() {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor(), result2 = func.apply(child, args);
          return Object(result2) === result2 ? result2 : child;
        })(Color, slice.call(arguments).concat(["lab"]), function() {
        });
      };
      _input.lab = lab2rgb;
      Color.prototype.lab = function() {
        return rgb2lab(this._rgb);
      };
      bezier = function(colors) {
        var I, I0, I1, c, lab0, lab1, lab2, lab3, ref, ref1, ref2;
        colors = (function() {
          var len, o, results;
          results = [];
          for (o = 0, len = colors.length; o < len; o++) {
            c = colors[o];
            results.push(chroma2(c));
          }
          return results;
        })();
        if (colors.length === 2) {
          ref = (function() {
            var len, o, results;
            results = [];
            for (o = 0, len = colors.length; o < len; o++) {
              c = colors[o];
              results.push(c.lab());
            }
            return results;
          })(), lab0 = ref[0], lab1 = ref[1];
          I = function(t) {
            var i, lab;
            lab = (function() {
              var o, results;
              results = [];
              for (i = o = 0; o <= 2; i = ++o) {
                results.push(lab0[i] + t * (lab1[i] - lab0[i]));
              }
              return results;
            })();
            return chroma2.lab.apply(chroma2, lab);
          };
        } else if (colors.length === 3) {
          ref1 = (function() {
            var len, o, results;
            results = [];
            for (o = 0, len = colors.length; o < len; o++) {
              c = colors[o];
              results.push(c.lab());
            }
            return results;
          })(), lab0 = ref1[0], lab1 = ref1[1], lab2 = ref1[2];
          I = function(t) {
            var i, lab;
            lab = (function() {
              var o, results;
              results = [];
              for (i = o = 0; o <= 2; i = ++o) {
                results.push((1 - t) * (1 - t) * lab0[i] + 2 * (1 - t) * t * lab1[i] + t * t * lab2[i]);
              }
              return results;
            })();
            return chroma2.lab.apply(chroma2, lab);
          };
        } else if (colors.length === 4) {
          ref2 = (function() {
            var len, o, results;
            results = [];
            for (o = 0, len = colors.length; o < len; o++) {
              c = colors[o];
              results.push(c.lab());
            }
            return results;
          })(), lab0 = ref2[0], lab1 = ref2[1], lab2 = ref2[2], lab3 = ref2[3];
          I = function(t) {
            var i, lab;
            lab = (function() {
              var o, results;
              results = [];
              for (i = o = 0; o <= 2; i = ++o) {
                results.push((1 - t) * (1 - t) * (1 - t) * lab0[i] + 3 * (1 - t) * (1 - t) * t * lab1[i] + 3 * (1 - t) * t * t * lab2[i] + t * t * t * lab3[i]);
              }
              return results;
            })();
            return chroma2.lab.apply(chroma2, lab);
          };
        } else if (colors.length === 5) {
          I0 = bezier(colors.slice(0, 3));
          I1 = bezier(colors.slice(2, 5));
          I = function(t) {
            if (t < 0.5) {
              return I0(t * 2);
            } else {
              return I1((t - 0.5) * 2);
            }
          };
        }
        return I;
      };
      chroma2.bezier = function(colors) {
        var f;
        f = bezier(colors);
        f.scale = function() {
          return chroma2.scale(f);
        };
        return f;
      };
      chroma2.cubehelix = function(start, rotations, hue, gamma, lightness) {
        var dh, dl, f;
        if (start == null) {
          start = 300;
        }
        if (rotations == null) {
          rotations = -1.5;
        }
        if (hue == null) {
          hue = 1;
        }
        if (gamma == null) {
          gamma = 1;
        }
        if (lightness == null) {
          lightness = [0, 1];
        }
        dh = 0;
        if (type(lightness) === "array") {
          dl = lightness[1] - lightness[0];
        } else {
          dl = 0;
          lightness = [lightness, lightness];
        }
        f = function(fract) {
          var a, amp, b, cos_a, g, h, l, r, sin_a;
          a = TWOPI * ((start + 120) / 360 + rotations * fract);
          l = pow(lightness[0] + dl * fract, gamma);
          h = dh !== 0 ? hue[0] + fract * dh : hue;
          amp = h * l * (1 - l) / 2;
          cos_a = cos(a);
          sin_a = sin(a);
          r = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
          g = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
          b = l + amp * (1.97294 * cos_a);
          return chroma2(clip_rgb([r * 255, g * 255, b * 255, 1]));
        };
        f.start = function(s) {
          if (s == null) {
            return start;
          }
          start = s;
          return f;
        };
        f.rotations = function(r) {
          if (r == null) {
            return rotations;
          }
          rotations = r;
          return f;
        };
        f.gamma = function(g) {
          if (g == null) {
            return gamma;
          }
          gamma = g;
          return f;
        };
        f.hue = function(h) {
          if (h == null) {
            return hue;
          }
          hue = h;
          if (type(hue) === "array") {
            dh = hue[1] - hue[0];
            if (dh === 0) {
              hue = hue[1];
            }
          } else {
            dh = 0;
          }
          return f;
        };
        f.lightness = function(h) {
          if (h == null) {
            return lightness;
          }
          if (type(h) === "array") {
            lightness = h;
            dl = h[1] - h[0];
          } else {
            lightness = [h, h];
            dl = 0;
          }
          return f;
        };
        f.scale = function() {
          return chroma2.scale(f);
        };
        f.hue(hue);
        return f;
      };
      chroma2.random = function() {
        var code, digits, o;
        digits = "0123456789abcdef";
        code = "#";
        for (o = 0; o < 6; ++o) {
          code += digits.charAt(floor(Math.random() * 16));
        }
        return new Color(code);
      };
      _interpolators = [];
      interpolate = function(col1, col2, f, m2) {
        var interpol, len, o, res;
        if (f == null) {
          f = 0.5;
        }
        if (m2 == null) {
          m2 = "rgb";
        }
        if (type(col1) !== "object") {
          col1 = chroma2(col1);
        }
        if (type(col2) !== "object") {
          col2 = chroma2(col2);
        }
        for (o = 0, len = _interpolators.length; o < len; o++) {
          interpol = _interpolators[o];
          if (m2 === interpol[0]) {
            res = interpol[1](col1, col2, f, m2);
            break;
          }
        }
        if (res == null) {
          throw "color mode " + m2 + " is not supported";
        }
        return res.alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
      };
      chroma2.interpolate = interpolate;
      Color.prototype.interpolate = function(col2, f, m2) {
        return interpolate(this, col2, f, m2);
      };
      chroma2.mix = interpolate;
      Color.prototype.mix = Color.prototype.interpolate;
      _input.rgb = function() {
        var k, ref, results, v;
        ref = unpack(arguments);
        results = [];
        for (k in ref) {
          v = ref[k];
          results.push(v);
        }
        return results;
      };
      chroma2.rgb = function() {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor(), result2 = func.apply(child, args);
          return Object(result2) === result2 ? result2 : child;
        })(Color, slice.call(arguments).concat(["rgb"]), function() {
        });
      };
      Color.prototype.rgb = function(round2) {
        if (round2 == null) {
          round2 = true;
        }
        if (round2) {
          return this._rgb.map(Math.round).slice(0, 3);
        } else {
          return this._rgb.slice(0, 3);
        }
      };
      Color.prototype.rgba = function(round2) {
        if (round2 == null) {
          round2 = true;
        }
        if (!round2) {
          return this._rgb.slice(0);
        }
        return [Math.round(this._rgb[0]), Math.round(this._rgb[1]), Math.round(this._rgb[2]), this._rgb[3]];
      };
      _guess_formats.push({
        p: 3,
        test: function(n) {
          var a;
          a = unpack(arguments);
          if (type(a) === "array" && a.length === 3) {
            return "rgb";
          }
          if (a.length === 4 && type(a[3]) === "number" && a[3] >= 0 && a[3] <= 1) {
            return "rgb";
          }
        }
      });
      _input.lrgb = _input.rgb;
      interpolate_lrgb = function(col1, col2, f, m2) {
        var xyz0, xyz1;
        xyz0 = col1._rgb;
        xyz1 = col2._rgb;
        return new Color(sqrt(pow(xyz0[0], 2) * (1 - f) + pow(xyz1[0], 2) * f), sqrt(pow(xyz0[1], 2) * (1 - f) + pow(xyz1[1], 2) * f), sqrt(pow(xyz0[2], 2) * (1 - f) + pow(xyz1[2], 2) * f), m2);
      };
      _average_lrgb = function(colors) {
        var col, f, len, o, rgb, xyz;
        f = 1 / colors.length;
        xyz = [0, 0, 0, 0];
        for (o = 0, len = colors.length; o < len; o++) {
          col = colors[o];
          rgb = col._rgb;
          xyz[0] += pow(rgb[0], 2) * f;
          xyz[1] += pow(rgb[1], 2) * f;
          xyz[2] += pow(rgb[2], 2) * f;
          xyz[3] += rgb[3] * f;
        }
        xyz[0] = sqrt(xyz[0]);
        xyz[1] = sqrt(xyz[1]);
        xyz[2] = sqrt(xyz[2]);
        if (xyz[3] > 1) {
          xyz[3] = 1;
        }
        return new Color(clip_rgb(xyz));
      };
      _interpolators.push(["lrgb", interpolate_lrgb]);
      chroma2.average = function(colors, mode) {
        var A, alpha, c, cnt, dx, dy, first, i, l, len, o, xyz, xyz2;
        if (mode == null) {
          mode = "rgb";
        }
        l = colors.length;
        colors = colors.map(function(c2) {
          return chroma2(c2);
        });
        first = colors.splice(0, 1)[0];
        if (mode === "lrgb") {
          return _average_lrgb(colors);
        }
        xyz = first.get(mode);
        cnt = [];
        dx = 0;
        dy = 0;
        for (i in xyz) {
          xyz[i] = xyz[i] || 0;
          cnt.push(isNaN(xyz[i]) ? 0 : 1);
          if (mode.charAt(i) === "h" && !isNaN(xyz[i])) {
            A = xyz[i] / 180 * PI;
            dx += cos(A);
            dy += sin(A);
          }
        }
        alpha = first.alpha();
        for (o = 0, len = colors.length; o < len; o++) {
          c = colors[o];
          xyz2 = c.get(mode);
          alpha += c.alpha();
          for (i in xyz) {
            if (!isNaN(xyz2[i])) {
              cnt[i] += 1;
              if (mode.charAt(i) === "h") {
                A = xyz2[i] / 180 * PI;
                dx += cos(A);
                dy += sin(A);
              } else {
                xyz[i] += xyz2[i];
              }
            }
          }
        }
        for (i in xyz) {
          if (mode.charAt(i) === "h") {
            A = atan2(dy / cnt[i], dx / cnt[i]) / PI * 180;
            while (A < 0) {
              A += 360;
            }
            while (A >= 360) {
              A -= 360;
            }
            xyz[i] = A;
          } else {
            xyz[i] = xyz[i] / cnt[i];
          }
        }
        return chroma2(xyz, mode).alpha(alpha / l);
      };
      hex2rgb = function(hex) {
        var a, b, g, r, rgb, u;
        if (hex.match(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
          if (hex.length === 4 || hex.length === 7) {
            hex = hex.substr(1);
          }
          if (hex.length === 3) {
            hex = hex.split("");
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
          }
          u = parseInt(hex, 16);
          r = u >> 16;
          g = u >> 8 & 255;
          b = u & 255;
          return [r, g, b, 1];
        }
        if (hex.match(/^#?([A-Fa-f0-9]{8})$/)) {
          if (hex.length === 9) {
            hex = hex.substr(1);
          }
          u = parseInt(hex, 16);
          r = u >> 24 & 255;
          g = u >> 16 & 255;
          b = u >> 8 & 255;
          a = round((u & 255) / 255 * 100) / 100;
          return [r, g, b, a];
        }
        if (_input.css != null && (rgb = _input.css(hex))) {
          return rgb;
        }
        throw "unknown color: " + hex;
      };
      rgb2hex = function(channels, mode) {
        var a, b, g, hxa, r, str, u;
        if (mode == null) {
          mode = "auto";
        }
        r = channels[0], g = channels[1], b = channels[2], a = channels[3];
        if (mode === "auto") {
          mode = a < 1 ? "rgba" : "rgb";
        }
        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);
        u = r << 16 | g << 8 | b;
        str = "000000" + u.toString(16);
        str = str.substr(str.length - 6);
        hxa = "0" + round(a * 255).toString(16);
        hxa = hxa.substr(hxa.length - 2);
        return "#" + (function() {
          switch (mode.toLowerCase()) {
            case "rgba":
              return str + hxa;
            case "argb":
              return hxa + str;
            default:
              return str;
          }
        })();
      };
      _input.hex = function(h) {
        return hex2rgb(h);
      };
      chroma2.hex = function() {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor(), result2 = func.apply(child, args);
          return Object(result2) === result2 ? result2 : child;
        })(Color, slice.call(arguments).concat(["hex"]), function() {
        });
      };
      Color.prototype.hex = function(mode) {
        if (mode == null) {
          mode = "auto";
        }
        return rgb2hex(this._rgb, mode);
      };
      _guess_formats.push({
        p: 4,
        test: function(n) {
          if (arguments.length === 1 && type(n) === "string") {
            return "hex";
          }
        }
      });
      hsl2rgb = function() {
        var args, b, c, g, h, i, l, o, r, ref, s, t1, t2, t3;
        args = unpack(arguments);
        h = args[0], s = args[1], l = args[2];
        if (s === 0) {
          r = g = b = l * 255;
        } else {
          t3 = [0, 0, 0];
          c = [0, 0, 0];
          t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
          t1 = 2 * l - t2;
          h /= 360;
          t3[0] = h + 1 / 3;
          t3[1] = h;
          t3[2] = h - 1 / 3;
          for (i = o = 0; o <= 2; i = ++o) {
            if (t3[i] < 0) {
              t3[i] += 1;
            }
            if (t3[i] > 1) {
              t3[i] -= 1;
            }
            if (6 * t3[i] < 1) {
              c[i] = t1 + (t2 - t1) * 6 * t3[i];
            } else if (2 * t3[i] < 1) {
              c[i] = t2;
            } else if (3 * t3[i] < 2) {
              c[i] = t1 + (t2 - t1) * (2 / 3 - t3[i]) * 6;
            } else {
              c[i] = t1;
            }
          }
          ref = [round(c[0] * 255), round(c[1] * 255), round(c[2] * 255)], r = ref[0], g = ref[1], b = ref[2];
        }
        if (args.length > 3) {
          return [r, g, b, args[3]];
        } else {
          return [r, g, b];
        }
      };
      rgb2hsl = function(r, g, b) {
        var h, l, min, ref, s;
        if (r !== void 0 && r.length >= 3) {
          ref = r, r = ref[0], g = ref[1], b = ref[2];
        }
        r /= 255;
        g /= 255;
        b /= 255;
        min = Math.min(r, g, b);
        max = Math.max(r, g, b);
        l = (max + min) / 2;
        if (max === min) {
          s = 0;
          h = Number.NaN;
        } else {
          s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
        }
        if (r === max) {
          h = (g - b) / (max - min);
        } else if (g === max) {
          h = 2 + (b - r) / (max - min);
        } else if (b === max) {
          h = 4 + (r - g) / (max - min);
        }
        h *= 60;
        if (h < 0) {
          h += 360;
        }
        return [h, s, l];
      };
      chroma2.hsl = function() {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor(), result2 = func.apply(child, args);
          return Object(result2) === result2 ? result2 : child;
        })(Color, slice.call(arguments).concat(["hsl"]), function() {
        });
      };
      _input.hsl = hsl2rgb;
      Color.prototype.hsl = function() {
        return rgb2hsl(this._rgb);
      };
      hsv2rgb = function() {
        var args, b, f, g, h, i, p, q, r, ref, ref1, ref2, ref3, ref4, ref5, s, t, v;
        args = unpack(arguments);
        h = args[0], s = args[1], v = args[2];
        v *= 255;
        if (s === 0) {
          r = g = b = v;
        } else {
          if (h === 360) {
            h = 0;
          }
          if (h > 360) {
            h -= 360;
          }
          if (h < 0) {
            h += 360;
          }
          h /= 60;
          i = floor(h);
          f = h - i;
          p = v * (1 - s);
          q = v * (1 - s * f);
          t = v * (1 - s * (1 - f));
          switch (i) {
            case 0:
              ref = [v, t, p], r = ref[0], g = ref[1], b = ref[2];
              break;
            case 1:
              ref1 = [q, v, p], r = ref1[0], g = ref1[1], b = ref1[2];
              break;
            case 2:
              ref2 = [p, v, t], r = ref2[0], g = ref2[1], b = ref2[2];
              break;
            case 3:
              ref3 = [p, q, v], r = ref3[0], g = ref3[1], b = ref3[2];
              break;
            case 4:
              ref4 = [t, p, v], r = ref4[0], g = ref4[1], b = ref4[2];
              break;
            case 5:
              ref5 = [v, p, q], r = ref5[0], g = ref5[1], b = ref5[2];
          }
        }
        return [r, g, b, args.length > 3 ? args[3] : 1];
      };
      rgb2hsv = function() {
        var b, delta, g, h, min, r, ref, s, v;
        ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
        min = Math.min(r, g, b);
        max = Math.max(r, g, b);
        delta = max - min;
        v = max / 255;
        if (max === 0) {
          h = Number.NaN;
          s = 0;
        } else {
          s = delta / max;
          if (r === max) {
            h = (g - b) / delta;
          }
          if (g === max) {
            h = 2 + (b - r) / delta;
          }
          if (b === max) {
            h = 4 + (r - g) / delta;
          }
          h *= 60;
          if (h < 0) {
            h += 360;
          }
        }
        return [h, s, v];
      };
      chroma2.hsv = function() {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor(), result2 = func.apply(child, args);
          return Object(result2) === result2 ? result2 : child;
        })(Color, slice.call(arguments).concat(["hsv"]), function() {
        });
      };
      _input.hsv = hsv2rgb;
      Color.prototype.hsv = function() {
        return rgb2hsv(this._rgb);
      };
      num2rgb = function(num) {
        var b, g, r;
        if (type(num) === "number" && num >= 0 && num <= 16777215) {
          r = num >> 16;
          g = num >> 8 & 255;
          b = num & 255;
          return [r, g, b, 1];
        }
        console.warn("unknown num color: " + num);
        return [0, 0, 0, 1];
      };
      rgb2num = function() {
        var b, g, r, ref;
        ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
        return (r << 16) + (g << 8) + b;
      };
      chroma2.num = function(num) {
        return new Color(num, "num");
      };
      Color.prototype.num = function(mode) {
        if (mode == null) {
          mode = "rgb";
        }
        return rgb2num(this._rgb, mode);
      };
      _input.num = num2rgb;
      _guess_formats.push({
        p: 1,
        test: function(n) {
          if (arguments.length === 1 && type(n) === "number" && n >= 0 && n <= 16777215) {
            return "num";
          }
        }
      });
      hcg2rgb = function() {
        var _c, _g, args, b, c, f, g, h, i, p, q, r, ref, ref1, ref2, ref3, ref4, ref5, t, v;
        args = unpack(arguments);
        h = args[0], c = args[1], _g = args[2];
        c = c / 100;
        g = g / 100 * 255;
        _c = c * 255;
        if (c === 0) {
          r = g = b = _g;
        } else {
          if (h === 360) {
            h = 0;
          }
          if (h > 360) {
            h -= 360;
          }
          if (h < 0) {
            h += 360;
          }
          h /= 60;
          i = floor(h);
          f = h - i;
          p = _g * (1 - c);
          q = p + _c * (1 - f);
          t = p + _c * f;
          v = p + _c;
          switch (i) {
            case 0:
              ref = [v, t, p], r = ref[0], g = ref[1], b = ref[2];
              break;
            case 1:
              ref1 = [q, v, p], r = ref1[0], g = ref1[1], b = ref1[2];
              break;
            case 2:
              ref2 = [p, v, t], r = ref2[0], g = ref2[1], b = ref2[2];
              break;
            case 3:
              ref3 = [p, q, v], r = ref3[0], g = ref3[1], b = ref3[2];
              break;
            case 4:
              ref4 = [t, p, v], r = ref4[0], g = ref4[1], b = ref4[2];
              break;
            case 5:
              ref5 = [v, p, q], r = ref5[0], g = ref5[1], b = ref5[2];
          }
        }
        return [r, g, b, args.length > 3 ? args[3] : 1];
      };
      rgb2hcg = function() {
        var _g, b, c, delta, g, h, min, r, ref;
        ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
        min = Math.min(r, g, b);
        max = Math.max(r, g, b);
        delta = max - min;
        c = delta * 100 / 255;
        _g = min / (255 - delta) * 100;
        if (delta === 0) {
          h = Number.NaN;
        } else {
          if (r === max) {
            h = (g - b) / delta;
          }
          if (g === max) {
            h = 2 + (b - r) / delta;
          }
          if (b === max) {
            h = 4 + (r - g) / delta;
          }
          h *= 60;
          if (h < 0) {
            h += 360;
          }
        }
        return [h, c, _g];
      };
      chroma2.hcg = function() {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor(), result2 = func.apply(child, args);
          return Object(result2) === result2 ? result2 : child;
        })(Color, slice.call(arguments).concat(["hcg"]), function() {
        });
      };
      _input.hcg = hcg2rgb;
      Color.prototype.hcg = function() {
        return rgb2hcg(this._rgb);
      };
      css2rgb = function(css) {
        var aa, ab, hsl, i, m2, o, rgb, w;
        css = css.toLowerCase();
        if (chroma2.colors != null && chroma2.colors[css]) {
          return hex2rgb(chroma2.colors[css]);
        }
        if (m2 = css.match(/rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/)) {
          rgb = m2.slice(1, 4);
          for (i = o = 0; o <= 2; i = ++o) {
            rgb[i] = +rgb[i];
          }
          rgb[3] = 1;
        } else if (m2 = css.match(/rgba\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*([01]|[01]?\.\d+)\)/)) {
          rgb = m2.slice(1, 5);
          for (i = w = 0; w <= 3; i = ++w) {
            rgb[i] = +rgb[i];
          }
        } else if (m2 = css.match(/rgb\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/)) {
          rgb = m2.slice(1, 4);
          for (i = aa = 0; aa <= 2; i = ++aa) {
            rgb[i] = round(rgb[i] * 2.55);
          }
          rgb[3] = 1;
        } else if (m2 = css.match(/rgba\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/)) {
          rgb = m2.slice(1, 5);
          for (i = ab = 0; ab <= 2; i = ++ab) {
            rgb[i] = round(rgb[i] * 2.55);
          }
          rgb[3] = +rgb[3];
        } else if (m2 = css.match(/hsl\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/)) {
          hsl = m2.slice(1, 4);
          hsl[1] *= 0.01;
          hsl[2] *= 0.01;
          rgb = hsl2rgb(hsl);
          rgb[3] = 1;
        } else if (m2 = css.match(/hsla\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/)) {
          hsl = m2.slice(1, 4);
          hsl[1] *= 0.01;
          hsl[2] *= 0.01;
          rgb = hsl2rgb(hsl);
          rgb[3] = +m2[4];
        }
        return rgb;
      };
      rgb2css = function(rgba) {
        var mode;
        mode = rgba[3] < 1 ? "rgba" : "rgb";
        if (mode === "rgb") {
          return mode + "(" + rgba.slice(0, 3).map(round).join(",") + ")";
        } else if (mode === "rgba") {
          return mode + "(" + rgba.slice(0, 3).map(round).join(",") + "," + rgba[3] + ")";
        } else ;
      };
      rnd = function(a) {
        return round(a * 100) / 100;
      };
      hsl2css = function(hsl, alpha) {
        var mode;
        mode = alpha < 1 ? "hsla" : "hsl";
        hsl[0] = rnd(hsl[0] || 0);
        hsl[1] = rnd(hsl[1] * 100) + "%";
        hsl[2] = rnd(hsl[2] * 100) + "%";
        if (mode === "hsla") {
          hsl[3] = alpha;
        }
        return mode + "(" + hsl.join(",") + ")";
      };
      _input.css = function(h) {
        return css2rgb(h);
      };
      chroma2.css = function() {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor(), result2 = func.apply(child, args);
          return Object(result2) === result2 ? result2 : child;
        })(Color, slice.call(arguments).concat(["css"]), function() {
        });
      };
      Color.prototype.css = function(mode) {
        if (mode == null) {
          mode = "rgb";
        }
        if (mode.slice(0, 3) === "rgb") {
          return rgb2css(this._rgb);
        } else if (mode.slice(0, 3) === "hsl") {
          return hsl2css(this.hsl(), this.alpha());
        }
      };
      _input.named = function(name) {
        return hex2rgb(w3cx11[name]);
      };
      _guess_formats.push({
        p: 5,
        test: function(n) {
          if (arguments.length === 1 && w3cx11[n] != null) {
            return "named";
          }
        }
      });
      Color.prototype.name = function(n) {
        var h, k;
        if (arguments.length) {
          if (w3cx11[n]) {
            this._rgb = hex2rgb(w3cx11[n]);
          }
          this._rgb[3] = 1;
        }
        h = this.hex("rgb");
        for (k in w3cx11) {
          if (h === w3cx11[k]) {
            return k;
          }
        }
        return h;
      };
      lch2lab = function() {
        var c, h, l, ref;
        ref = unpack(arguments), l = ref[0], c = ref[1], h = ref[2];
        h = h * DEG2RAD;
        return [l, cos(h) * c, sin(h) * c];
      };
      lch2rgb = function() {
        var L2, a, args, b, c, g, h, l, r, ref, ref1;
        args = unpack(arguments);
        l = args[0], c = args[1], h = args[2];
        ref = lch2lab(l, c, h), L2 = ref[0], a = ref[1], b = ref[2];
        ref1 = lab2rgb(L2, a, b), r = ref1[0], g = ref1[1], b = ref1[2];
        return [r, g, b, args.length > 3 ? args[3] : 1];
      };
      lab2lch = function() {
        var a, b, c, h, l, ref;
        ref = unpack(arguments), l = ref[0], a = ref[1], b = ref[2];
        c = sqrt(a * a + b * b);
        h = (atan2(b, a) * RAD2DEG + 360) % 360;
        if (round(c * 1e4) === 0) {
          h = Number.NaN;
        }
        return [l, c, h];
      };
      rgb2lch = function() {
        var a, b, g, l, r, ref, ref1;
        ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
        ref1 = rgb2lab(r, g, b), l = ref1[0], a = ref1[1], b = ref1[2];
        return lab2lch(l, a, b);
      };
      chroma2.lch = function() {
        var args;
        args = unpack(arguments);
        return new Color(args, "lch");
      };
      chroma2.hcl = function() {
        var args;
        args = unpack(arguments);
        return new Color(args, "hcl");
      };
      _input.lch = lch2rgb;
      _input.hcl = function() {
        var c, h, l, ref;
        ref = unpack(arguments), h = ref[0], c = ref[1], l = ref[2];
        return lch2rgb([l, c, h]);
      };
      Color.prototype.lch = function() {
        return rgb2lch(this._rgb);
      };
      Color.prototype.hcl = function() {
        return rgb2lch(this._rgb).reverse();
      };
      rgb2cmyk = function(mode) {
        var b, c, f, g, k, m2, r, ref, y;
        if (mode == null) {
          mode = "rgb";
        }
        ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
        r = r / 255;
        g = g / 255;
        b = b / 255;
        k = 1 - Math.max(r, Math.max(g, b));
        f = k < 1 ? 1 / (1 - k) : 0;
        c = (1 - r - k) * f;
        m2 = (1 - g - k) * f;
        y = (1 - b - k) * f;
        return [c, m2, y, k];
      };
      cmyk2rgb = function() {
        var alpha, args, b, c, g, k, m2, r, y;
        args = unpack(arguments);
        c = args[0], m2 = args[1], y = args[2], k = args[3];
        alpha = args.length > 4 ? args[4] : 1;
        if (k === 1) {
          return [0, 0, 0, alpha];
        }
        r = c >= 1 ? 0 : 255 * (1 - c) * (1 - k);
        g = m2 >= 1 ? 0 : 255 * (1 - m2) * (1 - k);
        b = y >= 1 ? 0 : 255 * (1 - y) * (1 - k);
        return [r, g, b, alpha];
      };
      _input.cmyk = function() {
        return cmyk2rgb(unpack(arguments));
      };
      chroma2.cmyk = function() {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor(), result2 = func.apply(child, args);
          return Object(result2) === result2 ? result2 : child;
        })(Color, slice.call(arguments).concat(["cmyk"]), function() {
        });
      };
      Color.prototype.cmyk = function() {
        return rgb2cmyk(this._rgb);
      };
      _input.gl = function() {
        var i, k, o, rgb, v;
        rgb = (function() {
          var ref, results;
          ref = unpack(arguments);
          results = [];
          for (k in ref) {
            v = ref[k];
            results.push(v);
          }
          return results;
        }).apply(this, arguments);
        for (i = o = 0; o <= 2; i = ++o) {
          rgb[i] *= 255;
        }
        return rgb;
      };
      chroma2.gl = function() {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor(), result2 = func.apply(child, args);
          return Object(result2) === result2 ? result2 : child;
        })(Color, slice.call(arguments).concat(["gl"]), function() {
        });
      };
      Color.prototype.gl = function() {
        var rgb;
        rgb = this._rgb;
        return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, rgb[3]];
      };
      rgb2luminance = function(r, g, b) {
        var ref;
        ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
        r = luminance_x(r);
        g = luminance_x(g);
        b = luminance_x(b);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      luminance_x = function(x) {
        x /= 255;
        if (x <= 0.03928) {
          return x / 12.92;
        } else {
          return pow((x + 0.055) / 1.055, 2.4);
        }
      };
      interpolate_rgb = function(col1, col2, f, m2) {
        var xyz0, xyz1;
        xyz0 = col1._rgb;
        xyz1 = col2._rgb;
        return new Color(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), m2);
      };
      _interpolators.push(["rgb", interpolate_rgb]);
      Color.prototype.luminance = function(lum, mode) {
        var cur_lum, eps, max_iter, rgba, test;
        if (mode == null) {
          mode = "rgb";
        }
        if (!arguments.length) {
          return rgb2luminance(this._rgb);
        }
        rgba = this._rgb;
        if (lum === 0) {
          rgba = [0, 0, 0, this._rgb[3]];
        } else if (lum === 1) {
          rgba = [255, 255, 255, this[3]];
        } else {
          cur_lum = rgb2luminance(this._rgb);
          eps = 1e-7;
          max_iter = 20;
          test = function(l, h) {
            var lm, m2;
            m2 = l.interpolate(h, 0.5, mode);
            lm = m2.luminance();
            if (Math.abs(lum - lm) < eps || !max_iter--) {
              return m2;
            }
            if (lm > lum) {
              return test(l, m2);
            }
            return test(m2, h);
          };
          if (cur_lum > lum) {
            rgba = test(chroma2("black"), this).rgba();
          } else {
            rgba = test(this, chroma2("white")).rgba();
          }
        }
        return chroma2(rgba).alpha(this.alpha());
      };
      temperature2rgb = function(kelvin) {
        var b, g, r, temp;
        temp = kelvin / 100;
        if (temp < 66) {
          r = 255;
          g = -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log2(g);
          b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log2(b);
        } else {
          r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log2(r);
          g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log2(g);
          b = 255;
        }
        return [r, g, b];
      };
      rgb2temperature = function() {
        var b, eps, maxTemp, minTemp, r, ref, rgb, temp;
        ref = unpack(arguments), r = ref[0], ref[1], b = ref[2];
        minTemp = 1e3;
        maxTemp = 4e4;
        eps = 0.4;
        while (maxTemp - minTemp > eps) {
          temp = (maxTemp + minTemp) * 0.5;
          rgb = temperature2rgb(temp);
          if (rgb[2] / rgb[0] >= b / r) {
            maxTemp = temp;
          } else {
            minTemp = temp;
          }
        }
        return round(temp);
      };
      chroma2.temperature = chroma2.kelvin = function() {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor(), result2 = func.apply(child, args);
          return Object(result2) === result2 ? result2 : child;
        })(Color, slice.call(arguments).concat(["temperature"]), function() {
        });
      };
      _input.temperature = _input.kelvin = _input.K = temperature2rgb;
      Color.prototype.temperature = function() {
        return rgb2temperature(this._rgb);
      };
      Color.prototype.kelvin = Color.prototype.temperature;
      chroma2.contrast = function(a, b) {
        var l1, l2, ref, ref1;
        if ((ref = type(a)) === "string" || ref === "number") {
          a = new Color(a);
        }
        if ((ref1 = type(b)) === "string" || ref1 === "number") {
          b = new Color(b);
        }
        l1 = a.luminance();
        l2 = b.luminance();
        if (l1 > l2) {
          return (l1 + 0.05) / (l2 + 0.05);
        } else {
          return (l2 + 0.05) / (l1 + 0.05);
        }
      };
      chroma2.distance = function(a, b, mode) {
        var d, i, l1, l2, ref, ref1, sum_sq;
        if (mode == null) {
          mode = "lab";
        }
        if ((ref = type(a)) === "string" || ref === "number") {
          a = new Color(a);
        }
        if ((ref1 = type(b)) === "string" || ref1 === "number") {
          b = new Color(b);
        }
        l1 = a.get(mode);
        l2 = b.get(mode);
        sum_sq = 0;
        for (i in l1) {
          d = (l1[i] || 0) - (l2[i] || 0);
          sum_sq += d * d;
        }
        return Math.sqrt(sum_sq);
      };
      chroma2.deltaE = function(a, b, L2, C) {
        var L1, L22, a1, a2, b1, b2, c1, c2, c4, dH2, delA, delB, delC, delL, f, h1, ref, ref1, ref2, ref3, sc, sh, sl, t, v1, v2, v3;
        if (L2 == null) {
          L2 = 1;
        }
        if (C == null) {
          C = 1;
        }
        if ((ref = type(a)) === "string" || ref === "number") {
          a = new Color(a);
        }
        if ((ref1 = type(b)) === "string" || ref1 === "number") {
          b = new Color(b);
        }
        ref2 = a.lab(), L1 = ref2[0], a1 = ref2[1], b1 = ref2[2];
        ref3 = b.lab(), L22 = ref3[0], a2 = ref3[1], b2 = ref3[2];
        c1 = sqrt(a1 * a1 + b1 * b1);
        c2 = sqrt(a2 * a2 + b2 * b2);
        sl = L1 < 16 ? 0.511 : 0.040975 * L1 / (1 + 0.01765 * L1);
        sc = 0.0638 * c1 / (1 + 0.0131 * c1) + 0.638;
        h1 = c1 < 1e-6 ? 0 : atan2(b1, a1) * 180 / PI;
        while (h1 < 0) {
          h1 += 360;
        }
        while (h1 >= 360) {
          h1 -= 360;
        }
        t = h1 >= 164 && h1 <= 345 ? 0.56 + abs(0.2 * cos(PI * (h1 + 168) / 180)) : 0.36 + abs(0.4 * cos(PI * (h1 + 35) / 180));
        c4 = c1 * c1 * c1 * c1;
        f = sqrt(c4 / (c4 + 1900));
        sh = sc * (f * t + 1 - f);
        delL = L1 - L22;
        delC = c1 - c2;
        delA = a1 - a2;
        delB = b1 - b2;
        dH2 = delA * delA + delB * delB - delC * delC;
        v1 = delL / (L2 * sl);
        v2 = delC / (C * sc);
        v3 = sh;
        return sqrt(v1 * v1 + v2 * v2 + dH2 / (v3 * v3));
      };
      Color.prototype.get = function(modechan) {
        var channel, i, me, mode, ref, src2;
        me = this;
        ref = modechan.split("."), mode = ref[0], channel = ref[1];
        src2 = me[mode]();
        if (channel) {
          i = mode.indexOf(channel);
          if (i > -1) {
            return src2[i];
          } else {
            return console.warn("unknown channel " + channel + " in mode " + mode);
          }
        } else {
          return src2;
        }
      };
      Color.prototype.set = function(modechan, value) {
        var channel, i, me, mode, ref, src2;
        me = this;
        ref = modechan.split("."), mode = ref[0], channel = ref[1];
        if (channel) {
          src2 = me[mode]();
          i = mode.indexOf(channel);
          if (i > -1) {
            if (type(value) === "string") {
              switch (value.charAt(0)) {
                case "+":
                  src2[i] += +value;
                  break;
                case "-":
                  src2[i] += +value;
                  break;
                case "*":
                  src2[i] *= +value.substr(1);
                  break;
                case "/":
                  src2[i] /= +value.substr(1);
                  break;
                default:
                  src2[i] = +value;
              }
            } else {
              src2[i] = value;
            }
          } else {
            console.warn("unknown channel " + channel + " in mode " + mode);
          }
        } else {
          src2 = value;
        }
        return chroma2(src2, mode).alpha(me.alpha());
      };
      Color.prototype.clipped = function() {
        return this._rgb._clipped || false;
      };
      Color.prototype.alpha = function(a) {
        if (arguments.length) {
          return chroma2.rgb([this._rgb[0], this._rgb[1], this._rgb[2], a]);
        }
        return this._rgb[3];
      };
      Color.prototype.darken = function(amount) {
        var lab, me;
        if (amount == null) {
          amount = 1;
        }
        me = this;
        lab = me.lab();
        lab[0] -= LAB_CONSTANTS.Kn * amount;
        return chroma2.lab(lab).alpha(me.alpha());
      };
      Color.prototype.brighten = function(amount) {
        if (amount == null) {
          amount = 1;
        }
        return this.darken(-amount);
      };
      Color.prototype.darker = Color.prototype.darken;
      Color.prototype.brighter = Color.prototype.brighten;
      Color.prototype.saturate = function(amount) {
        var lch, me;
        if (amount == null) {
          amount = 1;
        }
        me = this;
        lch = me.lch();
        lch[1] += amount * LAB_CONSTANTS.Kn;
        if (lch[1] < 0) {
          lch[1] = 0;
        }
        return chroma2.lch(lch).alpha(me.alpha());
      };
      Color.prototype.desaturate = function(amount) {
        if (amount == null) {
          amount = 1;
        }
        return this.saturate(-amount);
      };
      Color.prototype.premultiply = function() {
        var a, rgb;
        rgb = this.rgb();
        a = this.alpha();
        return chroma2(rgb[0] * a, rgb[1] * a, rgb[2] * a, a);
      };
      blend = function(bottom, top, mode) {
        if (!blend[mode]) {
          throw "unknown blend mode " + mode;
        }
        return blend[mode](bottom, top);
      };
      blend_f = function(f) {
        return function(bottom, top) {
          var c0, c1;
          c0 = chroma2(top).rgb();
          c1 = chroma2(bottom).rgb();
          return chroma2(f(c0, c1), "rgb");
        };
      };
      each = function(f) {
        return function(c0, c1) {
          var i, o, out;
          out = [];
          for (i = o = 0; o <= 3; i = ++o) {
            out[i] = f(c0[i], c1[i]);
          }
          return out;
        };
      };
      normal = function(a, b) {
        return a;
      };
      multiply2 = function(a, b) {
        return a * b / 255;
      };
      darken = function(a, b) {
        if (a > b) {
          return b;
        } else {
          return a;
        }
      };
      lighten = function(a, b) {
        if (a > b) {
          return a;
        } else {
          return b;
        }
      };
      screen = function(a, b) {
        return 255 * (1 - (1 - a / 255) * (1 - b / 255));
      };
      overlay = function(a, b) {
        if (b < 128) {
          return 2 * a * b / 255;
        } else {
          return 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255));
        }
      };
      burn = function(a, b) {
        return 255 * (1 - (1 - b / 255) / (a / 255));
      };
      dodge = function(a, b) {
        if (a === 255) {
          return 255;
        }
        a = 255 * (b / 255) / (1 - a / 255);
        if (a > 255) {
          return 255;
        } else {
          return a;
        }
      };
      blend.normal = blend_f(each(normal));
      blend.multiply = blend_f(each(multiply2));
      blend.screen = blend_f(each(screen));
      blend.overlay = blend_f(each(overlay));
      blend.darken = blend_f(each(darken));
      blend.lighten = blend_f(each(lighten));
      blend.dodge = blend_f(each(dodge));
      blend.burn = blend_f(each(burn));
      chroma2.blend = blend;
      chroma2.analyze = function(data) {
        var len, o, r, val;
        r = {
          min: Number.MAX_VALUE,
          max: Number.MAX_VALUE * -1,
          sum: 0,
          values: [],
          count: 0
        };
        for (o = 0, len = data.length; o < len; o++) {
          val = data[o];
          if (val != null && !isNaN(val)) {
            r.values.push(val);
            r.sum += val;
            if (val < r.min) {
              r.min = val;
            }
            if (val > r.max) {
              r.max = val;
            }
            r.count += 1;
          }
        }
        r.domain = [r.min, r.max];
        r.limits = function(mode, num) {
          return chroma2.limits(r, mode, num);
        };
        return r;
      };
      chroma2.scale = function(colors, positions) {
        var _classes, _colorCache, _colors, _correctLightness, _domain, _gamma, _max, _min, _mode, _nacol, _out, _padding, _pos, _spread, _useCache, f, getClass, getColor, resetCache, setColors, tmap;
        _mode = "rgb";
        _nacol = chroma2("#ccc");
        _spread = 0;
        _domain = [0, 1];
        _pos = [];
        _padding = [0, 0];
        _classes = false;
        _colors = [];
        _out = false;
        _min = 0;
        _max = 1;
        _correctLightness = false;
        _colorCache = {};
        _useCache = true;
        _gamma = 1;
        setColors = function(colors2) {
          var c, col, o, ref, ref1, w;
          if (colors2 == null) {
            colors2 = ["#fff", "#000"];
          }
          if (colors2 != null && type(colors2) === "string" && chroma2.brewer != null) {
            colors2 = chroma2.brewer[colors2] || chroma2.brewer[colors2.toLowerCase()] || colors2;
          }
          if (type(colors2) === "array") {
            if (colors2.length === 1) {
              colors2 = [colors2[0], colors2[0]];
            }
            colors2 = colors2.slice(0);
            for (c = o = 0, ref = colors2.length - 1; 0 <= ref ? o <= ref : o >= ref; c = 0 <= ref ? ++o : --o) {
              col = colors2[c];
              if (type(col) === "string") {
                colors2[c] = chroma2(col);
              }
            }
            _pos.length = 0;
            for (c = w = 0, ref1 = colors2.length - 1; 0 <= ref1 ? w <= ref1 : w >= ref1; c = 0 <= ref1 ? ++w : --w) {
              _pos.push(c / (colors2.length - 1));
            }
          }
          resetCache();
          return _colors = colors2;
        };
        getClass = function(value) {
          var i, n;
          if (_classes != null) {
            n = _classes.length - 1;
            i = 0;
            while (i < n && value >= _classes[i]) {
              i++;
            }
            return i - 1;
          }
          return 0;
        };
        tmap = function(t) {
          return t;
        };
        getColor = function(val, bypassMap) {
          var c, col, i, k, o, p, ref, t;
          if (bypassMap == null) {
            bypassMap = false;
          }
          if (isNaN(val) || val === null) {
            return _nacol;
          }
          if (!bypassMap) {
            if (_classes && _classes.length > 2) {
              c = getClass(val);
              t = c / (_classes.length - 2);
            } else if (_max !== _min) {
              t = (val - _min) / (_max - _min);
            } else {
              t = 1;
            }
          } else {
            t = val;
          }
          if (!bypassMap) {
            t = tmap(t);
          }
          if (_gamma !== 1) {
            t = pow(t, _gamma);
          }
          t = _padding[0] + t * (1 - _padding[0] - _padding[1]);
          t = Math.min(1, Math.max(0, t));
          k = Math.floor(t * 1e4);
          if (_useCache && _colorCache[k]) {
            col = _colorCache[k];
          } else {
            if (type(_colors) === "array") {
              for (i = o = 0, ref = _pos.length - 1; 0 <= ref ? o <= ref : o >= ref; i = 0 <= ref ? ++o : --o) {
                p = _pos[i];
                if (t <= p) {
                  col = _colors[i];
                  break;
                }
                if (t >= p && i === _pos.length - 1) {
                  col = _colors[i];
                  break;
                }
                if (t > p && t < _pos[i + 1]) {
                  t = (t - p) / (_pos[i + 1] - p);
                  col = chroma2.interpolate(_colors[i], _colors[i + 1], t, _mode);
                  break;
                }
              }
            } else if (type(_colors) === "function") {
              col = _colors(t);
            }
            if (_useCache) {
              _colorCache[k] = col;
            }
          }
          return col;
        };
        resetCache = function() {
          return _colorCache = {};
        };
        setColors(colors);
        f = function(v) {
          var c;
          c = chroma2(getColor(v));
          if (_out && c[_out]) {
            return c[_out]();
          } else {
            return c;
          }
        };
        f.classes = function(classes) {
          var d;
          if (classes != null) {
            if (type(classes) === "array") {
              _classes = classes;
              _domain = [classes[0], classes[classes.length - 1]];
            } else {
              d = chroma2.analyze(_domain);
              if (classes === 0) {
                _classes = [d.min, d.max];
              } else {
                _classes = chroma2.limits(d, "e", classes);
              }
            }
            return f;
          }
          return _classes;
        };
        f.domain = function(domain) {
          var c, d, k, len, o, ref, w;
          if (!arguments.length) {
            return _domain;
          }
          _min = domain[0];
          _max = domain[domain.length - 1];
          _pos = [];
          k = _colors.length;
          if (domain.length === k && _min !== _max) {
            for (o = 0, len = domain.length; o < len; o++) {
              d = domain[o];
              _pos.push((d - _min) / (_max - _min));
            }
          } else {
            for (c = w = 0, ref = k - 1; 0 <= ref ? w <= ref : w >= ref; c = 0 <= ref ? ++w : --w) {
              _pos.push(c / (k - 1));
            }
          }
          _domain = [_min, _max];
          return f;
        };
        f.mode = function(_m) {
          if (!arguments.length) {
            return _mode;
          }
          _mode = _m;
          resetCache();
          return f;
        };
        f.range = function(colors2, _pos2) {
          setColors(colors2, _pos2);
          return f;
        };
        f.out = function(_o) {
          _out = _o;
          return f;
        };
        f.spread = function(val) {
          if (!arguments.length) {
            return _spread;
          }
          _spread = val;
          return f;
        };
        f.correctLightness = function(v) {
          if (v == null) {
            v = true;
          }
          _correctLightness = v;
          resetCache();
          if (_correctLightness) {
            tmap = function(t) {
              var L0, L1, L_actual, L_diff, L_ideal, max_iter, pol, t0, t1;
              L0 = getColor(0, true).lab()[0];
              L1 = getColor(1, true).lab()[0];
              pol = L0 > L1;
              L_actual = getColor(t, true).lab()[0];
              L_ideal = L0 + (L1 - L0) * t;
              L_diff = L_actual - L_ideal;
              t0 = 0;
              t1 = 1;
              max_iter = 20;
              while (Math.abs(L_diff) > 0.01 && max_iter-- > 0) {
                (function() {
                  if (pol) {
                    L_diff *= -1;
                  }
                  if (L_diff < 0) {
                    t0 = t;
                    t += (t1 - t) * 0.5;
                  } else {
                    t1 = t;
                    t += (t0 - t) * 0.5;
                  }
                  L_actual = getColor(t, true).lab()[0];
                  return L_diff = L_actual - L_ideal;
                })();
              }
              return t;
            };
          } else {
            tmap = function(t) {
              return t;
            };
          }
          return f;
        };
        f.padding = function(p) {
          if (p != null) {
            if (type(p) === "number") {
              p = [p, p];
            }
            _padding = p;
            return f;
          } else {
            return _padding;
          }
        };
        f.colors = function(numColors, out) {
          var dd, dm, i, ref, result2, results, samples, w;
          if (arguments.length < 2) {
            out = "hex";
          }
          result2 = [];
          if (arguments.length === 0) {
            result2 = _colors.slice(0);
          } else if (numColors === 1) {
            result2 = [f(0.5)];
          } else if (numColors > 1) {
            dm = _domain[0];
            dd = _domain[1] - dm;
            result2 = (function() {
              results = [];
              for (var o = 0; 0 <= numColors ? o < numColors : o > numColors; 0 <= numColors ? o++ : o--) {
                results.push(o);
              }
              return results;
            }).apply(this).map(function(i2) {
              return f(dm + i2 / (numColors - 1) * dd);
            });
          } else {
            colors = [];
            samples = [];
            if (_classes && _classes.length > 2) {
              for (i = w = 1, ref = _classes.length; 1 <= ref ? w < ref : w > ref; i = 1 <= ref ? ++w : --w) {
                samples.push((_classes[i - 1] + _classes[i]) * 0.5);
              }
            } else {
              samples = _domain;
            }
            result2 = samples.map(function(v) {
              return f(v);
            });
          }
          if (chroma2[out]) {
            result2 = result2.map(function(c) {
              return c[out]();
            });
          }
          return result2;
        };
        f.cache = function(c) {
          if (c != null) {
            _useCache = c;
            return f;
          } else {
            return _useCache;
          }
        };
        f.gamma = function(g) {
          if (g != null) {
            _gamma = g;
            return f;
          } else {
            return _gamma;
          }
        };
        f.nodata = function(d) {
          if (d != null) {
            _nacol = chroma2(d);
            return f;
          } else {
            return _nacol;
          }
        };
        return f;
      };
      if (chroma2.scales == null) {
        chroma2.scales = {};
      }
      chroma2.scales.cool = function() {
        return chroma2.scale([chroma2.hsl(180, 1, 0.9), chroma2.hsl(250, 0.7, 0.4)]);
      };
      chroma2.scales.hot = function() {
        return chroma2.scale(["#000", "#f00", "#ff0", "#fff"], [0, 0.25, 0.75, 1]).mode("rgb");
      };
      chroma2.analyze = function(data, key, filter) {
        var add2, k, len, o, r, val, visit;
        r = {
          min: Number.MAX_VALUE,
          max: Number.MAX_VALUE * -1,
          sum: 0,
          values: [],
          count: 0
        };
        if (filter == null) {
          filter = function() {
            return true;
          };
        }
        add2 = function(val2) {
          if (val2 != null && !isNaN(val2)) {
            r.values.push(val2);
            r.sum += val2;
            if (val2 < r.min) {
              r.min = val2;
            }
            if (val2 > r.max) {
              r.max = val2;
            }
            r.count += 1;
          }
        };
        visit = function(val2, k2) {
          if (filter(val2, k2)) {
            if (key != null && type(key) === "function") {
              return add2(key(val2));
            } else if (key != null && type(key) === "string" || type(key) === "number") {
              return add2(val2[key]);
            } else {
              return add2(val2);
            }
          }
        };
        if (type(data) === "array") {
          for (o = 0, len = data.length; o < len; o++) {
            val = data[o];
            visit(val);
          }
        } else {
          for (k in data) {
            val = data[k];
            visit(val, k);
          }
        }
        r.domain = [r.min, r.max];
        r.limits = function(mode, num) {
          return chroma2.limits(r, mode, num);
        };
        return r;
      };
      chroma2.limits = function(data, mode, num) {
        var aa, ab, ac, ad, ae, af, ag, ah, ai, aj, ak, al, am, assignments, best, centroids, cluster2, clusterSizes, dist, i, j, kClusters, limits, max_log, min, min_log, mindist, n, nb_iters, newCentroids, o, p, pb, pr, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, repeat, tmpKMeansBreaks, v, value, values, w;
        if (mode == null) {
          mode = "equal";
        }
        if (num == null) {
          num = 7;
        }
        if (type(data) === "array") {
          data = chroma2.analyze(data);
        }
        min = data.min;
        max = data.max;
        data.sum;
        values = data.values.sort(function(a, b) {
          return a - b;
        });
        if (num === 1) {
          return [min, max];
        }
        limits = [];
        if (mode.substr(0, 1) === "c") {
          limits.push(min);
          limits.push(max);
        }
        if (mode.substr(0, 1) === "e") {
          limits.push(min);
          for (i = o = 1, ref = num - 1; 1 <= ref ? o <= ref : o >= ref; i = 1 <= ref ? ++o : --o) {
            limits.push(min + i / num * (max - min));
          }
          limits.push(max);
        } else if (mode.substr(0, 1) === "l") {
          if (min <= 0) {
            throw "Logarithmic scales are only possible for values > 0";
          }
          min_log = Math.LOG10E * log2(min);
          max_log = Math.LOG10E * log2(max);
          limits.push(min);
          for (i = w = 1, ref1 = num - 1; 1 <= ref1 ? w <= ref1 : w >= ref1; i = 1 <= ref1 ? ++w : --w) {
            limits.push(pow(10, min_log + i / num * (max_log - min_log)));
          }
          limits.push(max);
        } else if (mode.substr(0, 1) === "q") {
          limits.push(min);
          for (i = aa = 1, ref2 = num - 1; 1 <= ref2 ? aa <= ref2 : aa >= ref2; i = 1 <= ref2 ? ++aa : --aa) {
            p = (values.length - 1) * i / num;
            pb = floor(p);
            if (pb === p) {
              limits.push(values[pb]);
            } else {
              pr = p - pb;
              limits.push(values[pb] * (1 - pr) + values[pb + 1] * pr);
            }
          }
          limits.push(max);
        } else if (mode.substr(0, 1) === "k") {
          n = values.length;
          assignments = new Array(n);
          clusterSizes = new Array(num);
          repeat = true;
          nb_iters = 0;
          centroids = null;
          centroids = [];
          centroids.push(min);
          for (i = ab = 1, ref3 = num - 1; 1 <= ref3 ? ab <= ref3 : ab >= ref3; i = 1 <= ref3 ? ++ab : --ab) {
            centroids.push(min + i / num * (max - min));
          }
          centroids.push(max);
          while (repeat) {
            for (j = ac = 0, ref4 = num - 1; 0 <= ref4 ? ac <= ref4 : ac >= ref4; j = 0 <= ref4 ? ++ac : --ac) {
              clusterSizes[j] = 0;
            }
            for (i = ad = 0, ref5 = n - 1; 0 <= ref5 ? ad <= ref5 : ad >= ref5; i = 0 <= ref5 ? ++ad : --ad) {
              value = values[i];
              mindist = Number.MAX_VALUE;
              for (j = ae = 0, ref6 = num - 1; 0 <= ref6 ? ae <= ref6 : ae >= ref6; j = 0 <= ref6 ? ++ae : --ae) {
                dist = abs(centroids[j] - value);
                if (dist < mindist) {
                  mindist = dist;
                  best = j;
                }
              }
              clusterSizes[best]++;
              assignments[i] = best;
            }
            newCentroids = new Array(num);
            for (j = af = 0, ref7 = num - 1; 0 <= ref7 ? af <= ref7 : af >= ref7; j = 0 <= ref7 ? ++af : --af) {
              newCentroids[j] = null;
            }
            for (i = ag = 0, ref8 = n - 1; 0 <= ref8 ? ag <= ref8 : ag >= ref8; i = 0 <= ref8 ? ++ag : --ag) {
              cluster2 = assignments[i];
              if (newCentroids[cluster2] === null) {
                newCentroids[cluster2] = values[i];
              } else {
                newCentroids[cluster2] += values[i];
              }
            }
            for (j = ah = 0, ref9 = num - 1; 0 <= ref9 ? ah <= ref9 : ah >= ref9; j = 0 <= ref9 ? ++ah : --ah) {
              newCentroids[j] *= 1 / clusterSizes[j];
            }
            repeat = false;
            for (j = ai = 0, ref10 = num - 1; 0 <= ref10 ? ai <= ref10 : ai >= ref10; j = 0 <= ref10 ? ++ai : --ai) {
              if (newCentroids[j] !== centroids[i]) {
                repeat = true;
                break;
              }
            }
            centroids = newCentroids;
            nb_iters++;
            if (nb_iters > 200) {
              repeat = false;
            }
          }
          kClusters = {};
          for (j = aj = 0, ref11 = num - 1; 0 <= ref11 ? aj <= ref11 : aj >= ref11; j = 0 <= ref11 ? ++aj : --aj) {
            kClusters[j] = [];
          }
          for (i = ak = 0, ref12 = n - 1; 0 <= ref12 ? ak <= ref12 : ak >= ref12; i = 0 <= ref12 ? ++ak : --ak) {
            cluster2 = assignments[i];
            kClusters[cluster2].push(values[i]);
          }
          tmpKMeansBreaks = [];
          for (j = al = 0, ref13 = num - 1; 0 <= ref13 ? al <= ref13 : al >= ref13; j = 0 <= ref13 ? ++al : --al) {
            tmpKMeansBreaks.push(kClusters[j][0]);
            tmpKMeansBreaks.push(kClusters[j][kClusters[j].length - 1]);
          }
          tmpKMeansBreaks = tmpKMeansBreaks.sort(function(a, b) {
            return a - b;
          });
          limits.push(tmpKMeansBreaks[0]);
          for (i = am = 1, ref14 = tmpKMeansBreaks.length - 1; am <= ref14; i = am += 2) {
            v = tmpKMeansBreaks[i];
            if (!isNaN(v) && limits.indexOf(v) === -1) {
              limits.push(v);
            }
          }
        }
        return limits;
      };
      hsi2rgb = function(h, s, i) {
        var args, b, g, r;
        args = unpack(arguments);
        h = args[0], s = args[1], i = args[2];
        if (isNaN(h)) {
          h = 0;
        }
        h /= 360;
        if (h < 1 / 3) {
          b = (1 - s) / 3;
          r = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
          g = 1 - (b + r);
        } else if (h < 2 / 3) {
          h -= 1 / 3;
          r = (1 - s) / 3;
          g = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
          b = 1 - (r + g);
        } else {
          h -= 2 / 3;
          g = (1 - s) / 3;
          b = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
          r = 1 - (g + b);
        }
        r = limit(i * r * 3);
        g = limit(i * g * 3);
        b = limit(i * b * 3);
        return [r * 255, g * 255, b * 255, args.length > 3 ? args[3] : 1];
      };
      rgb2hsi = function() {
        var b, g, h, i, min, r, ref, s;
        ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
        TWOPI = Math.PI * 2;
        r /= 255;
        g /= 255;
        b /= 255;
        min = Math.min(r, g, b);
        i = (r + g + b) / 3;
        s = 1 - min / i;
        if (s === 0) {
          h = 0;
        } else {
          h = (r - g + (r - b)) / 2;
          h /= Math.sqrt((r - g) * (r - g) + (r - b) * (g - b));
          h = Math.acos(h);
          if (b > g) {
            h = TWOPI - h;
          }
          h /= TWOPI;
        }
        return [h * 360, s, i];
      };
      chroma2.hsi = function() {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor(), result2 = func.apply(child, args);
          return Object(result2) === result2 ? result2 : child;
        })(Color, slice.call(arguments).concat(["hsi"]), function() {
        });
      };
      _input.hsi = hsi2rgb;
      Color.prototype.hsi = function() {
        return rgb2hsi(this._rgb);
      };
      interpolate_hsx = function(col1, col2, f, m2) {
        var dh, hue, hue0, hue1, lbv, lbv0, lbv1, sat, sat0, sat1, xyz0, xyz1;
        if (m2 === "hsl") {
          xyz0 = col1.hsl();
          xyz1 = col2.hsl();
        } else if (m2 === "hsv") {
          xyz0 = col1.hsv();
          xyz1 = col2.hsv();
        } else if (m2 === "hcg") {
          xyz0 = col1.hcg();
          xyz1 = col2.hcg();
        } else if (m2 === "hsi") {
          xyz0 = col1.hsi();
          xyz1 = col2.hsi();
        } else if (m2 === "lch" || m2 === "hcl") {
          m2 = "hcl";
          xyz0 = col1.hcl();
          xyz1 = col2.hcl();
        }
        if (m2.substr(0, 1) === "h") {
          hue0 = xyz0[0], sat0 = xyz0[1], lbv0 = xyz0[2];
          hue1 = xyz1[0], sat1 = xyz1[1], lbv1 = xyz1[2];
        }
        if (!isNaN(hue0) && !isNaN(hue1)) {
          if (hue1 > hue0 && hue1 - hue0 > 180) {
            dh = hue1 - (hue0 + 360);
          } else if (hue1 < hue0 && hue0 - hue1 > 180) {
            dh = hue1 + 360 - hue0;
          } else {
            dh = hue1 - hue0;
          }
          hue = hue0 + f * dh;
        } else if (!isNaN(hue0)) {
          hue = hue0;
          if ((lbv1 === 1 || lbv1 === 0) && m2 !== "hsv") {
            sat = sat0;
          }
        } else if (!isNaN(hue1)) {
          hue = hue1;
          if ((lbv0 === 1 || lbv0 === 0) && m2 !== "hsv") {
            sat = sat1;
          }
        } else {
          hue = Number.NaN;
        }
        if (sat == null) {
          sat = sat0 + f * (sat1 - sat0);
        }
        lbv = lbv0 + f * (lbv1 - lbv0);
        return chroma2[m2](hue, sat, lbv);
      };
      _interpolators = _interpolators.concat((function() {
        var len, o, ref, results;
        ref = ["hsv", "hsl", "hsi", "hcl", "lch", "hcg"];
        results = [];
        for (o = 0, len = ref.length; o < len; o++) {
          m = ref[o];
          results.push([m, interpolate_hsx]);
        }
        return results;
      })());
      interpolate_num = function(col1, col2, f, m2) {
        var n1, n2;
        n1 = col1.num();
        n2 = col2.num();
        return chroma2.num(n1 + (n2 - n1) * f, "num");
      };
      _interpolators.push(["num", interpolate_num]);
      interpolate_lab = function(col1, col2, f, m2) {
        var xyz0, xyz1;
        xyz0 = col1.lab();
        xyz1 = col2.lab();
        return new Color(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), m2);
      };
      _interpolators.push(["lab", interpolate_lab]);
    }).call(chroma$1);
  })(chroma$2, chroma$2.exports);
  return chroma$2.exports;
}
var chromaExports = requireChroma();
const chroma = /* @__PURE__ */ getDefaultExportFromCjs(chromaExports);
var full = { exports: {} };
var geomask = { exports: {} };
var lite = { exports: {} };
var src = { exports: {} };
var categorizeIntersection;
var hasRequiredCategorizeIntersection;
function requireCategorizeIntersection() {
  if (hasRequiredCategorizeIntersection) return categorizeIntersection;
  hasRequiredCategorizeIntersection = 1;
  categorizeIntersection = function categorizeIntersection2(segments) {
    try {
      let through, xmin, xmax;
      const n = segments.length;
      const first = segments[0];
      if (n === 1) {
        through = true;
        xmin = first.xmin;
        xmax = first.xmax;
      } else {
        const last = segments[n - 1];
        through = first.direction === last.direction;
        xmin = Math.min(first.xmin, last.xmin);
        xmax = Math.max(first.xmax, last.xmax);
      }
      if (xmin === void 0 || xmax === void 0 || through === void 0 || isNaN(xmin) || isNaN(xmax)) {
        throw Error("categorizeIntersection failed with xmin", xmin, "and xmax", xmax);
      }
      return { xmin, xmax, through };
    } catch (error) {
      console.error("[categorizeIntersection] segments:", segments);
      console.error("[categorizeIntersection]", error);
      throw error;
    }
  };
  return categorizeIntersection;
}
var clamp;
var hasRequiredClamp;
function requireClamp() {
  if (hasRequiredClamp) return clamp;
  hasRequiredClamp = 1;
  clamp = function clamp2(n, min, max) {
    if (n < min) return min;
    else if (n > max) return max;
    return n;
  };
  return clamp;
}
var cluster;
var hasRequiredCluster;
function requireCluster() {
  if (hasRequiredCluster) return cluster;
  hasRequiredCluster = 1;
  cluster = function cluster2(items, newClusterTest) {
    try {
      const numberOfItems = items.length;
      const clusters = [];
      let cluster3 = [];
      for (let i = 0; i < numberOfItems; i++) {
        const item = items[i];
        cluster3.push(item);
        if (newClusterTest(item)) {
          clusters.push(cluster3);
          cluster3 = [];
        }
      }
      if (cluster3.length > 0) clusters.push(cluster3);
      return clusters;
    } catch (error) {
      console.error("[cluster]:", error);
    }
  };
  return cluster;
}
var clusterLineSegments;
var hasRequiredClusterLineSegments;
function requireClusterLineSegments() {
  if (hasRequiredClusterLineSegments) return clusterLineSegments;
  hasRequiredClusterLineSegments = 1;
  const cluster2 = requireCluster();
  clusterLineSegments = function clusterLineSegments2(lineSegments, numberOfEdges, debug = false) {
    try {
      const clusters = cluster2(lineSegments, (s) => s.endsOffLine);
      const numberOfClusters = clusters.length;
      if (numberOfClusters >= 2) {
        const firstCluster = clusters[0];
        const firstSegment = firstCluster[0];
        const lastCluster = clusters[clusters.length - 1];
        const lastSegment = lastCluster[lastCluster.length - 1];
        if (lastSegment.index === numberOfEdges - 1 && firstSegment.index === 0 && lastSegment.endsOnLine) {
          clusters[0] = clusters.pop().concat(firstCluster);
        }
      }
      return clusters;
    } catch (error) {
      console.error("[clusterLineSegments]", error);
    }
  };
  return clusterLineSegments;
}
var getLineFromPoints;
var hasRequiredGetLineFromPoints;
function requireGetLineFromPoints() {
  if (hasRequiredGetLineFromPoints) return getLineFromPoints;
  hasRequiredGetLineFromPoints = 1;
  getLineFromPoints = function getLineFromPoints2(startPoint, endPoint) {
    const [x1, y1] = startPoint;
    const [x2, y2] = endPoint;
    const a = y2 - y1;
    const b = x1 - x2;
    const c = a * x1 + b * y1;
    return { a, b, c };
  };
  return getLineFromPoints;
}
var couple;
var hasRequiredCouple;
function requireCouple() {
  if (hasRequiredCouple) return couple;
  hasRequiredCouple = 1;
  couple = function couple2(array) {
    const couples = [];
    const lengthOfArray = array.length;
    for (let i = 0; i < lengthOfArray; i += 2) {
      couples.push([array[i], array[i + 1]]);
    }
    return couples;
  };
  return couple;
}
var eachEdge;
var hasRequiredEachEdge;
function requireEachEdge() {
  if (hasRequiredEachEdge) return eachEdge;
  hasRequiredEachEdge = 1;
  eachEdge = function eachEdge2(polygon, callback) {
    polygon.forEach((ring) => {
      for (let i = 1; i < ring.length; i++) {
        const startPoint = ring[i - 1];
        const endPoint = ring[i];
        const edgeIndex = i - 1;
        callback([startPoint, endPoint], edgeIndex);
      }
    });
  };
  return eachEdge;
}
var getEdges;
var hasRequiredGetEdges;
function requireGetEdges() {
  if (hasRequiredGetEdges) return getEdges;
  hasRequiredGetEdges = 1;
  const eachEdge2 = requireEachEdge();
  getEdges = function getEdges2(polygon) {
    const edges = [];
    eachEdge2(polygon, (edge) => edges.push(edge));
    return edges;
  };
  return getEdges;
}
var getIntersectionOfTwoLines;
var hasRequiredGetIntersectionOfTwoLines;
function requireGetIntersectionOfTwoLines() {
  if (hasRequiredGetIntersectionOfTwoLines) return getIntersectionOfTwoLines;
  hasRequiredGetIntersectionOfTwoLines = 1;
  getIntersectionOfTwoLines = function getIntersectionOfTwoLines2(line1, line2) {
    const det = line1.a * line2.b - line2.a * line1.b;
    if (det) {
      const x = (line2.b * line1.c - line1.b * line2.c) / det;
      const y = (line1.a * line2.c - line2.a * line1.c) / det;
      return { x, y };
    }
  };
  return getIntersectionOfTwoLines;
}
var getDepth;
var hasRequiredGetDepth;
function requireGetDepth() {
  if (hasRequiredGetDepth) return getDepth;
  hasRequiredGetDepth = 1;
  getDepth = function getDepth2(arr) {
    const isArray = (arr2) => Array.isArray(arr2) || arr2 instanceof Int8Array || arr2 instanceof Uint8Array || arr2 instanceof Uint8ClampedArray || arr2 instanceof Int16Array || arr2 instanceof Uint16Array || arr2 instanceof Int32Array || arr2 instanceof Uint32Array || arr2 instanceof Float32Array || arr2 instanceof Float64Array || arr2 instanceof BigInt64Array || arr2 instanceof BigUint64Array;
    let depth = 0;
    let part = arr;
    while (isArray(part)) {
      depth++;
      part = part[0];
    }
    return depth;
  };
  return getDepth;
}
var eachPolygon;
var hasRequiredEachPolygon;
function requireEachPolygon() {
  if (hasRequiredEachPolygon) return eachPolygon;
  hasRequiredEachPolygon = 1;
  const getDepth2 = requireGetDepth();
  eachPolygon = function eachPolygon2(geojson, callback) {
    if (geojson.type === "FeatureCollection") {
      geojson.features.forEach((feature) => eachPolygon2(feature, callback));
    } else if (geojson.type === "Feature") {
      eachPolygon2(geojson.geometry, callback);
    } else if (geojson.type === "Polygon") {
      eachPolygon2(geojson.coordinates, callback);
    } else if (geojson.type === "MultiPolygon") {
      geojson.coordinates.forEach((polygon) => {
        callback(polygon);
      });
    } else if (Array.isArray(geojson)) {
      const depth = getDepth2(geojson);
      if (depth === 4) {
        geojson.forEach((polygon) => {
          callback(polygon);
        });
      } else if (depth === 3) {
        callback(geojson);
      }
    }
  };
  return eachPolygon;
}
var getPolygons;
var hasRequiredGetPolygons;
function requireGetPolygons() {
  if (hasRequiredGetPolygons) return getPolygons;
  hasRequiredGetPolygons = 1;
  const eachPolygon2 = requireEachPolygon();
  getPolygons = function getPolygons2(geojson) {
    const polygons = [];
    eachPolygon2(geojson, (polygon) => polygons.push(polygon));
    return polygons;
  };
  return getPolygons;
}
var mergeRanges;
var hasRequiredMergeRanges;
function requireMergeRanges() {
  if (hasRequiredMergeRanges) return mergeRanges;
  hasRequiredMergeRanges = 1;
  mergeRanges = function mergeRanges2(ranges) {
    const numberOfRanges = ranges.length;
    if (numberOfRanges > 0) {
      const firstRange = ranges[0];
      let previousEnd = firstRange[1];
      const result2 = [firstRange];
      for (let i = 1; i < numberOfRanges; i++) {
        const tempRange = ranges[i];
        const [start, end] = tempRange;
        if (start <= previousEnd) {
          result2[result2.length - 1][1] = end;
        } else {
          result2.push(tempRange);
        }
        previousEnd = end;
      }
      return result2;
    }
  };
  return mergeRanges;
}
var partition;
var hasRequiredPartition;
function requirePartition() {
  if (hasRequiredPartition) return partition;
  hasRequiredPartition = 1;
  partition = function partition2(array, filter) {
    const passed = [];
    const unpassed = [];
    const len = array.length;
    for (let i = 0; i < len; i++) {
      const item = array[i];
      if (filter(item)) passed.push(item);
      else unpassed.push(item);
    }
    return [passed, unpassed];
  };
  return partition;
}
var roundDown;
var hasRequiredRoundDown;
function requireRoundDown() {
  if (hasRequiredRoundDown) return roundDown;
  hasRequiredRoundDown = 1;
  roundDown = function roundDown2(n) {
    return -1 * Math.round(-1 * n);
  };
  return roundDown;
}
var prepareSnap;
var hasRequiredPrepareSnap;
function requirePrepareSnap() {
  if (hasRequiredPrepareSnap) return prepareSnap;
  hasRequiredPrepareSnap = 1;
  const roundDown2 = requireRoundDown();
  prepareSnap = function prepareSnap2(raster_xmin, pixel_width) {
    return ([xmin, xmax]) => {
      xmin = roundDown2((xmin - raster_xmin) / pixel_width);
      if (xmin === -0) xmin = 0;
      xmax = Math.round((xmax - raster_xmin) / pixel_width);
      if (xmax === -0) xmax = 0;
      return [xmin, xmax];
    };
  };
  return prepareSnap;
}
var range;
var hasRequiredRange;
function requireRange() {
  if (hasRequiredRange) return range;
  hasRequiredRange = 1;
  range = function range2(count) {
    const result2 = new Array(count);
    for (let i = 0; i < count; i++) result2[i] = i;
    return result2;
  };
  return range;
}
var calculateCore;
var hasRequiredCalculateCore;
function requireCalculateCore() {
  if (hasRequiredCalculateCore) return calculateCore;
  hasRequiredCalculateCore = 1;
  const getLineFromPoints2 = requireGetLineFromPoints();
  const categorizeIntersection2 = requireCategorizeIntersection();
  const clamp2 = requireClamp();
  const couple2 = requireCouple();
  const clusterLineSegments2 = requireClusterLineSegments();
  const getEdges2 = requireGetEdges();
  const getIntersectionOfTwoLines2 = requireGetIntersectionOfTwoLines();
  const getPolygons2 = requireGetPolygons();
  const mergeRanges2 = requireMergeRanges();
  const partition2 = requirePartition();
  const prepareSnap2 = requirePrepareSnap();
  const range2 = requireRange();
  calculateCore = function calculateCore2({
    debug_level = 0,
    raster_bbox,
    raster_height,
    // number of rows of pixels in the raster
    raster_width,
    // number of columns of pixels in the raster
    pixel_height,
    pixel_width,
    geometry,
    per_pixel,
    per_row_segment
  }) {
    const [raster_xmin, raster_ymin, raster_xmax, raster_ymax] = raster_bbox;
    const imageLines = [];
    if (raster_height === 0) return;
    for (let y = 0; y < raster_height; y++) {
      const lat = raster_ymax - pixel_height * y - pixel_height / 2;
      const point0 = [raster_xmin, lat];
      const point1 = [raster_xmin + 1, lat];
      const line = getLineFromPoints2(point0, point1);
      imageLines.push(line);
    }
    if (debug_level >= 2) console.log("[dufour-peyton-intersection] imageLines:", imageLines);
    const polygons = getPolygons2(geometry);
    const polygonEdges = polygons.map(getEdges2);
    polygonEdges.forEach((edges) => {
      const intersectionsByRow = range2(raster_height).map(() => []);
      const numberOfEdges = edges.length;
      for (let i = 0; i < numberOfEdges; i++) {
        const edge = edges[i];
        const [startPoint, endPoint] = edge;
        const [x1, y1] = startPoint;
        const [x2, y2] = endPoint;
        const direction = Math.sign(y2 - y1);
        const horizontal = y1 === y2;
        const vertical = x1 === x2;
        const edgeY = y1;
        const edgeLine = getLineFromPoints2(startPoint, endPoint);
        const edgeYMin = Math.min(y1, y2);
        const edgeYMax = Math.max(y1, y2);
        let startLng, startLat, endLat, endLng;
        if (x1 < x2) {
          [startLng, startLat] = startPoint;
          [endLng, endLat] = endPoint;
        } else {
          [startLng, startLat] = endPoint;
          [endLng, endLat] = startPoint;
        }
        if (startLng === void 0) throw Error("startLng is " + startLng);
        const imageY1 = Math.round((raster_bbox[3] - 0.5 * pixel_height - startLat) / pixel_height);
        const imageY2 = Math.round((raster_bbox[3] - 0.5 * pixel_height - endLat) / pixel_height);
        let rowStart, rowEnd;
        if (imageY1 < imageY2) {
          rowStart = imageY1;
          rowEnd = imageY2;
        } else {
          rowStart = imageY2;
          rowEnd = imageY1;
        }
        rowStart = clamp2(rowStart, 0, raster_height - 1);
        rowEnd = clamp2(rowEnd, 0, raster_height - 1);
        for (let j = rowStart; j < rowEnd + 1; j++) {
          const imageLine = imageLines[j];
          if (imageLine === void 0) {
            console.error("j:", j);
            console.error("imageLines:", imageLines);
            throw Error("imageLines");
          }
          const imageLineY = -1 * imageLine.c;
          const startsOnLine = y1 === imageLineY;
          const endsOnLine = y2 === imageLineY;
          const endsOffLine = !endsOnLine;
          let xminOnLine, xmaxOnLine;
          if (horizontal) {
            if (edgeY === imageLineY) {
              xminOnLine = startLng;
              xmaxOnLine = endLng;
            } else {
              continue;
            }
          } else if (vertical) {
            if (imageLineY >= edgeYMin && imageLineY <= edgeYMax) {
              xminOnLine = startLng;
              xmaxOnLine = endLng;
            }
          } else if (startsOnLine) {
            xminOnLine = xmaxOnLine = x1;
          } else if (endsOnLine) {
            xminOnLine = xmaxOnLine = x2;
          } else {
            try {
              xminOnLine = xmaxOnLine = getIntersectionOfTwoLines2(edgeLine, imageLine).x;
            } catch (error) {
              throw error;
            }
          }
          if (xminOnLine !== void 0 && xmaxOnLine !== void 0 && (horizontal || xminOnLine >= startLng && xmaxOnLine <= endLng && imageLineY <= edgeYMax && imageLineY >= edgeYMin)) {
            intersectionsByRow[j].push({
              direction,
              index: i,
              edge,
              endsOnLine,
              endsOffLine,
              horizontal,
              startsOnLine,
              vertical,
              xmin: xminOnLine,
              xmax: xmaxOnLine,
              imageLineY
            });
          }
        }
      }
      const half_pixel_width = pixel_width / 2;
      const snap2 = prepareSnap2(raster_xmin, pixel_width);
      intersectionsByRow.forEach((segmentsInRow, row_index) => {
        if (segmentsInRow.length > 0) {
          const clusters = clusterLineSegments2(segmentsInRow, numberOfEdges);
          const categorized = clusters.map(categorizeIntersection2);
          const [throughs, nonthroughs] = partition2(categorized, (item) => item.through);
          if (throughs.length % 2 === 1) {
            if (debug_level >= 1) console.error("throughs:", JSON.stringify(throughs));
            throw Error("throughs.length for " + row_index + " is odd with " + throughs.length);
          }
          let insides2 = nonthroughs.map((intersection) => [intersection.xmin, intersection.xmax]);
          throughs.sort((a, b) => a.xmin - b.xmin);
          const couples = couple2(throughs).map((couple3) => {
            const [left, right] = couple3;
            return [left.xmin, right.xmax];
          });
          insides2 = insides2.concat(couples);
          insides2 = mergeRanges2(insides2);
          insides2.forEach((pair) => {
            const [xmin, xmax] = pair;
            if (xmax - xmin < half_pixel_width) return;
            const [left, right] = snap2(pair);
            if (left === right) return;
            if (left > raster_width) return;
            if (right <= 0) return;
            const start_column_index = Math.max(left, 0);
            const end_column_index = Math.min(right - 1, raster_width - 1);
            if (per_row_segment) {
              per_row_segment({
                row: row_index,
                columns: [start_column_index, end_column_index]
              });
            }
            if (per_pixel) {
              for (let column_index = start_column_index; column_index <= end_column_index; column_index++) {
                per_pixel({ row: row_index, column: column_index });
              }
            }
          });
        }
      });
    });
  };
  return calculateCore;
}
var checkRows;
var hasRequiredCheckRows;
function requireCheckRows() {
  if (hasRequiredCheckRows) return checkRows;
  hasRequiredCheckRows = 1;
  checkRows = function checkRanges(rows) {
    rows.forEach((ranges, irow) => {
      for (let irange = 0; irange < ranges.length; irange++) {
        const range2 = ranges[irange];
        const [start, end] = range2;
        if (start > end) {
          console.warn("[dufour-peyton-intersection] uh oh, encountered invalid range", range2, "at row index", irow, "with ranges", ranges);
        }
        for (let iother = irange + 1; iother < ranges.length; iother++) {
          if (iother[0] <= end) {
            console.warn("[dufour-peyton-intersection] encountered range problem on row index", irow, ":", ranges);
          }
        }
      }
    });
  };
  return checkRows;
}
var mergeConsecutiveRanges;
var hasRequiredMergeConsecutiveRanges;
function requireMergeConsecutiveRanges() {
  if (hasRequiredMergeConsecutiveRanges) return mergeConsecutiveRanges;
  hasRequiredMergeConsecutiveRanges = 1;
  mergeConsecutiveRanges = function mergeConsecutiveRanges2(ranges) {
    const numberOfRanges = ranges.length;
    if (numberOfRanges > 0) {
      const firstRange = ranges[0];
      let previousEnd = firstRange[1];
      const result2 = [firstRange];
      for (let i = 1; i < numberOfRanges; i++) {
        const tempRange = ranges[i];
        const [start, end] = tempRange;
        if (start <= previousEnd + 1) {
          result2[result2.length - 1][1] = end;
        } else {
          result2.push(tempRange);
        }
        previousEnd = end;
      }
      return result2;
    }
  };
  return mergeConsecutiveRanges;
}
var calculate;
var hasRequiredCalculate;
function requireCalculate() {
  if (hasRequiredCalculate) return calculate;
  hasRequiredCalculate = 1;
  const calculateCallbacks = requireCalculateCore();
  const checkRows2 = requireCheckRows();
  const mergeConsecutiveRanges2 = requireMergeConsecutiveRanges();
  calculate = function calculate2({
    debug = false,
    raster_bbox,
    raster_height,
    raster_width,
    pixel_height,
    pixel_width,
    geometry,
    per_pixel,
    per_row_segment
  }) {
    const [xmin, ymin, xmax, ymax] = raster_bbox;
    if (pixel_height === void 0 || pixel_height === null) pixel_height = (ymax - ymin) / raster_height;
    if (pixel_width === void 0 || pixel_width === null) pixel_width = (xmax - xmin) / raster_width;
    const rows = new Array(raster_height);
    calculateCallbacks({
      raster_bbox,
      raster_height,
      raster_width,
      pixel_height,
      pixel_width,
      geometry,
      per_pixel,
      per_row_segment: ({ row, columns }) => {
        if (!rows[row]) rows[row] = [];
        rows[row].push(columns);
        if (per_row_segment) per_row_segment({ row, columns });
      }
    });
    for (let irow = 0; irow < rows.length; irow++) {
      const ranges = rows[irow];
      if (ranges) {
        ranges.sort((a, b) => a === b ? a[1] - b[1] : a[0] - b[0]);
        rows[irow] = mergeConsecutiveRanges2(ranges);
      }
    }
    if (debug) checkRows2(insides);
    return { rows };
  };
  return calculate;
}
var getBoundingBox;
var hasRequiredGetBoundingBox;
function requireGetBoundingBox() {
  if (hasRequiredGetBoundingBox) return getBoundingBox;
  hasRequiredGetBoundingBox = 1;
  const eachPolygon2 = requireEachPolygon();
  getBoundingBox = function getBoundingBox2(geometry) {
    let xmin, ymin, xmax, ymax;
    eachPolygon2(geometry, (polygon) => {
      const ring = polygon[0];
      const imax = ring.length - 1;
      let i;
      if (xmin === void 0) {
        xmin = xmax = ring[0][0];
        ymin = ymax = ring[0][1];
        i = 1;
      } else {
        i = 0;
      }
      for (; i <= imax; i++) {
        const [x, y] = ring[i];
        if (x < xmin) xmin = x;
        else if (x > xmax) xmax = x;
        if (y < ymin) ymin = y;
        else if (y > ymax) ymax = y;
      }
    });
    return [xmin, ymin, xmax, ymax];
  };
  return getBoundingBox;
}
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src.exports;
  hasRequiredSrc = 1;
  (function(module) {
    const categorizeIntersection2 = requireCategorizeIntersection();
    const clamp2 = requireClamp();
    const cluster2 = requireCluster();
    const clusterLineSegments2 = requireClusterLineSegments();
    const calculate2 = requireCalculate();
    const calculateCore2 = requireCalculateCore();
    const couple2 = requireCouple();
    const getBoundingBox2 = requireGetBoundingBox();
    const getPolygons2 = requireGetPolygons();
    const eachEdge2 = requireEachEdge();
    const getIntersectionOfTwoLines2 = requireGetIntersectionOfTwoLines();
    const getLineFromPoints2 = requireGetLineFromPoints();
    const mergeRanges2 = requireMergeRanges();
    const partition2 = requirePartition();
    const prepareSnap2 = requirePrepareSnap();
    const range2 = requireRange();
    const roundDown2 = requireRoundDown();
    const dufour_peyton_intersection = {
      calculate: calculate2,
      calculateCore: calculateCore2,
      categorizeIntersection: categorizeIntersection2,
      clamp: clamp2,
      cluster: cluster2,
      clusterLineSegments: clusterLineSegments2,
      couple: couple2,
      eachEdge: eachEdge2,
      getBoundingBox: getBoundingBox2,
      getIntersectionOfTwoLines: getIntersectionOfTwoLines2,
      getLineFromPoints: getLineFromPoints2,
      getPolygons: getPolygons2,
      mergeRanges: mergeRanges2,
      partition: partition2,
      prepareSnap: prepareSnap2,
      range: range2,
      roundDown: roundDown2
    };
    module.exports = dufour_peyton_intersection;
    if (typeof self == "object") self.dufour_peyton_intersection = dufour_peyton_intersection;
    if (typeof window == "object") window.dufour_peyton_intersection = dufour_peyton_intersection;
  })(src);
  return src.exports;
}
var expand$1;
var hasRequiredExpand$1;
function requireExpand$1() {
  if (hasRequiredExpand$1) return expand$1;
  hasRequiredExpand$1 = 1;
  expand$1 = function expand2(n) {
    if (n[0] === "+") n = n.substring(1);
    const sign = n[0] === "-" ? "-" : "";
    if (sign === "-") n = n.substring(1);
    const index_of_e = n.indexOf("e");
    if (index_of_e === -1) return sign + n;
    let index_of_dot = n.indexOf(".");
    if (index_of_dot === -1) index_of_dot = index_of_e;
    const shift = Number(n.substring(index_of_e + 1));
    const base = n.substring(0, index_of_e).replace(".", "");
    const normshift = index_of_dot + shift;
    const baselen = base.length;
    if (normshift >= baselen) {
      const zct = normshift - baselen;
      let result2 = base;
      for (let i = 0; i < zct; i++) result2 += "0";
      return sign + result2;
    } else if (normshift < 0) {
      result = "0.";
      for (let i = 0; i > normshift; i--) result += "0";
      result += base;
      return sign + result;
    } else {
      return sign + base.substring(0, normshift) + "." + base.substring(normshift);
    }
  };
  return expand$1;
}
var clean$1;
var hasRequiredClean$1;
function requireClean$1() {
  if (hasRequiredClean$1) return clean$1;
  hasRequiredClean$1 = 1;
  const expand2 = requireExpand$1();
  clean$1 = function clean2(n) {
    if (n[0] === "+") n = n.substring(1);
    n = expand2(n);
    n = n.replace(/^0+(?=\d)/, "");
    return n;
  };
  return clean$1;
}
var compare_positive$1;
var hasRequiredCompare_positive$1;
function requireCompare_positive$1() {
  if (hasRequiredCompare_positive$1) return compare_positive$1;
  hasRequiredCompare_positive$1 = 1;
  requireClean$1();
  compare_positive$1 = function compare_positive2(a, b) {
    const alen = a.length;
    const blen = b.length;
    const aidx = a.indexOf(".");
    const bidx = b.indexOf(".");
    const a_adjusted_dot_index = aidx === -1 ? alen : aidx;
    const b_adjusted_dot_index = bidx === -1 ? blen : bidx;
    const offset = a_adjusted_dot_index - b_adjusted_dot_index;
    let left = Math.max(a_adjusted_dot_index, b_adjusted_dot_index);
    let right = Math.max(alen - a_adjusted_dot_index, blen - b_adjusted_dot_index);
    let aoffset = offset < 0 ? -1 * offset : 0;
    let boffset = offset <= 0 ? 0 : offset;
    let imax = left + 1 + right - 1;
    let i = 0;
    while (i < imax) {
      const achar = a[i - aoffset] || "0";
      const bchar = b[i - boffset] || "0";
      if (achar !== bchar) {
        if (achar > bchar) return ">";
        else if (achar < bchar) return "<";
      }
      i++;
    }
    return "=";
  };
  return compare_positive$1;
}
var long_addition$1;
var hasRequiredLong_addition$1;
function requireLong_addition$1() {
  if (hasRequiredLong_addition$1) return long_addition$1;
  hasRequiredLong_addition$1 = 1;
  long_addition$1 = function long_addition2(a, b) {
    const alen = a.length;
    const blen = b.length;
    const aidx = a.indexOf(".");
    const bidx = b.indexOf(".");
    const a_adjusted_dot_index = aidx === -1 ? alen : aidx;
    const b_adjusted_dot_index = bidx === -1 ? blen : bidx;
    const offset = a_adjusted_dot_index - b_adjusted_dot_index;
    let left = Math.max(a_adjusted_dot_index, b_adjusted_dot_index);
    let right = Math.max(alen - a_adjusted_dot_index - 1, blen - b_adjusted_dot_index - 1);
    let aoffset = offset < 0 ? -1 * offset : 0;
    let boffset = offset <= 0 ? 0 : offset;
    let imax = left + 1 + right - 1;
    let result2 = "";
    let carried = 0;
    let i = imax;
    if (right > 0) {
      while (i > imax - right) {
        const achar = a[i - aoffset] || "0";
        const bchar = b[i - boffset] || "0";
        let n = Number(achar) + Number(bchar) + carried;
        if (n >= 10) {
          n -= 10;
          carried = 1;
        } else {
          carried = 0;
        }
        if (result2 !== "" || n !== 0) {
          result2 = n + result2;
        }
        i--;
      }
      if (result2) result2 = "." + result2;
      i--;
    }
    if (left > 0) {
      while (i >= 0) {
        const achar = a[i - aoffset] || "0";
        const bchar = b[i - boffset] || "0";
        let n = Number(achar) + Number(bchar) + carried;
        if (n >= 10) {
          n -= 10;
          carried = 1;
        } else {
          carried = 0;
        }
        result2 = n + result2;
        i--;
      }
    }
    if (carried === 1) {
      result2 = carried + result2;
    }
    return result2;
  };
  return long_addition$1;
}
var long_subtraction$1;
var hasRequiredLong_subtraction$1;
function requireLong_subtraction$1() {
  if (hasRequiredLong_subtraction$1) return long_subtraction$1;
  hasRequiredLong_subtraction$1 = 1;
  long_subtraction$1 = function long_subtraction2(a, b) {
    const alen = a.length;
    const blen = b.length;
    const aidx = a.indexOf(".");
    const bidx = b.indexOf(".");
    const a_adjusted_dot_index = aidx === -1 ? alen : aidx;
    const b_adjusted_dot_index = bidx === -1 ? blen : bidx;
    const offset = a_adjusted_dot_index - b_adjusted_dot_index;
    let left = Math.max(a_adjusted_dot_index, b_adjusted_dot_index);
    let right = Math.max(alen - a_adjusted_dot_index - 1, blen - b_adjusted_dot_index - 1);
    let aoffset = offset < 0 ? -1 * offset : 0;
    let boffset = offset <= 0 ? 0 : offset;
    let imax = left + 1 + right - 1;
    let result2 = "";
    let borrowed = 0;
    let i = imax;
    if (right > 0) {
      while (i > imax - right) {
        let top = a[i - aoffset] || "0";
        let bottom = b[i - boffset] || "0";
        top -= borrowed;
        borrowed = 0;
        let n = top - bottom;
        if (n < 0) {
          while (n < 0) {
            borrowed++;
            n += 10;
          }
        } else if (borrowed) {
          borrowed--;
        }
        if (result2 !== "" || n !== 0) {
          result2 = n + result2;
        }
        i--;
      }
      if (result2 !== "") {
        result2 = "." + result2;
      }
      i--;
    }
    if (left > 0) {
      while (i > 0) {
        let top = a[i - aoffset] || "0";
        let bottom = b[i - boffset] || "0";
        top -= borrowed;
        borrowed = 0;
        let n2 = top - bottom;
        if (n2 < 0) {
          while (n2 < 0) {
            borrowed++;
            n2 += 10;
          }
        } else if (borrowed) {
          borrowed--;
        }
        result2 = n2 + result2;
        i--;
      }
      const achar = a[0 - aoffset] || "0";
      const bchar = b[0 - boffset] || "0";
      let n = Number(achar) - (borrowed > 0 ? 1 : 0) - Number(bchar);
      if (n !== 0) {
        result2 = n + result2;
      }
      result2 = result2.replace(/^0+/, "");
    }
    if (result2[0] === ".") result2 = "0" + result2;
    return result2;
  };
  return long_subtraction$1;
}
var subtract$2;
var hasRequiredSubtract$1;
function requireSubtract$1() {
  if (hasRequiredSubtract$1) return subtract$2;
  hasRequiredSubtract$1 = 1;
  const clean2 = requireClean$1();
  const compare_positive2 = requireCompare_positive$1();
  const long_addition2 = requireLong_addition$1();
  const long_subtraction2 = requireLong_subtraction$1();
  subtract$2 = function subtract2(a, b) {
    a = clean2(a);
    b = clean2(b);
    const a_is_positive = a[0] !== "-";
    const b_is_positive = b[0] !== "-";
    if (a_is_positive) {
      if (b_is_positive) {
        const comparison = compare_positive2(a, b);
        if (comparison === ">") {
          return long_subtraction2(a, b);
        } else if (comparison === "<") {
          return "-" + long_subtraction2(b, a);
        } else {
          return "0";
        }
      } else {
        return long_addition2(a, b.substring(1));
      }
    } else if (b_is_positive) {
      return "-" + long_addition2(a.substring(1), b);
    } else {
      a = a.substring(1);
      b = b.substring(1);
      const comparison = compare_positive2(a, b);
      if (comparison === ">") {
        return "-" + long_subtraction2(a, b);
      } else if (comparison === "<") {
        return long_subtraction2(b, a);
      } else {
        return "0";
      }
    }
  };
  return subtract$2;
}
var absolute$1;
var hasRequiredAbsolute$1;
function requireAbsolute$1() {
  if (hasRequiredAbsolute$1) return absolute$1;
  hasRequiredAbsolute$1 = 1;
  const clean2 = requireClean$1();
  absolute$1 = function absolute2(n) {
    n = clean2(n);
    if (n[0] === "-") return n.substring(1);
    else return n;
  };
  return absolute$1;
}
var add$2;
var hasRequiredAdd$1;
function requireAdd$1() {
  if (hasRequiredAdd$1) return add$2;
  hasRequiredAdd$1 = 1;
  const compare_positive2 = requireCompare_positive$1();
  const clean2 = requireClean$1();
  const long_addition2 = requireLong_addition$1();
  const long_subtraction2 = requireLong_subtraction$1();
  add$2 = function add2(a, b) {
    a = clean2(a);
    b = clean2(b);
    const apos = a[0] !== "-";
    const bpos = b[0] !== "-";
    if (apos && bpos) {
      return long_addition2(a, b);
    } else if (!apos && !bpos) {
      return "-" + long_addition2(a.substring(1), b.substring(1));
    } else if (!apos && bpos) {
      a = a.substring(1);
      switch (compare_positive2(a, b)) {
        case "=":
          return "0";
        case "<":
          return long_subtraction2(b, a);
        case ">":
          return "-" + long_subtraction2(a, b);
      }
    } else if (apos && !bpos) {
      b = b.substring(1);
      switch (compare_positive2(a, b)) {
        case "=":
          return "0";
        case "<":
          return "-" + long_subtraction2(b, a);
        case ">":
          return long_subtraction2(a, b);
      }
    }
  };
  return add$2;
}
var long_multiplication$1;
var hasRequiredLong_multiplication$1;
function requireLong_multiplication$1() {
  if (hasRequiredLong_multiplication$1) return long_multiplication$1;
  hasRequiredLong_multiplication$1 = 1;
  const CHUNK_SIZE = 15;
  long_multiplication$1 = function long_multiplication2(a, b) {
    if (a === "0" || b === "0") return "0";
    const top_index_of_dot = a.indexOf(".");
    const bottom_index_of_dot = b.indexOf(".");
    const a_num_decimal_places = top_index_of_dot === -1 ? 0 : a.length - 1 - top_index_of_dot;
    const b_num_decimal_places = bottom_index_of_dot === -1 ? 0 : b.length - 1 - bottom_index_of_dot;
    const out_num_decimal_places = a_num_decimal_places + b_num_decimal_places;
    a = a.replace(".", "");
    b = b.replace(".", "");
    const alen = a.length;
    const blen = b.length;
    const chunks = [];
    let i = alen;
    while (i >= 0) {
      const end = i;
      const start = i -= CHUNK_SIZE;
      const str = a.substring(start, end);
      chunks.push([Number(str), str.length]);
    }
    const partial_products = [];
    const partials = [];
    for (let i2 = 0, ireverse = blen - 1; ireverse >= 0; ireverse--, i2++) {
      const bstr = b[ireverse];
      const bnum = Number(bstr);
      let carried2 = 0;
      let partial = "";
      const ichunklast = chunks.length - 1;
      chunks.forEach(([chunk, chunklen], c) => {
        const subpartial = carried2 + bnum * chunk;
        let subpartstr = subpartial.toString();
        const subpartcharlen = subpartstr.length;
        if (subpartcharlen > chunklen && c !== ichunklast) {
          const islice = -1 * chunklen;
          partial = subpartstr.slice(islice) + partial;
          carried2 = Number(subpartstr.slice(0, islice));
        } else {
          const imax = chunklen - subpartcharlen;
          for (let i3 = 0; i3 < imax; i3++) {
            subpartstr = "0" + subpartstr;
          }
          carried2 = 0;
          partial = subpartstr + partial;
        }
      });
      partial += "0".repeat(i2);
      partial_products.push(partial);
      partials.push([Array.from(partial).map((char) => Number(char)), partial.length]);
    }
    const num_partials = partial_products.length;
    const number_of_columns = partials[partials.length - 1][1] + num_partials;
    let result2 = "";
    let carried = 0;
    for (let icol = 0; icol < number_of_columns; icol++) {
      let sum = carried;
      const pmax = Math.min(icol, num_partials - 1);
      for (let p = 0; p <= pmax; p++) {
        const [pnums, plen] = partials[p];
        const i2 = plen - 1 - icol;
        if (i2 >= 0) {
          sum += pnums[i2];
        }
      }
      if (sum >= 10) {
        sum = sum.toString();
        result2 = sum[sum.length - 1] + result2;
        carried = Number(sum.slice(0, -1));
      } else {
        result2 = sum + result2;
        carried = 0;
      }
    }
    if (out_num_decimal_places === 0) {
      result2 = result2.replace(/^0+/, "");
    } else {
      const idot = result2.length - out_num_decimal_places;
      result2 = result2.substring(0, idot) + "." + result2.substring(idot);
      result2 = result2.replace(/^0+/, "");
      result2 = result2.replace(/\.?0+$/, "");
      if (result2[0] === ".") result2 = "0" + result2;
    }
    return result2;
  };
  return long_multiplication$1;
}
var multiply$2;
var hasRequiredMultiply$1;
function requireMultiply$1() {
  if (hasRequiredMultiply$1) return multiply$2;
  hasRequiredMultiply$1 = 1;
  const absolute2 = requireAbsolute$1();
  const clean2 = requireClean$1();
  const compare_positive2 = requireCompare_positive$1();
  const long_multiplication2 = requireLong_multiplication$1();
  multiply$2 = function multiply2(a, b) {
    a = clean2(a);
    b = clean2(b);
    const apos = a[0] !== "-";
    const bpos = b[0] !== "-";
    const out_sign = apos !== bpos ? "-" : "";
    a = absolute2(a);
    b = absolute2(b);
    const comparison = compare_positive2(a, b);
    if (comparison === "<") {
      const aold = a;
      const bold = b;
      a = bold;
      b = aold;
    }
    return out_sign + long_multiplication2(a, b);
  };
  return multiply$2;
}
var round_last_decimal$1;
var hasRequiredRound_last_decimal$1;
function requireRound_last_decimal$1() {
  if (hasRequiredRound_last_decimal$1) return round_last_decimal$1;
  hasRequiredRound_last_decimal$1 = 1;
  const up = ["5", "6", "7", "8", "9"];
  round_last_decimal$1 = function round_last_decimal2(n) {
    if (n[0] === "+") n = n.substring(1);
    const len = n.length;
    let result2 = "";
    const last_char = n[n.length - 1];
    if (up.includes(last_char)) {
      let i;
      for (i = len - 2; i >= 0; i--) {
        const char = n[i];
        if (char === "." || char === "-") continue;
        const nchar = Number(char) + 1;
        if (nchar === 10) {
          result2 = "0" + result2;
        } else {
          result2 = nchar + result2;
          break;
        }
      }
      if (i > 0) result2 = n.substring(0, i) + result2;
    } else {
      result2 = n.substring(0, len - 1);
    }
    if (result2[result2.length - 1] === ".") result2 = result2.substring(0, result2.length - 1);
    if (result2.indexOf(".") > -1) result2 = result2.replace(/0+$/, "");
    return result2;
  };
  return round_last_decimal$1;
}
var long_division$1;
var hasRequiredLong_division$1;
function requireLong_division$1() {
  if (hasRequiredLong_division$1) return long_division$1;
  hasRequiredLong_division$1 = 1;
  const compare_positive2 = requireCompare_positive$1();
  const add2 = requireAdd$1();
  requireMultiply$1();
  const subtract2 = requireSubtract$1();
  const round_last_decimal2 = requireRound_last_decimal$1();
  long_division$1 = function long_division2(dividend, divisor, { max_decimal_digits = 100, ellipsis = false } = {}) {
    if (dividend[0] === "0") dividend = dividend.substring(1);
    if (divisor[0] === "0") divisor = divisor.substring(1);
    const dividend_index_of_dot = dividend.indexOf(".");
    const divisor_index_of_dot = divisor.indexOf(".");
    const adjusted_dividend_index_of_dot = dividend_index_of_dot === -1 ? dividend.length : dividend_index_of_dot;
    const divisor_num_decimal_places = divisor_index_of_dot === -1 ? 0 : divisor.length - 1 - divisor_index_of_dot;
    let repeating = false;
    dividend = dividend.replace(/\./, "");
    divisor = divisor.replace(/\./, "");
    const dividend_length = dividend.length;
    let current = "";
    let quotient = "";
    let comparison;
    let offset = -1 * divisor_num_decimal_places;
    let skip = 0;
    for (let i = 0; i < dividend_length; i++) {
      const char = dividend[i];
      current += char;
      comparison = compare_positive2(current, divisor);
      if (comparison === ">") {
        let times = 1;
        let product = add2(divisor, divisor);
        let passed_product = divisor;
        while (compare_positive2(product, current) !== ">") {
          times++;
          passed_product = product;
          product = add2(product, divisor);
        }
        times = times.toString();
        if (quotient !== "") {
          for (let i2 = times.length; i2 <= skip; i2++) quotient += "0";
        }
        quotient += times;
        current = subtract2(current, passed_product);
        skip = 0;
      } else if (comparison === "<") {
        if (quotient === "") {
          offset++;
        }
        skip++;
        continue;
      } else if (comparison === "=") {
        if (quotient !== "") {
          for (let i2 = 0; i2 < skip; i2++) quotient += "0";
        }
        quotient += "1";
        current = "0";
        skip = 0;
      }
    }
    if (current.match(/^0+$/g)) {
      if (comparison === "<") {
        quotient += current.substring(0, current.length - 1);
      }
    } else {
      const previous = {};
      const idot2 = adjusted_dividend_index_of_dot - offset;
      const qlen2 = quotient.length;
      const imax = idot2 - qlen2 + max_decimal_digits + 1;
      if (quotient === "") {
        skip = 0;
      }
      for (let i = 0; i < imax; i++) {
        current += "0";
        if (ellipsis) {
          if (current in previous) {
            previous[current]++;
            if (previous[current] > 3) {
              quotient += "...";
              repeating = true;
              break;
            }
          } else {
            previous[current] = 1;
          }
        }
        const comparison2 = compare_positive2(current, divisor);
        if (comparison2 === ">") {
          let times = 1;
          let product = add2(divisor, divisor);
          let passed_product = divisor;
          while (compare_positive2(product, current) !== ">") {
            times++;
            passed_product = product;
            product = add2(product, divisor);
          }
          times = times.toString();
          for (let i2 = times.length; i2 <= skip; i2++) quotient += "0";
          quotient += times;
          current = subtract2(current, passed_product);
          if (current === "0") {
            break;
          }
          skip = 0;
        } else if (comparison2 === "<") {
          skip++;
          continue;
        } else if (comparison2 === "=") {
          for (let i2 = 0; i2 < skip; i2++) quotient += "0";
          quotient += "1";
          skip = 0;
          break;
        }
      }
    }
    const idot = adjusted_dividend_index_of_dot - offset;
    const qlen = quotient.length;
    let num_decimals;
    if (idot === qlen) {
      num_decimals = 0;
    } else if (idot < 0) {
      quotient = "0." + "0".repeat(Math.abs(idot)) + quotient;
      num_decimals = qlen - idot;
    } else if (idot > qlen) {
      for (let i = qlen; i < idot; i++) quotient += "0";
      num_decimals = 0;
    } else if (idot < qlen) {
      quotient = quotient.substring(0, idot) + "." + quotient.substring(idot);
      num_decimals = qlen - idot;
    } else if (idot === 0) {
      quotient = "0." + quotient;
      num_decimals = qlen;
    }
    quotient = quotient.replace(/^0+/, "");
    quotient = quotient.replace(/\.\d+0+$/, "");
    if (!repeating) {
      const extra_decimals = num_decimals - max_decimal_digits;
      if (extra_decimals > 0) {
        quotient = round_last_decimal2(quotient.substring(0, quotient.length - extra_decimals + 1));
      }
    }
    if (quotient[0] === ".") quotient = "0" + quotient;
    return quotient;
  };
  return long_division$1;
}
var divide$2;
var hasRequiredDivide$1;
function requireDivide$1() {
  if (hasRequiredDivide$1) return divide$2;
  hasRequiredDivide$1 = 1;
  const absolute2 = requireAbsolute$1();
  const clean2 = requireClean$1();
  const long_division2 = requireLong_division$1();
  divide$2 = function(dividend, divisor, options) {
    dividend = clean2(dividend);
    divisor = clean2(divisor);
    const dividend_is_positive = dividend[0] !== "-";
    const divisor_is_positive = divisor[0] !== "-";
    const out_sign = dividend_is_positive !== divisor_is_positive ? "-" : "";
    if (!dividend_is_positive) dividend = absolute2(dividend);
    if (!divisor_is_positive) divisor = absolute2(divisor);
    return out_sign + long_division2(dividend, divisor, options);
  };
  return divide$2;
}
var pluggable$1 = { exports: {} };
var hasRequiredPluggable$1;
function requirePluggable$1() {
  if (hasRequiredPluggable$1) return pluggable$1.exports;
  hasRequiredPluggable$1 = 1;
  (function(module) {
    const clone = (data) => JSON.parse(JSON.stringify(data));
    function reprojectGeoJSONPluggable(data, { in_place = false, reproject }) {
      if (typeof reproject !== "function") {
        throw new Error(`[reproject-geojson] you must specify a reproject function`);
      }
      if (in_place !== true) data = clone(data);
      if (data.type === "FeatureCollection") {
        data.features = data.features.map((feature) => reprojectGeoJSONPluggable(feature, { in_place, reproject }));
      } else if (data.type === "Feature") {
        data.geometry = reprojectGeoJSONPluggable(data.geometry, { in_place, reproject });
      } else if (data.type === "LineString") {
        data.coordinates = data.coordinates.map((coord) => reproject(coord));
      } else if (data.type === "MultiLineString") {
        data.coordinates = data.coordinates.map((line) => line.map((coord) => reproject(coord)));
      } else if (data.type === "MultiPoint") {
        data.coordinates = data.coordinates.map((point2) => reproject(point2));
      } else if (data.type === "MultiPolygon") {
        data.coordinates = data.coordinates.map((polygon) => {
          return polygon.map((ring) => ring.map((coord) => reproject(coord)));
        });
      } else if (data.type === "Point") {
        data.coordinates = reproject(data.coordinates);
      } else if (data.type === "Polygon") {
        data.coordinates = data.coordinates.map((ring) => ring.map((coord) => reproject(coord)));
      }
      return data;
    }
    module.exports = reprojectGeoJSONPluggable;
    if (typeof window === "object") window.reprojectGeoJSONPluggable = reprojectGeoJSONPluggable;
    if (typeof self === "object") self.reprojectGeoJSONPluggable = reprojectGeoJSONPluggable;
  })(pluggable$1);
  return pluggable$1.exports;
}
var segflip = { exports: {} };
var hasRequiredSegflip;
function requireSegflip() {
  if (hasRequiredSegflip) return segflip.exports;
  hasRequiredSegflip = 1;
  (function(module) {
    function segflip2({ segments: segs, min = -Infinity, max = Infinity, debug = false }) {
      if (debug) console.log("[segflip] segs:", segs);
      if (segs === void 0 || segs === null || Array.isArray(segs) && segs.length === 0) {
        if (debug) console.log("[segflip] segments are empty so return the whole row flipped");
        return [[min, max]];
      }
      const nums = segs.map(([start, end]) => [start - 1, end + 1]).flat();
      nums.unshift(min);
      nums.push(max);
      if (debug) console.log("flattened nums:", nums);
      const results = [];
      for (let i = 1; i < nums.length; i += 2) {
        const start = nums[i - 1];
        const end = nums[i];
        if (start > end) continue;
        results.push([start, end]);
      }
      return results;
    }
    module.exports = segflip2;
    if (typeof window === "object") window.segflip = segflip2;
    if (typeof self === "object") self.segflip = segflip2;
  })(segflip);
  return segflip.exports;
}
var hasRequiredLite;
function requireLite() {
  if (hasRequiredLite) return lite.exports;
  hasRequiredLite = 1;
  (function(module) {
    const dufour_peyton_intersection = requireSrc();
    const subtract2 = requireSubtract$1();
    const divide2 = requireDivide$1();
    const reprojectGeoJSON = requirePluggable$1();
    const segflip2 = requireSegflip();
    function checkRows2({ rows }) {
      rows.forEach((segs, irow) => {
        if (segs) {
          segs.forEach(([start, end], iseg) => {
            if (start > end) {
              throw Error(`uh oh: invalid segment at row ${irow}, segment ${iseg}`);
            }
          });
        }
      });
    }
    function inside({
      debug = false,
      raster_bbox,
      raster_height,
      raster_width,
      pixel_height,
      pixel_width,
      mask,
      reproject
    }) {
      if (typeof reproject === "function") {
        mask = reprojectGeoJSON(mask, { in_place: false, reproject });
      }
      if (pixel_height === void 0)
        pixel_height = Number(
          divide2(subtract2(raster_bbox[3].toString(), raster_bbox[1].toString()), raster_height.toString())
        );
      if (pixel_width === void 0)
        pixel_width = Number(
          divide2(subtract2(raster_bbox[2].toString(), raster_bbox[0].toString()), raster_width.toString())
        );
      const { rows } = dufour_peyton_intersection.calculate({
        raster_bbox,
        raster_height,
        raster_width,
        pixel_height,
        pixel_width,
        geometry: mask
      });
      if (debug) checkRows2({ rows });
      return { rows };
    }
    function outside({
      debug = false,
      raster_bbox,
      raster_height,
      raster_width,
      pixel_height,
      pixel_width,
      mask,
      reproject
    }) {
      if (typeof reproject === "function") {
        mask = reprojectGeoJSON(mask, { in_place: false, reproject });
      }
      if (pixel_height === void 0)
        pixel_height = Number(
          divide2(subtract2(raster_bbox[3].toString(), raster_bbox[1].toString()), raster_height.toString())
        );
      if (pixel_width === void 0)
        pixel_width = Number(
          divide2(subtract2(raster_bbox[2].toString(), raster_bbox[0].toString()), raster_width.toString())
        );
      const { rows: insides2 } = inside({
        debug,
        raster_bbox,
        raster_height,
        raster_width,
        pixel_height,
        pixel_width,
        mask
      });
      if (debug) checkRows2({ rows: insides2 });
      const last_column_index = raster_width - 1;
      const outsides = [];
      for (let i = 0; i < insides2.length; i++) {
        const segs = insides2[i];
        if (!Array.isArray(segs) || segs.length === 0) {
          outsides.push([[0, last_column_index]]);
        } else {
          outsides.push(
            segflip2({
              segments: segs,
              min: 0,
              max: last_column_index,
              debug: false
            })
          );
        }
      }
      if (debug) checkRows2({ rows: outsides });
      return { rows: outsides };
    }
    const geomask2 = { inside, outside };
    module.exports = geomask2;
  })(lite);
  return lite.exports;
}
var reprojectGeojson = { exports: {} };
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(lib);
var proj4jsDefinitions;
var hasRequiredProj4jsDefinitions;
function requireProj4jsDefinitions() {
  if (hasRequiredProj4jsDefinitions) return proj4jsDefinitions;
  hasRequiredProj4jsDefinitions = 1;
  const A = " +no_defs", B = " +towgs84=0,0,0,0,0,0,0", C = " +ellps=GRS80", D = "+proj=tmerc", E = " +units=m", F = " +towgs84=23.92,-141.27,-80.9,-0,0.35,0.82,-0.12", G = " +towgs84=24.47,-130.89,-81.56,-0,-0,0.13,-0.22", H = "+proj=lcc", I = "+proj=utm", J = " +units=us-ft", K = "+proj=longlat", L2 = " +lat_0=0", M = " +ellps=krass", N = " +y_0=0", O = " +x_0=500000", P = " +towgs84=0,0,4.5,0,0,0.554,0.2263", Q = " +towgs84=0,0,1.9,0,0,0.814,-0.38", R = " +ellps=intl", S = " +datum=WGS84", T = " +ellps=WGS72", U = " +towgs84=15.8,-154.4,-82.3,0,0,0,0", V = " +k=0.9999", W = " +towgs84=59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993", X = " +datum=NAD27", Y = " +ellps=bessel", Z = " +x_0=609601.2192024384", a = " +x_0=600000", b = " +towgs84=33.4,-146.6,-76.3,-0.359,-0.053,0.844,-0.84", c = " +ellps=clrk80", d = " +b=6356755.288157528", e = " +x_0=152400.3048006096", f = " +lat_0=36.66666666666666", g = " +towgs84=-146.414,507.337,680.507,0,0,0,0", h = " +x_0=200000", i = " +ellps=clrk66", j = " +ellps=WGS84", k = " +x_0=500000.001016002", l = " +x_0=240000", m = " +lat_0=-90", n = " +towgs84=-87,-98,-121,0,0,0,0", o = " +south", p = " +lat_0=41.66666666666666", q = " +y_0=36000", r = " +towgs84=-117.808,-51.536,137.784,0.303,0.446,0.234,-0.29", s = " +x_0=0", t = " +units=ft", u = " +x_0=400000", v = " +towgs84=-115.854,-99.0583,-152.462,0,0,0,0", w = " +towgs84=-208.406,-109.878,-2.5764,0,0,0,0", x = " +ellps=aust_SA", y = " +lat_0=39.33333333333334", z = " +towgs84=577.326,90.129,463.919,5.137,1.474,5.297,2.4232", AA = " +lat_0=37.66666666666666", AB = " +lat_0=36.33333333333334", AC = " +towgs84=598.1,73.7,418.2,0.202,0.045,-2.455,6.7", AD = " +y_0=500000.0001016001", AE = " +x_0=200000.0001016002", AF = " +x_0=500000.0001016001", AG = " +x_0=500000.00001016", AH = " +y_0=1000000", AI = " +x_0=300000", AJ = " +lon_0=-120.5", AK = " +lat_0=43.66666666666666", AL = " +lat_0=43.83333333333334", AM = " +lat_1=-68.66666666666667", AN = " +lat_2=-71.33333333333333", AO = " +k=0.999966667", AP = " +k=0.9996", AQ = " +lat_0=38.33333333333334", AR = " +lat_1=73.66666666666667", AS = " +lat_2=70.33333333333333", AT = " +lat_0=72.02500919444445", AU = " +a=6378249.2", AV = " +x_0=1500000", AW = " +lat_ts=-80.23861111111111", AX = " +towgs84=-288,175,-376,0,0,0,0", AY = " +lat_1=41.78333333333333", AZ = " +lat_2=-75.33333333333333", Aa = " +towgs84=278.3,93,474.5,7.889,0.05,-6.61,6.21", Ab = " +x_0=304800", Ac = " +x_0=2000000.0001016", Ad = " +k=0.9999375", Ae = " +y_0=500000", Af = " +towgs84=-209.362,-87.8162,404.62,0.0046,3.4784,0.5805,-1.4547", Ag = " +lon_0=-100.3333333333333", Ah = " +lat_1=-72.66666666666667", Ai = " +lat_1=-76.66666666666667", Aj = " +lat_2=-79.33333333333333", Ak = " +y_0=10000000", Al = " +towgs84=-57,1,-41,0,0,0,0", Am = " +k=0.999941177", An = " +x_0=800000.0000101599", Ao = " +y_0=99999.99998983997", Ap = " +lat_1=38.43333333333333", Aq = " +lat_0=24.33333333333333", Ar = " +towgs84=26,-121,-78,0,0,0,0", As = " +a=6378140", At = " +towgs84=-96.062,-82.428,-121.753,4.801,0.345,-1.376,1.496", Au = " +x_0=399999.99998984", Av = " +towgs84=-24,-15,5,0,0,0,0", Aw = " +towgs84=682,-203,480,0,0,0,0", Ax = " +towgs84=-136,-108,-292,0,0,0,0", Ay = " +b=6356075.41314024", Az = " +lat_1=37.96666666666667", BA = " +lat_0=38.83333333333334", BB = " +lat_0=40.16666666666666", BC = " +lat_0=34.33333333333334", BD = " +lat_0=42.83333333333334", BE = " +lon_0=-84.36666666666666", BF = " +x_0=300000.0000000001", BG = " +k=0.999933333", BH = " +lat_1=48.73333333333333", BI = " +lon_0=-111.5", BJ = " +k=0.9999473679999999", BK = " +towgs84=-67.35,3.88,-38.22,0,0,0,0", BL = " +lat_2=73.66666666666667", BM = " +lat_0=75.36440330555556", BN = " +b=6356515", BO = " +towgs84=25,-141,-78.5,-0,0.35,0.736,0", BP = "+proj=stere", BQ = " +lat_1=-64.66666666666667", BR = " +lat_2=-67.33333333333333", BS = " +b=6356514.966398753", BT = " +towgs84=295,736,257,0,0,0,0", BU = " +x_0=100000", BV = " +towgs84=-11,851,5,0,0,0,0", BW = " +towgs84=414.1,41.3,603.1,-0.855,2.141,-7.023,0", BX = " +towgs84=-127.62,-67.24,-47.04,-3.068,4.903,1.578,-1.06", BY = " +lat_0=39.66666666666666", BZ = " +x_0=1000000", Ba = " +lon_0=-105.5", Bb = " +towgs84=482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15", Bc = " +a=6378249.145", Bd = " +x_0=2000000", Be = " +lat_0=45.66666666666666", Bf = " +lat_1=80.33333333333333", Bg = " +lat_0=78.70733752777778", Bh = " +b=6356774.50408554", Bi = " +lon_0=-91.33333333333333", Bj = " +lon_0=-123.3333333333333", Bk = " +towgs84=-168,-60,320,0,0,0,0", Bl = " +lat_0=31", Bm = " +towgs84=0.072,-0.507,-0.245,-0.0183,0.0003,-0.007,-0.0093", Bn = " +x_0=150000", Bo = " +x_0=3500000", Bp = " +towgs84=213.11,9.37,-74.95,0,0,0,0", Bq = " +lat_1=43.66666666666666", Br = " +lat_0=40.33333333333334", Bs = " +towgs84=-148,136,90,0,0,0,0", Bt = " +towgs84=616,97,-251,0,0,0,0", Bu = " +lon_0=-90", Bv = " +x_0=250000", Bw = " +x_0=914401.8288036576", Bx = " +lon_0=-90.33333333333333", By = " +a=6377276.345", Bz = " +b=6356103.038993155", CA = " +lat_0=40.5", CB = " +towgs84=-134,-48,149,0,0,0,0", CC = " +towgs84=25,-141,-78.5,0,0.35,0.736,0", CD = " +lat_1=27.83333333333333", CE = " +lat_2=26.16666666666667", CF = " +lat_2=40.71666666666667", CG = " +lat_2=39.01666666666667", CH = " +lat_2=37.21666666666667", CI = " +lat_1=70.33333333333333", CJ = " +lat_0=68.68747555555557", CK = " +towgs84=-104.1,-49.1,-9.9,0.971,-2.917,0.714,-11.68", CL = " +y_0=304800.6096012192", CM = " +x_0=699999.9998983998", CN = " +y_0=999999.9998983998", CO = " +y_0=800000", CP = " +k=0.99995", CQ = " +lat_0=34.75", CR = " +lon_0=-81", CS = " +lon_0=-100", CT = " +b=6356098.145120132", CU = "+proj=omerc", CV = " +lon_0=-98.5", CW = " +towgs84=-103.746,-9.614,-255.95,0,0,0,0", CX = " +x_0=800000", CY = " +lat_0=37.83333333333334", CZ = " +lat_2=44.33333333333334", Ca = " +lat_2=42.33333333333334", Cb = " +lat_0=29.66666666666667", Cc = " +lat_0=25.66666666666667", Cd = " +lat_0=35.83333333333334", Ce = " +lat_1=83.66666666666667", Cf = " +lat_2=80.33333333333333", Cg = " +lat_0=82.05842488888888", Ch = " +lat_0=38", Ci = " +x_0=2500000", Cj = " +towgs84=-377,681,-50,0,0,0,0", Ck = "+proj=cass", Cl = " +y_0=2000000", Cm = " +towgs84=-143,-236,7,0,0,0,0", Cn = " +lon_0=-110.1666666666667", Co = " +lon_0=-111.9166666666667", Cp = " +lon_0=-75.41666666666667", Cq = " +lon_0=-82.16666666666667", Cr = " +lon_0=-84.16666666666667", Cs = " +lon_0=-112.1666666666667", Ct = " +lon_0=-88.83333333333333", Cu = " +lon_0=-104.3333333333333", Cv = " +lon_0=-107.8333333333333", Cw = " +lon_0=-76.58333333333333", Cx = " +lon_0=-78.58333333333333", Cy = " +lon_0=-120.8333333333333", Cz = " +lon_0=-88.33333333333333", DA = " +lon_0=-90.16666666666667", DB = " +lon_0=-85.66666666666667", DC = " +lon_0=-87.08333333333333", DD = " +lon_0=-70.16666666666667", DE = " +lon_0=-93.09999999999999", DF = " +lon_0=-115.5833333333333", DG = " +lon_0=-116.6666666666667", DH = " +lon_0=-118.5833333333333", DI = " +lon_0=-71.66666666666667", DJ = " +lon_0=-105.1666666666667", DK = " +lon_0=-107.3333333333333", DL = " +lon_0=-110.0833333333333", DM = " +lat_0=37.5", DN = " +y_0=700000", DO = " +towgs84=-242.2,-144.9,370.3,0,0,0,0", DP = " +x_0=4500000", DQ = " +y_0=1500000", DR = " +x_0=599999.9999976", DS = " +towgs84=-275.722,94.7824,340.894,-8.001,-4.42,-11.821,1", DT = "+proj=aea", DU = " +y_0=-2500000", DV = " +lat_2=38.96666666666667", DW = " +lat_1=41.66666666666666", DX = " +lat_1=39.83333333333334", DY = " +lat_2=38.33333333333334", DZ = " +lat_2=37.06666666666667", Da = " +lat_0=35.33333333333334", Db = " +lat_1=35.46666666666667", Dc = " +lat_2=34.03333333333333", Dd = " +lat_1=33.88333333333333", De = " +lat_2=32.78333333333333", Df = " +lat_0=32.16666666666666", Dg = " +lat_2=37.23333333333333", Dh = " +lat_1=41.86666666666667", Di = " +lat_0=40.83333333333334", Dj = " +lat_2=29.58333333333333", Dk = " +lat_2=41.71666666666667", Dl = " +lat_1=41.03333333333333", Dm = " +lat_2=40.66666666666666", Dn = " +lat_1=36.76666666666667", Do = " +lat_0=33.33333333333334", Dp = " +lat_1=40.96666666666667", Dq = " +lat_2=39.93333333333333", Dr = " +lat_0=31.83333333333333", Ds = " +lat_0=31.66666666666667", Dt = " +lat_0=27.83333333333333", Du = " +lat_2=36.76666666666667", Dv = " +lat_0=45.33333333333334", Dw = " +lat_0=45.16666666666666", Dx = " +lat_1=36.23333333333333", Dy = " +lat_2=34.93333333333333", Dz = " +lat_1=34.76666666666667", EA = " +lat_0=32.66666666666666", EB = " +lat_1=43.26666666666667", EC = " +lat_2=42.06666666666667", ED = " +lat_2=40.61666666666667", EE = " +lat_1=39.78333333333333", EF = " +lat_2=38.71666666666667", EG = " +lat_1=38.56666666666667", EH = " +lat_2=37.26666666666667", EI = " +lat_0=41.08333333333334", EJ = " +lat_0=42.33333333333334", EK = " +y_0=100000", EL = " +b=6356173.508712696", EM = " +y_0=5500000", EN = " +lon_0=105", EO = " +y_0=-5000000", EP = " +k=0.9995000000000001", EQ = " +k=0.9999749999999999", ER = " +towgs84=-160,-6,-302,0,0,0,0", ES = " +towgs84=307,304,-318,0,0,0,0", ET = " +lon_0=-82.5", EU = " +towgs84=70.995,-335.916,262.898,0,0,0,0", EV = " +towgs84=-304.046,-60.576,103.64,0,0,0,0", EW = " +x_0=700000", EX = " +x_0=213360", EY = " +lon_0=-85.75", EZ = " +lon_0=-100.5", Ea = " +lon_0=-77.75", Eb = " +x_0=999999.9999898402", Ec = " +towgs84=-151.99,287.04,-147.45,0,0,0,0", Ed = " +lon_0=129", Ee = " +a=6378293.645208759", Ef = " +b=6356617.987679838", Eg = " +x_0=5500000", Eh = " +lat_1=40.78333333333333", Ei = " +lat_2=39.71666666666667", Ej = " +lat_1=37.93333333333333", Ek = " +lat_2=36.73333333333333", El = " +lat_1=42.68333333333333", Em = " +lat_1=41.48333333333333", En = " +lat_2=41.28333333333333", Eo = " +lat_1=47.08333333333334", Ep = " +lat_2=45.48333333333333", Eq = " +lat_0=44.78333333333333", Er = " +lat_2=44.18333333333333", Es = " +lat_0=43.31666666666667", Et = " +lat_1=36.16666666666666", Eu = " +lat_2=34.33333333333334", Ev = " +lat_2=47.43333333333333", Ew = " +lat_1=47.48333333333333", Ex = " +lat_2=46.18333333333333", Ey = " +lat_2=35.56666666666667", Ez = " +lat_1=35.23333333333333", FA = " +lat_2=33.93333333333333", FB = " +lat_2=40.88333333333333", FC = " +lat_1=34.83333333333334", FD = " +lat_1=36.41666666666666", FE = " +lat_1=36.18333333333333", FF = " +lat_1=33.96666666666667", FG = " +lat_2=32.13333333333333", FH = " +lat_1=31.88333333333333", FI = " +lat_2=30.11666666666667", FJ = " +lat_1=30.28333333333333", FK = " +lat_2=28.38333333333333", FL = " +lat_2=38.03333333333333", FM = " +lat_1=47.33333333333334", FN = " +lat_2=45.83333333333334", FO = " +lat_1=46.76666666666667", FP = " +lat_2=45.56666666666667", FQ = " +lat_1=44.06666666666667", FR = " +lat_2=42.73333333333333", FS = " +lat_1=32.66666666666666", FT = " +lat_2=31.16666666666667", FU = " +lat_1=48.63333333333333", FV = " +lat_2=47.03333333333333", FW = " +lat_2=45.61666666666667", FX = " +lat_1=45.21666666666667", FY = " +lat_2=43.78333333333333", FZ = " +lat_0=39.83333333333334", Fa = " +lat_2=40.43333333333333", Fb = " +lat_1=40.03333333333333", Fc = " +lat_2=38.73333333333333", Fd = " +lat_1=45.68333333333333", Fe = " +lat_2=44.41666666666666", Ff = " +lat_2=42.83333333333334", Fg = " +lat_1=38.88333333333333", Fh = " +lat_2=37.48333333333333", Fi = " +lat_1=37.08333333333334", Fj = " +lat_2=38.66666666666666", Fk = " +lat_0=58", Fl = " +lon_0=-98", Fm = " +lon_0=117", Fn = " +lon_0=135", Fo = " +lat_0=41.5", Fp = " +lat_0=42.5", Fq = " +y_0=3000000", Fr = " +lon_0=123", Fs = " +lat_0=40", Ft = " +lat_0=54", Fu = " +towgs84=-192.873,-39.382,-111.202,-0.00205,-0.0005,0.00335,0.0188", Fv = " +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725", Fw = " +x_0=914401.8289", Fx = " +y_0=304800.6096", Fy = " +lon_0=111", Fz = " +k_0=0.99878641", GA = " +lon_0=-66.43333333333334", GB = " +towgs84=61,-285,-181,0,0,0,0", GC = " +towgs84=-133,-77,-51,0,0,0,0", GD = " +towgs84=-679,669,-48,0,0,0,0", GE = " +lon_0=-71.5", GF = " +lon_0=-78.5", GG = " +lon_0=-93.5", GH = " +lat_0=41.75", GI = " +y_0=249999.9998983998", GJ = " +y_0=999999.9999898402", GK = " +to_meter=1.0000135965", GL = " +a=6377304.063", GM = " +lat_0=36", GN = " +towgs84=-79.9,-158,-168.9,0,0,0,0", GO = " +towgs84=-50.9,-347.6,-231,0,0,0,0", GP = " +towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747", GQ = " +towgs84=283,682,231,0,0,0,0", GR = " +towgs84=-206,172,-6,0,0,0,0", GS = " +towgs84=-92,-93,122,0,0,0,0", GT = " +to_meter=0.9143985307444408", GU = "+proj=sterea", GV = " +lat_0=21.16666666666667", GW = " +lat_1=18.43333333333333", GX = " +lat_2=18.03333333333333", GY = " +lat_0=17.83333333333333", GZ = " +gamma=323.1301023611111", Ga = " +lon_0=-79.5", Gb = " +y_0=4500000", Gc = " +x_0=31500000", Gd = " +x_0=500000.0001504", Ge = " +b=6356514.96582849", Gf = " +towgs84=674.4,15.1,405.3,0,0,0,0", Gg = " +towgs84=-180.624,-225.516,173.919,-0.81,-1.898,8.336,16.7101", Gh = " +towgs84=589,76,480,0,0,0,0", Gi = " +towgs84=-263,6,431,0,0,0,0", Gj = " +lon_0=15", Gk = " +axis=wsu", Gl = " +lon_0=21", Gm = " +lat_0=30", Gn = " +ellps=helmert", Go = " +a=6377299.151", Gp = " +lon_0=-74.5", Gq = " +b=6356750.304921594", Gr = " +y_0=2000000.0001016", Gs = " +x_0=3500000.0001016", Gt = " +y_0=399999.99998984", Gu = " +x_0=200000.00001016", Gv = " +b=6356098.359005156", Gw = " +x_0=14500000", Gx = " +x_0=29500000", Gy = " +towgs84=-117,-132,-164,0,0,0,0", Gz = " +zone=20", HA = " +lon_0=-122", HB = " +ellps=bess_nam", HC = " +lon_0=-86.15000000000001", HD = " +towgs84=-189,-242,-91,0,0,0,0", HE = " +towgs84=-265,120,-358,0,0,0,0", HF = " +towgs84=-73.472,-51.66,-112.482,0.953,4.6,-2.368,0.586", HG = " +towgs84=-17.51,-108.32,-62.39,0,0,0,0", HH = " +towgs84=-10.18,-350.43,291.37,0,0,0,0", HI = " +towgs84=-190.421,8.532,238.69,0,0,0,0", HJ = " +lon_0=-68.5", HK = " +a=6377299.36559538", HL = " +x_0=79999.99999968", HM = " +x_0=50000.00001504", HN = " +lon_0=0", HO = " +lon_0=27", HP = " +lon_0=75", HQ = " +lon_0=81", HR = " +lon_0=93", HS = " +lon_0=99", HT = " +x_0=900000", HU = " +x_0=13500000", HV = " +x_0=20500000", HW = " +x_0=22500000", HX = " +towgs84=-166,-15,204,0,0,0,0", HY = " +towgs84=-130,110,-13,0,0,0,0", HZ = " +towgs84=-587.8,519.75,145.76,0,0,0,0", Ha = " +lat_2=83.66666666666667", Hb = " +lat_0=85.43711833333333", Hc = " +towgs84=-273.5,110.6,-357.9,0,0,0,0", Hd = " +lon_0=87", He = "+proj=laea", Hf = " +towgs84=-403,684,41,0,0,0,0", Hg = " +lon_0=-92.5", Hh = " +y_0=6000000", Hi = " +zone=19", Hj = " +lat_0=29.5", Hk = " +y_0=300000", Hl = " +lat_2=45.5", Hm = " +k=0.999909091", Hn = " +a=6377492.018", Ho = " +b=6356751.689189189", Hp = " +b=6356100.230165384", Hq = " +lon_0=90", Hr = " +lat_0=90", Hs = " +x_0=18500000", Ht = " +x_0=19500000", Hu = " +x_0=15500000", Hv = " +x_0=16500000", Hw = " +x_0=21500000", Hx = " +x_0=23500000", Hy = " +x_0=25500000", Hz = " +x_0=26500000", IA = " +x_0=27500000", IB = " +x_0=28500000", IC = " +zone=18", ID = " +zone=21", IE = " +towgs84=-124.76,53,466.79,0,0,0,0", IF = " +lon_0=-92", IG = " +lon_0=33", IH = " +lon_0=12", II = " +lon_0=24", IJ = " +lat_2=77", IK = " +y_0=200000", IL = " +lon_0=-70.5", IM = " +x_0=7500000", IN = " +y_0=3500000", IO = " +towgs84=31,146,47,0,0,0,0", IP = " +lat_0=45", IQ = " +lat_0=26", IR = " +a=6378160", IS = " +lon_0=-109.5", IT = " +x_0=30500000", IU = " +x_0=32500000", IV = " +lon_0=-85.83333333333333", IW = " +lon_0=-118.3333333333333", IX = " +y_0=0.003048006096012192", IY = " +lat_0=30.5", IZ = " +lat_0=44", Ia = " +lon_0=30", Ib = " +lat_0=47", Ic = " +lat_1=77", Id = " +lat_0=36.16666666666666", Ie = " +lat_0=4.596200416666666", If = " +gamma=53.13010236111111", Ig = " +lon_0=13.33333333333333", Ih = " +lat_0=81.31722600000001", Ii = " +lat_0=73.15574086111111", Ij = " +lat_0=65.10127088888888", Ik = " +zone=17", Il = " +lon_0=132", Im = " +lon_0=114", In = " +towgs84=-143,-90,-294,0,0,0,0", Io = " +zone=22", Ip = " +lat_0=41", Iq = " +lat_0=46.5", Ir = " +lon_0=-118", Is = " +y_0=400000", It = " +x_0=17500000", Iu = " +x_0=33500000", Iv = " +lon_0=-113.75", Iw = " +lon_0=-116.25", Ix = " +lon_0=-115.75", Iy = " +lon_0=-106.25", Iz = " +k=0.999916667", JA = " +k=0.999964286", JB = " +lon_0=-108.75", JC = " +towgs84=-73,-247,227,0,0,0,0", JD = " +towgs84=265.025,384.929,-194.046,0,0,0,0", JE = " +k=0.99998", JF = " +lat_1=40.65", JG = " +lat_1=38.35", JH = " +y_0=2500000", JI = " +y_0=6500000", JJ = " +x_0=39999.99999984", JK = " +towgs84=-61.702,284.488,472.052,0,0,0,0", JL = " +towgs84=-223.237,110.193,36.649,0,0,0,0", JM = " +zone=39", JN = " +zone=32", JO = " +towgs84=-125,53,467,0,0,0,0", JP = " +towgs84=198,881,317,0,0,0,0", JQ = " +towgs84=214,804,268,0,0,0,0", JR = " +towgs84=217,823,299,0,0,0,0", JS = " +lon_0=45", JT = " +lat_1=43", JU = "+proj=merc", JV = " +x_0=99999.99998983997", JW = " +x_0=99999.99999960001", JX = " +x_0=2743195.592233322", JY = " +y_0=914398.5307444407", JZ = " +zone=38", Ja = " +zone=28", Jb = " +lon_0=-114", Jc = " +lat_1=45.5", Jd = " +towgs84=-73,46,-86,0,0,0,0", Je = " +towgs84=11,72,-101,0,0,0,0", Jf = " +towgs84=287.58,177.78,-135.41,0,0,0,0", Jg = " +towgs84=-162.619,-276.959,-161.764,0.067753,-2.24365,-1.15883,-1.09425", Jh = " +lon_0=-87", Ji = " +lon_0=-99", Jj = " +lon_0=102", Jk = " +lon_0=126", Jl = " +k=0.99999", Jm = " +x_0=50000", Jn = " +lat_2=40", Jo = " +lon_0=-84.25", Jp = " +x_0=11500000", Jq = " +lon_0=-72.75", Jr = " +lon_0=-101.5", Js = " +lon_0=-94.25", Jt = " +x_0=6500000", Ju = " +y_0=5000000", Jv = " +x_0=1700000", Jw = " +towgs84=31.95,300.99,419.19,0,0,0,0", Jx = " +towgs84=-189.681,18.3463,-42.7695,-0.33746,-3.09264,2.53861,0.4598", Jy = " +towgs84=-119.425,-303.659,-11.0006,1.1643,0.174458,1.09626,3.65706", Jz = " +towgs84=982.609,552.753,-540.873,6.68163,-31.6115,-19.8482,16.805", KA = " +zone=29", KB = " +lon_0=9", KC = " +zone=33", KD = " +zone=37", KE = " +no_uoff", KF = " +lon_0=120", KG = " +lon_0=177", KH = " +lon_0=-177", KI = " +lon_0=-158", KJ = " +y_0=250000", KK = " +lon_0=-111", KL = " +x_0=2500000.0001424", KM = " +x_0=1500000.0001464", KN = " +lon_0=-71.60561777777777", KO = " +lon_0=-156.6666666666667", KP = " +lon_0=-160.1666666666667", KQ = " +lat_0=0.1166666666666667", KR = " +towgs84=0,0,0,-0,-0,-0,0", KS = " +lon_0=-117.8333333333333", KT = " +lon_0=-123.1666666666667", KU = " +lon_0=-122.3333333333333", KV = " +lon_0=-119.1666666666667", KW = " +lon_0=-123.0833333333333", KX = " +lon_0=-85.84999999999999", KY = " +lon_0=-87.09999999999999", KZ = " +lon_0=-86.90000000000001", Ka = " +lon_0=-89.24166666666667", Kb = " +lon_0=-92.63333333333334", Kc = " +towgs84=347.103,1078.12,2623.92,-33.8875,70.6773,-9.3943,186.074", Kd = " +towgs84=8.846,-4.394,-1.122,-0.00237,-0.146528,0.130428,0.783926", Ke = " +towgs84=-480.26,-438.32,-643.429,16.3119,20.1721,-4.0349,-111.7", Kf = " +towgs84=-0.293,766.95,87.713,0.195704,1.69507,3.47302,-0.039338", Kg = " +towgs84=221.525,152.948,176.768,-2.3847,-1.3896,-0.877,11.4741", Kh = " +towgs84=215.525,149.593,176.229,-3.2624,-1.692,-1.1571,10.4773", Ki = " +zone=35", Kj = " +lat_0=46.95240555555556", Kk = " +alpha=30.28813972222222", Kl = " +lat_1=10.16666666666667", Km = " +lat_0=10.16666666666667", Kn = " +lat_0=18.83333333333333", Ko = " +lat_0=20.33333333333333", Kp = " +lat_0=21.83333333333333", Kq = " +lat_0=21.66666666666667", Kr = " +lat_0=45.30916666666666", Ks = " +lat_1=49.83333333333334", Kt = " +lat_2=51.16666666666666", Ku = " +lonc=-133.6666666666667", Kv = " +alpha=323.1301023611111", Kw = " +lat_1=53.83333333333334", Kx = " +lat_2=51.83333333333334", Ky = " +lat_1=44.66666666666666", Kz = " +lat_0=44.66666666666666", LA = " +lat_1=45.66666666666666", LB = " +lat_0=45.91666666666666", LC = " +lat_0=45.08333333333334", LD = " +lat_0=44.33333333333334", LE = " +lat_0=44.08333333333334", LF = " +lat_1=48.33333333333334", LG = " +lat_0=48.33333333333334", LH = " +lat_0=31.73409694444445", LI = " +lon_0=35.21208055555556", LJ = " +lat_0=44.03611111111111", LK = " +lat_0=4.599047222222222", LL = " +lat_0=40.66666666666666", LM = " +lat_1=49", LN = " +lon_0=39", LO = " +lat_1=37.25", LP = " +lat_1=39.75", LQ = " +lat_2=38.45", LR = " +lat_1=30.75", LS = " +lon_0=-84.5", LT = " +lat_0=33.75", LU = " +x_0=4000000", LV = " +y_0=4000000", LW = " +lon_0=-72.5", LX = " +x_0=5000000", LY = " +x_0=10500000", LZ = " +x_0=12500000", La = " +x_0=24500000", Lb = " +k=0.99999375", Lc = " +x_0=399999.9999984", Ld = " +lon_0=-77", Le = " +lon_0=108", Lf = " +lon_0=171", Lg = " +towgs84=-179.483,-69.379,-27.584,-7.862,8.163,6.042,-13.925", Lh = " +lon_0=-171", Li = " +lat_0=32.5", Lj = " +lon_0=-117", Lk = " +k=1.000015", Ll = " +k=1.000034", Lm = " +k=1.000031", Ln = " +k=1.000026", Lo = " +ellps=evrstSS", Lp = " +a=6377301.243", Lq = " +towgs84=410.721,55.049,80.746,2.5779,2.3514,0.6664,17.3311", Lr = " +towgs84=72.438,345.918,79.486,1.6045,0.8823,0.5565,1.3746", Ls = " +pm=ferro", Lt = " +lon_0=78", Lu = " +lon_0=10", Lv = " +pm=paris", Lw = " +towgs84=0.055,-0.541,-0.185,0.0183,-0.0003,-0.007,-0.014", Lx = " +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489", Ly = " +towgs84=8.853,-52.644,180.304,-0.393,-2.323,2.96,-24.081", Lz = " +towgs84=572.213,85.334,461.94,4.9732,1.529,5.2484,3.5378", MA = " +zone=58", MB = " +zone=23", MC = " +x_0=304800.6096012192", MD = " +y_0=152400.3048006096", ME = " +x_0=800000.0001016001", MF = " +x_0=399999.9998983998", MG = " +x_0=7999999.999968001", MH = " +x_0=5999999.999976001", MI = " +x_0=830000.0001016001", MJ = " +x_0=249999.9998983998", MK = " +x_0=350000.0001016001", ML = " +to_meter=0.3047972654", MM = " +x_0=99999.99989839978", MN = " +y_0=8000000.000010163", MO = " +x_0=699999.9999898402", MP = " +lon_0=-69", MQ = " +lon_0=-86", MR = " +towgs84=-3.2,-5.7,2.8,0,0,0,0", MS = " +x_0=8500000", MT = " +x_0=9500000", MU = " +lat_1=39.45", MV = " +lat_0=44.25", MW = " +lat_1=41.95", MX = " +lat_2=35.25", MY = " +lat_2=34.65", MZ = " +lat_2=44.25", Ma = " +lat_1=47.05", Mb = " +lat_1=40.25", Mc = " +k_0=1.00012", Md = " +lat_0=40.25", Me = " +zone=40", Mf = " +zone=36", Mg = " +zone=51", Mh = " +zone=48", Mi = " +zone=49", Mj = " +lon_0=96", Mk = " +y_0=750000", Ml = " +lat_0=36.5", Mm = " +lon_0=-119", Mn = " +lat_0=33.5", Mo = " +lat_2=41.2", Mp = " +k=0.999995", Mq = " +lat_2=33.3", Mr = " +lat_0=38.5", Ms = " +lon_0=-154", Mt = " +lon_0=-120", Mu = " +x_0=34500000", Mv = " +x_0=35500000", Mw = " +x_0=36500000", Mx = " +x_0=37500000", My = " +x_0=38500000", Mz = " +x_0=39500000", NA = " +x_0=40500000", NB = " +x_0=41500000", NC = " +x_0=43500000", ND = " +x_0=45500000", NE = " +y_0=3999999.99998984", NF = " +y_0=2000000.00001016", NG = " +towgs84=164,138,-189,0,0,0,0", NH = " +towgs84=-186,230,110,0,0,0,0", NI = " +towgs84=-199,32,322,0,0,0,0", NJ = " +to_meter=0.3047997101815088", NK = " +towgs84=-76,-138,67,0,0,0,0", NL = " +towgs84=-43,-163,45,0,0,0,0", NM = " +towgs84=-346,-1,224,0,0,0,0", NN = " +towgs84=210,814,289,0,0,0,0", NO = " +towgs84=-74,-130,42,0,0,0,0", NP = " +zone=15", NQ = " +zone=16", NR = " +zone=34", NS = " +zone=50", NT = " +zone=52", NU = " +lon_0=-62", NV = " +lon_0=-84", NW = " +lon_0=-79", NX = " +lon_0=131", NY = " +lon_0=153", NZ = " +lon_0=165", Na = " +lon_0=-94", Nb = " +lon_0=-54", Nc = " +a=6378300.789", Nd = " +b=6356566.435", Ne = " +y_0=3999999.9998984", Nf = " +y_0=5000000.0001016", Ng = " +x_0=150000.00001464", Nh = " +lat_2=46", Ni = " +lon_0=84", Nj = " +lat_0=43", Nk = " +k_0=0.999625769", Nl = " +towgs84=51,391,-36,0,0,0,0", Nm = " +towgs84=-83,37,124,0,0,0,0", Nn = " +towgs84=-355,21,72,0,0,0,0", No = " +towgs84=-23,259,-9,0,0,0,0", Np = " +towgs84=174.05,-25.49,112.57,-0,-0,0.554,0.2263", Nq = " +zone=59", Nr = " +zone=25", Ns = " +zone=11", Nt = " +zone=12", Nu = " +zone=13", Nv = " +zone=54", Nw = " +zone=14", Nx = " +zone=24", Ny = " +zone=47", Nz = " +lat_2=38.3", OA = " +lat_1=45.7", OB = " +lat_2=42.1", OC = " +x_0=165000", OD = " +lat_2=32.5", OE = " +x_0=609600", OF = " +lat_1=39.2", OG = " +lat_2=47.5", OH = " +lat_1=30.7", OI = " +lat_2=29.3", OJ = " +lat_0=28.5", OK = " +lat_1=41.7", OL = " +lat_1=44.4", OM = " +lat_1=27.5", ON = " +lon_0=-150", OO = " +lat_0=44.5", OP = " +k=1.000027", OQ = " +k=1.000038", OR = " +k=1.000036", OS = " +lon_0=-87.5", OT = " +x_0=3999999.999984", OU = " +x_0=199999.9999992", OV = " +towgs84=16,196,93,0,0,0,0", OW = " +towgs84=-88,4,101,0,0,0,0", OX = " +lat_0=18", OY = " +lat_2=67", OZ = " +lon_0=-96", Oa = " +x_0=80000", Ob = " +lon_0=-82", Oc = " +lon_0=-74", Od = " +lon_0=147", Oe = " +lon_0=150", Of = " +x_0=40000", Og = " +k=1.00002", Oh = " +x_0=42500000", Oi = " +x_0=44500000", Oj = " +lon_0=-85.05", Ok = " +ellps=mod_airy", Ol = " +lat_0=0.1333333333333333", Om = " +lat_1=-60.66666666666666", On = " +lat_2=-63.33333333333334", Oo = " +lon_0=-91.91666666666667", Op = " +y_0=0.003352806705613411", Oq = " +zone=30", Or = " +lon_0=3", Os = " +zone=26", Ot = " +zone=53", Ou = " +lat_0=31.73439361111111", Ov = " +lon_0=35.20451694444445", Ow = " +lon_0=7.439583333333333", Ox = " +lon_0=132.1666666666667", Oy = " +lon_0=134.3333333333333", Oz = " +lon_0=137.1666666666667", PA = " +lon_0=139.8333333333333", PB = " +lon_0=140.8333333333333", PC = " +lon_0=3.192280555555556", PD = " +lat_1=49.50000000000001", PE = " +lat_0=49.50000000000001", PF = " +alpha=53.31582047222222", PG = " +lon_0=10.33333333333333", PH = " +lon_0=16.33333333333333", PI = " +towgs84=-502.862,-247.438,312.724,0,0,0,0", PJ = " +towgs84=-381.788,-57.501,-256.673,0,0,0,0", PK = " +towgs84=-43.685,-179.785,-267.721,0,0,0,0", PL = " +zone=60", PM = " +zone=55", PN = " +lon_0=36", PO = " +lon_0=42", PP = " +lat_1=46", PQ = " +lat_1=44", PR = " +lat_0=42", PS = " +lon_0=51", PT = " +lat_0=33", PU = " +lat_0=52", PV = " +ellps=airy", PW = " +pm=jakarta", PX = " +x_0=2743195.5", PY = " +y_0=-4354009.816", PZ = " +k_0=0.9987864078000001", Pa = " +towgs84=-106.226,166.366,-37.893,0,0,0,0", Pb = " +towgs84=508.088,-191.042,565.223,0,0,0,0", Pc = " +k=0.99996", Pd = " +a=6378135", Pe = " +lon_0=-66", Pf = " +lon_0=141", Pg = " +lon_0=159", Ph = " +k=0.99984", Pi = " +lat_0=-22", Pj = " +lon_0=127.5", Pk = " +x_0=6000000", Pl = " +x_0=3900000", Pm = " +y_0=1300000", Pn = " +lat_0=44.75", Po = " +lat_0=37.75", Pp = " +lat_0=40.55", Pq = " +lon_0=-87.3", Pr = " +lon_0=-86.5", Ps = " +towgs84=195.671,332.517,274.607,0,0,0,0", Pt = " +towgs84=-204.619,140.176,55.226,0,0,0,0", Pu = "+proj=somerc", Pv = " +y_0=30480.06096012192", Pw = " +y_0=999999.9999960001", Px = " +x_0=182880.3657607315", Py = " +towgs84=674.374,15.056,405.346,0,0,0,0", Pz = " +towgs84=-133.63,-157.5,-158.62,0,0,0,0", QA = " +towgs84=-0.465,372.095,171.736,0,0,0,0", QB = " +towgs84=-56.263,16.136,-22.856,0,0,0,0", QC = " +towgs84=-241.54,-163.64,396.06,0,0,0,0", QD = " +zone=31", QE = " +zone=10", QF = " +zone=46", QG = " +x_0=304800.6096", QH = " +y_0=152400.3048", QI = " +alpha=337.25556", QJ = " +x_0=2546731.496", QK = " +gamma=337.25556", QL = " +k_0=0.999625544", QM = " +towgs84=335.47,222.58,-230.94,0,0,0,0", QN = " +towgs84=217.037,86.959,23.956,0,0,0,0", QO = " +towgs84=-128.16,-282.42,21.93,0,0,0,0", QP = " +towgs84=103.25,-100.4,-307.19,0,0,0,0", QQ = " +lon_0=31", QR = " +lon_0=18", QS = " +lat_2=36", QT = " +lat_0=29", QU = " +lat_0=35", QV = " +lat_0=34", QW = " +lon_0=63", QX = " +lat_0=37", QY = " +lat_2=65", QZ = " +y_0=-4000000", Qa = " +y_0=914398.5", Qb = " +towgs84=-199.87,74.79,246.62,0,0,0,0", Qc = " +towgs84=-11.64,-348.6,291.98,0,0,0,0", Qd = " +towgs84=-254.1,-5.36,-100.29,0,0,0,0", Qe = " +towgs84=-206.1,-174.7,-87.7,0,0,0,0", Qf = " +towgs84=-770.1,158.4,-498.2,0,0,0,0", Qg = " +towgs84=-146.21,112.63,4.05,0,0,0,0", Qh = " +towgs84=-294.7,-200.1,525.5,0,0,0,0", Qi = " +lat_0=4", Qj = " +a=6378300", Qk = " +lon_0=-63", Ql = " +lon_0=162", Qm = " +lat_ts=90", Qn = " +y_0=600000", Qo = " +x_0=350000", Qp = " +y_0=900000", Qq = " +lat_1=32.5", Qr = " +lon_0=-147", Qs = " +k=1.000043", Qt = " +lat_0=48.5", Qu = " +lat_0=40.9", Qv = " +k=1.000028", Qw = " +k=1.000025", Qx = " +x_0=170251.555", Qy = " +b=6356657.142669561", Qz = " +b=6356094.667915204", RA = " +b=6355862.933255573", RB = " +a=6378249.144808011", RC = " +b=6356514.966204134", RD = " +towgs84=-70.9,-151.8,-41.4,0,0,0,0", RE = " +towgs84=52.17,-71.82,-14.9,0,0,0,0", RF = " +towgs84=283.7,735.9,261.1,0,0,0,0", RG = " +zone=5", RH = " +zone=7", RI = " +lon_0=19", RJ = " +lon_0=25", RK = " +lat_2=45", RL = " +lon_0=57", RM = " +lon_0=69", RN = " +lat_2=39", RO = " +lat_2=35", RP = " +lon_0=28", RQ = " +lon_0=-61.5", RR = " +lon_0=-64.5", RS = " +lon_0=-90.5", RT = " +lon_0=-94.5", RU = " +y_0=2800000", RV = " +x_0=4321000", RW = " +y_0=3210000", RX = " +y_0=14743.5", RY = " +y_0=1999999.999992", RZ = " +y_0=2999999.999988", Ra = " +y_0=50000.00001504", Rb = " +zone=41", Rc = " +zone=42", Rd = " +k=0.994", Re = " +zone=56", Rf = " +lon_0=-67.875", Rg = " +lon_0=-70.375", Rh = " +x_0=609601.22", Ri = " +b=6356889.449", Rj = " +lon_0=-69.125", Rk = " +lon_0=-121.75", Rl = " +lon_0=-121.25", Rm = " +lon_0=-119.75", Rn = " +lon_0=-122.75", Ro = " +zone=6", Rp = "+proj=krovak", Rq = " +towgs84=-637,-549,-203,0,0,0,0", Rr = " +towgs84=-20.8,11.3,2.4,0,0,0,0", Rs = " +lon_0=-93", Rt = " +lon_0=127", Ru = " +lon_0=125", Rv = " +k=0.99975", Rw = " +lon_0=136", Rx = " +lon_0=138", Ry = " +lon_0=180", Rz = " +y_0=50000", SA = " +lon_0=-85", SB = " +k=1.00016", SC = " +lon_0=2.7", SD = " +towgs84=27.5,14,186.4,0,0,0,0", SE = " +towgs84=-499,-249,314,0,0,0,0", SF = " +towgs84=-467,-16,-300,0,0,0,0", SG = " +towgs84=-382,-59,-262,0,0,0,0", SH = " +towgs84=253,-132,-127,0,0,0,0", SI = " +towgs84=-963,510,-359,0,0,0,0", SJ = " +towgs84=94,-948,-1262,0,0,0,0", SK = " +zone=1", SL = " +zone=27", SM = " +zone=57", SN = " +pm=oslo", SO = " +zone=43", SP = " +lon_0=23", SQ = " +lon_0=48", SR = " +lon_0=54", SS = " +lat_0=49.5", ST = " +k=0.999912", SU = " +lon_0=-174", SV = " +lon_0=-168", SW = " +lon_0=-170", SX = " +lon_0=-165", SY = " +lat_2=40.5", SZ = " +lon_0=-115", Sa = " +lat_1=29.5", Sb = " +k=1.000045", Sc = " +lat_1=39.5", Sd = " +lat_1=33.3", Se = " +lat_0=33.3", Sf = " +lon_0=-155.5", Sg = " +lon_0=-159.5", Sh = " +y_0=-4480000", Si = " +lon_0=-176.5", Sj = " +lon_0=-89.75", Sk = " +k_0=1.000008", Sl = " +lonc=-124.05", Sm = " +k_0=1.000002", Sn = " +lon_0=-122.5", So = " +lon_0=-98.25", Sp = " +lon_0=-112.5", Sq = " +lon_0=-84.95", Sr = " +lon_0=-86.95", Ss = " +lon_0=-85.45", St = " +lon_0=-87.45", Su = " +lon_0=-87.55", Sv = " +towgs84=-149,128,296,0,0,0,0", Sw = " +towgs84=-425,-169,81,0,0,0,0", Sx = " +towgs84=-104,167,-38,0,0,0,0", Sy = " +towgs84=-106,-87,188,0,0,0,0", Sz = " +towgs84=-289,-124,60,0,0,0,0", TA = " +towgs84=137,248,-430,0,0,0,0", TB = " +towgs84=-13,-348,292,0,0,0,0", TC = " +towgs84=-115,118,426,0,0,0,0", TD = " +towgs84=0,-0.15,0.68,0,0,0,0", TE = " +towgs84=145,-187,103,0,0,0,0", TF = " +towgs84=-134,229,-29,0,0,0,0", TG = " +towgs84=70,207,389.5,0,0,0,0", TH = " +towgs84=-148,51,-291,0,0,0,0", TI = " +towgs84=-255,-15,71,0,0,0,0", TJ = " +towgs84=725,685,536,0,0,0,0", TK = " +towgs84=72,213.7,93,0,0,0,0", TL = " +towgs84=174,359,365,0,0,0,0", TM = " +towgs84=-173,253,27,0,0,0,0", TN = " +towgs84=-203,141,53,0,0,0,0", TO = " +towgs84=186,482,151,0,0,0,0", TP = " +towgs84=162,117,154,0,0,0,0", TQ = " +towgs84=-73,213,296,0,0,0,0", TR = " +towgs84=-130,29,364,0,0,0,0", TS = " +towgs84=-10,375,165,0,0,0,0", TT = " +towgs84=175,-38,113,0,0,0,0", TU = " +to_meter=0.9143984146160287", TV = " +zone=2", TW = " +zone=8", TX = " +zone=9", TY = " +zone=4", TZ = " +towgs84=30,430,368,0,0,0,0", Ta = " +towgs84=185,165,42,0,0,0,0", Tb = " +towgs84=-97,787,86,0,0,0,0", Tc = " +towgs84=639,405,60,0,0,0,0", Td = " +zone=44", Te = " +zone=45", Tf = " +lon_0=-58.5", Tg = " +lon_0=-67.5", Th = " +lon_0=-73.5", Ti = " +lon_0=-76.5", Tj = " +y_0=1200000", Tk = " +lon_0=133.5", Tl = " +x_0=8000000", Tm = " +y_0=8000000", Tn = " +k=0.9998335", To = " +lon_0=-85.5", Tp = " +x_0=7000000", Tq = " +lat_0=43.75", Tr = " +lat_0=43.25", Ts = " +lat_0=45.25", Tt = " +lon_0=-86.3", Tu = " +lat_0=38.15", Tv = " +lat_0=39.15", Tw = " +lat_0=41.25", Tx = " +lat_0=40.65", Ty = " +lat_0=39.25", Tz = " +lat_0=40.35", UA = " +lon_0=-85.8", UB = " +towgs84=9,183,236,0,0,0,0", UC = " +towgs84=-48,55,52,0,0,0,0", UD = " +towgs84=84,274,65,0,0,0,0", UE = " +lon_0=17", UF = " +lat_1=60", UG = " +k=0.9998", UH = " +lon_0=66", UI = " +lon_0=20", UJ = " +lon_0=26", UK = " +lat_0=51", UL = " +lat_1=87", UM = " +lat_1=26", UN = " +lon_0=144", UO = " +lon_0=168", UP = " +lon_0=174", UQ = " +lon_0=-72", UR = " +lon_0=-75", US = " +lon_0=-60", UT = " +lon_0=-39", UU = "+proj=poly", UV = " +x_0=219529.584", UW = " +a=6378306.3696", UX = " +lon_0=-61.33333333333334", UY = " +lon_0=-91.86666666666666", UZ = " +lon_0=-8.131906111111112", Ua = " +lon_0=-83.66666666666667", Ub = " +lon_0=-108.4166666666667", Uc = " +lon_0=-108.3333333333333", Ud = " +lon_0=-85.40000000000001", Ue = " +lon_0=-86.65000000000001", Uf = " +lon_0=-86.40000000000001", Ug = " +lon_0=-85.59999999999999", Uh = " +lon_0=-87.15000000000001", Ui = " +lon_0=-86.59999999999999", Uj = " +lon_0=-84.90000000000001", Uk = " +lon_0=-85.65000000000001", Ul = " +lon_0=-87.65000000000001", Um = " +lon_0=-85.34999999999999", Un = " +lon_0=-87.40000000000001", Uo = " +lon_0=-87.34999999999999", Up = " +lon_0=-85.90000000000001", Uq = " +lon_0=-90.62222222222222", Ur = " +lon_0=-91.84999999999999", Us = " +lon_0=-91.15277777777779", Ut = " +lon_0=-91.79722222222222", Uu = " +lon_0=-92.45777777777778", Uv = " +lon_0=-91.29444444444444", Uw = " +lon_0=-90.70833333333334", Ux = " +lon_0=-89.39444444444445", Uy = " +lon_0=-89.42222222222223", Uz = " +lon_0=-88.77500000000001", VA = " +lon_0=-87.27222222222223", VB = " +lon_0=-91.89444444444445", VC = " +lon_0=-91.28888888888889", VD = " +lon_0=-88.14166666666668", VE = " +lon_0=-88.63333333333334", VF = " +lon_0=-89.83888888888889", VG = " +lon_0=-90.16111111111111", VH = " +lon_0=-90.25555555555556", VI = " +lon_0=-90.84429651944444", VJ = " +lon_0=-87.89444444444445", VK = " +lon_0=-91.31666666666666", VL = " +lon_0=-89.03333333333333", VM = " +lon_0=-89.73333333333333", VN = " +lon_0=-87.71111111111111", VO = " +lon_0=-88.41666666666667", VP = " +lon_0=-90.64166666666668", VQ = " +lon_0=-87.90833333333335", VR = " +lon_0=-89.54444444444444", VS = " +lon_0=-92.22777777777777", VT = " +lon_0=-90.48888888888889", VU = " +lon_0=-90.43055555555556", VV = " +lon_0=-89.07222222222222", VW = " +lon_0=-91.06666666666666", VX = " +lon_0=-89.90000000000001", VY = " +lon_0=-91.11666666666666", VZ = " +lon_0=-88.60555555555555", Va = " +lon_0=-90.48333333333333", Vb = " +lon_0=-91.36666666666666", Vc = " +lon_0=-90.78333333333333", Vd = " +lon_0=-89.48888888888889", Ve = " +lon_0=-88.54166666666667", Vf = " +lon_0=-91.78333333333333", Vg = " +lon_0=-88.06388888888888", Vh = " +lon_0=-88.22499999999999", Vi = " +lon_0=-88.81666666666666", Vj = " +y_0=0.004876809753619507", Vk = " +y_0=0.008534417068834137", Vl = " +y_0=0.003962407924815849", Vm = " +y_0=0.005791211582423164", Vn = " +lon_0=-55.68333333333333", Vo = " +to_meter=0.201166195164", Vp = " +lat_0=4.666666666666667", Vq = " +lat_0=6.666666666666667", Vr = " +lon_0=6.166666666666667", Vs = " +lat_0=10.44166666666667", Vt = " +lat_0=22.31213333333334", Vu = " +lon_0=114.1785555555556", Vv = " +lon_0=51.21666666666667", Vw = " +lon_0=11.30827777777778", Vx = " +lon_0=13.55827777777778", Vy = " +lon_0=15.80827777777778", Vz = " +lon_0=18.05827777777778", WA = " +lon_0=20.30827777777778", WB = " +lon_0=22.55827777777778", WC = " +lat_1=27.41666666666667", WD = " +lat_2=34.91666666666666", WE = " +lat_0=31.16666666666667", WF = " +lat_1=59.33333333333334", WG = " +lat_0=57.51755393055556", WH = " +lon_0=4.359215833333333", WI = " +lat_1=61.66666666666666", WJ = " +lat_0=29.02626833333333", WK = " +lat_1=48.66666666666666", WL = " +lat_2=53.66666666666666", WM = " +lon_0=127.0028902777778", WN = " +lon_0=89.84999999999999", WO = " +lon_0=91.56666666666666", WP = " +lon_0=24.83333333333333", WQ = " +lat_2=63.66666666666666", WR = " +lat_0=65.35103930555555", WS = " +lat_1=63.66666666666666", WT = " +lat_2=60.33333333333334", WU = " +lat_0=62.01530688888889", WV = " +lat_1=45.78333333333333", WW = " +lat_0=45.78333333333333", WX = " +lat_0=42.66666666666666", WY = " +lat_0=43.36666666666667", WZ = " +lat_0=45.70611111111111", Wa = " +lat_0=45.13333333333333", Wb = " +lat_1=46.66964837722222", Wc = " +lat_0=46.66964837722222", Wd = " +lat_0=43.48138888888889", We = " +lat_1=45.89871486583333", Wf = " +lat_0=45.89871486583333", Wg = " +lat_0=42.71944444444445", Wh = " +lat_1=44.97785689861112", Wi = " +lat_0=44.97785689861112", Wj = " +lat_1=43.46254664583333", Wk = " +lat_0=43.46254664583333", Wl = " +lon_0=-90.9388888888889", Wm = " +lat_0=41.47222222222222", Wn = " +lat_0=45.88333333333333", Wo = " +lat_0=44.40833333333333", Wp = " +lat_1=44.87228112638889", Wq = " +lat_0=44.87228112638889", Wr = " +lat_0=45.43888888888888", Ws = " +lat_0=44.00555555555555", Wt = " +lat_0=41.41111111111111", Wu = " +lat_1=42.63756227694444", Wv = " +lat_0=42.63756227694444", Ww = " +lat_1=43.80700011777778", Wx = " +lat_0=43.80700011777778", Wy = " +lat_0=42.53888888888888", Wz = " +lat_0=45.43333333333333", XA = " +lat_0=44.25333512777778", XB = " +lat_0=42.21666666666667", XC = " +lat_0=43.26666666666667", XD = " +lat_0=43.45111111111111", XE = " +lat_1=45.15423710527778", XF = " +lat_0=45.15423710527778", XG = " +lat_0=44.84444444444445", XH = " +lat_1=44.90090442361111", XI = " +lat_0=44.90090442361111", XJ = " +lat_0=44.69166666666666", XK = " +lat_0=44.71666666666667", XL = " +lat_1=44.00007392861111", XM = " +lat_0=44.00007392861111", XN = " +lat_0=44.39722222222222", XO = " +lat_1=45.70422377027778", XP = " +lat_0=45.70422377027778", XQ = " +lat_1=44.63614887194444", XR = " +lat_0=44.63614887194444", XS = " +lat_0=44.66111111111111", XT = " +lat_1=44.41682397527777", XU = " +lat_0=44.41682397527777", XV = " +lat_0=44.55555555555555", XW = " +lat_0=41.94444444444444", XX = " +lat_0=43.91944444444444", XY = " +lat_0=42.81944444444445", XZ = " +lat_1=45.90009913138888", Xa = " +lat_0=45.90009913138888", Xb = " +lat_1=45.17782208583333", Xc = " +lat_0=45.17782208583333", Xd = " +lat_0=43.16111111111111", Xe = " +lat_1=43.57503293972223", Xf = " +lat_0=43.57503293972223", Xg = " +lat_1=46.07784409055556", Xh = " +lat_0=46.07784409055556", Xi = " +lat_1=42.66946209694444", Xj = " +lat_0=42.66946209694444", Xk = " +lat_1=45.96121983333334", Xl = " +lat_0=45.96121983333334", Xm = " +lat_0=42.91805555555555", Xn = " +lat_0=42.56944444444445", Xo = " +lat_0=43.42027777777778", Xp = " +lat_1=44.11394404583334", Xq = " +lat_0=44.11394404583334", Xr = " +lat_1=44.36259546944444", Xs = " +lat_0=44.36259546944444", Xt = " +lat_1=44.10000000000001", Xu = " +lat_0=44.10000000000001", Xv = " +lat_1=42.16500000000001", Xw = " +lat_0=42.16500000000001", Xx = " +lat_0=52.15616055555555", Xy = " +lat_2=48.73333333333333", Xz = " +zone=3", YA = " +lat_0=53.5", YB = " +k=0.999923", YC = " +x_0=850000", YD = " +x_0=830000", YE = " +lon_0=16.5", YF = " +x_0=520000", YG = " +lat_2=31.5", YH = " +lon_0=10.5", YI = " +lat_1=44.5", YJ = " +lon_0=-153", YK = " +lon_0=-135", YL = " +x_0=750000", YM = " +lat_0=43.5", YN = " +lon_0=-142", YO = " +lon_0=-146", YP = " +lon_0=-162", YQ = " +lon_0=-166", YR = " +lon_0=-176", YS = " +lat_2=39.5", YT = " +lon_0=-129", YU = " +k_0=1.0002", YV = " +k=1.000023", YW = " +lon_0=-121", YX = " +k=1.000175", YY = " +lat_0=45.5", YZ = " +k=1.000155", Ya = " +lat_2=37.5", Yb = " +lat_1=48.5", Yc = " +k=1.000029", Yd = " +lat_0=39.6", Ye = " +k=1.000013", Yf = " +k=1.000022", Yg = " +lat_0=40.7", Yh = " +lat_0=39.3", Yi = " +lat_0=37.8", Yj = " +lat_0=38.9", Yk = " +lon_0=-5.4", Yl = " +y_0=626907.39", Ym = " +b=6356571.996", Yn = " +a=6377295.664", Yo = " +lon_0=5.38763888888889", Yp = " +y_0=-4600000.00001208", Yq = " +y_0=1889763.779527559", Yr = " +y_0=99999.99999960001", Ys = " +x_0=120091.4401828804", Yt = " +lon_0=72", Yu = " +lat_0=50", Yv = " +lat_1=50", Yw = " +lat_1=35", Yx = " +lon_0=22", Yy = " +lat_1=34", Yz = " +lonc=115", ZA = " +lat_0=-9", ZB = " +lat_0=23", ZC = " +lat_1=85", ZD = " +lat_2=69", ZE = " +lat_1=69", ZF = " +lat_2=61", ZG = " +lon_0=34", ZH = " +lon_0=140.25", ZI = " +lon_0=142.25", ZJ = " +lon_0=144.25", ZK = " +x_0=47500000", ZL = " +y_0=-3000000", ZM = " +pm=2.337208333333333", ZN = " +x_0=7000000.00000248", ZO = " +lon_0=6", ZP = " +k=0.997", ZQ = " +lon_0=106", ZR = " +lon_0=154", ZS = " +lon_0=156", ZT = " +lat_2=-36", ZU = " +lon_0=119", ZV = " +lon_0=121", ZW = " +lon_0=166", ZX = " +a=6371228", ZY = " +b=6371228", ZZ = " +a=6378273", Za = " +lat_0=-44", Zb = " +pm=lisbon", Zc = " +lon_0=-57", Zd = " +lon_0=-56", Ze = " +k=1.00007", Zf = " +lonc=-123", Zg = " +alpha=295", Zh = " +gamma=295", Zi = " +k=1.00011", Zj = " +k=1.00005", Zk = " +k=1.00013", Zl = " +x_0=30000", Zm = " +k=1.00001", Zn = " +k=1.00003", Zo = " +y_0=130000.00001472", Zp = " +x_0=119999.99999952", Zq = " +y_0=-2999999.999988", Zr = " +x_0=-299999.9999988", Zs = " +lat_1=43.0695160375", Zt = " +lat_0=43.0695160375", Zu = " +lat_1=43.3223129275", Zv = " +lat_0=43.3223129275", Zw = " +k=1.0000067", Zx = " +a=6378298.3", Zy = " +lon_0=-66.5", Zz = " +lon_0=129.5", aA = " +lon_0=138.5", aB = " +x_0=2300000", aC = " +x_0=3300000", aD = " +x_0=4300000", aE = " +y_0=7500000", aF = " +lonc=102.25", aG = " +y_0=1166200", aH = " +x_0=3000000", aI = " +lat_1=46.25", aJ = " +ellps=WGS66", aK = " +ellps=GRS67", aL = " +lat_1=34.65", aM = " +y_0=59999.99999976", aN = " +y_0=30000.00001512", aO = " +x_0=59999.99999976", aP = " +x_0=30000.00001512", aQ = " +lat_1=43.200055605", aR = " +lat_0=43.200055605", aS = " +y_0=65379.0134283", aT = " +alpha=323.0257905", aU = " +alpha=53.31580995", aV = " +x_0=10000.0000152";
  proj4jsDefinitions = [2e3, D + L2 + NU + EP + u + N + c + E + A, 1, D + L2 + NU + EP + u + N + c + TI + E + A, 1, D + L2 + NU + EP + u + N + c + TJ + E + A, 1, D + L2 + NU + EP + u + N + c + TK + E + A, 1, D + L2 + NU + EP + u + N + c + TL + E + A, 1, D + L2 + NU + EP + u + N + c + UB + E + A, 1, D + L2 + NU + EP + u + N + c + Sv + E + A, 1, D + L2 + NU + EP + u + N + c + Ps + E + A, 2, D + L2 + Tf + V + Ab + N + i + E + A, 1, D + L2 + RQ + V + Ab + N + i + E + A, 1, D + L2 + RR + V + Ab + N + i + E + A, 1, D + L2 + Tg + V + Ab + N + i + E + A, 1, D + L2 + IL + V + Ab + N + i + E + A, 1, D + L2 + Th + V + Ab + N + i + E + A, 1, D + L2 + Ti + V + Ab + N + i + E + A, 1, D + L2 + Ga + V + Ab + N + i + E + A, 1, D + L2 + Th + V + Ab + N + i + E + A, 1, D + L2 + Ti + V + Ab + N + i + E + A, 1, D + L2 + Ga + V + Ab + N + i + E + A, 1, D + L2 + ET + V + Ab + N + i + E + A, 1, D + L2 + CR + V + Ab + N + i + E + A, 1, D + L2 + NV + V + Ab + N + i + E + A, 1, D + L2 + Jh + V + Ab + N + i + E + A, 1, D + L2 + Bu + V + Ab + N + i + E + A, 1, D + L2 + Rs + V + Ab + N + i + E + A, 1, D + L2 + OZ + V + Ab + N + i + E + A, 1, I + NP + i + E + A, 1, I + NQ + i + E + A, 1, I + Ik + i + E + A, 1, I + IC + i + E + A, 1, I + Ik + i + E + A, 1, I + IC + i + E + A, 1, I + Hi + i + E + A, 1, I + Gz + i + E + A, 1, I + ID + i + E + A, 4, D + Ou + Ov + Zw + UV + Yl + C + UC + E + A, 1, I + Oq + c + JO + E + A, 1, I + Oq + c + IE + E + A, 1, I + KA + c + JO + E + A, 1, I + KA + c + IE + E + A, 1, D + L2 + EN + " +k=1" + Hs + N + M + HG + E + A, 1, D + L2 + Fy + " +k=1" + Ht + N + M + HG + E + A, 1, D + L2 + Gj + " +k=1" + s + N + Gk + j + B + E + A, 1, D + L2 + UE + " +k=1" + s + N + Gk + j + B + E + A, 1, D + L2 + RI + " +k=1" + s + N + Gk + j + B + E + A, 1, D + L2 + Gl + " +k=1" + s + N + Gk + j + B + E + A, 1, D + L2 + SP + " +k=1" + s + N + Gk + j + B + E + A, 1, D + L2 + RJ + " +k=1" + s + N + Gk + j + B + E + A, 1, D + L2 + HO + " +k=1" + s + N + Gk + j + B + E + A, 1, D + L2 + " +lon_0=29 +k=1" + s + N + Gk + j + B + E + A, 1, D + L2 + QQ + " +k=1" + s + N + Gk + j + B + E + A, 1, D + L2 + IG + " +k=1" + s + N + Gk + j + B + E + A, 1, Pu + Kj + Ow + " +k_0=1 +x_0=2600000" + Tj + Y + Py + E + A, 1, CU + " +lat_0=27.51882880555555 +lonc=52.60353916666667 +alpha=0.5716611944444444 +k=0.999895934 +x_0=658377.437 +y_0=3044969.194 +gamma=0.5716611944444444" + R + Pz + E + A, 1, I + JZ + R + Gy + E + A, 1, I + JM + R + Gy + E + A, 1, I + Me + R + Gy + E + A, 1, I + Rb + R + Gy + E + A, 1, H + " +lat_1=40" + Fs + HN + " +k_0=0.9988085293" + a + Qn + Zx + Qy + " +pm=madrid" + E + A, 3, Rp + SS + " +lon_0=42.5" + Kk + V + s + N + Y + Gh + Ls + E + A, 1, Ck + " +lat_0=11.25217861111111 +lon_0=-60.68600888888889 +x_0=37718.66159325 +y_0=36209.91512952" + Ee + Ef + Vo + A, 1, I + Gz + R + QA + E + A, 1, D + L2 + KB + V + h + N + R + v + E + A, 1, D + L2 + " +lon_0=11" + V + h + N + R + v + E + A, 1, D + L2 + " +lon_0=13" + V + h + N + R + v + E + A, 1, D + L2 + Gj + V + h + N + R + v + E + A, 1, D + L2 + UE + V + h + N + R + v + E + A, 1, D + L2 + RI + V + h + N + R + v + E + A, 1, D + L2 + Gl + V + h + N + R + v + E + A, 1, D + L2 + SP + V + h + N + R + v + E + A, 1, D + L2 + RJ + V + h + N + R + v + E + A, 1, I + JN + R + v + E + A, 1, I + KC + R + v + E + A, 1, I + NR + R + v + E + A, 1, I + Ki + R + v + E + A, 1, D + m + MP + " +k=1" + Ci + N + R + E + A, 1, D + m + MP + " +k=1" + Ci + N + R + SD + E + A, 1, D + m + MP + " +k=1" + Ci + N + R + OV + E + A, 1, I + Hi + o + R + OV + E + A, 3, D + L2 + IH + AP + O + N + R + v + E + A, 1, D + L2 + " +lon_0=11" + AP + O + N + AU + BN + Gi + E + A, 1, I + JZ + j + B + E + A, 1, I + JM + j + B + E + A, 3, D + L2 + ZQ + " +k=1" + O + N + M + HG + E + A, 1, D + L2 + ZQ + AP + O + N + T + Q + E + A, 1, I + Ja + R + TM + E + A, 1, D + Ch + Ed + " +k=1" + h + Ae + Y + E + A, 1, D + Ch + Rt + " +k=1" + h + Ae + Y + E + A, 1, D + Ch + Ru + " +k=1" + h + Ae + Y + E + A, 1, Ck + " +lat_0=25.38236111111111 +lon_0=50.76138888888889" + BU + EK + Gn + E + A, 1, D + L2 + II + AP + O + N + C + Qb + E + A, 1, H + Kl + Km + KN + " +k_0=1" + s + " +y_0=-52684.972" + R + E + A, 1, H + Kl + Km + KN + " +k_0=1" + h + " +y_0=147315.028" + R + E + A, 1, H + Kl + Km + KN + " +k_0=1" + O + " +y_0=447315.028" + R + E + A, 1, H + Kl + Km + KN + " +k_0=1 +x_0=-17044 +y_0=-23139.97" + R + E + A, 1, D + " +lat_0=-36.87972222222222 +lon_0=174.7641666666667" + V + u + CO + C + B + E + A, 1, D + " +lat_0=-37.76111111111111 +lon_0=176.4661111111111 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-38.62444444444444 +lon_0=177.8855555555556 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-39.65083333333333 +lon_0=176.6736111111111 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-39.13555555555556 +lon_0=174.2277777777778 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-39.51222222222222 +lon_0=175.64 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-40.24194444444444 +lon_0=175.4880555555555 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-40.92527777777777 +lon_0=175.6472222222222 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-41.3011111111111 +lon_0=174.7763888888889 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-40.71472222222223 +lon_0=172.6719444444444 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-41.27444444444444 +lon_0=173.2991666666667 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-41.28972222222222 +lon_0=172.1088888888889 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-41.81055555555555 +lon_0=171.5811111111111 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-42.33361111111111 +lon_0=171.5497222222222 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-42.68888888888888 +lon_0=173.01 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-41.54444444444444 +lon_0=173.8019444444444 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-42.88611111111111 +lon_0=170.9797222222222 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-43.11 +lon_0=170.2608333333333 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-43.97777777777778 +lon_0=168.6061111111111 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-43.59055555555556 +lon_0=172.7269444444445 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-43.74861111111111 +lon_0=171.3605555555555 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-44.40194444444445 +lon_0=171.0572222222222 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-44.735 +lon_0=169.4675 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-45.13277777777778 +lon_0=168.3986111111111 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-45.56361111111111 +lon_0=167.7386111111111 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-45.81611111111111 +lon_0=170.6283333333333 +k=1" + u + CO + C + B + E + A, 1, D + " +lat_0=-45.86138888888889 +lon_0=170.2825" + Pc + u + CO + C + B + E + A, 1, D + " +lat_0=-46.6 +lon_0=168.3427777777778 +k=1" + u + CO + C + B + E + A, 1, I + MA + o + C + B + E + A, 1, I + Nq + o + C + B + E + A, 1, I + PL + o + C + B + E + A, 1, D + Vp + " +lon_0=-1" + Rv + " +x_0=274319.7391633579" + N + Qj + Ho + NI + NJ + A, 1, D + L2 + " +lon_0=-1" + AP + O + N + Qj + Ho + NI + E + A, 1, H + UF + Nh + IZ + HJ + s + N + i + E + A, 16, H + LM + " +lat_2=44" + Iq + Or + EW + " +y_0=6600000" + C + B + E + A, 3, D + YA + " +lon_0=-8 +k=0.99982" + a + Mk + C + B + E + A, 1, I + KA + C + B + E + A, 1, D + Vq + " +lon_0=-12 +k=1 +x_0=152399.8550907544" + N + Qj + Ho + NJ + A, 1, D + Vq + " +lon_0=-12 +k=1 +x_0=243839.7681452071 +y_0=182879.8261089053" + Qj + Ho + NJ + A, 1, I + Ja + c + OW + E + A, 1, I + KA + c + OW + E + A, 1, He + IP + CS + s + N + " +a=6370997 +b=6370997" + E + A, 1, D + L2 + " +lon_0=-5" + AP + O + N + c + JO + E + A, 1, D + L2 + " +lon_0=-5" + AP + O + N + c + IE + E + A, 4, D + " +lat_0=49.83333333333334" + Vr + " +k=1" + Oa + EK + R + Jx + E + A, 3, GU + " +lat_0=53.00194444444445 +lon_0=21.50277777777778" + UG + " +x_0=4603000 +y_0=5806000" + M + b + E + A, 1, GU + " +lat_0=53.58333333333334 +lon_0=17.00833333333333" + UG + " +x_0=3501000 +y_0=5999000" + M + b + E + A, 1, GU + " +lat_0=51.67083333333333 +lon_0=16.67222222222222" + UG + " +x_0=3703000 +y_0=5627000" + M + b + E + A, 1, D + L2 + " +lon_0=18.95833333333333 +k=0.999983 +x_0=237000 +y_0=-4700000" + M + b + E + A, 1, D + L2 + Gj + YB + Eg + N + C + B + E + A, 1, D + L2 + QR + YB + Jt + N + C + B + E + A, 1, D + L2 + Gl + YB + IM + N + C + B + E + A, 1, D + L2 + II + YB + MS + N + C + B + E + A, 1, D + L2 + RI + " +k=0.9993" + O + " +y_0=-5300000" + C + B + E + A, 8, I + Nr + R + Sw + E + A, 1, I + Os + R + Sx + E + A, 1, I + Os + R + TN + E + A, 3, D + L2 + " +lon_0=173" + AP + " +x_0=1600000" + Ak + C + B + E + A, 2, I + TV + o + C + B + E + A, 1, D + L2 + " +lon_0=9.5" + CP + h + N + C + B + E + A, 1, D + L2 + IH + CP + O + N + C + B + E + A, 1, D + L2 + Gj + " +k=1" + HT + N + C + B + E + A, 2, GU + Iq + Zy + ST + AI + CO + Pd + Gq + E + A, 1, I + IC + C + B + E + A, 1, I + Hi + C + B + E + A, 1, I + Gz + C + B + E + A, 1, H + " +lat_1=35.25 +lat_2=36.41666666666666 +lat_0=34.66666666666666" + MQ + Z + Pv + X + J + A, 1, H + Az + DV + DM + Jo + O + N + C + B + E + A, 1, D + L2 + HO + " +k=1" + MT + N + R + n + E + A, 1, D + L2 + Ia + " +k=1" + LY + N + R + n + E + A, 1, D + L2 + IG + " +k=1" + Jp + N + R + n + E + A, 1, D + L2 + PN + " +k=1" + LZ + N + R + n + E + A, 1, D + L2 + LN + " +k=1" + HU + N + R + n + E + A, 1, D + L2 + PO + " +k=1" + Gw + N + R + n + E + A, 1, D + L2 + JS + " +k=1" + Hu + N + R + n + E + A, 1, D + L2 + Ia + AP + O + N + C + B + E + A, 2, I + JN + AU + BN + RD + E + A, 1, I + Io + R + NG + E + A, 1, I + MB + R + NG + E + A, 2, I + Hi + Pd + Gq + E + A, 1, I + Gz + Pd + Gq + E + A, 2, D + Bl + Cn + V + EX + N + C + B + t + A, 1, D + Bl + Co + V + EX + N + C + B + t + A, 1, D + Bl + Iv + BG + EX + N + C + B + t + A, 1, H + DW + Jn + y + HA + Ac + AD + C + B + J + A, 1, H + DX + DY + AA + HA + Ac + AD + C + B + J + A, 1, H + Ap + DZ + Ml + AJ + Ac + AD + C + B + J + A, 1, H + LO + QS + Da + Mm + Ac + AD + C + B + J + A, 1, H + Db + Dc + Mn + Ir + Ac + AD + C + B + J + A, 1, H + Dd + De + Df + Iw + Ac + AD + C + B + J + A, 1, H + Eh + Ei + y + Ba + Bw + CL + C + B + J + A, 1, H + LP + LQ + CY + Ba + Bw + CL + C + B + J + A, 1, H + Ap + Dg + f + Ba + Bw + CL + C + B + J + A, 1, H + Dh + Mo + Di + Jq + MC + MD + C + B + J + A, 1, D + Ch + Cp + Mp + AE + N + C + B + J + A, 1, D + Aq + CR + Am + AE + N + C + B + J + A, 1, D + Aq + Ob + Am + AE + N + C + B + J + A, 1, H + LR + Dj + QT + LS + a + N + C + B + J + A, 1, D + Gm + Cq + V + AE + N + C + B + J + A, 1, D + Gm + Cr + V + CM + N + C + B + J + A, 1, D + p + Cs + BJ + AE + N + C + B + J + A, 1, D + p + Jb + BJ + AF + N + C + B + J + A, 1, D + p + Ix + BG + ME + N + C + B + J + A, 3, H + Az + DV + DM + Jo + AF + N + C + B + J + A, 1, H + Ej + Ek + AB + EY + AF + AD + C + B + J + A, 1, H + MU + Nz + AA + Ld + MF + N + C + B + J + A, 1, H + El + Dk + Ip + GE + AE + Mk + C + B + J + A, 1, H + Em + En + Ip + IL + AF + N + C + B + J + A, 1, H + Eo + Ep + Eq + Jh + MG + N + C + B + t + A, 1, H + OA + Er + Es + BE + MH + N + C + B + t + A, 1, H + Bq + OB + Fo + BE + OT + N + C + B + t + A, 1, D + Hj + Ct + CP + BF + N + C + B + J + A, 1, D + Hj + Bx + CP + CM + N + C + B + J + A, 1, H + LM + RK + MV + IS + DR + N + C + B + t + A, 1, D + Bl + Cu + Hm + OC + N + C + B + J + A, 1, D + Bl + Iy + V + AF + N + C + B + J + A, 1, D + Bl + Cv + Iz + MI + N + C + B + J + A, 1, D + BA + Gp + V + Bn + N + C + B + J + A, 1, D + Fs + Cw + Ad + MJ + N + C + B + J + A, 1, D + Fs + Cx + Ad + MK + N + C + B + J + A, 1, H + Dl + Dm + BB + Oc + BF + N + C + B + J + A, 1, H + Et + Eu + LT + NW + Z + N + C + B + J + A, 1, H + BH + Ev + Ib + EZ + DR + N + C + B + t + A, 1, H + Ew + Ex + Be + EZ + DR + N + C + B + t + A, 1, H + Dn + Ey + QU + Fl + a + N + C + B + J + A, 1, H + Ez + FA + Do + Fl + a + N + C + B + J + A, 1, H + PP + CZ + AK + AJ + KL + N + C + B + t + A, 1, H + PQ + Ca + p + AJ + KM + N + C + B + t + A, 1, H + MW + FB + BB + Ea + a + N + C + B + J + A, 1, H + Dp + Dq + y + Ea + a + N + C + B + J + A, 1, H + FC + OD + Dr + CR + OE + N + C + B + t + A, 1, H + FD + MX + BC + MQ + a + N + C + B + J + A, 1, H + FE + MY + QV + Jr + AE + CN + C + B + J + A, 1, H + FF + FG + Ds + CV + a + Gr + C + B + J + A, 1, H + FH + FI + Cb + Ag + CM + Fq + C + B + J + A, 1, H + FJ + FK + Dt + Ji + a + Ne + C + B + J + A, 1, H + CD + CE + Cc + CV + BF + Nf + C + B + J + A, 1, H + AY + CF + Br + BI + Gd + Pw + C + B + t + A, 1, H + JF + CG + AQ + BI + Gd + RY + C + B + t + A, 1, H + JG + CH + f + BI + Gd + RZ + C + B + t + A, 1, H + OF + FL + AA + GF + Gs + Gr + C + B + J + A, 1, H + Az + Du + AB + GF + Gs + CN + C + B + J + A, 1, H + BH + OG + Ib + Cy + AF + N + C + B + J + A, 1, H + FM + FN + Dv + AJ + AF + N + C + B + J + A, 1, H + FO + FP + Dw + Bu + a + N + C + B + J + A, 1, H + Jc + MZ + AL + Bu + a + N + C + B + J + A, 1, H + FQ + FR + PR + Bu + a + N + C + B + J + A, 1, GU + " +lat_0=47.25" + Qk + ST + EW + Is + Pd + Gq + E + A, 4, D + L2 + RQ + V + DP + N + Pd + Gq + E + A, 1, D + L2 + RR + V + Eg + N + Pd + Gq + E + A, 13, D + L2 + " +lon_0=109" + AP + O + Ak + Y + Cj + E + A, 1, D + L2 + " +lon_0=116" + AP + O + Ak + S + E + A, 1, D + L2 + Il + AP + O + Ak + S + E + A, 1, D + L2 + ZO + AP + O + N + S + E + A, 1, I + KC + c + E + A, 1, I + KC + c + E + A, 1, Ck + Vs + UX + " +x_0=86501.46392052001" + aS + Ee + Ef + JK + ML + A, 1, I + Hi + o + R + Bs + E + A, 1, I + Gz + o + R + Bs + E + A, 1, H + " +lat_1=9 +lat_2=3 +lat_0=6" + Pe + BZ + AH + R + AX + E + A, 1, H + " +lat_1=17 +lat_2=33 +lat_0=25.08951" + SQ + s + N + R + Cm + E + A, 1, D + L2 + HO + " +k=1" + O + N + R + n + E + A, 1, D + L2 + Ia + " +k=1" + O + N + R + n + E + A, 1, D + L2 + IG + " +k=1" + O + N + R + n + E + A, 1, D + L2 + PN + " +k=1" + O + N + R + n + E + A, 1, D + L2 + LN + " +k=1" + O + N + R + n + E + A, 1, D + L2 + PO + " +k=1" + O + N + R + n + E + A, 1, D + L2 + JS + " +k=1" + O + N + R + n + E + A, 1, D + Vt + Vu + " +k=1 +x_0=836694.05 +y_0=819069.8" + R + Jg + E + A, 1, D + L2 + HP + " +k=1" + HU + N + As + d + E + A, 1, D + L2 + HQ + " +k=1" + Gw + N + As + d + E + A, 1, D + L2 + Hd + " +k=1" + Hu + N + As + d + E + A, 1, D + L2 + HR + " +k=1" + Hv + N + As + d + E + A, 1, D + L2 + HS + " +k=1" + It + N + As + d + E + A, 1, D + L2 + EN + " +k=1" + Hs + N + As + d + E + A, 1, D + L2 + Fy + " +k=1" + Ht + N + As + d + E + A, 1, D + L2 + Fm + " +k=1" + HV + N + As + d + E + A, 1, D + L2 + Fr + " +k=1" + Hw + N + As + d + E + A, 1, D + L2 + Ed + " +k=1" + HW + N + As + d + E + A, 1, D + L2 + Fn + " +k=1" + Hx + N + As + d + E + A, 1, D + L2 + HP + " +k=1" + O + N + As + d + E + A, 1, D + L2 + HQ + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Hd + " +k=1" + O + N + As + d + E + A, 1, D + L2 + HR + " +k=1" + O + N + As + d + E + A, 1, D + L2 + HS + " +k=1" + O + N + As + d + E + A, 1, D + L2 + EN + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Fy + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Fm + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Fr + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Ed + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Fn + " +k=1" + O + N + As + d + E + A, 1, D + L2 + HP + " +k=1" + Hy + N + As + d + E + A, 1, D + L2 + Lt + " +k=1" + Hz + N + As + d + E + A, 1, D + L2 + HQ + " +k=1" + IA + N + As + d + E + A, 1, D + L2 + Ni + " +k=1" + IB + N + As + d + E + A, 1, D + L2 + Hd + " +k=1" + Gx + N + As + d + E + A, 1, D + L2 + Hq + " +k=1" + IT + N + As + d + E + A, 1, D + L2 + HR + " +k=1" + Gc + N + As + d + E + A, 1, D + L2 + Mj + " +k=1" + IU + N + As + d + E + A, 1, D + L2 + HS + " +k=1" + Iu + N + As + d + E + A, 1, D + L2 + Jj + " +k=1" + Mu + N + As + d + E + A, 1, D + L2 + EN + " +k=1" + Mv + N + As + d + E + A, 1, D + L2 + Le + " +k=1" + Mw + N + As + d + E + A, 1, D + L2 + Fy + " +k=1" + Mx + N + As + d + E + A, 1, D + L2 + Im + " +k=1" + My + N + As + d + E + A, 1, D + L2 + Fm + " +k=1" + Mz + N + As + d + E + A, 1, D + L2 + KF + " +k=1" + NA + N + As + d + E + A, 1, D + L2 + Fr + " +k=1" + NB + N + As + d + E + A, 1, D + L2 + Jk + " +k=1" + Oh + N + As + d + E + A, 1, D + L2 + Ed + " +k=1" + NC + N + As + d + E + A, 1, D + L2 + Il + " +k=1" + Oi + N + As + d + E + A, 1, D + L2 + Fn + " +k=1" + ND + N + As + d + E + A, 1, D + L2 + HP + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Lt + " +k=1" + O + N + As + d + E + A, 1, D + L2 + HQ + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Ni + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Hd + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Hq + " +k=1" + O + N + As + d + E + A, 1, D + L2 + HR + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Mj + " +k=1" + O + N + As + d + E + A, 1, D + L2 + HS + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Jj + " +k=1" + O + N + As + d + E + A, 1, D + L2 + EN + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Le + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Fy + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Im + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Fm + " +k=1" + O + N + As + d + E + A, 1, D + L2 + KF + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Fr + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Jk + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Ed + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Il + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Fn + " +k=1" + O + N + As + d + E + A, 1, D + L2 + Gl + " +k=1" + AV + N + R + At + E + A, 1, D + L2 + II + " +k=1" + Ci + N + R + At + E + A, 1, D + L2 + HO + " +k=1" + Bo + N + R + At + E + A, 1, D + L2 + Ia + " +k=1" + DP + N + R + At + E + A, 1, D + L2 + JS + " +k=1" + MS + N + M + NK + E + A, 1, D + L2 + PS + " +k=1" + MT + N + M + NK + E + A, 1, D + L2 + KB + " +k=1" + Bo + N + M + Ar + E + A, 1, D + L2 + IH + " +k=1" + DP + N + M + Ar + E + A, 1, D + L2 + Gj + " +k=1" + Eg + N + M + Ar + E + A, 2, D + L2 + HP + " +k=1" + Hy + N + M + U + E + A, 1, D + L2 + Lt + " +k=1" + Hz + N + M + U + E + A, 1, D + L2 + HQ + " +k=1" + IA + N + M + U + E + A, 1, D + L2 + Ni + " +k=1" + IB + N + M + U + E + A, 1, D + L2 + Hd + " +k=1" + Gx + N + M + U + E + A, 1, D + L2 + Hq + " +k=1" + IT + N + M + U + E + A, 1, D + L2 + HR + " +k=1" + Gc + N + M + U + E + A, 1, D + L2 + Mj + " +k=1" + IU + N + M + U + E + A, 1, D + L2 + HS + " +k=1" + Iu + N + M + U + E + A, 1, D + L2 + Jj + " +k=1" + Mu + N + M + U + E + A, 1, D + L2 + EN + " +k=1" + Mv + N + M + U + E + A, 1, D + L2 + Le + " +k=1" + Mw + N + M + U + E + A, 1, D + L2 + Fy + " +k=1" + Mx + N + M + U + E + A, 1, D + L2 + Im + " +k=1" + My + N + M + U + E + A, 1, D + L2 + Fm + " +k=1" + Mz + N + M + U + E + A, 1, D + L2 + KF + " +k=1" + NA + N + M + U + E + A, 1, D + L2 + Fr + " +k=1" + NB + N + M + U + E + A, 1, D + L2 + Jk + " +k=1" + Oh + N + M + U + E + A, 1, D + L2 + Ed + " +k=1" + NC + N + M + U + E + A, 1, D + L2 + Il + " +k=1" + Oi + N + M + U + E + A, 1, D + L2 + Fn + " +k=1" + ND + N + M + U + E + A, 1, D + L2 + HP + " +k=1" + O + N + M + U + E + A, 1, D + L2 + Lt + " +k=1" + O + N + M + U + E + A, 1, D + L2 + HQ + " +k=1" + O + N + M + U + E + A, 1, D + L2 + Ni + " +k=1" + O + N + M + U + E + A, 1, D + L2 + Hd + " +k=1" + O + N + M + U + E + A, 1, D + L2 + Hq + " +k=1" + O + N + M + U + E + A, 1, D + L2 + HR + " +k=1" + O + N + M + U + E + A, 1, D + L2 + Mj + " +k=1" + O + N + M + U + E + A, 1, D + L2 + HS + " +k=1" + O + N + M + U + E + A, 1, D + L2 + Jj + " +k=1" + O + N + M + U + E + A, 1, D + L2 + EN + " +k=1" + O + N + M + U + E + A, 1, D + L2 + Le + " +k=1" + O + N + M + U + E + A, 1, D + L2 + Fy + " +k=1" + O + N + M + U + E + A, 1, D + L2 + Im + " +k=1" + O + N + M + U + E + A, 1, D + L2 + Fm + " +k=1" + O + N + M + U + E + A, 1, D + L2 + KF + " +k=1" + O + N + M + U + E + A, 1, D + L2 + Fr + " +k=1" + O + N + M + U + E + A, 1, D + L2 + Jk + " +k=1" + O + N + M + U + E + A, 1, D + L2 + Ed + " +k=1" + O + N + M + U + E + A, 1, D + L2 + Il + " +k=1" + O + N + M + U + E + A, 1, D + L2 + Fn + " +k=1" + O + N + M + U + E + A, 1, D + PT + Zz + V + s + N + C + B + E + A, 1, D + PT + NX + V + s + N + C + B + E + A, 1, D + GM + Ox + V + s + N + C + B + E + A, 1, D + PT + Tk + V + s + N + C + B + E + A, 1, D + GM + Oy + V + s + N + C + B + E + A, 1, D + GM + Rw + V + s + N + C + B + E + A, 1, D + GM + Oz + V + s + N + C + B + E + A, 1, D + GM + aA + V + s + N + C + B + E + A, 1, D + GM + PA + V + s + N + C + B + E + A, 1, D + Fs + PB + V + s + N + C + B + E + A, 1, D + IZ + ZH + V + s + N + C + B + E + A, 1, D + IZ + ZI + V + s + N + C + B + E + A, 1, D + IZ + ZJ + V + s + N + C + B + E + A, 1, D + IQ + " +lon_0=142" + V + s + N + C + B + E + A, 1, D + IQ + Pj + V + s + N + C + B + E + A, 1, D + IQ + " +lon_0=124" + V + s + N + C + B + E + A, 1, D + IQ + NX + V + s + N + C + B + E + A, 1, D + " +lat_0=20" + Rw + V + s + N + C + B + E + A, 1, D + IQ + ZR + V + s + N + C + B + E + A, 1, D + L2 + Gl + " +k=1" + DP + N + M + E + A, 1, D + L2 + Gl + " +k=1" + O + N + M + G + E + A, 1, D + L2 + HO + " +k=1" + O + N + M + G + E + A, 1, D + L2 + IG + " +k=1" + O + N + M + G + E + A, 1, D + L2 + LN + " +k=1" + O + N + M + G + E + A, 1, D + L2 + JS + " +k=1" + O + N + M + G + E + A, 1, D + L2 + PS + " +k=1" + O + N + M + G + E + A, 1, D + L2 + RL + " +k=1" + O + N + M + G + E + A, 1, D + L2 + QW + " +k=1" + O + N + M + G + E + A, 1, D + L2 + RM + " +k=1" + O + N + M + G + E + A, 1, D + L2 + HP + " +k=1" + O + N + M + G + E + A, 1, D + L2 + HQ + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Hd + " +k=1" + O + N + M + G + E + A, 1, D + L2 + HR + " +k=1" + O + N + M + G + E + A, 1, D + L2 + HS + " +k=1" + O + N + M + G + E + A, 1, D + L2 + EN + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Fy + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Fm + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Fr + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Ed + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Fn + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Pf + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Od + " +k=1" + O + N + M + G + E + A, 1, D + L2 + NY + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Pg + " +k=1" + O + N + M + G + E + A, 1, D + L2 + NZ + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Lf + " +k=1" + O + N + M + G + E + A, 1, D + L2 + KG + " +k=1" + O + N + M + G + E + A, 1, D + L2 + KH + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Lh + " +k=1" + O + N + M + G + E + A, 3, D + L2 + Gl + " +k=1" + O + N + M + F + E + A, 1, D + L2 + HO + " +k=1" + O + N + M + F + E + A, 1, D + L2 + IG + " +k=1" + O + N + M + F + E + A, 1, D + L2 + LN + " +k=1" + O + N + M + F + E + A, 1, D + L2 + JS + " +k=1" + O + N + M + F + E + A, 1, D + L2 + PS + " +k=1" + O + N + M + F + E + A, 1, D + L2 + RL + " +k=1" + O + N + M + F + E + A, 1, D + L2 + QW + " +k=1" + O + N + M + F + E + A, 1, D + L2 + RM + " +k=1" + O + N + M + F + E + A, 1, D + L2 + HP + " +k=1" + O + N + M + F + E + A, 1, D + L2 + HQ + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Hd + " +k=1" + O + N + M + F + E + A, 1, D + L2 + HR + " +k=1" + O + N + M + F + E + A, 1, D + L2 + HS + " +k=1" + O + N + M + F + E + A, 1, D + L2 + EN + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Fy + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Fm + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Fr + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Ed + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Fn + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Pf + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Od + " +k=1" + O + N + M + F + E + A, 1, D + L2 + NY + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Pg + " +k=1" + O + N + M + F + E + A, 1, D + L2 + NZ + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Lf + " +k=1" + O + N + M + F + E + A, 1, D + L2 + KG + " +k=1" + O + N + M + F + E + A, 1, D + L2 + KH + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Lh + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Gl + " +k=1" + IM + N + M + F + E + A, 1, D + L2 + II + " +k=1" + MS + N + M + F + E + A, 1, D + L2 + HO + " +k=1" + MT + N + M + F + E + A, 1, D + L2 + Ia + " +k=1" + LY + N + M + F + E + A, 1, D + L2 + IG + " +k=1" + Jp + N + M + F + E + A, 1, D + L2 + PN + " +k=1" + LZ + N + M + F + E + A, 1, D + L2 + LN + " +k=1" + HU + N + M + F + E + A, 1, D + L2 + PO + " +k=1" + Gw + N + M + F + E + A, 1, D + L2 + JS + " +k=1" + Hu + N + M + F + E + A, 1, D + L2 + SQ + " +k=1" + Hv + N + M + F + E + A, 1, D + L2 + PS + " +k=1" + It + N + M + F + E + A, 1, D + L2 + SR + " +k=1" + Hs + N + M + F + E + A, 1, D + L2 + RL + " +k=1" + Ht + N + M + F + E + A, 1, D + L2 + " +lon_0=60 +k=1" + HV + N + M + F + E + A, 1, D + L2 + QW + " +k=1" + Hw + N + M + F + E + A, 1, D + L2 + UH + " +k=1" + HW + N + M + F + E + A, 1, D + L2 + RM + " +k=1" + Hx + N + M + F + E + A, 1, D + L2 + Yt + " +k=1" + La + N + M + F + E + A, 1, D + L2 + HP + " +k=1" + Hy + N + M + F + E + A, 1, D + L2 + Lt + " +k=1" + Hz + N + M + F + E + A, 1, D + L2 + HQ + " +k=1" + IA + N + M + F + E + A, 1, D + L2 + Ni + " +k=1" + IB + N + M + F + E + A, 1, D + L2 + Hd + " +k=1" + Gx + N + M + F + E + A, 1, D + L2 + Hq + " +k=1" + IT + N + M + F + E + A, 1, D + L2 + HR + " +k=1" + Gc + N + M + F + E + A, 1, D + L2 + Mj + " +k=1" + IU + N + M + F + E + A, 1, D + L2 + HS + " +k=1" + Iu + N + M + F + E + A, 2, D + L2 + Jj + " +k=1" + Mu + N + M + F + E + A, 1, D + L2 + EN + " +k=1" + Mv + N + M + F + E + A, 1, D + L2 + Le + " +k=1" + Mw + N + M + F + E + A, 1, D + L2 + Fy + " +k=1" + Mx + N + M + F + E + A, 1, D + L2 + Im + " +k=1" + My + N + M + F + E + A, 1, D + L2 + Fm + " +k=1" + Mz + N + M + F + E + A, 1, D + L2 + KF + " +k=1" + NA + N + M + F + E + A, 1, D + L2 + Fr + " +k=1" + NB + N + M + F + E + A, 1, D + L2 + Jk + " +k=1" + Oh + N + M + F + E + A, 1, D + L2 + Ed + " +k=1" + NC + N + M + F + E + A, 1, D + L2 + Il + " +k=1" + Oi + N + M + F + E + A, 1, D + L2 + Fn + " +k=1" + ND + N + M + F + E + A, 1, D + L2 + Rx + " +k=1 +x_0=46500000" + N + M + F + E + A, 1, D + L2 + Pf + " +k=1" + ZK + N + M + F + E + A, 1, D + L2 + UN + " +k=1 +x_0=48500000" + N + M + F + E + A, 1, D + L2 + Od + " +k=1 +x_0=49500000" + N + M + F + E + A, 1, D + L2 + Oe + " +k=1 +x_0=50500000" + N + M + F + E + A, 1, D + L2 + NY + " +k=1 +x_0=51500000" + N + M + F + E + A, 1, D + L2 + ZS + " +k=1 +x_0=52500000" + N + M + F + E + A, 1, D + L2 + Pg + " +k=1 +x_0=53500000" + N + M + F + E + A, 1, D + L2 + Ql + " +k=1 +x_0=54500000" + N + M + F + E + A, 1, D + L2 + NZ + " +k=1 +x_0=55500000" + N + M + F + E + A, 1, D + L2 + UO + " +k=1 +x_0=56500000" + N + M + F + E + A, 1, D + L2 + Lf + " +k=1 +x_0=57500000" + N + M + F + E + A, 1, D + L2 + UP + " +k=1 +x_0=58500000" + N + M + F + E + A, 1, D + L2 + KG + " +k=1 +x_0=59500000" + N + M + F + E + A, 2, D + L2 + KH + " +k=1 +x_0=61500000" + N + M + F + E + A, 1, D + L2 + SU + " +k=1 +x_0=62500000" + N + M + F + E + A, 1, D + L2 + Lh + " +k=1 +x_0=63500000" + N + M + F + E + A, 1, D + L2 + SV + " +k=1 +x_0=64500000" + N + M + F + E + A, 1, D + L2 + Gl + " +k=1" + O + N + M + F + E + A, 1, D + L2 + II + " +k=1" + O + N + M + F + E + A, 1, D + L2 + HO + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Ia + " +k=1" + O + N + M + F + E + A, 1, D + L2 + IG + " +k=1" + O + N + M + F + E + A, 1, D + L2 + PN + " +k=1" + O + N + M + F + E + A, 1, D + L2 + LN + " +k=1" + O + N + M + F + E + A, 1, D + L2 + PO + " +k=1" + O + N + M + F + E + A, 1, D + L2 + JS + " +k=1" + O + N + M + F + E + A, 1, D + L2 + SQ + " +k=1" + O + N + M + F + E + A, 1, D + L2 + PS + " +k=1" + O + N + M + F + E + A, 1, D + L2 + SR + " +k=1" + O + N + M + F + E + A, 1, D + L2 + RL + " +k=1" + O + N + M + F + E + A, 1, D + L2 + " +lon_0=60 +k=1" + O + N + M + F + E + A, 1, D + L2 + QW + " +k=1" + O + N + M + F + E + A, 1, D + L2 + UH + " +k=1" + O + N + M + F + E + A, 1, D + L2 + RM + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Yt + " +k=1" + O + N + M + F + E + A, 2, D + L2 + HP + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Lt + " +k=1" + O + N + M + F + E + A, 1, D + L2 + HQ + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Ni + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Hd + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Hq + " +k=1" + O + N + M + F + E + A, 1, D + L2 + HR + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Mj + " +k=1" + O + N + M + F + E + A, 1, D + L2 + HS + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Jj + " +k=1" + O + N + M + F + E + A, 1, D + L2 + EN + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Le + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Fy + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Im + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Fm + " +k=1" + O + N + M + F + E + A, 1, D + L2 + KF + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Fr + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Jk + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Ed + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Il + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Fn + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Rx + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Pf + " +k=1" + O + N + M + F + E + A, 1, D + L2 + UN + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Od + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Oe + " +k=1" + O + N + M + F + E + A, 1, D + L2 + NY + " +k=1" + O + N + M + F + E + A, 1, D + L2 + ZS + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Pg + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Ql + " +k=1" + O + N + M + F + E + A, 1, D + L2 + NZ + " +k=1" + O + N + M + F + E + A, 1, D + L2 + UO + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Lf + " +k=1" + O + N + M + F + E + A, 1, D + L2 + UP + " +k=1" + O + N + M + F + E + A, 1, D + L2 + KG + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Ry + " +k=1" + O + N + M + F + E + A, 1, D + L2 + KH + " +k=1" + O + N + M + F + E + A, 1, D + L2 + SU + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Lh + " +k=1" + O + N + M + F + E + A, 1, D + L2 + SV + " +k=1" + O + N + M + F + E + A, 1, D + L2 + Gl + " +k=1" + IM + N + M + G + E + A, 1, D + L2 + II + " +k=1" + MS + N + M + G + E + A, 1, D + L2 + HO + " +k=1" + MT + N + M + G + E + A, 1, D + L2 + Ia + " +k=1" + LY + N + M + G + E + A, 1, D + L2 + IG + " +k=1" + Jp + N + M + G + E + A, 1, D + L2 + PN + " +k=1" + LZ + N + M + G + E + A, 1, D + L2 + LN + " +k=1" + HU + N + M + G + E + A, 1, D + L2 + PO + " +k=1" + Gw + N + M + G + E + A, 1, D + L2 + JS + " +k=1" + Hu + N + M + G + E + A, 1, D + L2 + SQ + " +k=1" + Hv + N + M + G + E + A, 1, D + L2 + PS + " +k=1" + It + N + M + G + E + A, 1, D + L2 + SR + " +k=1" + Hs + N + M + G + E + A, 1, D + L2 + RL + " +k=1" + Ht + N + M + G + E + A, 1, D + L2 + " +lon_0=60 +k=1" + HV + N + M + G + E + A, 1, D + L2 + QW + " +k=1" + Hw + N + M + G + E + A, 1, D + L2 + UH + " +k=1" + HW + N + M + G + E + A, 1, D + L2 + RM + " +k=1" + Hx + N + M + G + E + A, 1, D + L2 + Yt + " +k=1" + La + N + M + G + E + A, 1, D + L2 + HP + " +k=1" + Hy + N + M + G + E + A, 1, D + L2 + Lt + " +k=1" + Hz + N + M + G + E + A, 1, D + L2 + HQ + " +k=1" + IA + N + M + G + E + A, 1, D + L2 + Ni + " +k=1" + IB + N + M + G + E + A, 1, D + L2 + Hd + " +k=1" + Gx + N + M + G + E + A, 1, D + L2 + Hq + " +k=1" + IT + N + M + G + E + A, 1, D + L2 + HR + " +k=1" + Gc + N + M + G + E + A, 1, D + L2 + Mj + " +k=1" + IU + N + M + G + E + A, 1, D + L2 + HS + " +k=1" + Iu + N + M + G + E + A, 1, D + L2 + Jj + " +k=1" + Mu + N + M + G + E + A, 1, D + L2 + EN + " +k=1" + Mv + N + M + G + E + A, 1, D + L2 + Le + " +k=1" + Mw + N + M + G + E + A, 1, D + L2 + Fy + " +k=1" + Mx + N + M + G + E + A, 1, D + L2 + Im + " +k=1" + My + N + M + G + E + A, 1, D + L2 + Fm + " +k=1" + Mz + N + M + G + E + A, 1, D + L2 + KF + " +k=1" + NA + N + M + G + E + A, 1, D + L2 + Fr + " +k=1" + NB + N + M + G + E + A, 1, D + L2 + Jk + " +k=1" + Oh + N + M + G + E + A, 1, D + L2 + Ed + " +k=1" + NC + N + M + G + E + A, 1, D + L2 + Il + " +k=1" + Oi + N + M + G + E + A, 1, D + L2 + Fn + " +k=1" + ND + N + M + G + E + A, 1, D + L2 + Rx + " +k=1 +x_0=46500000" + N + M + G + E + A, 1, D + L2 + Pf + " +k=1" + ZK + N + M + G + E + A, 1, D + L2 + UN + " +k=1 +x_0=48500000" + N + M + G + E + A, 1, D + L2 + Od + " +k=1 +x_0=49500000" + N + M + G + E + A, 1, D + L2 + Oe + " +k=1 +x_0=50500000" + N + M + G + E + A, 1, D + L2 + NY + " +k=1 +x_0=51500000" + N + M + G + E + A, 1, D + L2 + ZS + " +k=1 +x_0=52500000" + N + M + G + E + A, 1, D + L2 + Pg + " +k=1 +x_0=53500000" + N + M + G + E + A, 1, D + L2 + Ql + " +k=1 +x_0=54500000" + N + M + G + E + A, 1, D + L2 + NZ + " +k=1 +x_0=55500000" + N + M + G + E + A, 1, D + L2 + UO + " +k=1 +x_0=56500000" + N + M + G + E + A, 1, D + L2 + Lf + " +k=1 +x_0=57500000" + N + M + G + E + A, 1, D + L2 + UP + " +k=1 +x_0=58500000" + N + M + G + E + A, 1, D + L2 + KG + " +k=1 +x_0=59500000" + N + M + G + E + A, 2, D + L2 + KH + " +k=1 +x_0=61500000" + N + M + G + E + A, 1, D + L2 + SU + " +k=1 +x_0=62500000" + N + M + G + E + A, 1, D + L2 + Lh + " +k=1 +x_0=63500000" + N + M + G + E + A, 1, D + L2 + SV + " +k=1 +x_0=64500000" + N + M + G + E + A, 1, D + L2 + Gl + " +k=1" + O + N + M + G + E + A, 1, D + L2 + II + " +k=1" + O + N + M + G + E + A, 1, D + L2 + HO + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Ia + " +k=1" + O + N + M + G + E + A, 1, D + L2 + IG + " +k=1" + O + N + M + G + E + A, 1, D + L2 + PN + " +k=1" + O + N + M + G + E + A, 1, D + L2 + LN + " +k=1" + O + N + M + G + E + A, 1, D + L2 + PO + " +k=1" + O + N + M + G + E + A, 1, D + L2 + JS + " +k=1" + O + N + M + G + E + A, 1, D + L2 + SQ + " +k=1" + O + N + M + G + E + A, 1, D + L2 + PS + " +k=1" + O + N + M + G + E + A, 1, D + L2 + SR + " +k=1" + O + N + M + G + E + A, 1, D + L2 + RL + " +k=1" + O + N + M + G + E + A, 1, D + L2 + " +lon_0=60 +k=1" + O + N + M + G + E + A, 1, D + L2 + QW + " +k=1" + O + N + M + G + E + A, 1, D + L2 + UH + " +k=1" + O + N + M + G + E + A, 1, D + L2 + RM + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Yt + " +k=1" + O + N + M + G + E + A, 1, D + L2 + HP + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Lt + " +k=1" + O + N + M + G + E + A, 1, D + L2 + HQ + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Ni + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Hd + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Hq + " +k=1" + O + N + M + G + E + A, 1, D + L2 + HR + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Mj + " +k=1" + O + N + M + G + E + A, 1, D + L2 + HS + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Jj + " +k=1" + O + N + M + G + E + A, 1, D + L2 + EN + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Le + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Fy + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Im + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Fm + " +k=1" + O + N + M + G + E + A, 1, D + L2 + KF + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Fr + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Jk + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Ed + " +k=1" + O + N + M + G + E + A, 1, I + Mf + o + i + HF + E + A, 1, I + KD + o + i + HF + E + A, 1, D + L2 + Il + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Fn + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Rx + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Pf + " +k=1" + O + N + M + G + E + A, 1, D + L2 + UN + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Od + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Oe + " +k=1" + O + N + M + G + E + A, 1, D + L2 + NY + " +k=1" + O + N + M + G + E + A, 1, D + L2 + ZS + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Pg + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Ql + " +k=1" + O + N + M + G + E + A, 1, D + L2 + NZ + " +k=1" + O + N + M + G + E + A, 1, D + L2 + UO + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Lf + " +k=1" + O + N + M + G + E + A, 1, D + L2 + UP + " +k=1" + O + N + M + G + E + A, 1, D + L2 + KG + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Ry + " +k=1" + O + N + M + G + E + A, 1, D + L2 + KH + " +k=1" + O + N + M + G + E + A, 1, D + L2 + SU + " +k=1" + O + N + M + G + E + A, 1, D + L2 + Lh + " +k=1" + O + N + M + G + E + A, 1, D + L2 + SV + " +k=1" + O + N + M + G + E + A, 1, D + IY + IV + Pc + h + N + C + B + E + A, 1, D + Gm + OS + BG + a + N + C + B + E + A, 1, D + Bl + Cn + V + EX + N + C + B + E + A, 1, D + Bl + Co + V + EX + N + C + B + E + A, 1, D + Bl + Iv + BG + EX + N + C + B + E + A, 1, H + Dx + Dy + BC + IF + u + N + C + B + E + A, 1, H + Dz + Mq + EA + IF + u + Is + C + B + E + A, 1, H + DW + Jn + y + HA + Bd + Ae + C + B + E + A, 1, H + DX + DY + AA + HA + Bd + Ae + C + B + E + A, 1, H + Ap + DZ + Ml + AJ + Bd + Ae + C + B + E + A, 1, H + LO + QS + Da + Mm + Bd + Ae + C + B + E + A, 1, H + Db + Dc + Mn + Ir + Bd + Ae + C + B + E + A, 1, H + Dd + De + Df + Iw + Bd + Ae + C + B + E + A, 1, H + Eh + Ei + y + Ba + Fw + Fx + C + B + E + A, 1, H + LP + LQ + CY + Ba + Fw + Fx + C + B + E + A, 1, H + Ap + Dg + f + Ba + Fw + Fx + C + B + E + A, 1, H + Dh + Mo + Di + Jq + QG + QH + C + B + E + A, 1, D + Ch + Cp + Mp + h + N + C + B + E + A, 1, D + Aq + CR + Am + h + N + C + B + E + A, 1, D + Aq + Ob + Am + h + N + C + B + E + A, 1, H + LR + Dj + QT + LS + a + N + C + B + E + A, 1, D + Gm + Cq + V + h + N + C + B + E + A, 1, D + Gm + Cr + V + EW + N + C + B + E + A, 1, D + Kn + Sf + AO + O + N + C + B + E + A, 1, D + Ko + KO + AO + O + N + C + B + E + A, 1, D + GV + KI + Jl + O + N + C + B + E + A, 1, D + Kp + Sg + Jl + O + N + C + B + E + A, 1, D + Kq + KP + " +k=1" + O + N + C + B + E + A, 1, D + p + Cs + BJ + h + N + C + B + E + A, 1, D + p + Jb + BJ + O + N + C + B + E + A, 1, D + p + Ix + BG + CX + N + C + B + E + A, 1, D + f + Cz + EQ + AI + N + C + B + E + A, 1, D + f + DA + Am + EW + N + C + B + E + A, 1, D + DM + DB + AO + BU + KJ + C + B + E + A, 1, D + DM + DC + AO + HT + KJ + C + B + E + A, 1, H + EB + EC + Fo + GG + AV + AH + C + B + E + A, 1, H + AY + ED + Fs + GG + O + N + C + B + E + A, 1, H + EE + EF + AQ + Fl + u + N + C + B + E + A, 1, H + EG + EH + f + CV + u + Is + C + B + E + A, 1, H + Az + DV + DM + Jo + O + N + C + B + E + A, 1, H + Ej + Ek + AB + EY + O + Ae + C + B + E + A, 1, H + FS + FT + IY + Hg + BZ + N + C + B + E + A, 1, H + OH + OI + OJ + Bi + BZ + N + C + B + E + A, 1, D + AK + HJ + V + AI + N + C + B + E + A, 1, D + BD + DD + AO + HT + N + C + B + E + A, 1, H + MU + Nz + AA + Ld + u + N + C + B + E + A, 1, H + El + Dk + Ip + GE + h + Mk + C + B + E + A, 1, H + Em + En + Ip + IL + O + N + C + B + E + A, 1, H + Eo + Ep + Eq + Jh + Tl + N + C + B + E + A, 1, H + OA + Er + Es + BE + Pk + N + C + B + E + A, 1, H + Bq + OB + Fo + BE + LU + N + C + B + E + A, 1, H + FU + FV + Iq + DE + CX + EK + C + B + E + A, 1, H + Ma + FW + IP + Js + CX + EK + C + B + E + A, 1, H + FX + FY + Nj + Na + CX + EK + C + B + E + A, 1, D + Hj + Ct + CP + AI + N + C + B + E + A, 1, D + Hj + Bx + CP + EW + N + C + B + E + A, 1, D + Cd + RS + BG + Bv + N + C + B + E + A, 1, D + Cd + Hg + BG + O + N + C + B + E + A, 1, D + Id + RT + Am + YC + N + C + B + E + A, 1, H + LM + RK + MV + IS + a + N + C + B + E + A, 1, H + JT + Jn + FZ + CS + O + N + C + B + E + A, 1, D + CQ + DF + V + h + Tm + C + B + E + A, 1, D + CQ + DG + V + O + Hh + C + B + E + A, 1, D + CQ + DH + V + CX + LV + C + B + E + A, 1, D + Fp + DI + AO + AI + N + C + B + E + A, 1, D + BA + Gp + V + Bn + N + C + B + E + A, 1, D + Bl + Cu + Hm + OC + N + C + B + E + A, 1, D + Bl + Iy + V + O + N + C + B + E + A, 1, D + Bl + Cv + Iz + YD + N + C + B + E + A, 1, D + BA + Gp + V + Bn + N + C + B + E + A, 1, D + Fs + Cw + Ad + Bv + N + C + B + E + A, 1, D + Fs + Cx + Ad + Qo + N + C + B + E + A, 1, H + Dl + Dm + BB + Oc + AI + N + C + B + E + A, 1, H + BH + Ev + Ib + EZ + a + N + C + B + E + A, 1, H + Ew + Ex + Be + EZ + a + N + C + B + E + A, 1, H + OK + Fa + BY + ET + a + N + C + B + E + A, 1, H + Fb + Fc + Ch + ET + a + N + C + B + E + A, 1, H + Dn + Ey + QU + Fl + a + N + C + B + E + A, 1, H + Ez + FA + Do + Fl + a + N + C + B + E + A, 1, H + PP + CZ + AK + AJ + Ci + N + C + B + E + A, 1, H + PQ + Ca + p + AJ + AV + N + C + B + E + A, 1, D + EI + GE + Lb + BU + N + C + B + E + A, 1, H + Fd + Fe + AL + CS + a + N + C + B + E + A, 1, H + OL + Ff + EJ + Ag + a + N + C + B + E + A, 1, H + FD + MX + BC + MQ + a + N + C + B + E + A, 1, H + FE + MY + QV + Jr + h + AH + C + B + E + A, 1, H + FF + FG + Ds + CV + a + Cl + C + B + E + A, 1, H + FH + FI + Cb + Ag + EW + Fq + C + B + E + A, 1, H + FJ + FK + Dt + Ji + a + LV + C + B + E + A, 1, H + CD + CE + Cc + CV + AI + Ju + C + B + E + A, 1, H + AY + CF + Br + BI + O + AH + C + B + E + A, 1, H + JF + CG + AQ + BI + O + Cl + C + B + E + A, 1, H + JG + CH + f + BI + O + Fq + C + B + E + A, 1, D + Fp + LW + JA + O + N + C + B + E + A, 1, H + OF + FL + AA + GF + Bo + Cl + C + B + E + A, 1, H + Az + Du + AB + GF + Bo + AH + C + B + E + A, 1, H + BH + OG + Ib + Cy + O + N + C + B + E + A, 1, H + FM + FN + Dv + AJ + O + N + C + B + E + A, 1, H + Mb + RN + Mr + Ga + a + N + C + B + E + A, 1, H + Fg + Fh + QX + CR + a + N + C + B + E + A, 1, H + FO + FP + Dw + Bu + a + N + C + B + E + A, 1, H + Jc + MZ + AL + Bu + a + N + C + B + E + A, 1, H + FQ + FR + PR + Bu + a + N + C + B + E + A, 1, D + CA + DJ + Ad + h + N + C + B + E + A, 1, D + CA + DK + Ad + u + EK + C + B + E + A, 1, D + CA + JB + Ad + a + N + C + B + E + A, 1, D + CA + DL + Ad + CX + EK + C + B + E + A, 1, H + GW + GX + GY + GA + h + IK + C + B + E + A, 1, D + Bl + Cn + V + EX + N + C + B + t + A, 1, D + Bl + Co + V + EX + N + C + B + t + A, 1, D + Bl + Iv + BG + EX + N + C + B + t + A, 1, H + DW + Jn + y + HA + Ac + AD + C + B + J + A, 1, H + DX + DY + AA + HA + Ac + AD + C + B + J + A, 1, H + Ap + DZ + Ml + AJ + Ac + AD + C + B + J + A, 1, H + LO + QS + Da + Mm + Ac + AD + C + B + J + A, 1, H + Db + Dc + Mn + Ir + Ac + AD + C + B + J + A, 1, H + Dd + De + Df + Iw + Ac + AD + C + B + J + A, 1, H + Eh + Ei + y + Ba + Bw + CL + C + B + J + A, 1, H + LP + LQ + CY + Ba + Bw + CL + C + B + J + A, 1, H + Ap + Dg + f + Ba + Bw + CL + C + B + J + A, 1, H + Dh + Mo + Di + Jq + MC + MD + C + B + J + A, 1, D + Ch + Cp + Mp + AE + N + C + B + J + A, 1, D + Aq + CR + Am + AE + N + C + B + J + A, 1, D + Aq + Ob + Am + AE + N + C + B + J + A, 1, H + LR + Dj + QT + LS + a + N + C + B + J + A, 1, D + Gm + Cq + V + AE + N + C + B + J + A, 1, D + Gm + Cr + V + CM + N + C + B + J + A, 1, D + p + Cs + BJ + AE + N + C + B + J + A, 1, D + p + Jb + BJ + AF + N + C + B + J + A, 1, D + p + Ix + BG + ME + N + C + B + J + A, 3, H + Az + DV + DM + Jo + AF + N + C + B + J + A, 1, H + Ej + Ek + AB + EY + AF + AD + C + B + J + A, 1, H + MU + Nz + AA + Ld + MF + N + C + B + J + A, 1, H + El + Dk + Ip + GE + AE + Mk + C + B + J + A, 1, H + Em + En + Ip + IL + AF + N + C + B + J + A, 1, H + Eo + Ep + Eq + Jh + MG + N + C + B + t + A, 1, H + OA + Er + Es + BE + MH + N + C + B + t + A, 1, H + Bq + OB + Fo + BE + OT + N + C + B + t + A, 1, D + Hj + Ct + CP + BF + N + C + B + J + A, 1, D + Hj + Bx + CP + CM + N + C + B + J + A, 1, H + LM + RK + MV + IS + DR + N + C + B + t + A, 1, D + Bl + Cu + Hm + OC + N + C + B + J + A, 1, D + Bl + Iy + V + AF + N + C + B + J + A, 1, D + Bl + Cv + Iz + MI + N + C + B + J + A, 1, D + BA + Gp + V + Bn + N + C + B + J + A, 1, D + Fs + Cw + Ad + MJ + N + C + B + J + A, 1, D + Fs + Cx + Ad + MK + N + C + B + J + A, 1, H + Dl + Dm + BB + Oc + BF + N + C + B + J + A, 1, H + BH + Ev + Ib + EZ + DR + N + C + B + t + A, 1, H + Ew + Ex + Be + EZ + DR + N + C + B + t + A, 1, H + Dn + Ey + QU + Fl + a + N + C + B + J + A, 1, H + Ez + FA + Do + Fl + a + N + C + B + J + A, 1, H + PP + CZ + AK + AJ + KL + N + C + B + t + A, 1, H + PQ + Ca + p + AJ + KM + N + C + B + t + A, 1, H + FD + MX + BC + MQ + a + N + C + B + J + A, 1, H + FE + MY + QV + Jr + AE + CN + C + B + J + A, 1, H + FF + FG + Ds + CV + a + Gr + C + B + J + A, 1, H + FH + FI + Cb + Ag + CM + Fq + C + B + J + A, 1, H + FJ + FK + Dt + Ji + a + Ne + C + B + J + A, 1, H + CD + CE + Cc + CV + BF + Nf + C + B + J + A, 1, H + AY + CF + Br + BI + Gd + Pw + C + B + t + A, 1, H + JF + CG + AQ + BI + Gd + RY + C + B + t + A, 1, H + JG + CH + f + BI + Gd + RZ + C + B + t + A, 1, H + OF + FL + AA + GF + Gs + Gr + C + B + J + A, 1, H + Az + Du + AB + GF + Gs + CN + C + B + J + A, 1, H + BH + OG + Ib + Cy + AF + N + C + B + J + A, 1, H + FM + FN + Dv + AJ + AF + N + C + B + J + A, 1, H + FO + FP + Dw + Bu + a + N + C + B + J + A, 1, H + Jc + MZ + AL + Bu + a + N + C + B + J + A, 1, H + FQ + FR + PR + Bu + a + N + C + B + J + A, 1, D + L2 + " +lon_0=13" + AP + O + N + AU + BN + Sy + E + A, 1, D + " +lat_0=24.45" + Vv + Jl + h + Hk + R + Jy + E + A, 1, I + NS + o + Y + Hf + E + A, 2, D + KQ + " +lon_0=41.53333333333333 +k=1 +x_0=1300000" + N + M + F + E + A, 1, D + KQ + " +lon_0=44.53333333333333 +k=1" + aB + N + M + F + E + A, 1, D + KQ + " +lon_0=47.53333333333333 +k=1" + aC + N + M + F + E + A, 1, D + KQ + " +lon_0=50.53333333333333 +k=1" + aD + N + M + F + E + A, 1, D + Ol + " +lon_0=50.76666666666667 +k=1" + aB + N + M + F + E + A, 1, D + Ol + " +lon_0=53.76666666666667 +k=1" + aC + N + M + F + E + A, 1, D + Ol + " +lon_0=56.76666666666667 +k=1" + aD + N + M + F + E + A, 1, I + Ja + R + SE + E + A, 1, I + Ja + R + Sz + E + A, 2, D + L2 + Tf + V + Ab + N + C + B + E + A, 1, D + L2 + RQ + V + Ab + N + C + B + E + A, 1, D + L2 + RR + V + Ab + N + C + B + E + A, 1, D + L2 + Tg + V + Ab + N + C + B + E + A, 1, D + L2 + IL + V + Ab + N + C + B + E + A, 1, D + L2 + Th + V + Ab + N + C + B + E + A, 1, D + L2 + Ti + V + Ab + N + C + B + E + A, 1, D + L2 + Ga + V + Ab + N + C + B + E + A, 1, GU + Iq + Zy + ST + Ci + aE + C + B + E + A, 1, GU + " +lat_0=47.25" + Qk + ST + u + CO + C + B + E + A, 1, I + Ns + C + B + E + A, 1, I + Nt + C + B + E + A, 1, I + Nu + C + B + E + A, 1, I + Ik + C + B + E + A, 1, I + IC + C + B + E + A, 1, I + Hi + C + B + E + A, 1, I + Gz + C + B + E + A, 1, I + ID + C + B + E + A, 2, DT + " +lat_1=55" + QY + Yu + Ms + s + N + X + J + A, 1, D + DM + DB + AO + MM + GI + C + B + J + A, 1, D + DM + DC + AO + HT + GI + C + B + J + A, 1, D + DM + DB + AO + MM + GI + C + B + J + A, 1, D + DM + DC + AO + HT + GI + C + B + J + A, 1, I + Gz + R + TA + E + A, 1, I + Gz + R + SF + E + A, 1, I + Io + R + NH + E + A, 1, I + Io + C + B + E + A, 1, I + Gz + R + TO + E + A, 2, I + Me + o + C + B + E + A, 1, I + Ro + o + R + TP + E + A, 1, I + RG + o + R + Lr + E + A, 1, I + RH + o + R + UD + E + A, 2, I + JZ + o + R + SG + E + A, 1, I + MA + o + R + QM + E + A, 6, I + ID + i + TZ + E + A, 1, I + SK + o + R + SH + E + A, 3, H + JT + Hl + GH + AJ + u + N + C + B + E + A, 1, H + JT + Hl + GH + AJ + Lc + N + C + B + t + A, 1, H + JT + Hl + GH + AJ + u + N + C + B + E + A, 1, H + JT + Hl + GH + AJ + Lc + N + C + B + t + A, 1, I + MA + o + R + Jf + E + A, 1, I + MA + o + R + TB + E + A, 1, I + MA + o + R + Ke + E + A, 1, I + MA + o + R + HH + E + A, 1, I + JZ + o + R + SI + E + A, 1, JU + " +lon_0=110" + ZP + Pl + Qp + Y + Hf + E + A, 1, JU + " +lon_0=110" + ZP + Pl + Qp + Y + Cj + E + A, 1, JU + " +lon_0=110" + ZP + Pl + Qp + Y + HZ + E + A, 1, D + L2 + KB + AP + AV + N + R + CK + E + A, 1, D + L2 + Gj + AP + " +x_0=2520000" + N + R + CK + E + A, 1, DT + Yv + " +lat_2=58.5" + IP + " +lon_0=-126" + BZ + N + C + B + E + A, 1, I + KC + C + B + E + A, 1, D + L2 + IH + " +k=1" + Bn + N + C + B + E + A, 1, D + L2 + " +lon_0=13.5 +k=1" + Bn + N + C + B + E + A, 1, D + L2 + Gj + " +k=1" + Bn + N + C + B + E + A, 1, D + L2 + YE + " +k=1" + Bn + N + C + B + E + A, 1, D + L2 + QR + " +k=1" + Bn + N + C + B + E + A, 1, D + L2 + " +lon_0=14.25 +k=1" + Bn + N + C + B + E + A, 1, D + L2 + " +lon_0=15.75 +k=1" + Bn + N + C + B + E + A, 1, D + L2 + " +lon_0=17.25 +k=1" + Bn + N + C + B + E + A, 1, D + L2 + " +lon_0=18.75 +k=1" + Bn + N + C + B + E + A, 1, D + L2 + " +lon_0=20.25 +k=1" + Bn + N + C + B + E + A, 1, D + L2 + " +lon_0=21.75 +k=1" + Bn + N + C + B + E + A, 1, D + L2 + " +lon_0=23.25 +k=1" + Bn + N + C + B + E + A, 1, D + L2 + Vw + " +k=1" + AV + N + Y + BW + E + A, 1, D + L2 + Vx + " +k=1" + AV + N + Y + BW + E + A, 1, D + L2 + Vy + " +k=1" + AV + N + Y + BW + E + A, 1, D + L2 + Vz + " +k=1" + AV + N + Y + BW + E + A, 1, D + L2 + WA + " +k=1" + AV + N + Y + BW + E + A, 1, D + L2 + WB + " +k=1" + AV + N + Y + BW + E + A, 1, D + L2 + Vw + " +k=1" + AV + N + Y + E + A, 1, D + L2 + Vx + " +k=1" + AV + N + Y + E + A, 1, D + L2 + Vy + " +k=1" + AV + N + Y + E + A, 1, D + L2 + Vz + " +k=1" + AV + N + Y + E + A, 1, D + L2 + WA + " +k=1" + AV + N + Y + E + A, 1, D + L2 + WB + " +k=1" + AV + N + Y + E + A, 1, BP + m + " +lat_ts=-71" + HN + " +k=1" + s + N + S + E + A, 1, BP + m + " +lat_ts=-71 +lon_0=70 +k=1" + Pk + Hh + S + E + A, 1, H + " +lat_1=-68.5 +lat_2=-74.5 +lat_0=-50 +lon_0=70" + Pk + Hh + S + E + A, 1, H + Yw + QY + PU + Lu + LU + RU + C + B + E + A, 1, He + PU + Lu + RV + RW + C + B + E + A, 1, I + Mf + o + j + KR + E + A, 1, I + KD + o + j + KR + E + A, 3, I + Ja + C + B + E + A, 1, I + KA + C + B + E + A, 1, I + Oq + C + B + E + A, 1, I + QD + C + B + E + A, 1, I + JN + C + B + E + A, 1, I + KC + C + B + E + A, 1, I + NR + C + B + E + A, 1, I + Ki + C + B + E + A, 1, I + Mf + C + B + E + A, 1, I + KD + C + B + E + A, 5, I + Os + R + Jd + E + A, 1, I + SL + R + Jd + E + A, 1, I + Ja + R + Jd + E + A, 1, H + " +lat_1=64.25 +lat_2=65.75 +lat_0=65 +lon_0=-19" + O + Ae + C + B + E + A, 1, D + L2 + " +lon_0=-8.5 +k=1" + Jm + " +y_0=-7800000" + R + Jz + E + A, 1, D + L2 + II + AP + O + " +y_0=-6000000" + C + B + E + A, 1, I + MA + o + R + Qc + E + A, 1, I + Ja + R + PI + E + A, 1, I + Os + R + Pt + E + A, 1, I + Os + R + Pa + E + A, 1, I + JN + j + B + E + A, 1, I + KC + j + B + E + A, 1, D + L2 + " +lon_0=37" + UG + O + ZL + R + n + E + A, 1, I + Ki + C + B + E + A, 1, Ck + " +lat_0=52.41864827777778 +lon_0=13.62720366666667" + Of + " +y_0=10000" + Y + AC + E + A, 1, D + L2 + Bu + AP + O + " +y_0=-4500000" + X + E + A, 1, D + L2 + Bu + AP + YF + Sh + C + B + E + A, 1, D + L2 + Bu + AP + YF + Sh + C + B + E + A, 1, D + AL + Rf + JE + EW + N + C + B + E + A, 2, D + BD + Rg + JE + AI + N + C + B + E + A, 1, D + AL + Rf + JE + EW + N + C + B + E + A, 2, D + BD + Rg + JE + AI + N + C + B + E + A, 1, CU + Kr + " +lonc=-86" + QI + AP + QJ + PY + KE + QK + C + B + E + A, 1, CU + Kr + " +lonc=-86" + QI + AP + QJ + PY + KE + QK + C + B + E + A, 1, H + WC + WD + WE + CS + " +x_0=914400 +y_0=914400" + X + t + A, 1, H + WC + WD + WE + CS + BZ + AH + C + B + E + A, 1, H + OM + RO + OX + CS + AV + Ju + C + B + E + A, 1, DT + OM + RO + OX + CS + AV + Hh + C + B + E + A, 1, H + OM + RO + OX + CS + AV + Ju + C + B + E + A, 1, DT + OM + RO + OX + CS + AV + Hh + C + B + E + A, 1, DT + " +lat_1=24" + YG + " +lat_0=24" + NV + u + N + C + B + E + A, 1, DT + " +lat_1=24" + YG + " +lat_0=24" + NV + u + N + C + B + E + A, 1, H + Fi + Fj + AB + EY + AV + AH + C + B + E + A, 1, H + Fi + Fj + AB + EY + AV + CN + C + B + J + A, 1, H + Fi + Fj + AB + EY + AV + AH + C + B + E + A, 1, H + Fi + Fj + AB + EY + AV + CN + C + B + J + A, 1, I + Mg + Y + g + E + A, 1, I + NT + Y + g + E + A, 1, I + Ot + Y + g + E + A, 1, I + Nv + Y + g + E + A, 1, I + PM + Y + g + E + A, 1, I + Mg + C + B + E + A, 1, I + NT + C + B + E + A, 1, I + Ot + C + B + E + A, 1, I + Nv + C + B + E + A, 1, I + PM + C + B + E + A, 1, H + " +lat_1=-14.26666666666667 +lat_0=-14.26666666666667" + SW + " +k_0=1" + e + " +y_0=95169.31165862332" + i + TC + J + A, 4, D + L2 + Hq + AP + O + N + By + Ay + RF + E + A, 1, H + " +lat_1=-28" + ZT + " +lat_0=-32" + Fn + BZ + Cl + C + B + E + A, 1, D + SS + " +lon_0=-2.416666666666667 +k=0.999997 +x_0=47000" + Rz + C + B + E + A, 1, D + " +lat_0=49.225 +lon_0=-2.135 +k=0.9999999000000001" + Of + " +y_0=70000" + C + B + E + A, 1, H + " +lat_1=-36 +lat_2=-38 +lat_0=-37 +lon_0=145" + Ci + Gb + x + r + E + A, 1, H + " +lat_1=-36 +lat_2=-38 +lat_0=-37 +lon_0=145" + Ci + JH + C + B + E + A, 1, H + " +lat_1=-18" + ZT + L2 + " +lon_0=134" + s + N + C + B + E + A, 1, D + " +lat_0=-28" + NY + Jl + Jm + EK + C + B + E + A, 1, D + Ie + " +lon_0=-80.07750791666666 +k=1" + BZ + AH + C + B + E + A, 1, D + Ie + " +lon_0=-77.07750791666666 +k=1" + BZ + AH + C + B + E + A, 1, D + Ie + " +lon_0=-74.07750791666666 +k=1" + BZ + AH + C + B + E + A, 1, D + Ie + " +lon_0=-71.07750791666666 +k=1" + BZ + AH + C + B + E + A, 1, D + Ie + " +lon_0=-68.07750791666666 +k=1" + BZ + AH + C + B + E + A, 1, D + L2 + YH + " +k=0.999" + BZ + AH + R + Qe + E + A, 1, GU + " +lat_0=50.625 +lon_0=21.08333333333333" + UG + " +x_0=4637000 +y_0=5467000" + M + b + E + A, 1, D + L2 + Fm + CP + O + N + i + BX + E + A, 1, D + L2 + ZU + CP + O + N + i + BX + E + A, 1, D + L2 + ZV + CP + O + N + i + BX + E + A, 1, D + L2 + Fr + CP + O + N + i + BX + E + A, 1, D + L2 + Ru + CP + O + N + i + BX + E + A, 1, D + L2 + RI + " +k=1" + O + N + C + B + E + A, 1, D + L2 + UI + " +k=1" + O + N + C + B + E + A, 1, D + L2 + Gl + " +k=1" + O + N + C + B + E + A, 1, D + L2 + Yx + " +k=1" + O + N + C + B + E + A, 1, D + L2 + SP + " +k=1" + O + N + C + B + E + A, 1, D + L2 + II + " +k=1" + O + N + C + B + E + A, 1, D + L2 + RJ + " +k=1" + O + N + C + B + E + A, 1, D + L2 + UJ + " +k=1" + O + N + C + B + E + A, 1, D + L2 + HO + " +k=1" + O + N + C + B + E + A, 1, D + L2 + RP + " +k=1" + O + N + C + B + E + A, 1, D + L2 + " +lon_0=29 +k=1" + O + N + C + B + E + A, 1, D + L2 + Ia + " +k=1" + O + N + C + B + E + A, 1, D + L2 + QQ + " +k=1" + O + N + C + B + E + A, 2, Ck + " +lat_0=-18 +lon_0=178 +x_0=109435.392 +y_0=141622.272" + UW + Ym + Nl + " +to_meter=0.201168" + A, 1, I + PL + o + R + JD + E + A, 1, I + SK + o + R + JD + E + A, 6, I + Mh + By + Ay + JP + E + A, 1, I + Mi + By + Ay + JP + E + A, 3, D + L2 + " +lon_0=18.05779 +k=0.99999425 +x_0=100178.1808 +y_0=-6500614.7836" + C + B + E + A, 1, DT + Yv + " +lat_2=58.5" + IP + " +lon_0=-126" + BZ + N + C + B + E + A, 1, I + RH + C + B + E + A, 1, I + TW + C + B + E + A, 1, I + TX + C + B + E + A, 1, I + QE + C + B + E + A, 1, I + Nw + C + B + E + A, 1, I + NP + C + B + E + A, 1, I + NQ + C + B + E + A, 1, H + YI + " +lat_2=53.5" + L2 + SA + " +x_0=930000 +y_0=6430000" + C + B + E + A, 1, H + YI + " +lat_2=53.5" + L2 + SA + " +x_0=930000 +y_0=6430000" + C + B + E + A, 1, H + " +lat_1=-20.66666666666667 +lat_2=-22.33333333333333 +lat_0=-21.5" + ZW + u + Hk + C + B + E + A, 1, I + MA + o + j + QB + E + A, 1, H + " +lat_1=-22.24469175 +lat_2=-22.29469175 +lat_0=-22.26969175 +lon_0=166.44242575 +x_0=0.66 +y_0=1.02" + R + HH + E + A, 1, H + " +lat_1=-22.24472222222222 +lat_2=-22.29472222222222 +lat_0=-22.26972222222222 +lon_0=166.4425 +x_0=8.313000000000001 +y_0=-2.354" + R + HH + E + A, 1, CU + Qi + aF + aT + Ph + Of + N + KE + GZ + Yn + Qz + " +to_meter=20.116756" + A, 1, CU + Qi + aF + aT + Ph + " +x_0=804670.24" + N + KE + GZ + Yn + Qz + E + A, 1, I + SM + o + C + B + E + A, 1, I + MA + o + C + B + E + A, 1, I + Nq + o + C + B + E + A, 1, I + Nq + o + R + Jf + E + A, 2, DT + " +lat_1=42.122774 +lat_2=49.01518 +lat_0=45.568977 +lon_0=-84.455955" + BZ + AH + C + B + E + A, 1, DT + " +lat_1=42.122774 +lat_2=49.01518 +lat_0=45.568977 +lon_0=-83.248627" + BZ + AH + C + B + E + A, 1, D + L2 + ZQ + AP + O + N + By + Ay + JP + E + A, 1, D + L2 + UE + " +k=0.9965000000000001" + BZ + N + R + w + E + A, 1, I + IC + C + B + E + A, 1, I + Hi + C + B + E + A, 1, I + Gz + C + B + E + A, 1, I + ID + C + B + E + A, 1, I + Io + C + B + E + A, 1, I + MB + C + B + E + A, 1, I + Nx + C + B + E + A, 1, I + Nr + C + B + E + A, 1, I + Os + C + B + E + A, 1, I + SL + C + B + E + A, 1, I + Ja + C + B + E + A, 1, I + KA + C + B + E + A, 1, D + L2 + KB + CP + h + N + R + w + E + A, 1, D + L2 + " +lon_0=11" + CP + h + N + R + w + E + A, 1, D + L2 + " +lon_0=13" + CP + h + N + R + w + E + A, 1, D + L2 + Gj + CP + h + N + R + w + E + A, 1, D + L2 + UE + CP + h + N + R + w + E + A, 1, D + L2 + RI + CP + h + N + R + w + E + A, 1, D + L2 + Gl + CP + h + N + R + w + E + A, 1, D + L2 + SP + CP + h + N + R + w + E + A, 1, D + L2 + RJ + CP + h + N + R + w + E + A, 1, I + JN + R + w + E + A, 1, H + Qq + Li + JS + PZ + AV + aG + c + QC + E + A, 1, I + KC + R + w + E + A, 1, I + NR + R + w + E + A, 1, I + Ki + R + w + E + A, 1, H + Om + On + m + Pe + s + N + S + E + A, 1, H + Om + On + m + Nb + s + N + S + E + A, 1, H + Om + On + m + " +lon_0=-42" + s + N + S + E + A, 1, H + BQ + BR + m + SU + s + N + S + E + A, 1, H + BQ + BR + m + Pe + s + N + S + E + A, 1, H + BQ + BR + m + Nb + s + N + S + E + A, 1, H + BQ + BR + m + PO + s + N + S + E + A, 1, H + BQ + BR + m + SR + s + N + S + E + A, 1, H + BQ + BR + m + UH + s + N + S + E + A, 1, H + BQ + BR + m + Lt + s + N + S + E + A, 1, H + BQ + BR + m + Hq + s + N + S + E + A, 1, H + BQ + BR + m + Jj + s + N + S + E + A, 1, H + BQ + BR + m + Im + s + N + S + E + A, 1, H + BQ + BR + m + Jk + s + N + S + E + A, 1, H + BQ + BR + m + Rx + s + N + S + E + A, 1, H + BQ + BR + m + Oe + s + N + S + E + A, 1, H + BQ + BR + m + Ql + s + N + S + E + A, 1, H + AM + AN + m + " +lon_0=-102" + s + N + S + E + A, 1, H + AM + AN + m + Bu + s + N + S + E + A, 1, H + AM + AN + m + " +lon_0=-78" + s + N + S + E + A, 1, H + AM + AN + m + Pe + s + N + S + E + A, 1, H + AM + AN + m + " +lon_0=-18" + s + N + S + E + A, 1, H + AM + AN + m + " +lon_0=-6" + s + N + S + E + A, 1, H + AM + AN + m + ZO + s + N + S + E + A, 1, H + AM + AN + m + QR + s + N + S + E + A, 1, H + AM + AN + m + Ia + s + N + S + E + A, 1, H + AM + AN + m + PO + s + N + S + E + A, 1, H + AM + AN + m + SR + s + N + S + E + A, 1, H + AM + AN + m + UH + s + N + S + E + A, 1, H + AM + AN + m + Lt + s + N + S + E + A, 1, H + AM + AN + m + Hq + s + N + S + E + A, 1, H + AM + AN + m + Jj + s + N + S + E + A, 1, H + AM + AN + m + Im + s + N + S + E + A, 1, H + AM + AN + m + Jk + s + N + S + E + A, 1, H + AM + AN + m + Rx + s + N + S + E + A, 1, H + AM + AN + m + Oe + s + N + S + E + A, 1, H + AM + AN + m + Ql + s + N + S + E + A, 1, H + AM + AN + m + UP + s + N + S + E + A, 1, H + Ah + AZ + m + YJ + s + N + S + E + A, 1, H + Ah + AZ + m + YK + s + N + S + E + A, 1, H + Ah + AZ + m + Lj + s + N + S + E + A, 1, H + Ah + AZ + m + Ji + s + N + S + E + A, 1, H + Ah + AZ + m + CR + s + N + S + E + A, 1, H + Ah + AZ + m + Qk + s + N + S + E + A, 1, H + Ah + AZ + m + " +lon_0=-27" + s + N + S + E + A, 1, H + Ah + AZ + m + " +lon_0=-9" + s + N + S + E + A, 1, H + Ah + AZ + m + KB + s + N + S + E + A, 1, H + Ah + AZ + m + HO + s + N + S + E + A, 1, H + Ah + AZ + m + JS + s + N + S + E + A, 1, H + Ah + AZ + m + QW + s + N + S + E + A, 1, H + Ah + AZ + m + HQ + s + N + S + E + A, 1, H + Ah + AZ + m + HS + s + N + S + E + A, 1, H + Ah + AZ + m + Fm + s + N + S + E + A, 1, H + Ah + AZ + m + Fn + s + N + S + E + A, 1, H + Ah + AZ + m + NY + s + N + S + E + A, 1, H + Ah + AZ + m + Lf + s + N + S + E + A, 1, H + Ai + Aj + m + SV + s + N + S + E + A, 1, H + Ai + Aj + m + " +lon_0=-144" + s + N + S + E + A, 1, H + Ai + Aj + m + Mt + s + N + S + E + A, 1, H + Ai + Aj + m + OZ + s + N + S + E + A, 1, H + Ai + Aj + m + UQ + s + N + S + E + A, 1, H + Ai + Aj + m + " +lon_0=-48" + s + N + S + E + A, 1, H + Ai + Aj + m + " +lon_0=-24" + s + N + S + E + A, 1, H + Ai + Aj + m + HN + s + N + S + E + A, 1, H + Ai + Aj + m + II + s + N + S + E + A, 1, H + Ai + Aj + m + SQ + s + N + S + E + A, 1, H + Ai + Aj + m + Yt + s + N + S + E + A, 1, H + Ai + Aj + m + Mj + s + N + S + E + A, 1, H + Ai + Aj + m + KF + s + N + S + E + A, 1, H + Ai + Aj + m + UN + s + N + S + E + A, 1, H + Ai + Aj + m + UO + s + N + S + E + A, 1, BP + m + AW + SX + " +k=1" + s + N + S + E + A, 1, BP + m + AW + YK + " +k=1" + s + N + S + E + A, 1, BP + m + AW + " +lon_0=-105 +k=1" + s + N + S + E + A, 1, BP + m + AW + UR + " +k=1" + s + N + S + E + A, 1, BP + m + AW + " +lon_0=-45 +k=1" + s + N + S + E + A, 1, BP + m + AW + " +lon_0=-15 +k=1" + s + N + S + E + A, 1, BP + m + AW + Gj + " +k=1" + s + N + S + E + A, 1, BP + m + AW + JS + " +k=1" + s + N + S + E + A, 1, BP + m + AW + HP + " +k=1" + s + N + S + E + A, 1, BP + m + AW + EN + " +k=1" + s + N + S + E + A, 1, BP + m + AW + Fn + " +k=1" + s + N + S + E + A, 1, BP + m + AW + NZ + " +k=1" + s + N + S + E + A, 1, BP + m + AW + ON + " +k=1" + s + N + S + E + A, 1, BP + m + AW + Bu + " +k=1" + s + N + S + E + A, 1, BP + m + AW + " +lon_0=-30 +k=1" + s + N + S + E + A, 1, BP + m + AW + Ia + " +k=1" + s + N + S + E + A, 1, BP + m + AW + Hq + " +k=1" + s + N + S + E + A, 1, BP + m + AW + Oe + " +k=1" + s + N + S + E + A, 1, BP + m + AW + HN + " +k=1" + s + N + S + E + A, 1, H + Ai + Aj + " +lat_0=-78" + Ql + s + N + S + E + A, 2, I + RG + o + C + Bm + E + A, 1, I + Ro + o + C + Bm + E + A, 1, I + RH + o + C + Bm + E + A, 1, I + TW + o + C + Bm + E + A, 1, H + WF + " +lat_2=58" + WG + II + O + " +y_0=6375000" + C + Lw + E + A, 1, H + WF + " +lat_2=58" + WG + II + O + " +y_0=6375000" + C + B + E + A, 1, I + RH + o + R + Lq + E + A, 1, I + RH + o + R + Kc + E + A, 1, I + Ro + o + R + Kg + E + A, 1, I + Ro + o + R + Kh + E + A, 1, I + RG + o + R + QN + E + A, 1, I + JM + j + TD + E + A, 1, H + " +lat_1=-30.75 +lat_2=-35.75 +lat_0=-33.25" + Od + " +x_0=9300000" + Gb + C + B + E + A, 1, DT + Yy + SY + L2 + Mt + s + QZ + X + E + A, 1, DT + Yy + SY + L2 + Mt + s + QZ + C + B + E + A, 1, DT + Yy + SY + L2 + Mt + s + QZ + C + B + E + A, 1, I + ID + R + NH + E + A, 1, I + ID + C + B + E + A, 3, D + L2 + Yx + V + O + Ak + c + E + A, 1, D + L2 + II + V + O + Ak + c + E + A, 1, D + L2 + IH + V + O + Ak + c + E + A, 1, D + L2 + " +lon_0=14" + V + O + Ak + c + E + A, 1, D + L2 + " +lon_0=16" + V + O + Ak + c + E + A, 1, D + L2 + QR + V + O + Ak + c + E + A, 1, D + L2 + UI + V + O + Ak + c + E + A, 1, D + L2 + Yx + V + O + Ak + c + E + A, 1, D + L2 + II + V + O + Ak + c + E + A, 1, D + L2 + UJ + V + O + Ak + c + E + A, 1, D + L2 + RP + V + O + Ak + c + E + A, 1, D + L2 + Ia + V + O + Ak + c + E + A, 1, GU + " +lat_0=52.16666666666666 +lon_0=19.16666666666667 +k=0.999714" + O + Ae + M + b + E + A, 1, D + L2 + Gj + " +k=1" + Eg + N + M + b + E + A, 1, D + L2 + QR + " +k=1" + Jt + N + M + b + E + A, 1, D + L2 + Gl + " +k=1" + IM + N + M + b + E + A, 1, D + L2 + II + " +k=1" + MS + N + M + b + E + A, 1, D + L2 + Gj + " +k=1" + Bo + N + M + b + E + A, 1, D + L2 + Gl + " +k=1" + DP + N + M + b + E + A, 1, D + L2 + HO + " +k=1" + Eg + N + M + b + E + A, 1, I + Rc + o + R + TE + E + A, 1, H + " +lat_1=-20.19506944444445 +lat_0=-20.19506944444445 +lon_0=57.52182777777778 +k_0=1" + BZ + AH + c + Qf + E + A, 1, DT + " +lat_1=55" + QY + Yu + Ms + s + N + C + B + E + A, 1, D + L2 + IH + V + O + Ak + c + GN + E + A, 1, D + L2 + " +lon_0=14" + V + O + Ak + c + GN + E + A, 1, D + L2 + " +lon_0=16" + V + O + Ak + c + GN + E + A, 1, I + KC + o + c + GN + E + A, 1, I + Ja + C + B + E + A, 1, I + KA + C + B + E + A, 1, I + Oq + C + B + E + A, 1, D + L2 + II + UG + O + N + C + B + E + A, 1, H + LM + IJ + " +lat_0=63.390675" + UY + " +x_0=6200000" + Fq + C + B + E + A, 1, H + LM + IJ + " +lat_0=63.390675" + UY + " +x_0=6200000" + Fq + C + B + E + A, 2, D + " +lat_0=0.1 +lon_0=21.95 +k=1" + Bv + N + M + F + E + A, 1, D + " +lat_0=0.1 +lon_0=24.95 +k=1 +x_0=1250000" + N + M + F + E + A, 1, D + " +lat_0=0.1 +lon_0=27.95 +k=1 +x_0=2250000" + N + M + F + E + A, 1, I + JN + o + R + E + A, 1, I + JN + o + R + E + A, 1, D + Gm + QQ + " +k=1 +x_0=615000 +y_0=810000" + Gn + Qg + E + A, 3, H + Et + Eu + LT + NW + Rh + N + C + B + E + A, 2, H + FC + OD + Dr + CR + OE + N + C + B + E + A, 1, H + FC + OD + Dr + CR + OE + N + C + B + t + A, 1, H + MW + FB + BB + Ea + a + N + C + B + E + A, 1, H + MW + FB + BB + Ea + a + N + C + B + J + A, 1, H + Dp + Dq + y + Ea + a + N + C + B + E + A, 1, H + Dp + Dq + y + Ea + a + N + C + B + J + A, 2, I + Ja + c + E + A, 1, I + KA + c + E + A, 1, I + Oq + c + E + A, 1, I + Nq + X + E + A, 1, I + PL + X + E + A, 1, I + Nq + C + B + E + A, 1, I + PL + C + B + E + A, 1, I + KA + R + E + A, 1, CU + Qi + aF + " +alpha=323.0257964666666" + Ph + " +x_0=804671" + N + KE + GZ + C + E + A, 1, CU + Qi + Yz + aU + Ph + s + N + KE + If + C + E + A, 1, Ck + " +lat_0=2.121679744444445 +lon_0=103.4279362361111 +x_0=-14810.562 +y_0=8758.32" + C + E + A, 1, Ck + " +lat_0=2.682347636111111 +lon_0=101.9749050416667 +x_0=3673.785 +y_0=-4240.573" + C + E + A, 1, Ck + " +lat_0=3.769388088888889 +lon_0=102.3682989833333 +x_0=-7368.228 +y_0=6485.858" + C + E + A, 1, Ck + " +lat_0=3.68464905 +lon_0=101.3891079138889 +x_0=-34836.161 +y_0=56464.049" + C + E + A, 1, Ck + " +lat_0=4.9762852 +lon_0=103.070275625 +x_0=19594.245 +y_0=3371.895" + C + E + A, 1, Ck + " +lat_0=5.421517541666667 +lon_0=100.3443769638889 +x_0=-23.414 +y_0=62.283" + C + E + A, 1, Ck + " +lat_0=5.964672713888889 +lon_0=100.6363711111111" + s + N + C + E + A, 1, Ck + " +lat_0=4.859063022222222 +lon_0=100.8154105861111 +x_0=-1.769 +y_0=133454.779" + C + E + A, 1, Ck + " +lat_0=5.972543658333334 +lon_0=102.2952416694444 +x_0=13227.851 +y_0=8739.894" + C + E + A, 1, D + L2 + QR + " +k=1" + O + N + R + At + E + A, 1, D + L2 + IG + " +k=1" + Eg + N + R + At + E + A, 1, JU + PS + " +lat_ts=42" + s + N + M + F + E + A, 1, D + L2 + Ry + " +k=1 +x_0=60500000" + N + M + F + E + A, 1, D + L2 + Ry + " +k=1 +x_0=60500000" + N + M + G + E + A, 1, I + KD + c + EU + E + A, 1, I + JZ + c + EU + E + A, 1, I + JM + c + EU + E + A, 1, H + Qq + Li + JS + PZ + AV + aG + c + E + A, 1, JU + HN + " +k=1" + s + N + S + E + A, 1, D + L2 + KB + " +k=1" + Bo + N + Y + E + A, 1, D + L2 + IH + " +k=1" + DP + N + Y + E + A, 1, D + L2 + IH + " +k=1" + DP + N + Y + E + A, 1, D + L2 + Gj + " +k=1" + Eg + N + Y + E + A, 1, D + L2 + SZ + " +k=0.9992" + O + N + C + B + E + A, 1, D + L2 + SZ + " +k=0.9992" + s + N + C + B + E + A, 1, D + L2 + SZ + " +k=0.9992" + O + N + C + B + E + A, 1, D + L2 + SZ + " +k=0.9992" + s + N + C + B + E + A, 1, H + Et + Eu + LT + NW + Z + N + C + B + J + A, 1, I + Mh + j + Fu + E + A, 1, I + Mi + j + Fu + E + A, 1, Ck + Vt + Vu + " +x_0=40243.57775604237 +y_0=19069.93351512578" + Ee + Ef + ML + A, 1, He + Hr + HN + s + N + ZX + ZY + E + A, 1, He + m + HN + s + N + ZX + ZY + E + A, 1, "+proj=cea" + HN + " +lat_ts=30" + s + N + ZX + ZY + E + A, 1, BP + Hr + " +lat_ts=70 +lon_0=-45 +k=1" + s + N + ZZ + Ri + E + A, 1, BP + m + " +lat_ts=-70" + HN + " +k=1" + s + N + ZZ + Ri + E + A, 1, BP + Hr + " +lat_ts=70 +lon_0=-45 +k=1" + s + N + S + E + A, 1, D + " +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572" + j + E + A, 1, H + " +lat_1=18 +lat_2=24 +lat_0=21" + Im + O + Ae + T + Q + E + A, 1, H + LM + Nh + " +lat_0=47.5" + Ig + u + Is + C + B + E + A, 1, H + EB + EC + Fo + GG + AV + GJ + C + B + J + A, 1, H + AY + ED + Fs + GG + AG + N + C + B + J + A, 1, H + EE + EF + AQ + Fl + Au + N + C + B + J + A, 1, H + EG + EH + f + CV + Au + Gt + C + B + J + A, 1, D + CQ + DF + V + Gu + MN + C + B + J + A, 1, D + CQ + DG + V + AG + Hh + C + B + J + A, 1, D + CQ + DH + V + An + NE + C + B + J + A, 1, D + BA + Gp + V + Bn + N + C + B + J + A, 1, H + EB + EC + Fo + GG + AV + GJ + C + B + J + A, 1, H + AY + ED + Fs + GG + AG + N + C + B + J + A, 1, H + EE + EF + AQ + Fl + Au + N + C + B + J + A, 1, H + EG + EH + f + CV + Au + Gt + C + B + J + A, 1, D + CQ + DF + V + Gu + MN + C + B + J + A, 1, D + CQ + DG + V + AG + Hh + C + B + J + A, 1, D + CQ + DH + V + An + NE + C + B + J + A, 1, D + BA + Gp + V + Bn + N + C + B + J + A, 1, H + Dx + Dy + BC + IF + Au + N + C + B + J + A, 1, H + Dz + Mq + EA + IF + Au + Gt + C + B + J + A, 1, D + f + Cz + EQ + BF + N + C + B + J + A, 1, D + f + DA + Am + MO + N + C + B + J + A, 1, D + Fp + DI + AO + BF + N + C + B + J + A, 1, D + EI + GE + Lb + JV + N + C + B + J + A, 1, I + JM + c + Gg + E + A, 1, I + Me + c + Gg + E + A, 1, H + Dx + Dy + BC + IF + Au + N + C + B + J + A, 1, H + Dz + Mq + EA + IF + Au + Gt + C + B + J + A, 1, D + f + Cz + EQ + BF + N + C + B + J + A, 1, D + f + DA + Am + MO + N + C + B + J + A, 1, D + Fp + DI + AO + BF + N + C + B + J + A, 1, D + EI + GE + Lb + JV + N + C + B + J + A, 1, H + Ks + Kt + " +lat_0=50.797815" + WH + " +x_0=150328 +y_0=166262" + C + B + E + A, 1, H + " +lat_1=18" + OX + Ld + " +k_0=1" + YL + " +y_0=650000" + j + B + E + A, 1, I + Ik + j + B + E + A, 1, I + IC + j + B + E + A, 1, H + FS + FT + IY + Hg + Eb + N + C + B + J + A, 1, H + OH + OI + OJ + Bi + Eb + N + C + B + J + A, 1, H + CD + CE + " +lat_0=25.5" + Bi + Eb + N + C + B + J + A, 2, H + OL + Ff + EJ + Ag + a + N + C + B + J + A, 1, H + FS + FT + IY + Hg + Eb + N + C + B + J + A, 1, H + OH + OI + OJ + Bi + Eb + N + C + B + J + A, 1, H + Fd + Fe + AL + CS + a + N + C + B + J + A, 1, H + OL + Ff + EJ + Ag + a + N + C + B + J + A, 1, D + " +lat_0=-17 +lon_0=178.75 +k=0.99985" + Bd + LV + T + P + E + A, 1, I + Ja + AU + BN + Nm + E + A, 1, I + KA + AU + BN + Nm + E + A, 1, D + YM + Rj + JE + O + N + C + B + E + A, 1, D + YM + Rj + JE + O + N + C + B + E + A, 1, D + IY + IV + Pc + h + N + C + B + E + A, 1, D + Gm + OS + BG + a + N + C + B + E + A, 1, DT + " +lat_1=55" + QY + Yu + Ms + s + N + C + B + E + A, 1, CU + " +lat_0=57" + Ku + Kv + V + LX + EO + KE + GZ + C + B + E + A, 1, D + Ft + YN + V + O + N + C + B + E + A, 1, D + Ft + YO + V + O + N + C + B + E + A, 1, D + Ft + ON + V + O + N + C + B + E + A, 1, D + Ft + Ms + V + O + N + C + B + E + A, 1, D + Ft + KI + V + O + N + C + B + E + A, 1, D + Ft + YP + V + O + N + C + B + E + A, 1, D + Ft + YQ + V + O + N + C + B + E + A, 1, D + Ft + SW + V + O + N + C + B + E + A, 1, H + Kw + Kx + UK + YR + BZ + N + C + B + E + A, 1, D + Bl + Co + V + EX + N + C + B + E + A, 1, D + Bl + Co + V + EX + N + C + B + t + A, 1, D + Bl + Cn + V + EX + N + C + B + E + A, 1, D + Bl + Cn + V + EX + N + C + B + t + A, 1, D + Bl + Iv + BG + EX + N + C + B + E + A, 1, D + Bl + Iv + BG + EX + N + C + B + t + A, 1, H + Dx + Dy + BC + IF + u + N + C + B + E + A, 1, H + Dx + Dy + BC + IF + Au + N + C + B + J + A, 1, H + Dz + Mq + EA + IF + u + Is + C + B + E + A, 1, H + Dz + Mq + EA + IF + Au + Gt + C + B + J + A, 1, DT + Yy + SY + L2 + Mt + s + QZ + C + B + E + A, 1, H + DW + Jn + y + HA + Bd + Ae + C + B + E + A, 1, H + DW + Jn + y + HA + Ac + AD + C + B + J + A, 1, H + DX + DY + AA + HA + Bd + Ae + C + B + E + A, 1, H + DX + DY + AA + HA + Ac + AD + C + B + J + A, 1, H + Ap + DZ + Ml + AJ + Bd + Ae + C + B + E + A, 1, H + Ap + DZ + Ml + AJ + Ac + AD + C + B + J + A, 1, H + LO + QS + Da + Mm + Bd + Ae + C + B + E + A, 1, H + LO + QS + Da + Mm + Ac + AD + C + B + J + A, 1, H + Db + Dc + Mn + Ir + Bd + Ae + C + B + E + A, 1, H + Db + Dc + Mn + Ir + Ac + AD + C + B + J + A, 1, H + Dd + De + Df + Iw + Bd + Ae + C + B + E + A, 1, H + Dd + De + Df + Iw + Ac + AD + C + B + J + A, 1, H + LP + LQ + CY + Ba + Fw + Fx + C + B + E + A, 1, H + LP + LQ + CY + Ba + Bw + CL + C + B + J + A, 1, H + Eh + Ei + y + Ba + Fw + Fx + C + B + E + A, 1, H + Eh + Ei + y + Ba + Bw + CL + C + B + J + A, 1, H + Ap + Dg + f + Ba + Fw + Fx + C + B + E + A, 1, H + Ap + Dg + f + Ba + Bw + CL + C + B + J + A, 1, H + Dh + Mo + Di + Jq + QG + QH + C + B + E + A, 1, H + Dh + Mo + Di + Jq + MC + MD + C + B + J + A, 1, D + Ch + Cp + Mp + h + N + C + B + E + A, 1, D + Ch + Cp + Mp + AE + N + C + B + J + A, 1, D + Aq + CR + Am + h + N + C + B + E + A, 1, D + Aq + CR + Am + AE + N + C + B + J + A, 1, DT + " +lat_1=24" + YG + " +lat_0=24" + NV + u + N + C + B + E + A, 1, H + LR + Dj + QT + LS + a + N + C + B + E + A, 1, H + LR + Dj + QT + LS + a + N + C + B + J + A, 1, D + Aq + Ob + Am + h + N + C + B + E + A, 1, D + Aq + Ob + Am + AE + N + C + B + J + A, 1, D + Gm + Cq + V + h + N + C + B + E + A, 1, D + Gm + Cq + V + AE + N + C + B + J + A, 1, D + Gm + Cr + V + EW + N + C + B + E + A, 1, D + Gm + Cr + V + CM + N + C + B + J + A, 1, D + p + Jb + BJ + O + N + C + B + E + A, 1, D + p + Jb + BJ + AF + N + C + B + J + A, 1, D + p + Cs + BJ + h + N + C + B + E + A, 1, D + p + Cs + BJ + AE + N + C + B + J + A, 1, D + p + Ix + BG + CX + N + C + B + E + A, 1, D + p + Ix + BG + ME + N + C + B + J + A, 1, D + f + Cz + EQ + AI + N + C + B + E + A, 1, D + f + Cz + EQ + BF + N + C + B + J + A, 1, D + f + DA + Am + EW + N + C + B + E + A, 1, D + f + DA + Am + MO + N + C + B + J + A, 1, D + DM + DB + AO + BU + KJ + C + B + E + A, 1, D + DM + DB + AO + MM + GI + C + B + J + A, 1, D + DM + DC + AO + HT + KJ + C + B + E + A, 1, D + DM + DC + AO + HT + GI + C + B + J + A, 1, H + EB + EC + Fo + GG + AV + AH + C + B + E + A, 1, H + EB + EC + Fo + GG + AV + GJ + C + B + J + A, 1, H + AY + ED + Fs + GG + O + N + C + B + E + A, 1, H + AY + ED + Fs + GG + AG + N + C + B + J + A, 1, H + EE + EF + AQ + Fl + u + N + C + B + E + A, 1, H + EE + EF + AQ + Fl + Au + N + C + B + J + A, 1, H + EG + EH + f + CV + u + Is + C + B + E + A, 1, H + EG + EH + f + CV + Au + Gt + C + B + J + A, 1, H + Az + DV + DM + Jo + O + N + C + B + E + A, 1, H + Az + DV + DM + Jo + AF + N + C + B + J + A, 1, H + Fi + Fj + AB + EY + AV + AH + C + B + E + A, 1, H + Fi + Fj + AB + EY + AV + CN + C + B + J + A, 1, H + Ej + Ek + AB + EY + O + Ae + C + B + E + A, 1, H + Ej + Ek + AB + EY + AF + AD + C + B + J + A, 1, H + FS + FT + IY + Hg + BZ + N + C + B + E + A, 1, H + FS + FT + IY + Hg + Eb + N + C + B + J + A, 1, H + OH + OI + OJ + Bi + BZ + N + C + B + E + A, 1, H + OH + OI + OJ + Bi + Eb + N + C + B + J + A, 1, D + YM + Rj + JE + O + N + C + B + E + A, 1, D + AL + Rf + JE + EW + N + C + B + E + A, 1, D + BD + Rg + JE + AI + N + C + B + E + A, 1, D + AK + HJ + V + AI + N + C + B + E + A, 1, D + BD + DD + AO + HT + N + C + B + E + A, 1, H + MU + Nz + AA + Ld + u + N + C + B + E + A, 1, H + AY + CF + Br + BI + AG + GJ + C + B + J + A, 1, D + Kn + Sf + AO + e + N + i + GB + J + A, 1, D + Ko + KO + AO + e + N + i + GB + J + A, 1, D + GV + KI + Jl + e + N + i + GB + J + A, 1, D + Kp + Sg + Jl + e + N + i + GB + J + A, 1, D + Kq + KP + " +k=1" + e + N + i + GB + J + A, 1, H + JF + CG + AQ + BI + AG + NF + C + B + J + A, 1, H + JG + CH + f + BI + AG + Fq + C + B + J + A, 1, H + AY + CF + Br + BI + AG + GJ + C + B + J + A, 1, H + JF + CG + AQ + BI + AG + NF + C + B + J + A, 1, H + JG + CH + f + BI + AG + Fq + C + B + J + A, 1, He + Hr + Ry + s + N + S + E + A, 1, He + Hr + ON + s + N + S + E + A, 1, He + Hr + CS + s + N + S + E + A, 1, He + Hr + " +lon_0=-40" + s + N + S + E + A, 1, He + Hr + Lu + s + N + S + E + A, 1, He + Hr + Hq + s + N + S + E + A, 1, DT + " +lat_1=-18" + ZT + L2 + Il + s + N + C + B + E + A, 1, DT + WI + " +lat_2=68 +lat_0=59 +lon_0=-132.5" + O + Ae + C + B + E + A, 1, DT + WI + " +lat_2=68 +lat_0=59 +lon_0=-132.5" + O + Ae + C + B + E + A, 1, H + " +lat_1=62 +lat_2=70" + L2 + " +lon_0=-112" + s + N + C + B + E + A, 1, H + " +lat_1=62 +lat_2=70" + L2 + " +lon_0=-112" + s + N + C + B + E + A, 1, H + MU + Nz + AA + Ld + MF + N + C + B + J + A, 1, H + Em + En + Ip + IL + O + N + C + B + E + A, 1, H + Em + En + Ip + IL + AF + N + C + B + J + A, 1, H + El + Dk + Ip + GE + h + Mk + C + B + E + A, 1, H + El + Dk + Ip + GE + AE + Mk + C + B + J + A, 1, H + OA + Er + Es + BE + Pk + N + C + B + E + A, 1, H + OA + Er + Es + BE + MH + N + C + B + t + A, 1, H + Eo + Ep + Eq + Jh + Tl + N + C + B + E + A, 1, H + Eo + Ep + Eq + Jh + MG + N + C + B + t + A, 1, CU + Kr + " +lonc=-86" + QI + AP + QJ + PY + KE + QK + C + B + E + A, 1, H + Bq + OB + Fo + BE + LU + N + C + B + E + A, 1, H + Bq + OB + Fo + BE + OT + N + C + B + t + A, 1, H + Ma + FW + IP + Js + CX + EK + C + B + E + A, 1, H + FU + FV + Iq + DE + CX + EK + C + B + E + A, 1, H + FX + FY + Nj + Na + CX + EK + C + B + E + A, 1, D + Hj + Ct + CP + AI + N + C + B + E + A, 1, D + Hj + Ct + CP + BF + N + C + B + J + A, 1, D + Hj + Bx + CP + EW + N + C + B + E + A, 1, D + Hj + Bx + CP + CM + N + C + B + J + A, 1, D + Cd + Hg + BG + O + N + C + B + E + A, 1, D + Cd + RS + BG + Bv + N + C + B + E + A, 1, D + Id + RT + Am + YC + N + C + B + E + A, 1, H + LM + RK + MV + IS + a + N + C + B + E + A, 1, H + LM + RK + MV + IS + DR + N + C + B + t + A, 1, H + JT + Jn + FZ + CS + O + N + C + B + E + A, 1, D + CQ + DG + V + O + Hh + C + B + E + A, 1, D + CQ + DG + V + AG + Hh + C + B + J + A, 1, D + CQ + DF + V + h + Tm + C + B + E + A, 1, D + CQ + DF + V + Gu + MN + C + B + J + A, 1, D + CQ + DH + V + CX + LV + C + B + E + A, 1, D + CQ + DH + V + An + NE + C + B + J + A, 1, D + Fp + DI + AO + AI + N + C + B + E + A, 1, D + Fp + DI + AO + BF + N + C + B + J + A, 1, D + BA + Gp + V + Bn + N + C + B + E + A, 1, D + BA + Gp + V + Bn + N + C + B + J + A, 1, D + Bl + Iy + V + O + N + C + B + E + A, 1, D + Bl + Iy + V + AF + N + C + B + J + A, 1, D + Bl + Cu + Hm + OC + N + C + B + E + A, 1, D + Bl + Cu + Hm + OC + N + C + B + J + A, 1, D + Bl + Cv + Iz + YD + N + C + B + E + A, 1, D + Bl + Cv + Iz + MI + N + C + B + J + A, 1, D + Fs + Cw + Ad + Bv + N + C + B + E + A, 1, D + Fs + Cw + Ad + MJ + N + C + B + J + A, 1, D + BA + Gp + V + Bn + N + C + B + E + A, 1, D + BA + Gp + V + Bn + N + C + B + J + A, 1, H + Dl + Dm + BB + Oc + AI + N + C + B + E + A, 1, H + Dl + Dm + BB + Oc + BF + N + C + B + J + A, 1, D + Fs + Cx + Ad + Qo + N + C + B + E + A, 1, D + Fs + Cx + Ad + MK + N + C + B + J + A, 1, H + Et + Eu + LT + NW + Rh + N + C + B + E + A, 1, H + Et + Eu + LT + NW + Z + N + C + B + J + A, 1, H + BH + Ev + Ib + EZ + a + N + C + B + E + A, 1, H + BH + Ev + Ib + EZ + DR + N + C + B + t + A, 1, H + Ew + Ex + Be + EZ + a + N + C + B + E + A, 1, H + Ew + Ex + Be + EZ + DR + N + C + B + t + A, 1, H + OK + Fa + BY + ET + a + N + C + B + E + A, 1, H + Fb + Fc + Ch + ET + a + N + C + B + E + A, 1, H + Dn + Ey + QU + Fl + a + N + C + B + E + A, 1, H + Dn + Ey + QU + Fl + a + N + C + B + J + A, 1, H + Ez + FA + Do + Fl + a + N + C + B + E + A, 1, H + Ez + FA + Do + Fl + a + N + C + B + J + A, 1, H + JT + Hl + GH + AJ + u + N + C + B + E + A, 1, H + JT + Hl + GH + AJ + Lc + N + C + B + t + A, 1, H + PP + CZ + AK + AJ + Ci + N + C + B + E + A, 1, H + PP + CZ + AK + AJ + KL + N + C + B + t + A, 1, H + PQ + Ca + p + AJ + AV + N + C + B + E + A, 1, H + PQ + Ca + p + AJ + KM + N + C + B + t + A, 1, H + MW + FB + BB + Ea + a + N + C + B + E + A, 1, H + MW + FB + BB + Ea + a + N + C + B + J + A, 1, H + Dp + Dq + y + Ea + a + N + C + B + E + A, 1, H + Dp + Dq + y + Ea + a + N + C + B + J + A, 1, D + EI + GE + Lb + BU + N + C + B + E + A, 1, D + EI + GE + Lb + JV + N + C + B + J + A, 1, H + FC + OD + Dr + CR + OE + N + C + B + E + A, 1, H + FC + OD + Dr + CR + OE + N + C + B + t + A, 1, H + Fd + Fe + AL + CS + a + N + C + B + E + A, 1, H + Fd + Fe + AL + CS + a + N + C + B + J + A, 1, H + OL + Ff + EJ + Ag + a + N + C + B + E + A, 1, H + OL + Ff + EJ + Ag + a + N + C + B + J + A, 1, H + FD + MX + BC + MQ + a + N + C + B + E + A, 1, H + FD + MX + BC + MQ + a + N + C + B + J + A, 1, H + FH + FI + Cb + Ag + EW + Fq + C + B + E + A, 1, H + FH + FI + Cb + Ag + CM + Fq + C + B + J + A, 1, DT + OM + RO + OX + CS + AV + Hh + C + B + E + A, 1, H + OM + RO + OX + CS + AV + Ju + C + B + E + A, 1, H + FE + MY + QV + Jr + h + AH + C + B + E + A, 1, H + FE + MY + QV + Jr + AE + CN + C + B + J + A, 1, H + FF + FG + Ds + CV + a + Cl + C + B + E + A, 1, H + FF + FG + Ds + CV + a + Gr + C + B + J + A, 1, H + CD + CE + Cc + CV + AI + Ju + C + B + E + A, 1, H + CD + CE + Cc + CV + BF + Nf + C + B + J + A, 1, H + FJ + FK + Dt + Ji + a + LV + C + B + E + A, 1, H + FJ + FK + Dt + Ji + a + Ne + C + B + J + A, 1, H + JF + CG + AQ + BI + O + Cl + C + B + E + A, 1, H + JF + CG + AQ + BI + Gd + RY + C + B + t + A, 1, H + JF + CG + AQ + BI + AG + NF + C + B + J + A, 1, H + AY + CF + Br + BI + O + AH + C + B + E + A, 1, H + AY + CF + Br + BI + Gd + Pw + C + B + t + A, 1, H + AY + CF + Br + BI + AG + GJ + C + B + J + A, 1, H + JG + CH + f + BI + O + Fq + C + B + E + A, 1, H + JG + CH + f + BI + Gd + RZ + C + B + t + A, 1, H + JG + CH + f + BI + AG + Fq + C + B + J + A, 1, D + Fp + LW + JA + O + N + C + B + E + A, 1, H + OF + FL + AA + GF + Bo + Cl + C + B + E + A, 1, H + OF + FL + AA + GF + Gs + Gr + C + B + J + A, 1, H + Az + Du + AB + GF + Bo + AH + C + B + E + A, 1, H + Az + Du + AB + GF + Gs + CN + C + B + J + A, 1, H + BH + OG + Ib + Cy + O + N + C + B + E + A, 1, H + BH + OG + Ib + Cy + AF + N + C + B + J + A, 1, H + FM + FN + Dv + AJ + O + N + C + B + E + A, 1, H + FM + FN + Dv + AJ + AF + N + C + B + J + A, 1, H + Mb + RN + Mr + Ga + a + N + C + B + E + A, 1, H + Fg + Fh + QX + CR + a + N + C + B + E + A, 1, H + Jc + MZ + AL + Bu + a + N + C + B + E + A, 1, H + Jc + MZ + AL + Bu + a + N + C + B + J + A, 1, H + FO + FP + Dw + Bu + a + N + C + B + E + A, 1, H + FO + FP + Dw + Bu + a + N + C + B + J + A, 1, H + FQ + FR + PR + Bu + a + N + C + B + E + A, 1, H + FQ + FR + PR + Bu + a + N + C + B + J + A, 1, D + L2 + Bu + AP + YF + Sh + C + B + E + A, 1, D + CA + DJ + Ad + h + N + C + B + E + A, 1, D + CA + DK + Ad + u + EK + C + B + E + A, 1, D + CA + JB + Ad + a + N + C + B + E + A, 1, D + CA + DL + Ad + CX + EK + C + B + E + A, 1, I + Nq + C + B + E + A, 1, I + PL + C + B + E + A, 1, I + SK + C + B + E + A, 1, I + TV + C + B + E + A, 1, I + Xz + C + B + E + A, 1, I + TY + C + B + E + A, 1, I + RG + C + B + E + A, 1, I + Ro + C + B + E + A, 1, I + RH + C + B + E + A, 1, I + TW + C + B + E + A, 1, I + TX + C + B + E + A, 1, I + QE + C + B + E + A, 1, I + Ns + C + B + E + A, 1, I + Nt + C + B + E + A, 1, I + Nu + C + B + E + A, 1, I + Nw + C + B + E + A, 1, I + NP + C + B + E + A, 1, I + NQ + C + B + E + A, 1, I + Ik + C + B + E + A, 1, I + IC + C + B + E + A, 1, I + Hi + C + B + E + A, 1, D + " +lat_0=-21.11666666666667 +lon_0=55.53333333333333 +k=1 +x_0=160000" + Rz + R + SJ + E + A, 1, H + OK + Fa + BY + ET + a + N + C + B + J + A, 1, H + Fb + Fc + Ch + ET + a + N + C + B + J + A, 1, D + CA + DJ + Ad + Gu + N + C + B + J + A, 1, D + CA + DK + Ad + Au + Ao + C + B + J + A, 1, D + CA + JB + Ad + a + N + C + B + J + A, 1, D + CA + DL + Ad + An + Ao + C + B + J + A, 1, H + OK + Fa + BY + ET + a + N + C + B + J + A, 1, H + Fb + Fc + Ch + ET + a + N + C + B + J + A, 1, D + CA + DJ + Ad + Gu + N + C + B + J + A, 1, D + CA + DK + Ad + Au + Ao + C + B + J + A, 1, D + CA + JB + Ad + a + N + C + B + J + A, 1, D + CA + DL + Ad + An + Ao + C + B + J + A, 1, I + QE + C + B + E + A, 1, I + Ns + C + B + E + A, 1, I + Nt + C + B + E + A, 1, I + Nu + C + B + E + A, 1, I + Nw + C + B + E + A, 1, I + NP + C + B + E + A, 1, I + NQ + C + B + E + A, 1, I + Ik + C + B + E + A, 1, I + IC + C + B + E + A, 1, I + Hi + C + B + E + A, 1, I + TY + C + B + E + A, 1, I + RG + C + B + E + A, 2, H + OK + Fa + BY + ET + a + N + C + B + J + A, 1, H + Fb + Fc + Ch + ET + a + N + C + B + J + A, 1, D + CA + DJ + Ad + Gu + N + C + B + J + A, 1, D + CA + DK + Ad + Au + Ao + C + B + J + A, 1, D + CA + JB + Ad + a + N + C + B + J + A, 1, D + CA + DL + Ad + An + Ao + C + B + J + A, 1, D + GV + KI + Jl + AG + N + C + B + J + A, 1, D + GV + KI + Jl + AG + N + C + B + J + A, 1, I + Io + C + B + E + A, 1, H + " +lat_1=-54 +lat_2=-54.75 +lat_0=-55 +lon_0=-37" + s + N + S + E + A, 1, D + " +lat_0=39.66825833333333 +lon_0=-8.133108333333334 +k=1" + s + N + C + B + E + A, 1, D + Za + Si + " +k=1" + u + CO + C + B + E + A, 1, D + L2 + YE + V + O + N + C + B + E + A, 1, H + " +lat_1=45.91666666666666 +lat_2=43.08333333333334" + L2 + YE + s + N + C + B + E + A, 1, I + KC + C + B + E + A, 1, I + NR + C + B + E + A, 1, I + Gz + i + TQ + E + A, 1, D + " +lat_0=32 +lon_0=-64.75 +k=1 +x_0=550000" + EK + j + B + E + A, 1, D + L2 + KK + V + s + N + X + E + A, 1, D + L2 + Jb + V + s + N + X + E + A, 1, D + L2 + Lj + V + s + N + X + E + A, 2, D + L2 + KK + V + s + N + C + B + E + A, 1, D + L2 + Jb + V + s + N + C + B + E + A, 1, D + L2 + Lj + V + s + N + C + B + E + A, 2, D + L2 + KK + V + s + N + C + B + E + A, 1, D + L2 + Jb + V + s + N + C + B + E + A, 1, D + L2 + Lj + V + s + N + C + B + E + A, 2, D + " +lat_0=-25.06855261111111 +lon_0=-130.1129671111111 +k=1 +x_0=14200 +y_0=15500" + j + B + E + A, 1, I + TX + o + R + Ta + E + A, 4, D + L2 + ZW + " +k=1" + Bo + Ak + C + B + E + A, 1, D + L2 + " +lon_0=169 +k=1" + Bo + Ak + C + B + E + A, 1, D + L2 + " +lon_0=179 +k=1" + Bo + Ak + C + B + E + A, 1, D + L2 + " +lon_0=-178 +k=1" + Bo + Ak + C + B + E + A, 2, D + L2 + Si + " +k=1" + Bo + Ak + C + B + E + A, 1, D + L2 + Gj + V + O + EO + C + B + E + A, 1, H + " +lat_1=23 +lat_2=21.7 +lat_0=22.35" + CR + O + " +y_0=280296.016" + X + E + A, 1, H + " +lat_1=21.3 +lat_2=20.13333333333333 +lat_0=20.71666666666667 +lon_0=-76.83333333333333" + O + " +y_0=229126.939" + X + E + A, 1, H + Yv + Nh + IZ + " +lon_0=-70" + CX + N + X + E + A, 1, H + Yv + Nh + IZ + " +lon_0=-70" + CX + N + C + B + E + A, 1, H + Yv + Nh + IZ + " +lon_0=-70" + CX + N + C + B + E + A, 1, D + L2 + Mt + V + s + N + X + E + A, 1, D + L2 + Mt + V + s + N + C + B + E + A, 1, D + L2 + Mt + V + s + N + C + B + E + A, 10, H + Ks + Kt + " +lat_0=50.797815" + WH + " +x_0=649328 +y_0=665262" + C + B + E + A, 2, D + Li + Sj + Tn + O + Pm + C + B + E + A, 1, D + Li + Sj + Tn + O + Pm + C + B + E + A, 1, D + Li + Sj + Tn + O + Pm + C + B + E + A, 3, K + Y + " +towgs84=595.48,121.69,515.35,4.115,-2.9383,0.853,-3.408" + A, 2, K + x + A, 3, K + C + B + A, 1, D + L2 + ZU + V + Bv + N + C + B + E + A, 1, D + L2 + ZV + V + Bv + N + C + B + E + A, 1, D + L2 + ZU + V + Bv + N + x + E + A, 1, D + L2 + ZV + V + Bv + N + x + E + A, 1, I + Mg + R + Rq + E + A, 3, JU + Oe + " +k=1" + s + N + S + E + A, 1, D + L2 + KB + " +k=1" + Ci + N + M + b + E + A, 1, D + L2 + KB + " +k=1" + Ci + N + M + Ar + E + A, 1, D + L2 + Gj + " +k=1" + Bo + N + M + Ar + E + A, 1, D + L2 + Gl + " +k=1" + DP + N + M + Ar + E + A, 1, D + L2 + KB + " +k=1" + Bo + N + M + b + E + A, 1, D + L2 + IH + " +k=1" + DP + N + M + b + E + A, 1, D + L2 + HO + " +k=1" + MT + N + M + b + E + A, 1, D + L2 + Ia + " +k=1" + LY + N + M + b + E + A, 1, D + L2 + QR + " +k=1" + Jt + N + M + Ar + E + A, 3, GU + " +lat_0=46" + RJ + Rv + O + Ae + M + b + E + A, 1, D + L2 + " +lon_0=11.30625 +k=1.000006 +x_0=1500025.141 +y_0=-667.282" + C + B + E + A, 1, D + L2 + " +lon_0=13.55626666666667 +k=1.0000058 +x_0=1500044.695 +y_0=-667.13" + C + B + E + A, 1, D + L2 + " +lon_0=15.80628452944445 +k=1.00000561024 +x_0=1500064.274 +y_0=-667.711" + C + B + E + A, 1, D + L2 + " +lon_0=18.0563 +k=1.0000054 +x_0=1500083.521 +y_0=-668.8440000000001" + C + B + E + A, 1, D + L2 + " +lon_0=20.30631666666667 +k=1.0000052 +x_0=1500102.765 +y_0=-670.706" + C + B + E + A, 1, D + L2 + " +lon_0=22.55633333333333 +k=1.0000049 +x_0=1500121.846 +y_0=-672.557" + C + B + E + A, 1, H + " +lat_1=-37.5 +lat_2=-44.5 +lat_0=-41 +lon_0=173" + aH + " +y_0=7000000" + C + B + E + A, 1, H + Ai + Aj + m + " +lon_0=157" + O + N + C + B + E + A, 2, D + L2 + " +lon_0=18.05787 +k=0.99999506 +x_0=100182.7406 +y_0=-6500620.1207" + C + B + E + A, 3, JU + " +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0" + N + " +k=1.0" + E + " +nadgrids=@null +wktext " + A, 16, D + L2 + RI + " +k=1" + Ht + N + C + B + E + A, 1, D + L2 + UI + " +k=1" + HV + N + C + B + E + A, 1, D + L2 + Gl + " +k=1" + Hw + N + C + B + E + A, 1, D + L2 + Yx + " +k=1" + HW + N + C + B + E + A, 1, D + L2 + SP + " +k=1" + Hx + N + C + B + E + A, 1, D + L2 + II + " +k=1" + La + N + C + B + E + A, 1, D + L2 + RJ + " +k=1" + Hy + N + C + B + E + A, 1, D + L2 + UJ + " +k=1" + Hz + N + C + B + E + A, 1, D + L2 + HO + " +k=1" + IA + N + C + B + E + A, 1, D + L2 + RP + " +k=1" + IB + N + C + B + E + A, 1, D + L2 + " +lon_0=29 +k=1" + Gx + N + C + B + E + A, 1, D + L2 + Ia + " +k=1" + IT + N + C + B + E + A, 1, D + L2 + QQ + " +k=1" + Gc + N + C + B + E + A, 4, K + C + B + A, 1, I + KD + C + B + E + A, 1, I + JZ + C + B + E + A, 1, I + JM + C + B + E + A, 1, D + WJ + " +lon_0=46.5 +k=0.9994" + CX + N + R + n + E + A, 13, K + Y + Aw + A, 6, D + L2 + Gj + V + O + EO + Y + Aw + E + A, 8, I + Gz + i + Je + E + A, 22, H + " +lat_1=41.25 +lat_2=42.75" + PR + Or + Jv + Tj + C + B + E + A, 1, H + " +lat_1=42.25 +lat_2=43.75" + Nj + Or + Jv + " +y_0=2200000" + C + B + E + A, 1, H + " +lat_1=43.25 +lat_2=44.75" + IZ + Or + Jv + " +y_0=3200000" + C + B + E + A, 1, H + " +lat_1=44.25 +lat_2=45.75" + IP + Or + Jv + " +y_0=4200000" + C + B + E + A, 1, H + " +lat_1=45.25 +lat_2=46.75 +lat_0=46" + Or + Jv + " +y_0=5200000" + C + B + E + A, 1, H + aI + " +lat_2=47.75" + Ib + Or + Jv + " +y_0=6200000" + C + B + E + A, 1, H + " +lat_1=47.25 +lat_2=48.75 +lat_0=48" + Or + Jv + " +y_0=7200000" + C + B + E + A, 1, H + " +lat_1=48.25 +lat_2=49.75 +lat_0=49" + Or + Jv + " +y_0=8200000" + C + B + E + A, 1, H + " +lat_1=49.25 +lat_2=50.75" + Yu + Or + Jv + " +y_0=9200000" + C + B + E + A, 18, H + " +lat_1=37" + YS + GM + Ga + s + N + C + B + E + A, 1, H + " +lat_1=37" + YS + GM + Ga + s + N + C + B + E + A, 1, H + " +lat_1=37" + YS + GM + Ga + s + N + C + B + E + A, 6, BP + m + " +lat_ts=-70" + HN + " +k=1" + s + N + S + E + A, 2, H + LM + IJ + " +lat_0=49 +lon_0=-95" + s + N + C + B + E + A, 1, H + LM + IJ + " +lat_0=49 +lon_0=-95" + s + N + C + B + E + A, 7, D + ZA + Ia + " +k=1" + h + Ae + i + CW + E + A, 1, D + ZA + RP + " +k=1" + h + Ae + i + CW + E + A, 1, D + ZA + UJ + " +k=1" + h + Ae + i + CW + E + A, 1, D + ZA + II + " +k=1" + h + Ae + i + CW + E + A, 2, H + GW + GX + GY + GA + e + N + i + Je + J + A, 1, H + GW + GX + GY + GA + e + Pv + i + Je + J + A, 2, JU + " +lon_0=100 +lat_ts=-41" + s + N + S + E + A, 1, BP + Hr + " +lat_ts=71" + HN + " +k=1" + s + N + S + E + A, 1, BP + Hr + " +lat_ts=75" + HN + " +k=1" + s + N + S + E + A, 1, D + L2 + " +lon_0=55.33333333333334 +k=1" + O + N + S + E + A, 4, K + PV + A, 1, K + Ok + A, 1, K + x + A, 1, K + Y + A, 1, K + Hn + EL + A, 1, K + HB + A, 1, K + Ee + Ef + A, 1, K + i + A, 2, K + Nc + Nd + A, 1, K + AU + BN + A, 1, K + c + A, 1, K + Bc + BS + A, 1, K + AU + " +b=6356514.996941779" + A, 1, K + By + Ay + A, 1, K + Lo + A, 2, K + GL + Bz + A, 1, K + C + A, 1, K + Gn + A, 1, K + IR + Bh + A, 1, K + R + A, 1, K + C + B + A, 0, K + C + B + A, 1, K + M + A, 1, K + aJ + A, 1, D + L2 + " +lon_0=28.4 +k=0.9999400000000001" + h + EO + C + B + E + A, 1, K + " +a=6376523" + RA + A, 1, K + Zx + Qy + A, 1, K + Qj + Ho + A, 1, K + j + A, 1, K + j + A, 1, K + " +a=6378136.2 +b=6356751.516927429" + A, 1, K + " +a=6378136.3 +b=6356751.616592146" + A, 1, K + RB + RC + A, 2, K + aK + A, 1, I + Ki + S + E + A, 1, I + Mf + S + E + A, 3, K + Pd + Gq + A, 1, K + HK + Gv + A, 1, K + T + A, 1, K + Lp + Hp + A, 1, K + Go + CT + A, 1, K + C + B + A, 1, K + " +a=6371007 +b=6371007" + A, 1, D + L2 + IH + V + O + Ak + C + B + E + A, 1, D + L2 + " +lon_0=14" + V + O + Ak + C + B + E + A, 1, D + L2 + " +lon_0=16" + V + O + Ak + C + B + E + A, 1, D + L2 + QR + V + O + Ak + C + B + E + A, 1, K + " +a=6370997 +b=6370997" + A, 1, K + ZX + ZY + A, 1, K + ZZ + Ri + A, 2, D + L2 + UI + V + O + Ak + C + B + E + A, 1, D + L2 + Yx + V + O + Ak + C + B + E + A, 1, D + L2 + II + V + O + Ak + C + B + E + A, 1, D + L2 + UJ + V + O + Ak + C + B + E + A, 1, D + L2 + RP + V + O + Ak + C + B + E + A, 1, I + KC + o + C + B + E + A, 1, I + NR + o + C + B + E + A, 1, I + Ki + o + C + B + E + A, 8, I + MB + o + R + TF + E + A, 4, K + C + B + A, 6, K + C + B + A, 1, I + SL + C + B + E + A, 1, I + Ja + C + B + E + A, 4, "+proj=eqc +lat_ts=0" + L2 + HN + s + N + S + E + A, 1, "+proj=eqc +lat_ts=0" + L2 + HN + s + N + " +a=6371007 +b=6371007" + E + A, 5, D + L2 + KB + JE + h + EO + C + B + E + A, 1, D + L2 + Lu + JE + u + EO + C + B + E + A, 1, D + L2 + " +lon_0=11.75" + JE + a + EO + C + B + E + A, 1, D + L2 + Gj + " +k=1" + CX + EO + C + B + E + A, 24, K + Y + A, 1, K + C + Qb + A, 1, K + Pd + Gq + A, 1, K + R + At + A, 1, K + Y + BW + A, 3, K + i + HF + A, 1, K + i + A, 1, K + i + A, 1, K + j + KR + A, 1, K + By + Ay + JP + A, 1, K + c + QC + A, 1, K + C + Lw + A, 1, K + c + Gg + A, 1, K + i + GB + A, 1, K + i + A, 1, K + i + A, 1, K + i + A, 1, K + i + Je + A, 2, K + C + UC + A, 1, K + c + JO + A, 1, K + c + IE + A, 1, K + By + Ay + JQ + A, 1, K + Lp + Hp + GQ + A, 1, K + Go + CT + BT + A, 1, K + M + HG + A, 1, K + j + B + A, 1, K + Y + Gf + A, 1, K + Y + Py + A, 1, K + C + B + A, 1, K + C + B + A, 1, K + R + Pz + A, 1, K + R + Gy + A, 1, K + AU + BN + Nm + A, 1, K + Y + Gh + A, 1, K + Ee + Ef + A, 1, K + R + QA + A, 1, K + R + v + A, 1, K + R + A, 1, K + R + SD + A, 1, K + Y + A, 1, K + j + B + A, 1, K + M + NK + A, 1, K + R + TM + A, 1, K + j + B + A, 1, K + C + B + A, 1, K + Qj + Ho + NI + A, 1, K + i + TC + A, 1, K + C + B + A, 1, K + C + B + A, 2, K + C + B + A, 1, K + Qj + Ho + A, 1, K + c + OW + A, 1, K + C + B + A, 2, K + M + Ar + A, 1, K + M + b + A, 1, K + C + B + A, 1, K + R + Jx + A, 1, K + R + Sw + A, 1, K + R + Sx + A, 1, K + R + TN + A, 4, K + PV + Bb + A, 1, K + C + B + A, 1, K + C + B + A, 1, K + M + A, 1, K + R + Qe + A, 1, K + AU + BN + RD + A, 1, K + R + NG + A, 1, K + R + " +towgs84=105,326,-102.5,0,0,0.814,-0.6" + A, 1, K + R + " +towgs84=-45,417,-3.5,0,0,0.814,-0.6" + A, 1, K + c + A, 1, K + c + A, 1, K + R + A, 1, K + M + G + A, 1, K + c + HX + A, 1, K + x + r + A, 1, K + x + CB + A, 1, K + R + Cm + A, 1, K + M + NL + A, 1, K + AU + BN + A, 1, K + R + EV + A, 1, K + R + Ec + A, 1, K + Bc + BS + In + A, 1, K + c + ER + A, 1, K + Y + Cj + A, 1, K + c + Jw + A, 1, K + AU + BN + Sy + A, 1, K + M + U + A, 1, K + R + A, 1, K + i + TQ + A, 1, D + L2 + Lf + AP + k + N + C + B + J + A, 0, D + L2 + Lf + AP + k + N + C + B + J + A, 1, K + R + ES + A, 1, K + Y + " +towgs84=-384,664,-48,0,0,0,0" + A, 1, K + c + GO + A, 1, K + R + Bs + A, 1, K + Bc + BS + Ax + A, 1, K + AU + BN + Gi + A, 1, K + R + TF + A, 1, K + R + GR + A, 2, K + AU + BN + HI + A, 2, K + Gn + HY + A, 1, K + R + n + A, 1, K + R + " +towgs84=-83.11,-97.38,-117.22,0.00569291,-0.0446976,0.0442851,0.1218" + A, 1, K + c + NM + A, 4, K + R + Rq + A, 1, K + aK + RE + A, 1, K + IR + Bh + Av + A, 1, K + By + Ay + JR + A, 1, K + By + Ay + NN + A, 1, K + RB + RC + A, 1, K + i + TG + A, 1, K + HK + Gv + A, 1, K + By + Ay + Tb + A, 1, K + GL + Bz + BV + A, 1, K + c + Qh + A, 1, K + R + Hc + A, 1, K + R + AX + A, 1, K + R + A, 1, K + c + TR + A, 1, K + c + " +towgs84=-90,40,88,0,0,0,0" + A, 1, K + AU + BN + A, 1, K + i + GC + A, 1, K + R + OV + A, 1, K + R + " +towgs84=-333,-222,114,0,0,0,0" + A, 1, K + c + " +towgs84=41,-220,-134,0,0,0,0" + A, 1, K + Y + HZ + A, 1, K + C + B + A, 1, K + R + Qd + A, 2, K + AU + BN + IO + A, 1, K + Y + Tc + A, 1, K + c + GS + A, 2, K + R + CK + A, 1, K + AU + BN + NO + A, 1, K + X + A, 2, K + C + B + A, 1, K + c + DO + A, 1, K + R + TS + A, 1, K + R + W + A, 1, K + Hn + EL + Aa + A, 1, K + R + JL + A, 1, K + AU + BN + Bk + A, 1, K + aJ + A, 1, K + PV + Lx + A, 1, K + PV + A, 1, K + PV + A, 1, K + Y + A, 1, K + Nc + Nd + DS + A, 1, K + AU + BN + TH + A, 1, K + C + B + A, 1, K + M + F + A, 1, K + R + QO + A, 1, K + Gn + A, 2, K + R + A, 1, K + Y + Fv + A, 3, K + R + Nn + A, 1, K + HB + Bt + A, 2, K + Y + A, 2, K + R + HD + A, 1, K + Lo + GD + A, 1, K + Ok + Bb + A, 1, K + Ok + Bb + A, 1, K + Y + g + A, 1, K + Ee + Ef + JK + A, 1, K + Gn + A, 1, K + AU + BN + JC + A, 2, K + Y + A, 1, K + c + Af + A, 1, K + Y + A, 1, K + R + " +towgs84=-155,171,37,0,0,0,0" + A, 1, K + AU + BN + A, 1, K + R + HE + A, 1, K + Y + z + A, 1, K + R + GP + A, 1, K + Y + AC + A, 1, K + AU + BN + No + A, 1, K + R + QP + A, 2, K + j + MR + A, 1, K + C + Rr + A, 3, K + T + P + A, 2, K + T + Q + A, 2, K + S + A, 64, Ck + " +lat_0=2.042583333333333 +lon_0=103.5627583333333" + s + N + GL + Bz + BV + E + A, 1, Ck + " +lat_0=2.712283333333334 +lon_0=101.9411666666667 +x_0=-242.005 +y_0=-948.547" + GL + Bz + BV + E + A, 1, Ck + " +lat_0=3.710972222222222 +lon_0=102.4361777777778" + s + N + GL + Bz + BV + E + A, 1, Ck + " +lat_0=3.680344444444444 +lon_0=101.5082444444444 +x_0=-21759.438 +y_0=55960.906" + GL + Bz + BV + E + A, 1, Ck + " +lat_0=4.946141666666667 +lon_0=102.8952083333333" + s + N + GL + Bz + BV + E + A, 1, Ck + " +lat_0=5.421325 +lon_0=100.3458694444444" + s + N + GL + Bz + BV + E + A, 1, Ck + " +lat_0=5.965147222222223 +lon_0=100.6375944444444" + s + N + GL + Bz + BV + E + A, 1, Ck + " +lat_0=4.859380555555555 +lon_0=100.8167666666667" + s + " +y_0=133453.669" + GL + Bz + BV + E + A, 1, Ck + " +lat_0=5.893922222222222 +lon_0=102.1772916666667" + s + N + GL + Bz + BV + E + A, 1, D + L2 + Lf + AP + k + N + X + J + A, 1, D + L2 + KG + AP + k + N + X + J + A, 1, D + L2 + KH + AP + k + N + X + J + A, 1, D + L2 + Lh + AP + k + N + X + J + A, 1, D + L2 + SX + AP + k + N + X + J + A, 1, D + L2 + " +lon_0=-159" + AP + k + N + X + J + A, 0, D + L2 + " +lon_0=-159" + AP + k + N + X + J + A, 1, D + L2 + YJ + AP + k + N + X + J + A, 1, D + L2 + Qr + AP + k + N + X + J + A, 1, D + L2 + " +lon_0=-141" + AP + k + N + X + J + A, 1, D + L2 + YK + AP + k + N + X + J + A, 1, D + L2 + YT + AP + k + N + X + J + A, 1, D + L2 + " +lon_0=-123" + AP + k + N + X + J + A, 1, D + L2 + Lj + AP + k + N + X + J + A, 1, D + L2 + KK + AP + k + N + X + J + A, 1, D + L2 + " +lon_0=-105" + AP + k + N + X + J + A, 1, D + " +lat_0=13.5 +lon_0=144.75 +k=1" + BU + IK + C + B + E + A, 1, H + " +lat_1=-6.5 +lat_2=-11.5" + ZA + UJ + O + Ae + i + CW + E + A, 2, D + L2 + Gl + " +k=1" + IM + N + M + Ar + E + A, 1, D + L2 + UR + AP + k + N + X + J + A, 1, D + L2 + MP + AP + k + N + X + J + A, 1, D + L2 + KG + AP + k + N + C + B + J + A, 1, D + L2 + KH + AP + k + N + C + B + J + A, 1, D + L2 + Lh + AP + k + N + C + B + J + A, 1, D + L2 + SX + AP + k + N + C + B + J + A, 1, D + L2 + " +lon_0=-159" + AP + k + N + C + B + J + A, 1, D + L2 + YJ + AP + k + N + C + B + J + A, 1, D + L2 + Qr + AP + k + N + C + B + J + A, 1, D + L2 + " +lon_0=-141" + AP + k + N + C + B + J + A, 1, D + L2 + YK + AP + k + N + C + B + J + A, 1, D + L2 + YT + AP + k + N + C + B + J + A, 1, D + L2 + " +lon_0=-123" + AP + k + N + C + B + J + A, 1, D + L2 + Lj + AP + k + N + C + B + J + A, 1, D + L2 + KK + AP + k + N + C + B + J + A, 1, D + L2 + " +lon_0=-105" + AP + k + N + C + B + J + A, 1, D + L2 + II + " +k=1" + MS + N + M + Ar + E + A, 3, H + GW + GX + GY + GA + h + IK + C + B + E + A, 1, D + L2 + UR + AP + k + N + C + B + J + A, 1, D + L2 + MP + AP + k + N + C + B + J + A, 16, H + Dp + Dq + y + Ea + Z + N + X + J + A, 1, H + Dl + Dm + CA + Oc + Z + Pv + X + J + A, 1, H + Fd + Fe + AL + CS + a + N + C + B + J + A, 5, H + " +lat_1=-18" + ZT + " +lat_0=-27" + Il + s + N + S + E + A, 1, K + C + B + A, 4, I + ID + C + B + E + A, 3, K + C + B + A, 1, I + JZ + o + C + B + E + A, 4, K + R + PJ + A, 8, K + C + B + A, 1, I + Ns + C + B + E + A, 1, I + Nt + C + B + E + A, 1, I + Nu + C + B + E + A, 1, I + Nw + C + B + E + A, 1, I + NP + C + B + E + A, 1, I + NQ + C + B + E + A, 1, K + C + A, 1, D + L2 + HP + " +k=1" + HU + N + C + E + A, 1, D + L2 + HQ + " +k=1" + Gw + N + C + E + A, 1, D + L2 + Hd + " +k=1" + Hu + N + C + E + A, 1, D + L2 + HR + " +k=1" + Hv + N + C + E + A, 1, D + L2 + HS + " +k=1" + It + N + C + E + A, 1, D + L2 + EN + " +k=1" + Hs + N + C + E + A, 1, D + L2 + Fy + " +k=1" + Ht + N + C + E + A, 1, D + L2 + Fm + " +k=1" + HV + N + C + E + A, 1, D + L2 + Fr + " +k=1" + Hw + N + C + E + A, 1, D + L2 + Ed + " +k=1" + HW + N + C + E + A, 1, D + L2 + Fn + " +k=1" + Hx + N + C + E + A, 1, D + L2 + HP + " +k=1" + O + N + C + E + A, 1, D + L2 + HQ + " +k=1" + O + N + C + E + A, 1, D + L2 + Hd + " +k=1" + O + N + C + E + A, 1, D + L2 + HR + " +k=1" + O + N + C + E + A, 1, D + L2 + HS + " +k=1" + O + N + C + E + A, 1, D + L2 + EN + " +k=1" + O + N + C + E + A, 1, D + L2 + Fy + " +k=1" + O + N + C + E + A, 1, D + L2 + Fm + " +k=1" + O + N + C + E + A, 1, D + L2 + Fr + " +k=1" + O + N + C + E + A, 1, D + L2 + Ed + " +k=1" + O + N + C + E + A, 1, D + L2 + Fn + " +k=1" + O + N + C + E + A, 1, D + L2 + HP + " +k=1" + Hy + N + C + E + A, 1, D + L2 + Lt + " +k=1" + Hz + N + C + E + A, 1, D + L2 + HQ + " +k=1" + IA + N + C + E + A, 1, D + L2 + Ni + " +k=1" + IB + N + C + E + A, 1, D + L2 + Hd + " +k=1" + Gx + N + C + E + A, 1, D + L2 + Hq + " +k=1" + IT + N + C + E + A, 1, D + L2 + HR + " +k=1" + Gc + N + C + E + A, 1, D + L2 + Mj + " +k=1" + IU + N + C + E + A, 1, D + L2 + HS + " +k=1" + Iu + N + C + E + A, 1, D + L2 + Jj + " +k=1" + Mu + N + C + E + A, 1, D + L2 + EN + " +k=1" + Mv + N + C + E + A, 1, D + L2 + Le + " +k=1" + Mw + N + C + E + A, 1, D + L2 + Fy + " +k=1" + Mx + N + C + E + A, 1, D + L2 + Im + " +k=1" + My + N + C + E + A, 1, D + L2 + Fm + " +k=1" + Mz + N + C + E + A, 1, D + L2 + KF + " +k=1" + NA + N + C + E + A, 1, D + L2 + Fr + " +k=1" + NB + N + C + E + A, 1, D + L2 + Jk + " +k=1" + Oh + N + C + E + A, 1, D + L2 + Ed + " +k=1" + NC + N + C + E + A, 1, D + L2 + Il + " +k=1" + Oi + N + C + E + A, 1, D + L2 + Fn + " +k=1" + ND + N + C + E + A, 1, D + L2 + HP + " +k=1" + O + N + C + E + A, 1, D + L2 + Lt + " +k=1" + O + N + C + E + A, 1, D + L2 + HQ + " +k=1" + O + N + C + E + A, 1, D + L2 + Ni + " +k=1" + O + N + C + E + A, 1, D + L2 + Hd + " +k=1" + O + N + C + E + A, 1, D + L2 + Hq + " +k=1" + O + N + C + E + A, 1, D + L2 + HR + " +k=1" + O + N + C + E + A, 1, D + L2 + Mj + " +k=1" + O + N + C + E + A, 1, D + L2 + HS + " +k=1" + O + N + C + E + A, 1, D + L2 + Jj + " +k=1" + O + N + C + E + A, 1, D + L2 + EN + " +k=1" + O + N + C + E + A, 1, D + L2 + Le + " +k=1" + O + N + C + E + A, 1, D + L2 + Fy + " +k=1" + O + N + C + E + A, 1, D + L2 + Im + " +k=1" + O + N + C + E + A, 1, D + L2 + Fm + " +k=1" + O + N + C + E + A, 1, D + L2 + KF + " +k=1" + O + N + C + E + A, 1, D + L2 + Fr + " +k=1" + O + N + C + E + A, 1, D + L2 + Jk + " +k=1" + O + N + C + E + A, 1, D + L2 + Ed + " +k=1" + O + N + C + E + A, 1, D + L2 + Il + " +k=1" + O + N + C + E + A, 1, D + L2 + Fn + " +k=1" + O + N + C + E + A, 1, K + M + A, 3, K + C + B + A, 1, I + Gz + C + B + E + A, 9, D + L2 + HP + " +k=1" + HU + N + M + E + A, 1, D + L2 + HQ + " +k=1" + Gw + N + M + E + A, 1, D + L2 + Hd + " +k=1" + Hu + N + M + E + A, 1, D + L2 + HR + " +k=1" + Hv + N + M + E + A, 1, D + L2 + HS + " +k=1" + It + N + M + E + A, 1, D + L2 + EN + " +k=1" + Hs + N + M + E + A, 1, D + L2 + Fy + " +k=1" + Ht + N + M + E + A, 1, D + L2 + Fm + " +k=1" + HV + N + M + E + A, 1, D + L2 + Fr + " +k=1" + Hw + N + M + E + A, 1, D + L2 + Ed + " +k=1" + HW + N + M + E + A, 1, D + L2 + Fn + " +k=1" + Hx + N + M + E + A, 1, D + L2 + HP + " +k=1" + O + N + M + E + A, 1, D + L2 + HQ + " +k=1" + O + N + M + E + A, 1, D + L2 + Hd + " +k=1" + O + N + M + E + A, 1, D + L2 + HR + " +k=1" + O + N + M + E + A, 1, D + L2 + HS + " +k=1" + O + N + M + E + A, 1, D + L2 + EN + " +k=1" + O + N + M + E + A, 1, D + L2 + Fy + " +k=1" + O + N + M + E + A, 1, D + L2 + Fm + " +k=1" + O + N + M + E + A, 1, D + L2 + Fr + " +k=1" + O + N + M + E + A, 1, D + L2 + Ed + " +k=1" + O + N + M + E + A, 1, D + L2 + Fn + " +k=1" + O + N + M + E + A, 11, K + c + A, 1, K + c + TI + A, 1, K + c + TJ + A, 1, K + c + TK + A, 1, K + c + TL + A, 1, K + c + UB + A, 1, K + c + Sv + A, 1, K + c + Ps + A, 1, K + i + A, 1, K + i + A, 1, K + As + d + A, 1, K + R + Jg + A, 1, K + C + B + A, 1, K + Y + Hf + A, 1, K + R + Jy + A, 1, K + R + SE + A, 1, K + R + Sz + A, 1, K + C + B + A, 1, K + x + Al + A, 1, K + C + B + A, 1, K + c + " +towgs84=-106,-129,165,0,0,0,0" + A, 1, K + R + TA + A, 1, K + R + SF + A, 1, K + R + NH + A, 1, K + C + B + A, 1, K + R + TO + A, 1, K + R + SJ + A, 1, K + C + B + A, 1, K + R + TP + A, 1, K + R + Lr + A, 1, K + R + UD + A, 2, K + R + SG + A, 1, K + R + QM + A, 3, K + R + " +towgs84=365,194,166,0,0,0,0" + A, 1, K + R + " +towgs84=325,154,172,0,0,0,0" + A, 1, K + i + TZ + A, 1, K + R + SH + A, 2, K + R + Jf + A, 1, K + R + TB + A, 1, K + R + Ke + A, 1, K + R + HH + A, 2, K + R + SI + A, 1, D + L2 + KB + AP + IU + N + C + B + E + A, 5, D + L2 + HP + " +k=1" + Hy + N + M + E + A, 1, D + L2 + Lt + " +k=1" + Hz + N + M + E + A, 1, D + L2 + HQ + " +k=1" + IA + N + M + E + A, 1, D + L2 + Ni + " +k=1" + IB + N + M + E + A, 1, D + L2 + Hd + " +k=1" + Gx + N + M + E + A, 1, K + " +a=6377019.27 +b=6355762.5391 +towgs84=-28,199,5,0,0,0,0" + A, 1, K + R + Jd + A, 1, K + C + B + A, 1, K + R + Jz + A, 1, K + C + B + A, 1, K + R + Qc + A, 1, K + R + PI + A, 1, K + R + Pt + A, 1, K + R + Pa + A, 1, K + Y + Pb + A, 1, K + j + B + A, 1, K + R + " +towgs84=-86,-98,-119,0,0,0,0" + A, 1, K + C + B + A, 1, K + j + B + A, 1, K + AU + BN + A, 1, K + R + TT + A, 1, K + R + Np + A, 1, K + C + B + A, 1, K + i + " +towgs84=-100,-248,259,0,0,0,0" + A, 1, K + M + A, 1, K + M + A, 1, K + M + " +towgs84=44.585,-131.212,-39.544,0,0,0,0" + A, 1, K + c + " +towgs84=-80.01,253.26,291.19,0,0,0,0" + A, 1, K + c + " +towgs84=124.5,-63.5,-281,0,0,0,0" + A, 2, K + By + Ay + RF + A, 1, K + i + BX + A, 1, K + R + " +towgs84=-133,-321,50,0,0,0,0" + A, 2, K + C + B + A, 1, K + C + Bm + A, 1, K + R + Kc + A, 1, K + R + Lq + A, 1, K + R + Kg + A, 1, K + R + Kh + A, 1, K + R + QN + A, 1, K + j + TD + A, 1, K + j + B + A, 1, K + i + CW + A, 1, K + c + A, 1, K + c + A, 1, K + R + TE + A, 1, K + c + Qf + A, 1, K + c + A, 1, K + c + GN + A, 1, K + C + B + A, 1, K + c + A, 1, K + R + A, 1, K + R + A, 1, K + Gn + Qg + A, 1, K + R + " +towgs84=114,-116,-333,0,0,0,0" + A, 1, K + x + " +towgs84=-491,-22,435,0,0,0,0" + A, 1, K + R + " +towgs84=145,75,-272,0,0,0,0" + A, 1, K + R + " +towgs84=-320,550,-494,0,0,0,0" + A, 1, K + R + " +towgs84=124,-234,-25,0,0,0,0" + A, 1, K + R + " +towgs84=-205,107,53,0,0,0,0" + A, 1, K + c + " +towgs84=-79,-129,145,0,0,0,0" + A, 1, K + R + " +towgs84=-127,-769,472,0,0,0,0" + A, 1, K + R + " +towgs84=-104,-129,239,0,0,0,0" + A, 1, K + R + " +towgs84=298,-304,-375,0,0,0,0" + A, 1, K + i + " +towgs84=-2,151,181,0,0,0,0" + A, 1, K + R + " +towgs84=230,-199,-752,0,0,0,0" + A, 1, K + R + " +towgs84=211,147,111,0,0,0,0" + A, 1, K + T + P + A, 1, K + R + JD + A, 1, K + R + " +towgs84=-794,119,-298,0,0,0,0" + A, 1, K + i + Lg + A, 1, K + R + " +towgs84=208,-435,-229,0,0,0,0" + A, 1, K + R + " +towgs84=189,-79,-202,0,0,0,0" + A, 1, K + i + Ly + A, 1, K + R + " +towgs84=403,-81,277,0,0,0,0" + A, 1, K + R + " +towgs84=-307,-92,127,0,0,0,0" + A, 1, K + R + Ta + A, 1, K + R + " +towgs84=170,42,84,0,0,0,0" + A, 2, K + " +a=6378270 +b=6356794.343434343 +towgs84=102,52,-38,0,0,0,0" + A, 1, K + R + " +towgs84=276,-57,149,0,0,0,0" + A, 1, K + R + " +towgs84=-632,438,-609,0,0,0,0" + A, 1, K + R + " +towgs84=647,1777,-1124,0,0,0,0" + A, 1, K + c + " +towgs84=260,12,-147,0,0,0,0" + A, 1, K + C + B + A, 1, K + Ee + Ef + A, 1, K + R + " +towgs84=-156,-271,-189,0,0,0,0" + A, 1, K + " +a=6378136 +b=6356751.361745712 +towgs84=0,0,1.5,-0,-0,0.076,0" + A, 1, K + R + A, 1, K + C + A, 1, K + c + EU + A, 1, K + c + A, 1, K + Y + A, 1, K + Y + A, 1, K + C + B + A, 1, K + UW + Ym + Nl + A, 1, K + C + B + A, 1, K + j + QB + A, 1, K + Yn + Qz + A, 1, K + UW + Ym + Nl + A, 1, K + R + A, 1, K + R + w + A, 1, K + j + B + A, 1, K + j + Fu + A, 1, K + j + A, 1, K + j + B + A, 1, K + C + B + A, 1, K + aJ + A, 1, K + C + B + A, 1, K + j + B + A, 1, K + j + B + A, 1, K + C + B + A, 1, K + C + B + A, 1, D + L2 + Hq + " +k=1" + IT + N + M + E + A, 1, D + L2 + HR + " +k=1" + Gc + N + M + E + A, 1, D + L2 + Mj + " +k=1" + IU + N + M + E + A, 1, D + L2 + HS + " +k=1" + Iu + N + M + E + A, 1, D + L2 + Jj + " +k=1" + Mu + N + M + E + A, 1, D + L2 + EN + " +k=1" + Mv + N + M + E + A, 1, D + L2 + Le + " +k=1" + Mw + N + M + E + A, 1, D + L2 + Fy + " +k=1" + Mx + N + M + E + A, 1, D + L2 + Im + " +k=1" + My + N + M + E + A, 1, D + L2 + Fm + " +k=1" + Mz + N + M + E + A, 1, D + L2 + KF + " +k=1" + NA + N + M + E + A, 1, D + L2 + Fr + " +k=1" + NB + N + M + E + A, 1, D + L2 + Jk + " +k=1" + Oh + N + M + E + A, 1, D + L2 + Ed + " +k=1" + NC + N + M + E + A, 1, D + L2 + Il + " +k=1" + Oi + N + M + E + A, 1, D + L2 + Fn + " +k=1" + ND + N + M + E + A, 1, D + L2 + HP + " +k=1" + O + N + M + E + A, 1, D + L2 + Lt + " +k=1" + O + N + M + E + A, 1, D + L2 + HQ + " +k=1" + O + N + M + E + A, 1, D + L2 + Ni + " +k=1" + O + N + M + E + A, 1, D + L2 + Hd + " +k=1" + O + N + M + E + A, 1, D + L2 + Hq + " +k=1" + O + N + M + E + A, 1, D + L2 + HR + " +k=1" + O + N + M + E + A, 1, D + L2 + Mj + " +k=1" + O + N + M + E + A, 1, D + L2 + HS + " +k=1" + O + N + M + E + A, 1, D + L2 + Jj + " +k=1" + O + N + M + E + A, 1, D + L2 + EN + " +k=1" + O + N + M + E + A, 1, D + L2 + Le + " +k=1" + O + N + M + E + A, 1, D + L2 + Fy + " +k=1" + O + N + M + E + A, 1, D + L2 + Im + " +k=1" + O + N + M + E + A, 1, D + L2 + Fm + " +k=1" + O + N + M + E + A, 1, D + L2 + KF + " +k=1" + O + N + M + E + A, 1, D + L2 + Fr + " +k=1" + O + N + M + E + A, 1, D + L2 + Jk + " +k=1" + O + N + M + E + A, 1, D + L2 + Ed + " +k=1" + O + N + M + E + A, 1, K + Y + Gf + " +pm=bern" + A, 1, K + R + ES + " +pm=bogota" + A, 1, K + R + EV + Zb + A, 1, K + Y + HZ + PW + A, 1, K + Y + Aw + Ls + A, 1, K + R + CK + " +pm=rome" + A, 1, K + AU + BN + Bk + Lv + A, 1, K + Y + PW + A, 1, K + R + " +pm=brussels" + A, 1, K + R + HD + Lv + A, 1, K + AU + BN + JC + Lv + A, 1, D + L2 + Il + " +k=1" + O + N + M + E + A, 0, D + L2 + Il + " +k=1" + O + N + M + E + A, 1, K + Y + Cj + PW + A, 1, K + Y + " +pm=stockholm" + A, 1, K + Y + " +pm=athens" + A, 1, K + AU + BN + Gi + Lv + A, 1, K + Hn + EL + Aa + SN + A, 1, K + Y + Gh + Ls + A, 2, K + Y + Hf + PW + A, 1, K + AU + BN + Lv + A, 1, D + L2 + Fn + " +k=1" + O + N + M + E + A, 1, K + R + A, 1, K + R + A, 2, H + " +lat_1=15 +lat_2=16.66666666666667 +lat_0=15.83333333333333 +lon_0=-24 +x_0=161587.83 +y_0=128511.202" + S + E + A, 13, H + WK + WL + UK + YH + s + N + C + B + E + A, 62, K + " +a=6376523" + RA + ZM + A, 2, K + Zx + Qy + " +pm=madrid" + A, 1, K + Y + Pb + Zb + A, 109, K + C + B + A, 1, I + Nr + C + B + E + A, 1, I + Os + C + B + E + A, 1, I + Ja + C + B + E + A, 2, D + BY + UZ + " +k=1" + s + N + R + EV + E + A, 23, BP + Hr + Qm + HN + Rd + Bd + Cl + S + E + A, 1, BP + m + " +lat_ts=-90" + HN + Rd + Bd + Cl + S + E + A, 6, I + Ki + C + B + E + A, 21, DT + Sa + Hl + ZB + OZ + s + N + X + E + A, 1, DT + Sa + Hl + ZB + OZ + s + N + C + B + E + A, 1, DT + Sa + Hl + ZB + OZ + s + N + C + B + E + A, 1, DT + Sa + Hl + ZB + OZ + s + N + C + B + E + A, 33, D + Fk + " +lon_0=5.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=6.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=7.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=8.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=9.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + YH + " +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=11.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=12.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=13.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=14.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=15.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + YE + " +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=17.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=18.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=19.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=20.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=21.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=22.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=23.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=24.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=25.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=26.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=27.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=28.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=29.5 +k=1" + BU + AH + C + B + E + A, 1, D + Fk + " +lon_0=30.5 +k=1" + BU + AH + C + B + E + A, 2, K + Y + A, 35, D + Ch + NX + " +k=1" + h + Ae + Y + E + A, 1, D + Ch + Rt + " +k=1" + h + " +y_0=550000" + Y + E + A, 1, D + Ch + Ru + " +k=1" + h + Ae + Y + E + A, 1, D + Ch + Rt + " +k=1" + h + Ae + Y + E + A, 1, D + Ch + Ed + " +k=1" + h + Ae + Y + E + A, 1, D + Ch + NX + " +k=1" + h + Ae + Y + E + A, 1, D + Ch + " +lon_0=125.0028902777778 +k=1" + h + Ae + Y + E + A, 1, D + Ch + WM + " +k=1" + h + Ae + Y + E + A, 1, D + Ch + WM + " +k=1" + h + " +y_0=550000" + Y + E + A, 1, D + Ch + " +lon_0=129.0028902777778 +k=1" + h + Ae + Y + E + A, 1, D + Ch + " +lon_0=131.0028902777778 +k=1" + h + Ae + Y + E + A, 1, D + Ch + Pj + AP + BZ + Cl + Y + E + A, 1, D + Ch + Pj + AP + BZ + Cl + C + B + E + A, 1, D + Ch + Ru + " +k=1" + h + Ae + C + B + E + A, 1, D + Ch + Rt + " +k=1" + h + Ae + C + B + E + A, 1, D + Ch + Rt + " +k=1" + h + " +y_0=550000" + C + B + E + A, 1, D + Ch + Ed + " +k=1" + h + Ae + C + B + E + A, 1, D + Ch + NX + " +k=1" + h + Ae + C + B + E + A, 1, D + Ch + Ru + " +k=1" + h + Qn + C + B + E + A, 1, D + Ch + Rt + " +k=1" + h + Qn + C + B + E + A, 1, D + Ch + Ed + " +k=1" + h + Qn + C + B + E + A, 1, D + Ch + NX + " +k=1" + h + Qn + C + B + E + A, 33, Rp + SS + " +lon_0=42.5" + Kk + V + s + N + Y + Gh + Ls + E + A, 2, D + L2 + IH + AP + O + Ae + S + E + A, 5, K + Y + Lz + A, 1, K + Y + Lz + Ls + A, 4, K + By + Ay + Kf + A, 1, D + " +lat_0=7.000480277777778 +lon_0=80.77171111111112 +k=0.9999238418" + h + IK + By + Ay + Tb + E + A, 1, D + " +lat_0=7.000471527777778 +lon_0=80.77171308333334 +k=0.9999238418" + O + Ae + By + Ay + Kf + E + A, 8, H + WK + WL + UK + YH + s + N + C + B + E + A, 3, K + C + A, 1, CU + Qi + Yz + aU + Ph + s + N + KE + If + C + E + A, 5, K + C + B + A, 1, D + L2 + HO + " +k=1" + O + N + C + B + E + A, 1, D + L2 + Ia + " +k=1" + O + N + C + B + E + A, 1, D + L2 + IG + " +k=1" + O + N + C + B + E + A, 1, D + L2 + PN + " +k=1" + O + N + C + B + E + A, 1, D + L2 + LN + " +k=1" + O + N + C + B + E + A, 1, D + L2 + PO + " +k=1" + O + N + C + B + E + A, 1, D + L2 + JS + " +k=1" + O + N + C + B + E + A, 5, K + C + B + A, 2, D + L2 + Hq + " +k=1" + Bv + N + C + B + E + A, 3, D + L2 + HO + " +k=1" + MT + N + C + B + E + A, 1, D + L2 + Ia + " +k=1" + LY + N + C + B + E + A, 1, D + L2 + IG + " +k=1" + Jp + N + C + B + E + A, 1, D + L2 + PN + " +k=1" + LZ + N + C + B + E + A, 1, D + L2 + LN + " +k=1" + HU + N + C + B + E + A, 1, D + L2 + PO + " +k=1" + Gw + N + C + B + E + A, 1, D + L2 + JS + " +k=1" + Hu + N + C + B + E + A, 17, D + L2 + " +lon_0=90.73333333333333 +k=1" + Bv + DU + C + B + E + A, 1, D + L2 + " +lon_0=89.55 +k=1" + Bv + DU + C + B + E + A, 1, D + L2 + WN + " +k=1" + Bv + DU + C + B + E + A, 1, D + L2 + " +lon_0=90.03333333333333 +k=1" + Bv + DU + C + B + E + A, 1, D + L2 + " +lon_0=90.15000000000001 +k=1" + Bv + DU + C + B + E + A, 1, D + L2 + " +lon_0=91.13333333333334 +k=1" + Bv + DU + C + B + E + A, 1, D + L2 + " +lon_0=91.23333333333333 +k=1" + Bv + DU + C + B + E + A, 1, D + L2 + " +lon_0=89.34999999999999 +k=1" + Bv + DU + C + B + E + A, 1, D + L2 + " +lon_0=91.34999999999999 +k=1" + Bv + DU + C + B + E + A, 1, D + L2 + WN + " +k=1" + Bv + DU + C + B + E + A, 1, D + L2 + WO + " +k=1" + Bv + DU + C + B + E + A, 1, D + L2 + " +lon_0=89.06666666666666 +k=1" + Bv + DU + C + B + E + A, 1, D + L2 + " +lon_0=90.26666666666667 +k=1" + Bv + DU + C + B + E + A, 1, D + L2 + " +lon_0=89.55 +k=1" + Bv + DU + C + B + E + A, 1, D + L2 + " +lon_0=91.75 +k=1" + Bv + DU + C + B + E + A, 1, D + L2 + " +lon_0=90.5 +k=1" + Bv + DU + C + B + E + A, 1, D + L2 + " +lon_0=90.16666666666667 +k=1" + Bv + DU + C + B + E + A, 1, D + L2 + " +lon_0=90.11666666666666 +k=1" + Bv + DU + C + B + E + A, 1, D + L2 + WO + " +k=1" + Bv + DU + C + B + E + A, 1, D + L2 + " +lon_0=90.86666666666666 +k=1" + Bv + DU + C + B + E + A, 5, D + L2 + " +lon_0=-7 +k=0.999997" + h + " +y_0=-6000000" + C + B + E + A, 4, H + YI + " +lat_2=54.5" + L2 + NV + BZ + N + C + B + E + A, 1, H + YI + " +lat_2=54.5" + L2 + NV + BZ + N + C + B + E + A, 3, K + C + B + A, 1, H + " +lat_1=64.25 +lat_2=65.75 +lat_0=65 +lon_0=-19" + Jv + Hk + C + B + E + A, 4, JU + PC + ZP + Pl + Qp + Y + Hf + PW + E + A, 1, JU + PC + ZP + Pl + Qp + Y + Cj + PW + E + A, 1, JU + PC + ZP + Pl + Qp + Y + HZ + PW + E + A, 6, I + Nr + o + R + Ec + E + A, 3, K + C + B + A, 3, D + m + UQ + " +k=1" + AV + N + C + B + E + A, 1, D + m + MP + " +k=1" + Ci + N + C + B + E + A, 1, D + m + Pe + " +k=1" + Bo + N + C + B + E + A, 1, D + m + Qk + " +k=1" + DP + N + C + B + E + A, 1, D + m + US + " +k=1" + Eg + N + C + B + E + A, 1, D + m + Zc + " +k=1" + Jt + N + C + B + E + A, 1, D + m + Nb + " +k=1" + IM + N + C + B + E + A, 5, K + C + B + A, 1, I + Gz + o + C + B + E + A, 1, I + Hi + o + C + B + E + A, 1, I + ID + o + C + B + E + A, 3, K + C + B + A, 1, I + Hi + o + C + B + E + A, 1, I + IC + o + C + B + E + A, 3, K + j + B + A, 2, D + L2 + NV + V + O + N + j + B + E + A, 4, K + C + B + A, 2, K + C + B + A, 8, K + j + B + A, 1, I + ID + o + j + B + E + A, 1, I + Io + o + j + B + E + A, 4, I + IC + o + C + B + E + A, 2, I + Hi + o + C + B + E + A, 4, K + C + B + A, 3, I + Os + o + C + B + E + A, 55, K + i + Bp + A, 5, H + " +lat_1=10.46666666666667 +lat_0=10.46666666666667 +lon_0=-84.33333333333333 +k_0=0.99995696" + O + " +y_0=271820.522" + i + Bp + E + A, 1, H + " +lat_1=9 +lat_0=9" + Ua + " +k_0=0.99995696" + O + " +y_0=327987.436" + i + Bp + E + A, 2, H + " +lat_1=14.9 +lat_0=14.9" + Bx + " +k_0=0.99989906" + O + " +y_0=325992.681" + i + Bp + E + A, 1, H + " +lat_1=13.78333333333333 +lat_0=13.78333333333333 +lon_0=-89 +k_0=0.99996704" + O + " +y_0=295809.184" + i + Bp + E + A, 1, H + " +lat_1=13.86666666666667 +lat_0=13.86666666666667" + To + " +k_0=0.99990314" + O + " +y_0=359891.816" + i + Bp + E + A, 1, H + " +lat_1=11.73333333333333 +lat_0=11.73333333333333" + To + " +k_0=0.9999222800000001" + O + " +y_0=288876.327" + i + Bp + E + A, 1, I + Ik + x + Al + E + A, 1, K + Ee + Ef + A, 3, K + i + A, 2, H + " +lat_1=8.416666666666666 +lat_0=8.416666666666666 +lon_0=-80 +k_0=0.99989909" + O + " +y_0=294865.303" + i + E + A, 3, UU + " +lat_0=8.25" + CR + " +x_0=914391.7962 +y_0=999404.7217154861" + i + " +to_meter=0.9143917962" + A, 7, H + Ai + Aj + " +lat_0=-78 +lon_0=163" + Tp + Ju + C + B + E + A, 1, H + " +lat_1=-73.66666666666667" + AZ + " +lat_0=-74.5" + NZ + LX + Fq + C + B + E + A, 1, H + " +lat_1=-70.66666666666667 +lat_2=-72.33333333333333 +lat_0=-71.5" + ZW + aH + AH + C + B + E + A, 1, BP + m + " +lat_ts=-90" + Ry + Rd + LX + AH + C + B + E + A, 7, K + C + B + A, 1, I + Gz + C + B + E + A, 23, Rp + SS + WP + Kk + V + s + N + Y + Gh + E + A, 1, Rp + SS + WP + Kk + V + s + N + Y + Gh + E + A, 4, D + Za + Si + " +k=1" + Qo + " +y_0=650000" + R + TT + E + A, 1, D + Za + Si + " +k=1" + Qo + " +y_0=650000" + R + Np + E + A, 1, D + L2 + Or + " +k=1" + AV + N + Y + AC + E + A, 3, D + L2 + " +lon_0=11.5" + AP + AV + EM + S + E + A, 1, K + R + A, 3, K + x + BK + A, 3, UU + L2 + Nb + LX + Ak + x + BK + E + A, 1, I + ID + o + x + BK + E + A, 2, I + MB + o + x + BK + E + A, 1, I + Nx + o + x + BK + E + A, 1, I + Nr + o + x + BK + E + A, 1, I + ID + o + R + E + A, 1, I + Io + o + R + E + A, 1, I + MB + o + R + E + A, 1, I + Nx + o + R + E + A, 7, K + C + B + A, 4, I + Nv + o + C + B + E + A, 1, I + PM + o + C + B + E + A, 1, I + Re + o + C + B + E + A, 7, H + " +lat_1=16.81666666666667 +lat_0=16.81666666666667" + Bx + " +k_0=0.99992226" + O + " +y_0=292209.579" + i + Bp + E + A, 2, K + M + BO + A, 1, D + L2 + Gl + " +k=1" + DP + N + M + BO + E + A, 1, D + L2 + HO + " +k=1" + Eg + N + M + BO + E + A, 1, D + L2 + IG + " +k=1" + Jt + N + M + BO + E + A, 1, D + L2 + LN + " +k=1" + IM + N + M + BO + E + A, 1, D + L2 + Gl + " +k=1" + O + N + M + BO + E + A, 1, D + L2 + HO + " +k=1" + O + N + M + BO + E + A, 1, D + L2 + IG + " +k=1" + O + N + M + BO + E + A, 1, D + L2 + LN + " +k=1" + O + N + M + BO + E + A, 19, GU + Iq + Zy + ST + Ab + " +y_0=304800" + X + t + A, 1, D + " +lat_0=17.06124194444444 +lon_0=-88.6318575 +k=1 +x_0=66220.02833082761 +y_0=135779.5099885299" + Ee + Ef + ML + A, 4, K + C + B + A, 3, D + L2 + " +lon_0=11.33333333333333 +k=1" + BZ + N + C + B + E + A, 27, D + Fo + Ua + " +k=0.999942857" + e + N + X + J + A, 1, D + Fo + EY + Hm + e + N + X + J + A, 1, D + Fo + " +lon_0=-88.75" + Hm + e + N + X + J + A, 2, D + L2 + ZO + AP + O + N + R + n + E + A, 2, I + JZ + o + j + KR + E + A, 2, D + L2 + KB + " +k=1" + Ci + N + M + b + E + A, 1, H + Yw + QY + PU + Lu + LU + RU + C + B + E + A, 1, He + PU + Lu + RV + RW + C + B + E + A, 1, H + Yw + QY + PU + Lu + LU + RU + C + B + E + A, 1, He + PU + Lu + RV + RW + C + B + E + A, 1, He + PU + Lu + RV + RW + C + B + E + A, 1, H + Yw + QY + PU + Lu + LU + RU + C + B + E + A, 1, He + PU + Lu + RV + RW + C + B + E + A, 1, H + Yw + QY + PU + Lu + LU + RU + C + B + E + A, 2, JU + " +lon_0=-43 +lat_ts=-2" + LX + Ak + C + B + E + A, 2, H + " +lat_1=52.66666666666666 +lat_2=54.33333333333334 +lat_0=48" + Lu + " +x_0=815000" + N + R + n + E + A, 1, I + JM + o + C + B + E + A, 2, D + Fp + LW + JA + AG + N + C + B + J + A, 3, D + L2 + Or + AP + Gc + N + C + B + E + A, 1, D + L2 + Gj + AP + Iu + N + C + B + E + A, 1, D + L2 + Or + AP + Gc + N + C + B + E + A, 1, D + L2 + KB + AP + IU + N + C + B + E + A, 1, D + L2 + Gj + AP + Iu + N + C + B + E + A, 1, D + Fp + LW + JA + AG + N + C + B + J + A, 1, D + Fp + LW + JA + AG + N + C + B + J + A, 4, D + L2 + KB + AP + " +x_0=500053 +y_0=-3999820" + R + CK + E + A, 4, D + L2 + Gj + " +k=1" + Bo + N + M + b + E + A, 1, D + L2 + KB + " +k=1" + Ci + N + M + Ar + E + A, 1, D + L2 + Gj + " +k=1" + Bo + N + M + Ar + E + A, 1, D + L2 + KB + " +k=1" + Bo + N + Y + E + A, 1, D + L2 + IH + " +k=1" + DP + N + Y + E + A, 1, D + L2 + IH + " +k=1" + DP + N + Y + E + A, 1, D + L2 + Gj + " +k=1" + Eg + N + Y + E + A, 1, D + L2 + KB + " +k=1" + Bo + N + M + b + E + A, 1, D + L2 + IH + " +k=1" + DP + N + M + b + E + A, 1, D + L2 + Gj + " +k=1" + Eg + N + M + b + E + A, 1, D + L2 + KB + " +k=1" + Bo + N + M + Ar + E + A, 1, D + L2 + IH + " +k=1" + DP + N + M + Ar + E + A, 1, D + L2 + Gj + " +k=1" + Eg + N + M + Ar + E + A, 1, D + L2 + ZO + " +k=1" + Ci + N + Y + AC + E + A, 1, D + L2 + KB + " +k=1" + Bo + N + Y + AC + E + A, 1, D + L2 + IH + " +k=1" + DP + N + Y + AC + E + A, 1, D + L2 + Gj + " +k=1" + Eg + N + Y + AC + E + A, 1, D + L2 + Or + " +k=1" + AV + N + Y + AC + E + A, 1, K + Y + A, 1, D + L2 + ZO + " +k=1" + Ci + N + Y + E + A, 1, D + L2 + KB + " +k=1" + Bo + N + Y + E + A, 1, D + L2 + IH + " +k=1" + DP + N + Y + E + A, 1, D + L2 + Gj + " +k=1" + Eg + N + Y + E + A, 15, I + SK + o + C + B + E + A, 125, D + " +lat_0=-35.31773627777778 +lon_0=149.0092948305555 +k=1.000086" + h + Qn + x + r + E + A, 11, I + KD + j + B + E + A, 1, I + Me + j + B + E + A, 2, I + Ik + o + C + B + E + A, 3, D + L2 + IH + AP + O + Ak + S + E + A, 2, D + L2 + Ia + V + O + Ak + C + B + E + A, 14, I + Io + o + x + BK + E + A, 17, I + IC + o + x + BK + E + A, 1, I + Hi + o + x + BK + E + A, 1, I + Gz + o + x + BK + E + A, 2, I + JZ + o + R + PJ + E + A, 1, UU + L2 + Nb + LX + Ak + C + B + E + A, 6, K + C + A, 1, D + L2 + KH + AP + AV + Ju + C + E + A, 3, BP + Hr + " +lat_ts=70" + Hq + " +k=1" + s + N + ZZ + Ri + E + A, 31, H + ZC + IJ + Ih + KK + s + N + S + E + A, 1, H + ZC + IJ + Ih + UT + s + N + S + E + A, 1, H + ZC + IJ + Ih + IG + s + N + S + E + A, 1, H + ZC + IJ + Ih + EN + s + N + S + E + A, 1, H + ZC + IJ + Ih + KG + s + N + S + E + A, 1, H + Ic + ZD + Ii + KK + s + N + S + E + A, 1, H + Ic + ZD + Ii + UT + s + N + S + E + A, 1, H + Ic + ZD + Ii + IG + s + N + S + E + A, 1, H + Ic + ZD + Ii + EN + s + N + S + E + A, 1, H + Ic + ZD + Ii + KG + s + N + S + E + A, 1, H + ZE + ZF + Ij + KK + s + N + S + E + A, 1, H + ZE + ZF + Ij + UT + s + N + S + E + A, 1, H + ZE + ZF + Ij + IG + s + N + S + E + A, 1, H + ZE + ZF + Ij + EN + s + N + S + E + A, 1, H + ZE + ZF + Ij + KG + s + N + S + E + A, 1, BP + Hr + Qm + ON + Rd + Bd + Cl + S + E + A, 1, BP + Hr + Qm + CS + Rd + Bd + Cl + S + E + A, 1, BP + Hr + Qm + " +lon_0=-33" + Rd + Bd + Cl + S + E + A, 1, BP + Hr + Qm + QR + Rd + Bd + Cl + S + E + A, 1, BP + Hr + Qm + EN + Rd + Bd + Cl + S + E + A, 110, H + UL + Ha + Hb + " +lon_0=-30" + Hy + DQ + C + B + E + A, 1, H + Ce + Cf + Cg + " +lon_0=-52" + Hs + JH + C + B + E + A, 1, H + Ce + Cf + Cg + " +lon_0=-12" + HV + JH + C + B + E + A, 1, H + Bf + IJ + Bg + MP + Gx + IN + C + B + E + A, 1, H + Bf + IJ + Bg + UT + Gc + IN + C + B + E + A, 1, H + Bf + IJ + Bg + " +lon_0=-10" + Iu + IN + C + B + E + A, 1, H + Ic + BL + BM + " +lon_0=-64" + HV + Gb + C + B + E + A, 1, H + Ic + BL + BM + UT + HW + Gb + C + B + E + A, 1, H + Ic + BL + BM + " +lon_0=-14" + La + Gb + C + B + E + A, 1, H + AR + AS + AT + NU + NB + EM + C + B + E + A, 1, H + AR + AS + AT + " +lon_0=-42" + NC + EM + C + B + E + A, 1, H + AR + AS + AT + " +lon_0=-22" + ND + EM + C + B + E + A, 1, H + CI + OY + CJ + Zd + Hz + JI + C + B + E + A, 1, H + CI + OY + CJ + " +lon_0=-38" + IB + JI + C + B + E + A, 1, H + CI + OY + CJ + " +lon_0=-20" + IT + JI + C + B + E + A, 1, H + " +lat_1=67" + WQ + WR + " +lon_0=-51" + Jp + aE + C + B + E + A, 1, H + " +lat_1=67" + WQ + WR + " +lon_0=-34" + HU + aE + C + B + E + A, 1, H + WS + WT + WU + " +lon_0=-52" + HV + " +y_0=8500000" + C + B + E + A, 1, H + WS + WT + WU + " +lon_0=-37" + HW + " +y_0=8500000" + C + B + E + A, 1, H + Ce + Cf + Cg + " +lon_0=16" + HW + JH + C + B + E + A, 1, H + Bf + IJ + Bg + Gl + Jp + IN + C + B + E + A, 1, H + Ic + BL + BM + Lu + Hz + Gb + C + B + E + A, 1, H + Ic + BL + BM + ZG + IB + Gb + C + B + E + A, 1, H + AR + AS + AT + " +lon_0=14" + Jp + EM + C + B + E + A, 1, H + AR + AS + AT + ZG + HU + EM + C + B + E + A, 1, H + Ce + Cf + Cg + " +lon_0=53" + La + JH + S + E + A, 1, H + Ce + Cf + Cg + HR + Hz + JH + S + E + A, 1, H + Bf + IJ + Bg + " +lon_0=52" + HU + IN + S + E + A, 1, H + Bf + IJ + Bg + " +lon_0=83" + Hu + IN + S + E + A, 1, H + Bf + IJ + Bg + Im + It + IN + S + E + A, 1, H + Bf + IJ + Bg + " +lon_0=145" + Ht + IN + S + E + A, 1, H + Ic + BL + BM + " +lon_0=58" + IT + Gb + S + E + A, 1, H + Ic + BL + BM + " +lon_0=82" + IU + Gb + S + E + A, 1, H + Ic + BL + BM + ZQ + Mu + Gb + S + E + A, 1, H + Ic + BL + BM + " +lon_0=130" + Mw + Gb + S + E + A, 1, H + Ic + BL + BM + ZR + My + Gb + S + E + A, 1, H + Ic + BL + BM + " +lon_0=179" + NA + Gb + S + E + A, 1, H + AR + AS + AT + SR + Hu + EM + S + E + A, 1, H + AR + AS + AT + " +lon_0=74" + It + EM + S + E + A, 1, H + AR + AS + AT + " +lon_0=95" + Ht + EM + S + E + A, 1, H + AR + AS + AT + " +lon_0=116" + Hw + EM + S + E + A, 1, H + AR + AS + AT + " +lon_0=137" + Hx + EM + S + E + A, 1, H + AR + AS + AT + " +lon_0=158" + Hy + EM + S + E + A, 1, H + AR + AS + AT + " +lon_0=179" + IA + EM + S + E + A, 1, H + AR + AS + AT + " +lon_0=-163" + Gx + EM + C + B + E + A, 1, H + AR + AS + AT + Qr + Gc + EM + C + B + E + A, 1, H + CI + OY + CJ + SX + Gw + JI + C + B + E + A, 1, H + CI + OY + CJ + Qr + Hv + JI + C + B + E + A, 1, H + UL + Ha + Hb + Bu + Hx + DQ + C + B + E + A, 1, H + Ce + Cf + Cg + SZ + Gw + JH + C + B + E + A, 1, H + Ce + Cf + Cg + UR + Hv + JH + C + B + E + A, 1, H + Bf + IJ + Bg + YT + Hy + IN + C + B + E + A, 1, H + Bf + IJ + Bg + Ji + IA + IN + C + B + E + A, 1, H + Bf + IJ + Bg + MP + Gx + IN + C + B + E + A, 1, H + Ic + BL + BM + YT + Gw + Gb + C + B + E + A, 1, H + Ic + BL + BM + " +lon_0=-104" + Hv + Gb + C + B + E + A, 1, H + Ic + BL + BM + NW + Hs + Gb + C + B + E + A, 1, H + AR + AS + AT + " +lon_0=-131" + Iu + EM + C + B + E + A, 1, H + AR + AS + AT + KK + Mv + EM + C + B + E + A, 1, H + AR + AS + AT + " +lon_0=-91" + Mx + EM + C + B + E + A, 1, H + AR + AS + AT + " +lon_0=-71" + Mz + EM + C + B + E + A, 1, H + CI + OY + CJ + " +lon_0=-132" + Hs + JI + C + B + E + A, 1, H + CI + OY + CJ + " +lon_0=-113" + HV + JI + C + B + E + A, 1, H + CI + OY + CJ + Na + HW + JI + C + B + E + A, 1, H + CI + OY + CJ + UR + La + JI + C + B + E + A, 1, H + UL + Ha + Hb + Ia + IA + DQ + S + E + A, 1, H + UL + Ha + Hb + Hq + Gx + DQ + S + E + A, 1, H + UL + Ha + Hb + Oe + Gc + DQ + S + E + A, 1, H + UL + Ha + Hb + ON + Hw + DQ + S + E + A, 1, H + Ce + Cf + Cg + " +lon_0=133" + IB + JH + S + E + A, 1, H + Ce + Cf + Cg + ZW + LY + JH + S + E + A, 1, H + Ce + Cf + Cg + Ms + LZ + JH + S + E + A, 1, H + Bf + IJ + Bg + " +lon_0=176" + Hw + IN + S + E + A, 1, H + Bf + IJ + Bg + YJ + Hx + IN + S + E + A, 1, H + Ic + BL + BM + " +lon_0=-155" + LZ + Gb + S + E + A, 1, H + AR + AS + AT + " +lon_0=-5" + ZK + EM + C + B + E + A, 3, I + Ik + i + Lg + t + A, 1, I + Ik + i + Ly + t + A, 6, K + C + B + A, 69, D + L2 + Gl + V + O + N + Y + Aw + E + A, 3, K + By + Ay + " +towgs84=293.17,726.18,245.36,0,0,0,0" + A, 3, I + MB + C + B + E + A, 1, I + Nx + C + B + E + A, 96, H + GW + GX + GY + GA + h + IK + C + E + A, 4, K + j + Kd + A, 1, D + L2 + IG + CP + h + " +y_0=-3500000" + j + Kd + E + A, 4, D + L2 + Gl + V + IM + N + Y + Aw + E + A, 2, K + C + A, 4, K + C + A, 3, K + C + A, 3, I + Nq + C + E + A, 1, I + PL + C + E + A, 1, I + SK + C + E + A, 1, I + TV + C + E + A, 1, I + Xz + C + E + A, 1, I + TY + C + E + A, 1, I + RG + C + E + A, 1, I + Ro + C + E + A, 1, I + RH + C + E + A, 1, I + TW + C + E + A, 1, I + TX + C + E + A, 1, I + QE + C + E + A, 1, I + Ns + C + E + A, 1, I + Nt + C + E + A, 1, I + Nu + C + E + A, 1, I + Nw + C + E + A, 1, I + NP + C + E + A, 1, I + NQ + C + E + A, 1, I + Ik + C + E + A, 1, I + IC + C + E + A, 1, I + Hi + C + E + A, 2, DT + Sa + Hl + ZB + OZ + s + N + C + E + A, 1, H + AR + AS + AT + " +lon_0=-163" + Gx + EM + C + E + A, 1, H + AR + AS + AT + Qr + Gc + EM + C + E + A, 1, H + CI + OY + CJ + SX + Gw + JI + C + E + A, 1, H + CI + OY + CJ + Qr + Hv + JI + C + E + A, 1, D + IY + IV + Pc + h + N + C + E + A, 1, D + Gm + OS + BG + a + N + C + E + A, 6, H + " +lat_1=17.5 +lat_2=29.5 +lat_0=12 +lon_0=-102" + Ci + N + C + B + E + A, 3, K + C + B + A, 1, I + Ns + C + B + E + A, 1, I + Nt + C + B + E + A, 1, I + Nu + C + B + E + A, 1, I + Nw + C + B + E + A, 1, I + NP + C + B + E + A, 1, I + NQ + C + B + E + A, 1, H + " +lat_1=17.5 +lat_2=29.5 +lat_0=12 +lon_0=-102" + Ci + N + C + B + E + A, 9, D + L2 + Gl + " +k=1" + AI + N + M + CC + E + A, 1, D + L2 + II + " +k=1" + AI + N + M + CC + E + A, 1, D + L2 + HO + " +k=1" + AI + N + M + CC + E + A, 1, D + L2 + Ia + " +k=1" + AI + N + M + CC + E + A, 1, D + L2 + IG + " +k=1" + AI + N + M + CC + E + A, 1, D + L2 + PN + " +k=1" + AI + N + M + CC + E + A, 1, D + L2 + LN + " +k=1" + AI + N + M + CC + E + A, 4, H + " +lat_1=19.33333333333333 +lat_2=19.7 +lat_0=19.33333333333333 +lon_0=-80.56666666666666 +x_0=899160 +y_0=579120" + C + B + t + A, 2, DT + " +lat_1=55" + QY + Yu + Ms + s + N + C + E + A, 1, CU + " +lat_0=57" + Ku + Kv + V + LX + EO + KE + GZ + C + E + A, 1, D + Ft + YN + V + O + N + C + E + A, 1, D + Ft + YO + V + O + N + C + E + A, 1, D + Ft + ON + V + O + N + C + E + A, 1, D + Ft + Ms + V + O + N + C + E + A, 1, D + Ft + KI + V + O + N + C + E + A, 1, D + Ft + YP + V + O + N + C + E + A, 1, D + Ft + YQ + V + O + N + C + E + A, 1, D + Ft + SW + V + O + N + C + E + A, 1, H + Kw + Kx + UK + YR + BZ + N + C + E + A, 1, D + Bl + Co + V + EX + N + C + E + A, 1, D + Bl + Co + V + EX + N + C + t + A, 1, D + Bl + Cn + V + EX + N + C + E + A, 1, D + Bl + Cn + V + EX + N + C + t + A, 1, D + Bl + Iv + BG + EX + N + C + E + A, 1, D + Bl + Iv + BG + EX + N + C + t + A, 1, H + Dx + Dy + BC + IF + u + N + C + E + A, 1, H + Dx + Dy + BC + IF + Au + N + C + J + A, 1, H + Dz + Mq + EA + IF + u + Is + C + E + A, 1, H + Dz + Mq + EA + IF + Au + Gt + C + J + A, 1, DT + Yy + SY + L2 + Mt + s + QZ + C + E + A, 1, H + DW + Jn + y + HA + Bd + Ae + C + E + A, 1, H + DW + Jn + y + HA + Ac + AD + C + J + A, 1, H + DX + DY + AA + HA + Bd + Ae + C + E + A, 1, H + DX + DY + AA + HA + Ac + AD + C + J + A, 1, H + Ap + DZ + Ml + AJ + Bd + Ae + C + E + A, 1, H + Ap + DZ + Ml + AJ + Ac + AD + C + J + A, 1, H + LO + QS + Da + Mm + Bd + Ae + C + E + A, 1, H + LO + QS + Da + Mm + Ac + AD + C + J + A, 1, H + Db + Dc + Mn + Ir + Bd + Ae + C + E + A, 1, H + Db + Dc + Mn + Ir + Ac + AD + C + J + A, 1, H + Dd + De + Df + Iw + Bd + Ae + C + E + A, 1, H + Dd + De + Df + Iw + Ac + AD + C + J + A, 1, H + LP + LQ + CY + Ba + Fw + Fx + C + E + A, 1, H + LP + LQ + CY + Ba + Bw + CL + C + J + A, 1, H + Eh + Ei + y + Ba + Fw + Fx + C + E + A, 1, H + Eh + Ei + y + Ba + Bw + CL + C + J + A, 1, H + Ap + Dg + f + Ba + Fw + Fx + C + E + A, 1, H + Ap + Dg + f + Ba + Bw + CL + C + J + A, 1, H + Dh + Mo + Di + Jq + QG + QH + C + E + A, 1, H + Dh + Mo + Di + Jq + MC + MD + C + J + A, 1, D + Ch + Cp + Mp + h + N + C + E + A, 1, D + Ch + Cp + Mp + AE + N + C + J + A, 1, D + Aq + CR + Am + h + N + C + E + A, 1, D + Aq + CR + Am + AE + N + C + J + A, 1, DT + " +lat_1=24" + YG + " +lat_0=24" + NV + u + N + C + E + A, 1, H + LR + Dj + QT + LS + a + N + C + E + A, 1, H + LR + Dj + QT + LS + a + N + C + J + A, 1, D + Aq + Ob + Am + h + N + C + E + A, 1, D + Aq + Ob + Am + AE + N + C + J + A, 1, D + Gm + Cq + V + h + N + C + E + A, 1, D + Gm + Cq + V + AE + N + C + J + A, 1, D + Gm + Cr + V + EW + N + C + E + A, 1, D + Gm + Cr + V + CM + N + C + J + A, 1, D + p + Jb + BJ + O + N + C + E + A, 1, D + p + Jb + BJ + AF + N + C + J + A, 1, D + p + Cs + BJ + h + N + C + E + A, 1, D + p + Cs + BJ + AE + N + C + J + A, 1, D + p + Ix + BG + CX + N + C + E + A, 1, D + p + Ix + BG + ME + N + C + J + A, 1, D + f + Cz + EQ + AI + N + C + E + A, 1, D + f + Cz + EQ + AI + N + C + J + A, 1, D + f + DA + Am + EW + N + C + E + A, 1, D + f + DA + Am + MO + N + C + J + A, 1, D + DM + DB + AO + BU + KJ + C + E + A, 1, D + DM + DB + AO + MM + GI + C + J + A, 1, D + DM + DC + AO + HT + KJ + C + E + A, 1, D + DM + DC + AO + HT + GI + C + J + A, 1, H + EB + EC + Fo + GG + AV + AH + C + E + A, 1, H + EB + EC + Fo + GG + AV + GJ + C + J + A, 1, H + AY + ED + Fs + GG + O + N + C + E + A, 1, H + AY + ED + Fs + GG + AG + N + C + J + A, 1, H + EE + EF + AQ + Fl + u + N + C + E + A, 1, H + EE + EF + AQ + Fl + Au + N + C + J + A, 1, H + EG + EH + f + CV + u + Is + C + E + A, 1, H + EG + EH + f + CV + Au + Gt + C + J + A, 1, H + Az + DV + DM + Jo + O + N + C + E + A, 1, H + Az + DV + DM + Jo + AF + N + C + J + A, 1, H + Fi + Fj + AB + EY + AV + AH + C + E + A, 1, H + Fi + Fj + AB + EY + AV + CN + C + J + A, 1, H + Ej + Ek + AB + EY + O + Ae + C + E + A, 1, H + Ej + Ek + AB + EY + AF + AD + C + J + A, 1, H + FS + FT + IY + Hg + BZ + N + C + E + A, 1, H + FS + FT + IY + Hg + Eb + N + C + J + A, 1, H + OH + OI + OJ + Bi + BZ + N + C + E + A, 1, H + OH + OI + OJ + Bi + Eb + N + C + J + A, 1, D + YM + Rj + JE + O + N + C + E + A, 1, D + AL + Rf + JE + EW + N + C + E + A, 1, D + BD + Rg + JE + AI + N + C + E + A, 1, D + AK + HJ + V + AI + N + C + E + A, 1, D + AK + HJ + V + AI + N + C + J + A, 1, D + BD + DD + AO + HT + N + C + E + A, 1, D + BD + DD + AO + HT + N + C + J + A, 1, H + MU + Nz + AA + Ld + u + N + C + E + A, 1, H + MU + Nz + AA + Ld + MF + N + C + J + A, 1, H + Em + En + Ip + IL + O + N + C + E + A, 1, H + Em + En + Ip + IL + AF + N + C + J + A, 1, H + El + Dk + Ip + GE + h + Mk + C + E + A, 1, H + El + Dk + Ip + GE + AE + Mk + C + J + A, 1, H + OA + Er + Es + BE + Pk + N + C + E + A, 1, H + OA + Er + Es + BE + MH + N + C + t + A, 1, H + Eo + Ep + Eq + Jh + Tl + N + C + E + A, 1, H + Eo + Ep + Eq + Jh + MG + N + C + t + A, 1, CU + Kr + " +lonc=-86" + QI + AP + QJ + PY + KE + QK + C + E + A, 1, H + Bq + OB + Fo + BE + LU + N + C + E + A, 1, H + Bq + OB + Fo + BE + OT + N + C + t + A, 1, H + Ma + FW + IP + Js + CX + EK + C + E + A, 1, H + Ma + FW + IP + Js + An + Ao + C + J + A, 1, H + FU + FV + Iq + DE + CX + EK + C + E + A, 1, H + FU + FV + Iq + DE + An + Ao + C + J + A, 1, H + FX + FY + Nj + Na + CX + EK + C + E + A, 1, H + FX + FY + Nj + Na + An + Ao + C + J + A, 1, D + Hj + Ct + CP + AI + N + C + E + A, 1, D + Hj + Ct + CP + AI + N + C + J + A, 1, D + Li + Sj + Tn + O + Pm + C + E + A, 1, D + Hj + Bx + CP + EW + N + C + E + A, 1, D + Hj + Bx + CP + CM + N + C + J + A, 1, D + Cd + Hg + BG + O + N + C + E + A, 1, D + Cd + RS + BG + Bv + N + C + E + A, 1, D + Id + RT + Am + YC + N + C + E + A, 1, H + LM + RK + MV + IS + a + N + C + E + A, 1, H + LM + RK + MV + IS + DR + N + C + t + A, 1, H + JT + Jn + FZ + CS + O + N + C + E + A, 2, D + CQ + DG + V + O + Hh + C + E + A, 1, D + CQ + DG + V + AG + Hh + C + J + A, 1, D + CQ + DF + V + h + Tm + C + E + A, 1, D + CQ + DF + V + Gu + MN + C + J + A, 1, D + CQ + DH + V + CX + LV + C + E + A, 1, D + CQ + DH + V + An + NE + C + J + A, 1, D + Fp + DI + AO + AI + N + C + E + A, 1, D + Fp + DI + AO + AI + N + C + J + A, 1, D + BA + Gp + V + Bn + N + C + E + A, 1, D + BA + Gp + V + Bn + N + C + J + A, 1, D + Bl + Iy + V + O + N + C + E + A, 1, D + Bl + Iy + V + AF + N + C + J + A, 1, D + Bl + Cu + Hm + OC + N + C + E + A, 1, D + Bl + Cu + Hm + OC + N + C + J + A, 1, D + Bl + Cv + Iz + YD + N + C + E + A, 1, D + Bl + Cv + Iz + MI + N + C + J + A, 1, D + Fs + Cw + Ad + Bv + N + C + E + A, 1, D + Fs + Cw + Ad + MJ + N + C + J + A, 1, D + BA + Gp + V + Bn + N + C + E + A, 1, D + BA + Gp + V + Bn + N + C + J + A, 1, H + Dl + Dm + BB + Oc + AI + N + C + E + A, 1, H + Dl + Dm + BB + Oc + AI + N + C + J + A, 1, D + Fs + Cx + Ad + Qo + N + C + E + A, 1, D + Fs + Cx + Ad + MK + N + C + J + A, 1, H + Et + Eu + LT + NW + Rh + N + C + E + A, 1, H + Et + Eu + LT + NW + Z + N + C + J + A, 1, H + BH + Ev + Ib + EZ + a + N + C + E + A, 1, H + BH + Ev + Ib + EZ + DR + N + C + t + A, 1, H + Ew + Ex + Be + EZ + a + N + C + E + A, 1, H + Ew + Ex + Be + EZ + DR + N + C + t + A, 1, H + OK + Fa + BY + ET + a + N + C + E + A, 1, H + OK + Fa + BY + ET + a + N + C + J + A, 1, H + Fb + Fc + Ch + ET + a + N + C + E + A, 1, H + Fb + Fc + Ch + ET + a + N + C + J + A, 1, H + Dn + Ey + QU + Fl + a + N + C + E + A, 1, H + Dn + Ey + QU + Fl + a + N + C + J + A, 1, H + Ez + FA + Do + Fl + a + N + C + E + A, 1, H + Ez + FA + Do + Fl + a + N + C + J + A, 1, H + JT + Hl + GH + AJ + u + N + C + E + A, 1, H + JT + Hl + GH + AJ + Lc + N + C + t + A, 1, H + PP + CZ + AK + AJ + Ci + N + C + E + A, 1, H + PP + CZ + AK + AJ + KL + N + C + t + A, 1, H + PQ + Ca + p + AJ + AV + N + C + E + A, 1, H + PQ + Ca + p + AJ + KM + N + C + t + A, 1, H + MW + FB + BB + Ea + a + N + C + E + A, 1, H + MW + FB + BB + Ea + a + N + C + J + A, 1, H + Dp + Dq + y + Ea + a + N + C + E + A, 1, H + Dp + Dq + y + Ea + a + N + C + J + A, 1, H + GW + GX + GY + GA + h + IK + C + E + A, 1, D + EI + GE + Lb + BU + N + C + E + A, 1, D + EI + GE + Lb + JV + N + C + J + A, 1, H + FC + OD + Dr + CR + OE + N + C + E + A, 1, H + FC + OD + Dr + CR + OE + N + C + t + A, 1, H + Fd + Fe + AL + CS + a + N + C + E + A, 1, H + Fd + Fe + AL + CS + a + N + C + J + A, 1, H + OL + Ff + EJ + Ag + a + N + C + E + A, 1, H + OL + Ff + EJ + Ag + a + N + C + J + A, 1, H + FD + MX + BC + MQ + a + N + C + E + A, 1, H + FD + MX + BC + MQ + a + N + C + J + A, 1, H + FH + FI + Cb + Ag + EW + Fq + C + E + A, 1, H + FH + FI + Cb + Ag + CM + Fq + C + J + A, 1, DT + OM + RO + OX + CS + AV + Hh + C + E + A, 1, H + OM + RO + OX + CS + AV + Ju + C + E + A, 1, H + FE + MY + QV + Jr + h + AH + C + E + A, 1, H + FE + MY + QV + Jr + AE + CN + C + J + A, 1, H + FF + FG + Ds + CV + a + Cl + C + E + A, 1, H + FF + FG + Ds + CV + a + Gr + C + J + A, 1, H + CD + CE + Cc + CV + AI + Ju + C + E + A, 1, H + CD + CE + Cc + CV + AI + Nf + C + J + A, 1, H + FJ + FK + Dt + Ji + a + LV + C + E + A, 1, H + FJ + FK + Dt + Ji + a + Ne + C + J + A, 1, D + Fp + LW + JA + O + N + C + E + A, 1, D + Fp + LW + JA + AG + N + C + J + A, 1, H + " +lat_1=37" + YS + GM + Ga + s + N + C + E + A, 1, H + OF + FL + AA + GF + Bo + Cl + C + E + A, 1, H + OF + FL + AA + GF + Gs + Gr + C + J + A, 1, H + Az + Du + AB + GF + Bo + AH + C + E + A, 1, H + Az + Du + AB + GF + Gs + CN + C + J + A, 1, H + BH + OG + Ib + Cy + O + N + C + E + A, 1, H + BH + OG + Ib + Cy + AF + N + C + J + A, 1, H + FM + FN + Dv + AJ + O + N + C + E + A, 1, H + FM + FN + Dv + AJ + AF + N + C + J + A, 1, H + Mb + RN + Mr + Ga + a + N + C + E + A, 1, H + Mb + RN + Mr + Ga + a + N + C + J + A, 1, H + Fg + Fh + QX + CR + a + N + C + E + A, 1, H + Fg + Fh + QX + CR + a + N + C + J + A, 2, H + Jc + MZ + AL + Bu + a + N + C + J + A, 1, H + FO + FP + Dw + Bu + a + N + C + E + A, 1, H + FO + FP + Dw + Bu + a + N + C + J + A, 1, H + FQ + FR + PR + Bu + a + N + C + E + A, 1, H + FQ + FR + PR + Bu + a + N + C + J + A, 1, D + L2 + Bu + AP + YF + Sh + C + E + A, 1, D + CA + DJ + Ad + h + N + C + E + A, 1, D + CA + DJ + Ad + Gu + N + C + J + A, 1, D + CA + DK + Ad + u + EK + C + E + A, 1, D + CA + DK + Ad + Au + Ao + C + J + A, 1, D + CA + DL + Ad + CX + EK + C + E + A, 1, D + CA + DL + Ad + An + Ao + C + J + A, 1, D + CA + JB + Ad + a + N + C + E + A, 1, D + CA + JB + Ad + a + N + C + J + A, 1, H + JF + CG + AQ + BI + O + Cl + C + E + A, 1, H + AY + CF + Br + BI + O + AH + C + E + A, 1, H + JG + CH + f + BI + O + Fq + C + E + A, 1, H + UF + Nh + IZ + HJ + s + N + C + B + E + A, 1, DT + UF + Nh + IZ + HJ + s + N + C + B + E + A, 1, DT + UF + Nh + IZ + HJ + s + N + C + B + E + A, 1, H + JF + CG + AQ + BI + AG + NF + C + J + A, 1, H + AY + CF + Br + BI + AG + GJ + C + J + A, 1, H + JG + CH + f + BI + AG + Fq + C + J + A, 1, D + Kn + Sf + AO + O + N + C + E + A, 1, D + Ko + KO + AO + O + N + C + E + A, 1, D + GV + KI + Jl + O + N + C + E + A, 1, D + Kp + Sg + Jl + O + N + C + E + A, 1, D + Kq + KP + " +k=1" + O + N + C + E + A, 1, D + GV + KI + Jl + AG + N + C + J + A, 1, I + TY + C + E + A, 1, I + RG + C + E + A, 1, I + TV + o + C + E + A, 1, D + " +lat_0=13.5 +lon_0=144.75 +k=1" + BU + IK + C + E + A, 9, D + WJ + " +lon_0=46.5 +k=0.9994" + CX + N + Bc + Ge + EU + E + A, 22, K + C + A, 1, D + PT + Zz + V + s + N + C + E + A, 1, D + PT + NX + V + s + N + C + E + A, 1, D + GM + Ox + V + s + N + C + E + A, 1, D + PT + Tk + V + s + N + C + E + A, 1, D + GM + Oy + V + s + N + C + E + A, 1, D + GM + Rw + V + s + N + C + E + A, 1, D + GM + Oz + V + s + N + C + E + A, 1, D + GM + aA + V + s + N + C + E + A, 1, D + GM + PA + V + s + N + C + E + A, 1, D + Fs + PB + V + s + N + C + E + A, 1, D + IZ + ZH + V + s + N + C + E + A, 1, D + IZ + ZI + V + s + N + C + E + A, 1, D + IZ + ZJ + V + s + N + C + E + A, 1, D + IQ + " +lon_0=142" + V + s + N + C + E + A, 1, D + IQ + Pj + V + s + N + C + E + A, 1, D + IQ + " +lon_0=124" + V + s + N + C + E + A, 1, D + IQ + NX + V + s + N + C + E + A, 1, D + " +lat_0=20" + Rw + V + s + N + C + E + A, 1, D + IQ + ZR + V + s + N + C + E + A, 1, I + Mg + C + E + A, 1, I + NT + C + E + A, 1, I + Ot + C + E + A, 1, I + Nv + C + E + A, 1, I + PM + C + E + A, 11, D + L2 + US + AP + O + Ak + j + B + E + A, 3, K + C + B + A, 1, I + JN + C + B + E + A, 1, I + KC + C + B + E + A, 1, I + NR + C + B + E + A, 11, D + L2 + " +lon_0=105.625 +k=1.000024" + Jm + Pm + j + B + E + A, 1, D + L2 + " +lon_0=105.625 +k=1.00002514" + Jm + Pm + C + B + E + A, 1, D + L2 + " +lon_0=96.875 +k=1" + Jm + " +y_0=1400000" + j + B + E + A, 1, D + L2 + " +lon_0=96.875 +k=0.99999387" + Jm + DQ + C + B + E + A, 13, I + QF + o + C + B + E + A, 1, I + Ny + o + C + B + E + A, 1, I + Nq + o + C + B + E + A, 45, K + C + A, 1, D + OO + KS + SB + Of + N + C + E + A, 1, D + OO + KS + SB + JJ + N + C + t + A, 1, D + OO + KS + SB + Of + N + C + E + A, 1, D + OO + KS + SB + JJ + N + C + t + A, 1, D + GH + Rk + " +k=1.0002" + Oa + N + C + E + A, 1, D + GH + Rk + " +k=1.0002" + HL + N + C + t + A, 1, D + GH + Rk + " +k=1.0002" + Oa + N + C + E + A, 1, D + GH + Rk + " +k=1.0002" + HL + N + C + t + A, 1, H + Ky + Kz + Rl + Mc + Oa + " +y_0=130000" + C + E + A, 1, H + Ky + Kz + Rl + Mc + HL + Zo + C + t + A, 1, H + Ky + Kz + Rl + Mc + Oa + " +y_0=130000" + C + E + A, 1, H + Ky + Kz + Rl + Mc + HL + Zo + C + t + A, 1, H + Bq + AK + Rm + YU + " +x_0=120000 +y_0=60000" + C + E + A, 1, H + Bq + AK + Rm + YU + Zp + aM + C + t + A, 1, H + Bq + AK + Rm + YU + " +x_0=120000 +y_0=60000" + C + E + A, 1, H + Bq + AK + Rm + YU + Zp + aM + C + t + A, 1, D + Fp + Bj + Ze + Of + N + C + E + A, 1, D + Fp + Bj + Ze + JJ + N + C + t + A, 1, D + Fp + Bj + Ze + Of + N + C + E + A, 1, D + Fp + Bj + Ze + JJ + N + C + t + A, 1, H + LA + Be + AJ + Sk + Bn + " +y_0=30000" + C + E + A, 1, H + LA + Be + AJ + Sk + Ng + aN + C + t + A, 1, H + LA + Be + AJ + Sk + Bn + " +y_0=30000" + C + E + A, 1, H + LA + Be + AJ + Sk + Ng + aN + C + t + A, 1, CU + LB + Zf + Zg + " +k=1" + Tp + ZL + KE + Zh + C + E + A, 1, CU + LB + Zf + Zg + " +k=1" + ZN + Zq + KE + Zh + C + t + A, 1, CU + LB + Zf + Zg + " +k=1" + Tp + ZL + KE + Zh + C + E + A, 1, CU + LB + Zf + Zg + " +k=1" + ZN + Zq + KE + Zh + C + t + A, 1, D + BD + Bj + YV + Jm + N + C + E + A, 1, D + BD + Bj + YV + HM + N + C + t + A, 1, D + BD + Bj + YV + Jm + N + C + E + A, 1, D + BD + Bj + YV + HM + N + C + t + A, 1, D + OO + YW + Zi + Oa + N + C + E + A, 1, D + OO + YW + Zi + HL + N + C + t + A, 1, D + OO + YW + Zi + Oa + N + C + E + A, 1, D + OO + YW + Zi + HL + N + C + t + A, 1, D + Tq + KT + Lk + Jm + N + C + E + A, 1, D + Tq + KT + Lk + HM + N + C + t + A, 1, D + Tq + KT + Lk + Jm + N + C + E + A, 1, D + Tq + KT + Lk + HM + N + C + t + A, 1, D + GH + Bj + Qs + Jm + N + C + E + A, 1, D + GH + Bj + Qs + HM + N + C + t + A, 1, D + GH + Bj + Qs + Jm + N + C + E + A, 1, D + GH + Bj + Qs + HM + N + C + t + A, 1, D + IP + KU + Zj + " +x_0=10000" + N + C + E + A, 1, D + IP + KU + Zj + aV + N + C + t + A, 1, D + IP + KU + Zj + " +x_0=10000" + N + C + E + A, 1, D + IP + KU + Zj + aV + N + C + t + A, 1, D + IP + Ir + Zk + Of + N + C + E + A, 1, D + IP + Ir + Zk + JJ + N + C + t + A, 1, D + IP + Ir + Zk + Of + N + C + E + A, 1, D + IP + Ir + Zk + JJ + N + C + t + A, 1, D + Tr + Lj + " +k=1.0001" + Oa + N + C + E + A, 1, D + Tr + Lj + " +k=1.0001" + HL + N + C + t + A, 1, D + Tr + Lj + " +k=1.0001" + Oa + N + C + E + A, 1, D + Tr + Lj + " +k=1.0001" + HL + N + C + t + A, 1, CU + Pn + Sl + " +alpha=5 +k=1 +x_0=-300000 +y_0=-4600000" + KE + " +gamma=5" + C + E + A, 1, CU + Pn + Sl + " +alpha=5 +k=1" + Zr + Yp + KE + " +gamma=5" + C + t + A, 1, CU + Pn + Sl + " +alpha=5 +k=1 +x_0=-300000 +y_0=-4600000" + KE + " +gamma=5" + C + E + A, 1, CU + Pn + Sl + " +alpha=5 +k=1" + Zr + Yp + KE + " +gamma=5" + C + t + A, 1, D + Ts + KV + Sb + " +x_0=60000" + N + C + E + A, 1, D + Ts + KV + Sb + aO + N + C + t + A, 1, D + Ts + KV + Sb + " +x_0=60000" + N + C + E + A, 1, D + Ts + KV + Sb + aO + N + C + t + A, 1, D + LC + IW + YX + Zl + N + C + E + A, 1, D + LC + IW + YX + aP + N + C + t + A, 1, D + LC + IW + YX + Zl + N + C + E + A, 1, D + LC + IW + YX + aP + N + C + t + A, 1, H + Jc + YY + Rn + Sm + BU + Rz + C + E + A, 1, H + Jc + YY + Rn + Sm + JW + Ra + C + t + A, 1, H + Jc + YY + Rn + Sm + BU + Rz + C + E + A, 1, H + Jc + YY + Rn + Sm + JW + Ra + C + t + A, 1, D + LD + KW + Zm + Jm + N + C + E + A, 1, D + LD + KW + Zm + HM + N + C + t + A, 1, D + LD + KW + Zm + Jm + N + C + E + A, 1, D + LD + KW + Zm + HM + N + C + t + A, 1, D + LE + Sn + YZ + s + N + C + E + A, 1, D + LE + Sn + YZ + s + N + C + t + A, 1, D + LE + Sn + YZ + s + N + C + E + A, 1, D + LE + Sn + YZ + s + N + C + t + A, 4, H + JT + Hl + GH + AJ + u + N + C + E + A, 1, H + JT + Hl + GH + AJ + Lc + N + C + t + A, 2, D + L2 + UI + " +k=1" + O + N + C + B + E + A, 5, D + L2 + IH + " +k=0.9985000000000001" + Tp + N + C + B + E + A, 1, D + L2 + IH + " +k=1" + aH + N + C + B + E + A, 3, H + Jc + MZ + AL + Bu + a + N + C + E + A, 1, H + JT + Jn + FZ + CS + AG + N + C + J + A, 1, K + Bc + Ge + " +towgs84=-24,-203,268,0,0,0,0" + A, 1, K + Bc + Ge + " +towgs84=-183,-15,273,0,0,0,0" + A, 1, K + R + " +towgs84=-235,-110,393,0,0,0,0" + A, 1, H + PP + CZ + AK + AJ + Ci + N + C + E + A, 1, H + PP + CZ + AK + AJ + KL + N + C + t + A, 1, H + PQ + Ca + p + AJ + AV + N + C + E + A, 1, H + PQ + Ca + p + AJ + KM + N + C + t + A, 5, K + Bc + Ge + PK + A, 2, K + Bc + Ge + " +towgs84=-63,176,185,0,0,0,0" + A, 21, I + Me + Bc + Ge + PK + E + A, 7, H + Sc + Ya + GM + So + u + N + C + B + E + A, 1, H + Sc + Ya + GM + So + Au + N + C + B + J + A, 1, H + Sc + Ya + GM + So + u + N + C + E + A, 1, H + Sc + Ya + GM + So + Au + N + C + J + A, 6, He + Hr + HN + s + N + j + B + E + A, 1, He + m + HN + s + N + j + B + E + A, 1, "+proj=cea" + HN + " +lat_ts=30" + s + N + j + B + E + A, 29, H + " +lat_1=39 +lat_2=43" + Ip + UI + s + N + C + B + E + A, 21, K + C + A, 1, D + Ou + Ov + Zw + UV + Yl + C + E + A, 6, K + C + A, 1, D + Ou + Ov + Zw + UV + Yl + C + E + A, 14, I + KD + Bc + Ge + DO + E + A, 1, I + JZ + Bc + Ge + DO + E + A, 1, I + JM + Bc + Ge + DO + E + A, 28, K + C + A, 2, K + C + A, 2, K + C + A, 2, K + C + A, 16, H + " +lat_1=43.2 +lat_0=43.2 +lon_0=-95.25 +k_0=1.000052 +x_0=3505207.010414021 +y_0=2926085.852171705" + C + J + A, 1, H + " +lat_1=43.16666666666666 +lat_0=43.16666666666666 +lon_0=-92.75 +k_0=1.000043 +x_0=3810007.62001524 +y_0=2987045.974091948" + C + J + A, 1, D + Md + " +lon_0=-91.2 +k=1.000035 +x_0=4114808.229616459 +y_0=2529845.05969012" + C + J + A, 1, H + " +lat_1=42.53333333333333 +lat_0=42.53333333333333 +lon_0=-94.83333333333333 +k_0=1.000045 +x_0=4419608.839217679 +y_0=2621285.242570485" + C + J + A, 1, H + " +lat_1=42.65 +lat_0=42.65 +lon_0=-92.25 +k_0=1.000032 +x_0=4724409.448818898 +y_0=2712725.425450851" + C + J + A, 1, D + Md + " +lon_0=-95.73333333333333 +k=1.000039 +x_0=5029210.058420117 +y_0=2011684.023368047" + C + J + A, 1, D + Md + " +lon_0=-94.63333333333334" + Sb + " +x_0=5334010.668021336 +y_0=2072644.145288291" + C + J + A, 1, D + Md + " +lon_0=-93.71666666666667 +k=1.000033 +x_0=5638811.277622555 +y_0=2133604.267208535" + C + J + A, 1, D + Md + " +lon_0=-92.81666666666666" + OP + " +x_0=5943611.887223775 +y_0=2194564.389128779" + C + J + A, 1, H + " +lat_1=41.83333333333334 +lat_0=41.83333333333334 +lon_0=-91.66666666666667 +k_0=1.00002 +x_0=6248412.496824994 +y_0=2438404.876809754" + C + J + A, 1, D + Md + " +lon_0=-90.53333333333333" + OP + " +x_0=6553213.106426213 +y_0=2316484.632969266" + C + J + A, 1, H + " +lat_1=40.91666666666666 +lat_0=40.91666666666666 +lon_0=-93.75 +k_0=1.000037 +x_0=6858013.716027432" + Yq + C + J + A, 1, D + Md + Oo + Og + " +x_0=7162814.325628651 +y_0=1950723.901447803" + C + J + A, 1, D + Md + " +lon_0=-91.25 +k=1.000018 +x_0=7467614.93522987" + Yq + C + J + A, 3, K + C + A, 1, I + KD + o + C + E + A, 1, I + JZ + o + C + E + A, 1, I + JM + o + C + E + A, 1, I + Me + o + C + E + A, 1, I + Rb + o + C + E + A, 1, I + Rc + o + C + E + A, 1, I + SO + o + C + E + A, 1, I + Td + o + C + E + A, 3, K + C + A, 2, K + C + A, 23, D + Qt + Sp + SB + Bn + N + C + E + A, 1, D + " +lat_0=48" + Sp + " +k=1.00019" + BU + N + C + E + A, 1, H + Yb + Qt + KK + " +k_0=1.000145" + Bn + IK + C + E + A, 1, H + Yb + Qt + " +lon_0=-108.5" + Mc + h + " +y_0=150000" + C + E + A, 1, H + LF + LG + Ba + Mc + h + EK + C + E + A, 1, H + LF + LG + Ba + " +k_0=1.00009" + BU + Rz + C + E + A, 1, D + Pn + " +lon_0=-107.75 +k=1.000148" + h + N + C + E + A, 1, H + aI + " +lat_0=46.25 +lon_0=-111.25 +k_0=1.000185" + BU + EK + C + E + A, 1, H + WV + WW + Ub + " +k_0=1.0001515" + h + Rz + C + E + A, 1, D + WX + Uc + " +k=1.00024" + BU + N + C + E + A, 1, D + Qt + Sp + SB + Ng + N + C + t + A, 1, D + " +lat_0=48" + Sp + " +k=1.00019" + JW + N + C + t + A, 1, H + Yb + Qt + KK + " +k_0=1.000145" + Ng + " +y_0=199999.9999992" + C + t + A, 1, H + Yb + Qt + " +lon_0=-108.5" + Mc + OU + " +y_0=150000.00001464" + C + t + A, 1, H + LF + LG + Ba + Mc + OU + Yr + C + t + A, 1, H + LF + LG + Ba + " +k_0=1.00009" + JW + " +y_0=49999.99971024" + C + t + A, 1, D + Pn + " +lon_0=-107.75 +k=1.000148" + OU + N + C + t + A, 1, H + aI + " +lat_0=46.25 +lon_0=-111.25 +k_0=1.000185" + JW + Yr + C + t + A, 1, H + WV + WW + Ub + " +k_0=1.0001515" + OU + Ra + C + t + A, 1, D + WX + Uc + " +k=1.00024" + JV + N + C + J + A, 3, D + Po + " +lon_0=-122.45 +k=1.000007 +x_0=48000 +y_0=24000" + C + E + A, 1, D + Po + " +lon_0=-122.45 +k=1.000007 +x_0=48000 +y_0=24000" + C + J + A, 1, K + C + A, 3, K + j + A, 3, K + j + A, 3, D + LH + LI + " +k=1" + Qx + " +y_0=126867.909" + Nc + Nd + " +towgs84=-275.7224,94.7824,340.8944,-8.001,-4.42,-11.821,1" + E + A, 115, D + Pp + Sq + Ll + l + q + C + E + A, 1, D + Pp + Sq + Ll + l + q + C + J + A, 1, D + Qu + Oj + Lm + l + q + C + E + A, 1, D + Qu + Oj + Lm + l + q + C + J + A, 1, D + " +lat_0=39" + KX + Ln + l + q + C + E + A, 1, D + " +lat_0=39" + KX + Ln + l + q + C + J + A, 1, D + " +lat_0=40.45" + Pq + Yc + l + q + C + E + A, 1, D + " +lat_0=40.45" + Pq + Yc + l + q + C + J + A, 1, D + " +lat_0=40.05" + Ud + OQ + l + q + C + E + A, 1, D + " +lat_0=40.05" + Ud + OQ + l + q + C + J + A, 1, D + Yd + Pr + OR + l + q + C + E + A, 1, D + Yd + Pr + OR + l + q + C + J + A, 1, D + " +lat_0=39" + Tt + Zn + l + q + C + E + A, 1, D + " +lat_0=39" + Tt + Zn + l + q + C + J + A, 1, D + " +lat_0=40.4" + Ue + Ln + l + q + C + E + A, 1, D + " +lat_0=40.4" + Ue + Ln + l + q + C + J + A, 1, D + Pp + Uf + Qv + l + q + C + E + A, 1, D + Pp + Uf + Qv + l + q + C + J + A, 1, D + Tu + Ug + " +k=1.000021" + l + q + C + E + A, 1, D + Tu + Ug + " +k=1.000021" + l + q + C + J + A, 1, D + Tv + Uh + " +k=1.000024" + l + q + C + E + A, 1, D + Tv + Uh + " +k=1.000024" + l + q + C + J + A, 1, D + " +lat_0=40.15" + Ui + " +k=1.000032" + l + q + C + E + A, 1, D + " +lat_0=40.15" + Ui + " +k=1.000032" + l + q + C + J + A, 1, D + " +lat_0=38.1" + Pr + Qw + l + q + C + E + A, 1, D + " +lat_0=38.1" + Pr + Qw + l + q + C + J + A, 1, D + " +lat_0=38.45" + KY + " +k=1.000018" + l + q + C + E + A, 1, D + " +lat_0=38.45" + KY + " +k=1.000018" + l + q + C + J + A, 1, D + " +lat_0=38.65" + Uj + Yc + l + q + C + E + A, 1, D + " +lat_0=38.65" + Uj + Yc + l + q + C + J + A, 1, D + " +lat_0=39.1" + Uk + OR + l + q + C + E + A, 1, D + " +lat_0=39.1" + Uk + OR + l + q + C + J + A, 1, D + Tw + Sq + OR + l + q + C + E + A, 1, D + Tw + Sq + OR + l + q + C + J + A, 1, D + " +lat_0=38.2" + Sr + Og + l + q + C + E + A, 1, D + " +lat_0=38.2" + Sr + Og + l + q + C + J + A, 1, D + Tx + KX + " +k=1.000033" + l + q + C + E + A, 1, D + Tx + KX + " +k=1.000033" + l + q + C + J + A, 1, D + Ty + Oj + OQ + l + q + C + E + A, 1, D + Ty + Oj + OQ + l + q + C + J + A, 1, D + " +lat_0=39.95" + Pq + Qw + l + q + C + E + A, 1, D + " +lat_0=39.95" + Pq + Qw + l + q + C + J + A, 1, D + Qu + Tt + Lm + l + q + C + E + A, 1, D + Qu + Tt + Lm + l + q + C + J + A, 1, D + Tu + Ul + Ye + l + q + C + E + A, 1, D + Tu + Ul + Ye + l + q + C + J + A, 1, D + Tz + " +lon_0=-85.7" + Ll + l + q + C + E + A, 1, D + Tz + " +lon_0=-85.7" + Ll + l + q + C + J + A, 1, D + " +lat_0=39.9" + MQ + Ll + l + q + C + E + A, 1, D + " +lat_0=39.9" + MQ + Ll + l + q + C + J + A, 1, D + " +lat_0=39.65" + UA + OR + l + q + C + E + A, 1, D + " +lat_0=39.65" + UA + OR + l + q + C + J + A, 1, D + " +lat_0=37.95" + HC + OP + l + q + C + E + A, 1, D + " +lat_0=37.95" + HC + OP + l + q + C + J + A, 1, D + " +lat_0=39.75" + Ss + Qs + l + q + C + E + A, 1, D + " +lat_0=39.75" + Ss + Qs + l + q + C + J + A, 1, D + Tz + HC + Lm + l + q + C + E + A, 1, D + Tz + HC + Lm + l + q + C + J + A, 1, D + Tx + To + Ll + l + q + C + E + A, 1, D + Tx + To + Ll + l + q + C + J + A, 1, D + " +lat_0=38.7 +lon_0=-85.95" + Yf + l + q + C + E + A, 1, D + " +lat_0=38.7 +lon_0=-85.95" + Yf + l + q + C + J + A, 1, D + Yg + KY + OP + l + q + C + E + A, 1, D + Yg + KY + OP + l + q + C + J + A, 1, D + " +lat_0=40.3" + SA + OQ + l + q + C + E + A, 1, D + " +lat_0=40.3" + SA + OQ + l + q + C + J + A, 1, D + " +lat_0=38.55" + Um + Qv + l + q + C + E + A, 1, D + " +lat_0=38.55" + Um + Qv + l + q + C + J + A, 1, D + " +lat_0=38.8" + UA + Qw + l + q + C + E + A, 1, D + " +lat_0=38.8" + UA + Qw + l + q + C + J + A, 1, D + Yh + HC + Lm + l + q + C + E + A, 1, D + Yh + HC + Lm + l + q + C + J + A, 1, D + " +lat_0=38.4" + St + Lk + l + q + C + E + A, 1, D + " +lat_0=38.4" + St + Lk + l + q + C + J + A, 1, D + Tw + Ss + " +k=1.000037" + l + q + C + E + A, 1, D + Tw + Ss + " +k=1.000037" + l + q + C + J + A, 1, D + Yg + Un + Ln + l + q + C + E + A, 1, D + Yg + Un + Ln + l + q + C + J + A, 1, D + Qu + " +lon_0=-86.75" + OP + l + q + C + E + A, 1, D + Qu + " +lon_0=-86.75" + OP + l + q + C + J + A, 1, D + " +lat_0=38.95" + Pr + Qv + l + q + C + E + A, 1, D + " +lat_0=38.95" + Pr + Qv + l + q + C + J + A, 1, D + " +lat_0=39.45" + Sr + Lm + l + q + C + E + A, 1, D + " +lat_0=39.45" + Sr + Lm + l + q + C + J + A, 1, D + Tv + KZ + Ln + l + q + C + E + A, 1, D + Tv + KZ + Ln + l + q + C + J + A, 1, D + Yd + Uo + Yf + l + q + C + E + A, 1, D + Yd + Uo + Yf + l + q + C + J + A, 1, D + Yi + " +lon_0=-86.7" + Og + l + q + C + E + A, 1, D + Yi + " +lon_0=-86.7" + Og + l + q + C + J + A, 1, D + " +lat_0=37.85" + Pq + Lk + l + q + C + E + A, 1, D + " +lat_0=37.85" + Pq + Lk + l + q + C + J + A, 1, D + Po + " +lon_0=-87.95" + Ye + l + q + C + E + A, 1, D + Po + " +lon_0=-87.95" + Ye + l + q + C + J + A, 1, D + " +lat_0=39.7" + Oj + " +k=1.000044" + l + q + C + E + A, 1, D + " +lat_0=39.7" + Oj + " +k=1.000044" + l + q + C + J + A, 1, D + Yj + " +lon_0=-85.3" + OQ + l + q + C + E + A, 1, D + Yj + " +lon_0=-85.3" + OQ + l + q + C + J + A, 1, D + Yh + Up + Zn + l + q + C + E + A, 1, D + Yh + Up + Zn + l + q + C + J + A, 1, D + Po + " +lon_0=-87.05 +k=1.000014" + l + q + C + E + A, 1, D + Po + " +lon_0=-87.05 +k=1.000014" + l + q + C + J + A, 1, D + Fo + SA + " +k=1.000041" + l + q + C + E + A, 1, D + Fo + SA + " +k=1.000041" + l + q + C + J + A, 1, D + Yj + OS + " +k=1.000017" + l + q + C + E + A, 1, D + Yj + OS + " +k=1.000017" + l + q + C + J + A, 1, D + " +lat_0=40.2" + KZ + Ln + l + q + C + E + A, 1, D + " +lat_0=40.2" + KZ + Ln + l + q + C + J + A, 1, D + Yi + Su + Lk + l + q + C + E + A, 1, D + Yi + Su + Lk + l + q + C + J + A, 1, D + Ty + St + Og + l + q + C + E + A, 1, D + Ty + St + Og + l + q + C + J + A, 1, D + Pp + " +lon_0=-85.25" + Ll + l + q + C + E + A, 1, D + Pp + " +lon_0=-85.25" + Ll + l + q + C + J + A, 3, K + C + B + A, 1, I + JM + C + B + E + A, 1, I + Me + C + B + E + A, 1, I + Rb + C + B + E + A, 152, D + WY + Bu + " +k=1.0000365285 +x_0=147218.6942 +y_0=0.0037" + C + E + A, 1, D + WZ + Uq + " +k=1.0000495683 +x_0=172821.9461 +y_0=0.0017" + C + E + A, 1, D + Wa + Ur + " +k=1.0000486665 +x_0=93150 +y_0=0.0029" + C + E + A, 1, H + Wb + Wc + Us + " +k_0=1.0000331195 +x_0=228600.4575 +y_0=148551.4837" + C + E + A, 1, D + Nj + " +lon_0=-88" + Og + " +x_0=31600 +y_0=4600" + C + E + A, 1, D + Wd + Ut + " +k=1.0000382778 +x_0=175260.3502 +y_0=0.0048" + C + E + A, 1, H + We + Wf + Uu + " +k_0=1.0000383841 +x_0=64008.1276 +y_0=59445.9043" + C + E + A, 1, D + Wg + " +lon_0=-88.5 +k=1.0000286569 +x_0=244754.8893 +y_0=0.0049" + C + E + A, 1, H + Wh + Wi + Uv + " +k_0=1.0000391127 +x_0=60045.72 +y_0=44091.4346" + C + E + A, 1, D + " +lat_0=43.6" + Uw + " +k=1.0000463003 +x_0=199949.1989 +y_0=0.0086" + C + E + A, 1, H + Wj + Wk + Ux + " +k_0=1.00003498 +x_0=169164.3381 +y_0=111569.6134" + C + E + A, 1, H + aQ + aR + Wl + " +k_0=1.0000349151 +x_0=113690.6274 +y_0=53703.1201" + C + E + A, 1, H + Zs + Zt + Uy + " +k_0=1.0000384786 +x_0=247193.2944 +y_0=146591.9896" + C + E + A, 1, D + Wm + Uz + " +k=1.0000346418 +x_0=263347.7263 +y_0=0.0076" + C + E + A, 1, D + " +lat_0=44.4" + VA + " +k=1.0000187521 +x_0=158801.1176 +y_0=0.0023" + C + E + A, 1, D + Wn + Oo + " +k=1.0000385418 +x_0=59131.3183 +y_0=0.0041" + C + E + A, 1, D + Wo + VB + " +k=1.0000410324 +x_0=51816.104 +y_0=0.003" + C + E + A, 1, H + Wp + Wq + VC + " +k_0=1.000035079 +x_0=120091.4402 +y_0=91687.92389999999" + C + E + A, 1, D + Wr + VD + " +k=1.0000552095 +x_0=133502.6683 +y_0=0.0063" + C + E + A, 1, D + Ws + VE + " +k=1.0000673004 +x_0=275844.5533 +y_0=0.0157" + C + E + A, 1, D + Wt + " +lon_0=-90.8 +k=1.0000349452 +x_0=242316.4841 +y_0=0.01" + C + E + A, 1, H + Wu + Wv + VF + " +k_0=1.0000390487 +x_0=170078.7403 +y_0=45830.2947" + C + E + A, 1, H + Ww + Wx + Ka + " +k_0=1.0000344057 +x_0=150876.3018 +y_0=79170.7795" + C + E + A, 1, D + Wy + VG + " +k=1.0000394961 +x_0=113081.0261 +y_0=0.0045" + C + E + A, 1, D + Wz + VH + " +k=1.0000677153 +x_0=220980.4419 +y_0=0.008500000000000001" + C + E + A, 1, D + XA + VI + " +k=1.0000353 +x_0=27000 +y_0=25000" + C + E + A, 1, D + XB + VJ + " +k=1.0000260649 +x_0=185928.3728 +y_0=0.0009" + C + E + A, 1, D + XC + Su + " +k=1.0000233704 +x_0=79857.7614 +y_0=0.0012" + C + E + A, 1, D + XD + VK + " +k=1.0000319985 +x_0=130454.6598 +y_0=0.0033" + C + E + A, 1, H + XE + XF + VL + " +k_0=1.0000627024 +x_0=198425.197 +y_0=105279.7829" + C + E + A, 1, D + XG + VM + " +k=1.0000599003 +x_0=116129.0323 +y_0=0.0058" + C + E + A, 1, H + XH + XI + " +lon_0=-89.77 +k_0=1.000053289 +x_0=74676.1493 +y_0=55049.2669" + C + E + A, 1, D + XJ + VN + " +k=1.0000234982 +x_0=238658.8794 +y_0=0.0032" + C + E + A, 1, D + XK + VO + " +k=1.0000362499 +x_0=105461.0121 +y_0=0.0029" + C + E + A, 1, H + XL + XM + VP + " +k_0=1.0000434122 +x_0=204521.209 +y_0=121923.9861" + C + E + A, 1, D + XN + VQ + " +k=1.0000236869 +x_0=182880.3676 +y_0=0.0033" + C + E + A, 1, H + XO + XP + VR + " +k_0=1.0000686968 +x_0=70104.1401 +y_0=57588.0346" + C + E + A, 1, H + XQ + XR + VS + " +k_0=1.0000362977 +x_0=167640.3354 +y_0=86033.0876" + C + E + A, 1, D + XS + Kb + " +k=1.0000433849 +x_0=141732.2823 +y_0=0.0059" + C + E + A, 1, H + XT + XU + " +lon_0=-89.5 +k_0=1.000039936 +x_0=56388.1128 +y_0=50022.1874" + C + E + A, 1, D + XV + VT + " +k=1.0000649554 +x_0=227990.8546 +y_0=0.0109" + C + E + A, 1, H + Zu + Zv + VU + " +k_0=1.0000375653 +x_0=202387.6048 +y_0=134255.4253" + C + E + A, 1, D + XW + VV + " +k=1.0000337311 +x_0=146304.2926 +y_0=0.0068" + C + E + A, 1, D + XX + VW + " +k=1.0000495976 +x_0=250546.1013 +y_0=0.0234" + C + E + A, 1, D + XY + VX + " +k=1.0000373868 +x_0=185623.5716 +y_0=0.0051" + C + E + A, 1, H + XZ + Xa + VY + " +k_0=1.0000573461 +x_0=216713.2336 +y_0=120734.1631" + C + E + A, 1, D + LJ + VZ + " +k=1.000032144 +x_0=262433.3253 +y_0=0.009599999999999999" + C + E + A, 1, D + LJ + Kb + " +k=1.0000381803 +x_0=165506.7302 +y_0=0.0103" + C + E + A, 1, H + Xb + Xc + Va + " +k_0=1.0000597566 +x_0=187147.5744 +y_0=107746.7522" + C + E + A, 1, D + Xd + Vb + " +k=1.0000361538 +x_0=256946.9138 +y_0=0.0041" + C + E + A, 1, H + Xe + Xf + Vc + " +k_0=1.0000408158 +x_0=222504.4451 +y_0=47532.0602" + C + E + A, 1, H + Xg + Xh + Vd + " +k_0=1.0000730142 +x_0=134417.0689 +y_0=50337.1092" + C + E + A, 1, H + Xi + Xj + Ve + " +k_0=1.0000367192 +x_0=232562.8651 +y_0=111088.2224" + C + E + A, 1, H + Xk + Xl + Vf + " +k_0=1.0000475376 +x_0=234086.8682 +y_0=188358.6058" + C + E + A, 1, D + Xm + Vg + " +k=1.00003738 +x_0=120091.4415 +y_0=0.003" + C + E + A, 1, D + Xn + Vh + " +k=1.0000346179 +x_0=208788.418 +y_0=0.0034" + C + E + A, 1, D + Xo + Vi + " +k=1.0000333645 +x_0=185013.9709 +y_0=0.007" + C + E + A, 1, H + Xp + Xq + Ka + " +k_0=1.0000392096 +x_0=120091.4402 +y_0=45069.7587" + C + E + A, 1, H + Xr + Xs + Bu + " +k_0=1.0000421209 +x_0=208483.6173 +y_0=134589.754" + C + E + A, 1, D + WY + Bu + " +k=1.0000365285 +x_0=147218.6941325883 +y_0=0.00365760731521463" + C + J + A, 1, D + WZ + Uq + " +k=1.0000495683 +x_0=172821.945948692 +y_0=0.001828803657607315" + C + J + A, 1, D + Wa + Ur + " +k=1.0000486665 +x_0=93150" + IX + C + J + A, 1, H + Wb + Wc + Us + " +k_0=1.0000331195 +x_0=228600.4575057151 +y_0=148551.4835661671" + C + J + A, 1, D + Nj + " +lon_0=-88" + Og + " +x_0=31599.99989839979 +y_0=4599.999898399797" + C + J + A, 1, D + Wd + Ut + " +k=1.0000382778 +x_0=175260.3502159004" + Vj + C + J + A, 1, H + We + Wf + Uu + " +k_0=1.0000383841 +x_0=64008.12771145543 +y_0=59445.90419100838" + C + J + A, 1, D + Wg + " +lon_0=-88.5 +k=1.0000286569 +x_0=244754.8892049784" + Vj + C + J + A, 1, H + Wh + Wi + Uv + " +k_0=1.0000391127 +x_0=60045.72009144018 +y_0=44091.43449326898" + C + J + A, 1, D + " +lat_0=43.6" + Uw + " +k=1.0000463003 +x_0=199949.198983998" + Vk + C + J + A, 1, H + Wj + Wk + Ux + " +k_0=1.00003498 +x_0=169164.338023876 +y_0=111569.613512827" + C + J + A, 1, H + aQ + aR + Wl + " +k_0=1.0000349151 +x_0=113690.6273812548 +y_0=53703.12024384048" + C + J + A, 1, H + Zs + Zt + Uy + " +k_0=1.0000384786 +x_0=247193.2943865888 +y_0=146591.9896367793" + C + J + A, 1, D + Wm + Uz + " +k=1.0000346418 +x_0=263347.7263906528 +y_0=0.00762001524003048" + C + J + A, 1, D + " +lat_0=44.4" + VA + " +k=1.0000187521 +x_0=158801.1176022352 +y_0=0.002438404876809754" + C + J + A, 1, D + Wn + Oo + " +k=1.0000385418 +x_0=59131.31826263652" + Vl + C + J + A, 1, D + Wo + VB + " +k=1.0000410324 +x_0=51816.10393700787" + IX + C + J + A, 1, H + Wp + Wq + VC + " +k_0=1.000035079" + Ys + " +y_0=91687.92390144781" + C + J + A, 1, D + Wr + VD + " +k=1.0000552095 +x_0=133502.6682245364 +y_0=0.006400812801625603" + C + J + A, 1, D + Ws + VE + " +k=1.0000673004 +x_0=275844.5532131065 +y_0=0.0158496316992634" + C + J + A, 1, D + Wt + " +lon_0=-90.8 +k=1.0000349452 +x_0=242316.484023368 +y_0=0.01005842011684023" + C + J + A, 1, H + Wu + Wv + VF + " +k_0=1.0000390487 +x_0=170078.7401574803 +y_0=45830.29484378968" + C + J + A, 1, H + Ww + Wx + Ka + " +k_0=1.0000344057 +x_0=150876.3017526035 +y_0=79170.77937515875" + C + J + A, 1, D + Wy + VG + " +k=1.0000394961 +x_0=113081.0261620523 +y_0=0.004572009144018288" + C + J + A, 1, D + Wz + VH + " +k=1.0000677153 +x_0=220980.4419608839" + Vk + C + J + A, 1, D + XA + VI + " +k=1.0000353 +x_0=27000 +y_0=24999.99989839979" + C + J + A, 1, D + XB + VJ + " +k=1.0000260649 +x_0=185928.3727711455 +y_0=0.0009144018288036576" + C + J + A, 1, D + XC + Su + " +k=1.0000233704 +x_0=79857.76154432308 +y_0=0.001219202438404877" + C + J + A, 1, D + XD + VK + " +k=1.0000319985 +x_0=130454.6596901194" + Op + C + J + A, 1, H + XE + XF + VL + " +k_0=1.0000627024 +x_0=198425.1968503937 +y_0=105279.7828803657" + C + J + A, 1, D + XG + VM + " +k=1.0000599003 +x_0=116129.0322580645" + Vm + C + J + A, 1, H + XH + XI + " +lon_0=-89.77 +k_0=1.000053289 +x_0=74676.1493522987 +y_0=55049.26695453391" + C + J + A, 1, D + XJ + VN + " +k=1.0000234982 +x_0=238658.8794513589" + IX + C + J + A, 1, D + XK + VO + " +k=1.0000362499 +x_0=105461.0121412243" + IX + C + J + A, 1, H + XL + XM + VP + " +k_0=1.0000434122 +x_0=204521.2090424181 +y_0=121923.9861823724" + C + J + A, 1, D + XN + VQ + " +k=1.0000236869 +x_0=182880.3675895352" + Op + C + J + A, 1, H + XO + XP + VR + " +k_0=1.0000686968 +x_0=70104.14020828041 +y_0=57588.03474726949" + C + J + A, 1, H + XQ + XR + VS + " +k_0=1.0000362977 +x_0=167640.3352806706 +y_0=86033.08773177546" + C + J + A, 1, D + XS + Kb + " +k=1.0000433849 +x_0=141732.2822453645" + Vm + C + J + A, 1, H + XT + XU + " +lon_0=-89.5 +k_0=1.000039936 +x_0=56388.11277622555 +y_0=50022.1874523749" + C + J + A, 1, D + XV + VT + " +k=1.0000649554 +x_0=227990.8544577089 +y_0=0.01097282194564389" + C + J + A, 1, H + Zu + Zv + VU + " +k_0=1.0000375653 +x_0=202387.6047752095 +y_0=134255.4254508509" + C + J + A, 1, D + XW + VV + " +k=1.0000337311 +x_0=146304.2926085852 +y_0=0.006705613411226822" + C + J + A, 1, D + XX + VW + " +k=1.0000495976 +x_0=250546.1013970028 +y_0=0.02346964693929388" + C + J + A, 1, D + XY + VX + " +k=1.0000373868 +x_0=185623.5715519431 +y_0=0.005181610363220727" + C + J + A, 1, H + XZ + Xa + VY + " +k_0=1.0000573461 +x_0=216713.2337312675 +y_0=120734.1631699263" + C + J + A, 1, D + LJ + VZ + " +k=1.000032144 +x_0=262433.3251714504 +y_0=0.009448818897637795" + C + J + A, 1, D + LJ + Kb + " +k=1.0000381803 +x_0=165506.7300990602 +y_0=0.01036322072644145" + C + J + A, 1, H + Xb + Xc + Va + " +k_0=1.0000597566 +x_0=187147.5742951486 +y_0=107746.7521463043" + C + J + A, 1, D + Xd + Vb + " +k=1.0000361538 +x_0=256946.9138938278" + Vl + C + J + A, 1, H + Xe + Xf + Vc + " +k_0=1.0000408158 +x_0=222504.44500889 +y_0=47532.0603505207" + C + J + A, 1, H + Xg + Xh + Vd + " +k_0=1.0000730142 +x_0=134417.0688341377 +y_0=50337.10927101854" + C + J + A, 1, H + Xi + Xj + Ve + " +k_0=1.0000367192 +x_0=232562.8651257302 +y_0=111088.2224028448" + C + J + A, 1, H + Xk + Xl + Vf + " +k_0=1.0000475376 +x_0=234086.8681737363 +y_0=188358.6059436119" + C + J + A, 1, D + Xm + Vg + " +k=1.00003738 +x_0=120091.4414020828" + IX + C + J + A, 1, D + Xn + Vh + " +k=1.0000346179 +x_0=208788.4178816358" + Op + C + J + A, 1, D + Xo + Vi + " +k=1.0000333645 +x_0=185013.9709423419 +y_0=0.007010414020828041" + C + J + A, 1, H + Xp + Xq + Ka + " +k_0=1.0000392096" + Ys + " +y_0=45069.7588011176" + C + J + A, 1, H + Xr + Xs + Bu + " +k_0=1.0000421209 +x_0=208483.6172720346 +y_0=134589.7539243078" + C + J + A, 41, K + C + A, 6, D + L2 + " +lon_0=68.51666666666667 +k=1 +x_0=1300000" + RX + C + E + A, 1, D + L2 + " +lon_0=71.51666666666667 +k=1" + aB + RX + C + E + A, 1, D + L2 + " +lon_0=74.51666666666667 +k=1" + aC + RX + C + E + A, 1, D + L2 + " +lon_0=77.51666666666667 +k=1" + aD + RX + C + E + A, 1, D + L2 + " +lon_0=80.51666666666667 +k=1 +x_0=5300000" + RX + C + E + A, 12308, D + L2 + Gl + " +k=1" + DP + N + M + G + E + A, 1, D + L2 + HO + " +k=1" + Eg + N + M + G + E + A, 1, D + L2 + IG + " +k=1" + Jt + N + M + G + E + A, 1, D + L2 + LN + " +k=1" + IM + N + M + G + E + A, 1, D + L2 + JS + " +k=1" + MS + N + M + G + E + A, 1, D + L2 + PS + " +k=1" + MT + N + M + G + E + A, 1, D + L2 + RL + " +k=1" + LY + N + M + G + E + A, 1, D + L2 + QW + " +k=1" + Jp + N + M + G + E + A, 1, D + L2 + RM + " +k=1" + LZ + N + M + G + E + A, 1, D + L2 + HP + " +k=1" + HU + N + M + G + E + A, 1, D + L2 + HQ + " +k=1" + Gw + N + M + G + E + A, 1, D + L2 + Hd + " +k=1" + Hu + N + M + G + E + A, 1, D + L2 + HR + " +k=1" + Hv + N + M + G + E + A, 1, D + L2 + HS + " +k=1" + It + N + M + G + E + A, 1, D + L2 + EN + " +k=1" + Hs + N + M + G + E + A, 1, D + L2 + Fy + " +k=1" + Ht + N + M + G + E + A, 1, D + L2 + Fm + " +k=1" + HV + N + M + G + E + A, 1, D + L2 + Fr + " +k=1" + Hw + N + M + G + E + A, 1, D + L2 + Ed + " +k=1" + HW + N + M + G + E + A, 1, D + L2 + Fn + " +k=1" + Hx + N + M + G + E + A, 1, D + L2 + Pf + " +k=1" + La + N + M + G + E + A, 1, D + L2 + Od + " +k=1" + Hy + N + M + G + E + A, 1, D + L2 + NY + " +k=1" + Hz + N + M + G + E + A, 1, D + L2 + Pg + " +k=1" + IA + N + M + G + E + A, 1, D + L2 + NZ + " +k=1" + IB + N + M + G + E + A, 1, D + L2 + Lf + " +k=1" + Gx + N + M + G + E + A, 1, D + L2 + KG + " +k=1" + IT + N + M + G + E + A, 1, D + L2 + KH + " +k=1" + Gc + N + M + G + E + A, 1, D + L2 + Lh + " +k=1" + IU + N + M + G + E + A, 103, I + Ki + c + HX + E + A, 1, I + Mf + c + HX + E + A, 1, I + KD + c + HX + E + A, 1, I + JZ + c + HX + E + A, 111, I + Mi + o + x + r + E + A, 1, I + NS + o + x + r + E + A, 1, I + Mg + o + x + r + E + A, 1, I + NT + o + x + r + E + A, 1, I + Ot + o + x + r + E + A, 1, I + Nv + o + x + r + E + A, 1, I + PM + o + x + r + E + A, 1, I + Re + o + x + r + E + A, 1, I + SM + o + x + r + E + A, 1, I + MA + o + x + r + E + A, 91, I + Mi + o + x + CB + E + A, 1, I + NS + o + x + CB + E + A, 1, I + Mg + o + x + CB + E + A, 1, I + NT + o + x + CB + E + A, 1, I + Ot + o + x + CB + E + A, 1, I + Nv + o + x + CB + E + A, 1, I + PM + o + x + CB + E + A, 1, I + Re + o + x + CB + E + A, 80, I + Mf + R + Cm + E + A, 1, I + KD + R + Cm + E + A, 1, I + JZ + R + Cm + E + A, 1, I + JM + R + Cm + E + A, 1, I + Me + R + Cm + E + A, 59, I + JM + R + Cm + E + A, 39, I + JZ + M + NL + E + A, 1, I + JM + M + NL + E + A, 251, D + BY + " +lon_0=1 +k=1" + h + Hk + R + EV + Zb + E + A, 1, D + BY + " +lon_0=1 +k=1" + s + N + R + EV + Zb + E + A, 31, I + Io + o + R + Ec + E + A, 1, I + MB + o + R + Ec + E + A, 1, I + Nx + o + R + Ec + E + A, 110, I + NR + o + Bc + BS + In + E + A, 1, I + Ki + o + Bc + BS + In + E + A, 1, I + Mf + o + Bc + BS + In + E + A, 99, I + Ki + o + c + ER + E + A, 1, I + Mf + o + c + ER + E + A, 1, I + KD + o + c + ER + E + A, 58, I + Ki + c + ER + E + A, 1, I + Mf + c + ER + E + A, 1, I + KD + c + ER + E + A, 51, I + Mh + o + Y + Cj + E + A, 1, I + Mi + o + Y + Cj + E + A, 1, I + NS + o + Y + Cj + E + A, 141, D + L2 + NU + EP + u + N + c + Jw + E + A, 1, D + " +lat_0=13.17638888888889 +lon_0=-59.55972222222222 +k=0.9999986" + Zl + " +y_0=75000" + c + Jw + E + A, 121, D + L2 + HP + " +k=1" + HU + N + M + U + E + A, 1, D + L2 + HQ + " +k=1" + Gw + N + M + U + E + A, 1, D + L2 + Hd + " +k=1" + Hu + N + M + U + E + A, 1, D + L2 + HR + " +k=1" + Hv + N + M + U + E + A, 1, D + L2 + HS + " +k=1" + It + N + M + U + E + A, 1, D + L2 + EN + " +k=1" + Hs + N + M + U + E + A, 1, D + L2 + Fy + " +k=1" + Ht + N + M + U + E + A, 1, D + L2 + Fm + " +k=1" + HV + N + M + U + E + A, 1, D + L2 + Fr + " +k=1" + Hw + N + M + U + E + A, 1, D + L2 + Ed + " +k=1" + HW + N + M + U + E + A, 1, D + L2 + Fn + " +k=1" + Hx + N + M + U + E + A, 30, D + L2 + HP + " +k=1" + O + N + M + U + E + A, 1, D + L2 + HQ + " +k=1" + O + N + M + U + E + A, 1, D + L2 + Hd + " +k=1" + O + N + M + U + E + A, 1, D + L2 + HR + " +k=1" + O + N + M + U + E + A, 1, D + L2 + HS + " +k=1" + O + N + M + U + E + A, 1, D + L2 + EN + " +k=1" + O + N + M + U + E + A, 1, D + L2 + Fy + " +k=1" + O + N + M + U + E + A, 1, D + L2 + Fm + " +k=1" + O + N + M + U + E + A, 1, D + L2 + Fr + " +k=1" + O + N + M + U + E + A, 1, D + L2 + Ed + " +k=1" + O + N + M + U + E + A, 1, D + L2 + Fn + " +k=1" + O + N + M + U + E + A, 37, H + Ks + Kt + Hr + HN + Bn + " +y_0=5400000" + R + " +pm=brussels" + E + A, 280, Pu + Kj + HN + " +k_0=1" + s + N + Y + Gf + " +pm=bern" + E + A, 1, Pu + Kj + Ow + " +k_0=1" + a + IK + Y + Gf + E + A, 1, Pu + Kj + Ow + " +k_0=1" + s + N + Y + Gf + E + A, 36, I + IC + R + ES + E + A, 78, D + LK + " +lon_0=-77.08091666666667 +k=1" + BZ + AH + R + ES + E + A, 1, D + LK + " +lon_0=-74.08091666666667 +k=1" + BZ + AH + R + ES + E + A, 1, D + LK + " +lon_0=-71.08091666666667 +k=1" + BZ + AH + R + ES + E + A, 1, D + LK + " +lon_0=-68.08091666666667 +k=1" + BZ + AH + R + ES + E + A, 133, I + JN + o + c + GO + E + A, 1, I + KC + o + c + GO + E + A, 58, D + L2 + " +lon_0=11.5" + AP + O + Ak + c + GO + E + A, 1, D + L2 + IH + AP + O + Ak + c + GO + E + A, 79, D + m + UQ + " +k=1" + AV + N + C + B + E + A, 1, D + m + MP + " +k=1" + Ci + N + C + B + E + A, 1, D + m + Pe + " +k=1" + Bo + N + C + B + E + A, 1, D + m + Qk + " +k=1" + DP + N + C + B + E + A, 1, D + m + US + " +k=1" + Eg + N + C + B + E + A, 1, D + m + Zc + " +k=1" + Jt + N + C + B + E + A, 1, D + m + Nb + " +k=1" + IM + N + C + B + E + A, 4, D + m + UQ + " +k=1" + AV + N + j + B + E + A, 1, D + m + MP + " +k=1" + Ci + N + j + B + E + A, 1, D + m + Pe + " +k=1" + Bo + N + j + B + E + A, 1, D + m + Qk + " +k=1" + DP + N + j + B + E + A, 1, D + m + US + " +k=1" + Eg + N + j + B + E + A, 1, D + m + Zc + " +k=1" + Jt + N + j + B + E + A, 1, D + m + Nb + " +k=1" + IM + N + j + B + E + A, 4, D + m + UQ + " +k=1" + AV + N + R + Bs + E + A, 1, D + m + MP + " +k=1" + Ci + N + R + Bs + E + A, 1, D + m + Pe + " +k=1" + Bo + N + R + Bs + E + A, 1, D + m + Qk + " +k=1" + DP + N + R + Bs + E + A, 1, D + m + US + " +k=1" + Eg + N + R + Bs + E + A, 1, D + m + Zc + " +k=1" + Jt + N + R + Bs + E + A, 1, D + m + Nb + " +k=1" + IM + N + R + Bs + E + A, 37, I + NR + o + Bc + BS + Ax + E + A, 1, I + Ki + o + Bc + BS + Ax + E + A, 40, D + L2 + Gj + " +k=1" + s + N + Gk + Bc + BS + Ax + E + A, 2, D + L2 + UE + " +k=1" + s + N + Gk + Bc + BS + Ax + E + A, 2, D + L2 + RI + " +k=1" + s + N + Gk + Bc + BS + Ax + E + A, 2, D + L2 + Gl + " +k=1" + s + N + Gk + Bc + BS + Ax + E + A, 2, D + L2 + SP + " +k=1" + s + N + Gk + Bc + BS + Ax + E + A, 2, D + L2 + RJ + " +k=1" + s + N + Gk + Bc + BS + Ax + E + A, 2, D + L2 + HO + " +k=1" + s + N + Gk + Bc + BS + Ax + E + A, 2, D + L2 + " +lon_0=29 +k=1" + s + N + Gk + Bc + BS + Ax + E + A, 2, D + L2 + QQ + " +k=1" + s + N + Gk + Bc + BS + Ax + E + A, 2, D + L2 + IG + " +k=1" + s + N + Gk + Bc + BS + Ax + E + A, 39, I + JN + AU + BN + Gi + E + A, 59, H + " +lat_1=36" + GM + " +lon_0=9.9" + QL + O + Hk + AU + BN + Gi + E + A, 1, H + Sd + Se + " +lon_0=9.9" + Nk + O + Hk + AU + BN + Gi + E + A, 129, I + ID + o + R + GR + E + A, 1, I + Io + o + R + GR + E + A, 1, I + MB + o + R + GR + E + A, 1, I + Nx + o + R + GR + E + A, 1, I + Nr + o + R + GR + E + A, 175, H + aL + " +lat_0=34.65 +lon_0=37.35 +k_0=0.9996256" + AI + Hk + AU + BN + HI + E + A, 70, H + aL + " +lat_0=34.65 +lon_0=37.35 +k_0=0.9996256" + AI + Hk + AU + BN + HI + E + A, 10, GU + " +lat_0=34.2 +lon_0=39.15 +k=0.9995341" + s + N + AU + BN + HI + E + A, 211, D + Gm + " +lon_0=35 +k=1" + AI + " +y_0=1100000" + Gn + HY + E + A, 1, D + Gm + QQ + " +k=1 +x_0=615000 +y_0=810000" + Gn + HY + E + A, 1, D + Gm + HO + " +k=1" + EW + IK + Gn + HY + E + A, 1, D + Gm + HO + " +k=1" + EW + Tj + Gn + HY + E + A, 34, I + Ja + R + n + E + A, 1, I + KA + R + n + E + A, 1, I + Oq + R + n + E + A, 1, I + QD + R + n + E + A, 1, I + JN + R + n + E + A, 1, I + KC + R + n + E + A, 1, I + NR + R + n + E + A, 1, I + Ki + R + n + E + A, 1, I + Mf + R + n + E + A, 1, I + KD + R + n + E + A, 1, I + JZ + R + n + E + A, 52, D + L2 + HN + AP + O + N + R + n + E + A, 5, D + L2 + " +lon_0=5" + AP + O + N + R + n + E + A, 144, I + JM + c + NM + E + A, 1, I + Me + c + NM + E + A, 460, Pu + " +lat_0=47.14439372222222 +lon_0=19.04857177777778 +k_0=0.99993 +x_0=650000" + IK + aK + RE + E + A, 130, D + L2 + " +lon_0=94.5" + V + h + DQ + j + B + E + A, 1, D + L2 + " +lon_0=97.5" + V + h + DQ + j + B + E + A, 1, D + L2 + " +lon_0=100.5" + V + h + DQ + j + B + E + A, 1, D + L2 + " +lon_0=103.5" + V + h + DQ + j + B + E + A, 1, D + L2 + " +lon_0=106.5" + V + h + DQ + j + B + E + A, 1, D + L2 + " +lon_0=109.5" + V + h + DQ + j + B + E + A, 1, D + L2 + " +lon_0=112.5" + V + h + DQ + j + B + E + A, 1, D + L2 + " +lon_0=115.5" + V + h + DQ + j + B + E + A, 1, D + L2 + " +lon_0=118.5" + V + h + DQ + j + B + E + A, 1, D + L2 + " +lon_0=121.5" + V + h + DQ + j + B + E + A, 1, D + L2 + " +lon_0=124.5" + V + h + DQ + j + B + E + A, 1, D + L2 + Pj + V + h + DQ + j + B + E + A, 1, D + L2 + " +lon_0=130.5" + V + h + DQ + j + B + E + A, 1, D + L2 + Tk + V + h + DQ + j + B + E + A, 1, D + L2 + " +lon_0=136.5" + V + h + DQ + j + B + E + A, 1, D + L2 + " +lon_0=139.5" + V + h + DQ + j + B + E + A, 1, I + QF + IR + Bh + Av + E + A, 1, I + Ny + IR + Bh + Av + E + A, 1, I + Mh + IR + Bh + Av + E + A, 1, I + Mi + IR + Bh + Av + E + A, 1, I + NS + IR + Bh + Av + E + A, 1, I + Mg + IR + Bh + Av + E + A, 1, I + NT + IR + Bh + Av + E + A, 14, I + QF + j + B + E + A, 1, I + Ny + j + B + E + A, 1, I + Mh + j + B + E + A, 1, I + Mi + j + B + E + A, 1, I + NS + j + B + E + A, 1, I + Mg + j + B + E + A, 1, I + NT + j + B + E + A, 5, I + Ny + o + j + B + E + A, 1, I + Mh + o + j + B + E + A, 1, I + Mi + o + j + B + E + A, 1, I + NS + o + j + B + E + A, 1, I + Mg + o + j + B + E + A, 1, I + NT + o + j + B + E + A, 1, I + Ot + o + j + B + E + A, 1, I + Nv + o + j + B + E + A, 3, I + Ny + o + IR + Bh + Av + E + A, 1, I + Mh + o + IR + Bh + Av + E + A, 1, I + Mi + o + IR + Bh + Av + E + A, 1, I + NS + o + IR + Bh + Av + E + A, 1, I + Mg + o + IR + Bh + Av + E + A, 1, I + NT + o + IR + Bh + Av + E + A, 1, I + Ot + o + IR + Bh + Av + E + A, 1, I + Nv + o + IR + Bh + Av + E + A, 52, I + QF + By + Ay + JR + E + A, 1, I + Ny + By + Ay + JR + E + A, 1, I + Mh + By + Ay + JR + E + A, 99, I + Ny + By + Ay + NN + E + A, 1, I + Mh + By + Ay + NN + E + A, 52, H + " +lat_1=18" + OX + Ld + " +k_0=1 +x_0=167638.49597 +y_0=121918.90616" + RB + RC + ML + A, 100, H + " +lat_1=18" + OX + Ld + " +k_0=1" + Bv + " +y_0=150000" + i + TG + E + A, 105, I + Te + By + Ay + JQ + E + A, 1, I + QF + By + Ay + JQ + E + A, 5, I + Rb + Lp + Hp + GQ + E + A, 1, I + Rc + Lp + Hp + GQ + E + A, 1, I + SO + Lp + Hp + GQ + E + A, 29, I + Rc + Go + CT + BT + E + A, 1, I + SO + Go + CT + BT + E + A, 1, I + Td + Go + CT + BT + E + A, 1, I + Te + Go + CT + BT + E + A, 1, I + QF + Go + CT + BT + E + A, 1, I + Ny + Go + CT + BT + E + A, 23, H + Sc + " +lat_0=39.5 +lon_0=68 +k_0=0.99846154 +x_0=2153865.73916853 +y_0=2368292.194628102" + HK + Gv + GT + A, 1, H + Qq + Li + " +lon_0=68" + Fz + JX + JY + HK + Gv + GT + A, 1, H + UM + IQ + " +lon_0=74" + Fz + JX + JY + HK + Gv + GT + A, 1, H + " +lat_1=19 +lat_0=19 +lon_0=80" + Fz + JX + JY + HK + Gv + GT + A, 1, H + " +lat_1=12 +lat_0=12 +lon_0=80" + Fz + JX + JY + HK + Gv + GT + A, 1, H + UM + IQ + Hq + Fz + " +x_0=2743185.69 +y_0=914395.23" + By + Ay + JQ + E + A, 1, H + Qq + Li + " +lon_0=68" + Fz + " +x_0=2743196.4 +y_0=914398.8" + Lp + Hp + GQ + E + A, 1, H + UM + IQ + " +lon_0=74" + Fz + " +x_0=2743196.4 +y_0=914398.8" + Lp + Hp + GQ + E + A, 1, H + Qq + Li + " +lon_0=68" + Fz + PX + Qa + Go + CT + BT + E + A, 1, H + UM + IQ + " +lon_0=74" + Fz + PX + Qa + Go + CT + BT + E + A, 1, H + UM + IQ + Hq + Fz + PX + Qa + Go + CT + BT + E + A, 1, H + " +lat_1=19 +lat_0=19 +lon_0=80" + Fz + PX + Qa + Go + CT + BT + E + A, 1, H + UM + IQ + Hq + Fz + JX + JY + HK + Gv + GT + A, 1, H + " +lat_1=12 +lat_0=12 +lon_0=80" + Fz + PX + Qa + Go + CT + BT + E + A, 117, Ck + " +lat_0=1.287646666666667 +lon_0=103.8530022222222" + Zl + " +y_0=30000" + GL + Bz + BV + E + A, 47, I + Ny + GL + Bz + BV + E + A, 1, I + Mh + GL + Bz + BV + E + A, 52, H + Qq + Li + JS + PZ + AV + aG + c + Qh + E + A, 118, I + IC + R + Hc + E + A, 1, I + Hi + R + Hc + E + A, 1, I + Gz + R + Hc + E + A, 97, I + Ik + R + AX + E + A, 1, I + IC + R + AX + E + A, 1, I + Hi + R + AX + E + A, 1, I + Gz + R + AX + E + A, 1, I + ID + R + AX + E + A, 56, I + Ik + o + R + AX + E + A, 1, I + IC + o + R + AX + E + A, 1, I + Hi + o + R + AX + E + A, 1, I + Gz + o + R + AX + E + A, 1, I + ID + o + R + AX + E + A, 1, I + Io + o + R + AX + E + A, 9, D + " +lat_0=-6 +lon_0=-80.5 +k=0.99983008 +x_0=222000 +y_0=1426834.743" + R + AX + E + A, 1, D + " +lat_0=-9.5 +lon_0=-76 +k=0.99932994 +x_0=720000 +y_0=1039979.159" + R + AX + E + A, 1, D + " +lat_0=-9.5" + IL + " +k=0.99952992 +x_0=1324000 +y_0=1040084.558" + R + AX + E + A, 107, D + Vp + " +lon_0=-1" + Rv + " +x_0=274319.51" + N + c + TR + E + A, 231, I + QD + AU + BN + E + A, 160, D + L2 + Fm + CP + O + N + i + GC + E + A, 1, D + L2 + ZU + CP + O + N + i + GC + E + A, 1, D + L2 + ZV + CP + O + N + i + GC + E + A, 1, D + L2 + Fr + CP + O + N + i + GC + E + A, 1, D + L2 + Ru + CP + O + N + i + GC + E + A, 433, I + Ja + C + B + E + A, 1, I + KA + C + B + E + A, 1, I + Oq + C + B + E + A, 1, I + QD + C + B + E + A, 1, I + JN + C + B + E + A, 1, I + KC + C + B + E + A, 1, I + NR + C + B + E + A, 1, I + Ki + C + B + E + A, 1, I + Mf + C + B + E + A, 1, I + KD + C + B + E + A, 47, D + L2 + II + AP + O + N + C + B + E + A, 48, I + JN + o + R + Qd + E + A, 259, H + Sd + Se + Yk + Nk + O + Hk + AU + BN + IO + E + A, 1, H + " +lat_1=29.7 +lat_0=29.7" + Yk + " +k_0=0.9996155960000001" + O + Hk + AU + BN + IO + E + A, 2, H + " +lat_1=26.1 +lat_0=26.1" + Yk + " +k_0=0.999616304 +x_0=1200000" + Is + AU + BN + IO + E + A, 1, H + " +lat_1=22.5 +lat_0=22.5" + Yk + " +k_0=0.999616437" + AV + Is + AU + BN + IO + E + A, 42, I + KD + Y + Tc + E + A, 94, I + QD + c + GS + E + A, 1, I + JN + c + GS + E + A, 59, D + Qi + " +lon_0=4.5" + Rv + " +x_0=230738.26" + N + c + GS + E + A, 1, D + Qi + " +lon_0=8.5" + Rv + " +x_0=670553.98" + N + c + GS + E + A, 1, D + Qi + " +lon_0=12.5" + Rv + " +x_0=1110369.7" + N + c + GS + E + A, 239, I + JN + AU + BN + NO + E + A, 60, I + JN + o + AU + BN + NO + E + A, 9, I + SK + X + E + A, 1, I + TV + X + E + A, 1, I + Xz + X + E + A, 1, I + TY + X + E + A, 1, I + RG + X + E + A, 1, I + Ro + X + E + A, 1, I + RH + X + E + A, 1, I + TW + X + E + A, 1, I + TX + X + E + A, 1, I + QE + X + E + A, 1, I + Ns + X + E + A, 1, I + Nt + X + E + A, 1, I + Nu + X + E + A, 1, I + Nw + X + E + A, 1, I + NP + X + E + A, 1, I + NQ + X + E + A, 1, I + Ik + X + E + A, 1, I + IC + X + E + A, 1, I + Hi + X + E + A, 1, I + Gz + X + E + A, 1, I + ID + X + E + A, 1, I + Io + X + E + A, 7, D + IY + IV + Pc + e + N + X + J + A, 1, D + Gm + OS + BG + e + N + X + J + A, 1, CU + " +lat_0=57" + Ku + Kv + V + " +x_0=5000000.001016002 +y_0=-5000000.001016002" + KE + GZ + X + J + A, 1, D + Ft + YN + V + e + N + X + J + A, 1, D + Ft + YO + V + e + N + X + J + A, 1, D + Ft + ON + V + e + N + X + J + A, 1, D + Ft + Ms + V + e + N + X + J + A, 1, D + Ft + KI + V + e + N + X + J + A, 1, D + Ft + YP + V + " +x_0=213360.4267208534" + N + X + J + A, 1, D + Ft + YQ + V + e + N + X + J + A, 1, D + Ft + SW + V + Px + N + X + J + A, 1, H + Kw + Kx + UK + YR + Bw + N + X + J + A, 1, H + DW + Jn + y + HA + Z + N + X + J + A, 1, H + DX + DY + AA + HA + Z + N + X + J + A, 1, H + Ap + DZ + Ml + AJ + Z + N + X + J + A, 1, H + LO + QS + Da + Mm + Z + N + X + J + A, 1, H + Db + Dc + Mn + Ir + Z + N + X + J + A, 1, H + Dd + De + Df + Iw + Z + N + X + J + A, 2, D + Bl + Cn + V + e + N + X + J + A, 1, D + Bl + Co + V + e + N + X + J + A, 1, D + Bl + Iv + BG + e + N + X + J + A, 1, H + Dx + Dy + BC + IF + Z + N + X + J + A, 1, H + Dz + Mq + EA + IF + Z + N + X + J + A, 1, H + " +lat_1=39.71666666666667 +lat_2=40.78333333333333" + y + Ba + Z + N + X + J + A, 1, H + LP + LQ + CY + Ba + Z + N + X + J + A, 1, H + Ap + Dg + f + Ba + Z + N + X + J + A, 1, H + Dh + Mo + Di + Jq + Px + N + X + J + A, 1, D + Ch + Cp + Mp + e + N + X + J + A, 1, D + Aq + CR + Am + e + N + X + J + A, 1, D + Aq + Ob + Am + e + N + X + J + A, 1, H + LR + Dj + QT + LS + Z + N + X + J + A, 6, D + Gm + Cq + V + e + N + X + J + A, 1, D + Gm + Cr + V + e + N + X + J + A, 1, D + p + Cs + BJ + e + N + X + J + A, 1, D + p + Jb + BJ + e + N + X + J + A, 1, D + p + Ix + BG + e + N + X + J + A, 1, D + f + Cz + EQ + e + N + X + J + A, 1, D + f + DA + Am + e + N + X + J + A, 1, D + DM + DB + AO + e + N + X + J + A, 1, D + DM + DC + AO + e + N + X + J + A, 1, H + EB + EC + Fo + GG + Z + N + X + J + A, 1, H + AY + ED + Fs + GG + Z + N + X + J + A, 1, H + EE + EF + AQ + Fl + Z + N + X + J + A, 1, H + EG + EH + f + CV + Z + N + X + J + A, 1, H + Az + DV + DM + Jo + Z + N + X + J + A, 1, H + " +lat_1=36.73333333333333 +lat_2=37.93333333333333" + AB + EY + Z + N + X + J + A, 1, H + " +lat_1=31.16666666666667 +lat_2=32.66666666666666 +lat_0=30.66666666666667" + Hg + Z + N + X + J + A, 1, H + " +lat_1=29.3 +lat_2=30.7 +lat_0=28.66666666666667" + Bi + Z + N + X + J + A, 1, D + AL + HJ + V + e + N + X + J + A, 1, D + BD + DD + AO + e + N + X + J + A, 1, H + " +lat_1=38.3 +lat_2=39.45" + CY + Ld + " +x_0=243840.4876809754" + N + X + J + A, 1, H + " +lat_1=41.71666666666667 +lat_2=42.68333333333333" + Ip + GE + Px + N + X + J + A, 1, H + " +lat_1=41.28333333333333 +lat_2=41.48333333333333" + Ip + IL + " +x_0=60960.12192024384" + N + X + J + A, 4, H + " +lat_1=47.03333333333333 +lat_2=48.63333333333333" + Iq + DE + Z + N + X + J + A, 1, H + " +lat_1=45.61666666666667 +lat_2=47.05" + IP + Js + Z + N + X + J + A, 1, H + " +lat_1=43.78333333333333 +lat_2=45.21666666666667" + Nj + Na + Z + N + X + J + A, 1, D + Cb + Ct + Pc + e + N + X + J + A, 1, D + IY + Bx + Am + e + N + X + J + A, 1, D + Cd + RS + BG + e + N + X + J + A, 1, D + Cd + Hg + BG + e + N + X + J + A, 1, D + Id + RT + Am + e + N + X + J + A, 1, H + " +lat_1=34.41666666666666 +lat_2=33.86666666666667 +lat_0=34.13333333333333" + IW + " +x_0=1276106.450596901 +y_0=1268253.006858014" + X + J + A, 48, D + AK + HJ + V + BF + N + C + B + J + A, 1, D + BD + DD + AO + HT + N + C + B + J + A, 1, H + FU + FV + Iq + DE + An + Ao + C + B + J + A, 1, H + Ma + FW + IP + Js + An + Ao + C + B + J + A, 1, H + FX + FY + Nj + Na + An + Ao + C + B + J + A, 1, H + JT + Jn + FZ + CS + AG + N + C + B + J + A, 1, H + Mb + RN + Mr + Ga + a + N + C + B + J + A, 1, H + Fg + Fh + QX + CR + a + N + C + B + J + A, 1, D + AK + HJ + V + BF + N + C + B + J + A, 1, D + BD + DD + AO + HT + N + C + B + J + A, 1, H + FU + FV + Iq + DE + An + Ao + C + B + J + A, 1, H + Ma + FW + IP + Js + An + Ao + C + B + J + A, 1, H + FX + FY + Nj + Na + An + Ao + C + B + J + A, 1, H + JT + Jn + FZ + CS + AG + N + C + B + J + A, 1, H + Mb + RN + Mr + Ga + a + N + C + B + J + A, 1, H + Fg + Fh + QX + CR + a + N + C + B + J + A, 1, D + AK + HJ + V + BF + N + C + B + J + A, 1, D + BD + DD + AO + HT + N + C + B + J + A, 1, H + FU + FV + Iq + DE + An + Ao + C + B + J + A, 1, H + Ma + FW + IP + Js + An + Ao + C + B + J + A, 1, H + FX + FY + Nj + Na + An + Ao + C + B + J + A, 1, H + JT + Jn + FZ + CS + AG + N + C + B + J + A, 1, H + Mb + RN + Mr + Ga + a + N + C + B + J + A, 1, H + Fg + Fh + QX + CR + a + N + C + B + J + A, 21, D + L2 + ET + V + Ab + N + C + B + E + A, 1, D + L2 + CR + V + Ab + N + C + B + E + A, 1, D + L2 + NV + V + Ab + N + C + B + E + A, 1, D + L2 + Jh + V + Ab + N + C + B + E + A, 1, D + L2 + Bu + V + Ab + N + C + B + E + A, 1, D + L2 + Rs + V + Ab + N + C + B + E + A, 1, D + L2 + OZ + V + Ab + N + C + B + E + A, 1, D + L2 + " +lon_0=-53" + V + Ab + N + C + B + E + A, 1, D + L2 + Zd + V + Ab + N + C + B + E + A, 2, I + SK + C + B + E + A, 1, I + TV + C + B + E + A, 1, I + Xz + C + B + E + A, 1, I + TY + C + B + E + A, 1, I + RG + C + B + E + A, 1, I + Ro + C + B + E + A, 1, I + RH + C + B + E + A, 1, I + TW + C + B + E + A, 1, I + TX + C + B + E + A, 1, I + QE + C + B + E + A, 1, I + Ns + C + B + E + A, 1, I + Nt + C + B + E + A, 1, I + Nu + C + B + E + A, 1, I + Nw + C + B + E + A, 1, I + NP + C + B + E + A, 1, I + NQ + C + B + E + A, 1, I + Ik + C + B + E + A, 1, I + IC + C + B + E + A, 1, I + Hi + C + B + E + A, 1, I + Gz + C + B + E + A, 1, I + ID + C + B + E + A, 1, I + Io + C + B + E + A, 1, I + MB + C + B + E + A, 6, D + IY + IV + Pc + h + N + C + B + E + A, 1, D + Gm + OS + BG + a + N + C + B + E + A, 1, CU + " +lat_0=57" + Ku + Kv + V + LX + EO + KE + GZ + C + B + E + A, 1, D + Ft + YN + V + O + N + C + B + E + A, 1, D + Ft + YO + V + O + N + C + B + E + A, 1, D + Ft + ON + V + O + N + C + B + E + A, 1, D + Ft + Ms + V + O + N + C + B + E + A, 1, D + Ft + KI + V + O + N + C + B + E + A, 1, D + Ft + YP + V + O + N + C + B + E + A, 1, D + Ft + YQ + V + O + N + C + B + E + A, 1, D + Ft + SW + V + O + N + C + B + E + A, 1, H + Kw + Kx + UK + YR + BZ + N + C + B + E + A, 1, H + DW + Jn + y + HA + Bd + Ae + C + B + E + A, 1, H + DX + DY + AA + HA + Bd + Ae + C + B + E + A, 1, H + Ap + DZ + Ml + AJ + Bd + Ae + C + B + E + A, 1, H + LO + QS + Da + Mm + Bd + Ae + C + B + E + A, 1, H + Db + Dc + Mn + Ir + Bd + Ae + C + B + E + A, 1, H + Dd + De + Df + Iw + Bd + Ae + C + B + E + A, 2, D + Bl + Cn + V + EX + N + C + B + E + A, 1, D + Bl + Co + V + EX + N + C + B + E + A, 1, D + Bl + Iv + BG + EX + N + C + B + E + A, 1, H + Dx + Dy + BC + IF + u + N + C + B + E + A, 1, H + Dz + Mq + EA + IF + u + Is + C + B + E + A, 1, H + Eh + Ei + y + Ba + Fw + Fx + C + B + E + A, 1, H + LP + LQ + CY + Ba + Fw + Fx + C + B + E + A, 1, H + Ap + Dg + f + Ba + Fw + Fx + C + B + E + A, 1, H + Dh + Mo + Di + Jq + QG + QH + C + B + E + A, 1, D + Ch + Cp + Mp + h + N + C + B + E + A, 1, D + Aq + CR + Am + h + N + C + B + E + A, 1, D + Aq + Ob + Am + h + N + C + B + E + A, 1, H + LR + Dj + QT + LS + a + N + C + B + E + A, 1, D + Kn + Sf + AO + O + N + C + B + E + A, 1, D + Ko + KO + AO + O + N + C + B + E + A, 1, D + GV + KI + Jl + O + N + C + B + E + A, 1, D + Kp + Sg + Jl + O + N + C + B + E + A, 1, D + Kq + KP + " +k=1" + O + N + C + B + E + A, 1, D + Gm + Cq + V + h + N + C + B + E + A, 1, D + Gm + Cr + V + EW + N + C + B + E + A, 1, D + p + Cs + BJ + h + N + C + B + E + A, 1, D + p + Jb + BJ + O + N + C + B + E + A, 1, D + p + Ix + BG + CX + N + C + B + E + A, 1, D + f + Cz + EQ + AI + N + C + B + E + A, 1, D + f + DA + Am + EW + N + C + B + E + A, 1, D + DM + DB + AO + BU + KJ + C + B + E + A, 1, D + DM + DC + AO + HT + KJ + C + B + E + A, 1, H + EB + EC + Fo + GG + AV + AH + C + B + E + A, 1, H + AY + ED + Fs + GG + O + N + C + B + E + A, 1, H + EE + EF + AQ + Fl + u + N + C + B + E + A, 1, H + EG + EH + f + CV + u + Is + C + B + E + A, 2, H + Ej + Ek + AB + EY + O + Ae + C + B + E + A, 1, H + FS + FT + IY + Hg + BZ + N + C + B + E + A, 1, H + OH + OI + OJ + Bi + BZ + N + C + B + E + A, 1, D + AK + HJ + V + AI + N + C + B + E + A, 1, D + BD + DD + AO + HT + N + C + B + E + A, 1, H + MU + Nz + AA + Ld + u + N + C + B + E + A, 1, H + El + Dk + Ip + GE + h + Mk + C + B + E + A, 1, H + Em + En + Ip + IL + O + N + C + B + E + A, 1, H + Eo + Ep + Eq + Jh + Tl + N + C + B + E + A, 1, H + OA + Er + Es + BE + Pk + N + C + B + E + A, 1, H + Bq + OB + Fo + BE + LU + N + C + B + E + A, 1, H + FU + FV + Iq + DE + CX + EK + C + B + E + A, 1, H + Ma + FW + IP + Js + CX + EK + C + B + E + A, 1, H + FX + FY + Nj + Na + CX + EK + C + B + E + A, 1, D + Hj + Ct + CP + AI + N + C + B + E + A, 1, D + Hj + Bx + CP + EW + N + C + B + E + A, 1, D + Cd + RS + BG + Bv + N + C + B + E + A, 1, D + Cd + Hg + BG + O + N + C + B + E + A, 1, D + Id + RT + Am + YC + N + C + B + E + A, 41, I + JM + c + DO + E + A, 1, I + Me + c + DO + E + A, 80, I + Gz + R + TS + E + A, 80, "+proj=nzmg +lat_0=-41 +lon_0=173 +x_0=2510000 +y_0=6023150" + R + W + E + A, 5, D + " +lat_0=-36.87986527777778 +lon_0=174.7643393611111" + V + AI + DN + R + W + E + A, 1, D + " +lat_0=-37.76124980555556 +lon_0=176.46619725 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-38.62470277777778 +lon_0=177.8856362777778 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-39.65092930555556 +lon_0=176.6736805277778 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-39.13575830555556 +lon_0=174.22801175 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-39.51247038888889 +lon_0=175.6400368055556 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-40.24194713888889 +lon_0=175.4880996111111 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-40.92553263888889 +lon_0=175.6473496666667 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-41.30131963888888 +lon_0=174.7766231111111 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-40.71475905555556 +lon_0=172.6720465 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-41.27454472222222 +lon_0=173.2993168055555 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-41.28991152777778 +lon_0=172.1090281944444 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-41.81080286111111 +lon_0=171.5812600555556 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-42.33369427777778 +lon_0=171.5497713055556 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-42.68911658333333 +lon_0=173.0101333888889 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-41.54448666666666 +lon_0=173.8020741111111 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-42.88632236111111 +lon_0=170.9799935 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-43.11012813888889 +lon_0=170.2609258333333 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-43.97780288888889 +lon_0=168.606267 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-43.59063758333333 +lon_0=172.7271935833333 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-43.74871155555556 +lon_0=171.3607484722222 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-44.40222036111111 +lon_0=171.0572508333333 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-44.73526797222222 +lon_0=169.4677550833333 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-45.13290258333333 +lon_0=168.3986411944444 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-45.56372616666666 +lon_0=167.7388617777778 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-45.81619661111111 +lon_0=170.6285951666667 +k=1" + AI + DN + R + W + E + A, 1, D + " +lat_0=-45.86151336111111 +lon_0=170.2825891111111" + Pc + AI + DN + R + W + E + A, 1, D + " +lat_0=-46.60000961111111 +lon_0=168.342872 +k=1 +x_0=300002.66 +y_0=699999.58" + R + W + E + A, 26, I + MA + o + R + W + E + A, 1, I + Nq + o + R + W + E + A, 1, I + PL + o + R + W + E + A, 31, D + " +lat_0=-39 +lon_0=175.5 +k=1 +x_0=274319.5243848086 +y_0=365759.3658464114" + R + W + TU + A, 1, D + Za + " +lon_0=171.5 +k=1 +x_0=457199.2073080143 +y_0=457199.2073080143" + R + W + TU + A, 99, D + Fk + " +lon_0=-4.666666666666667 +k=1" + s + N + Hn + EL + Aa + SN + E + A, 1, D + Fk + " +lon_0=-2.333333333333333 +k=1" + s + N + Hn + EL + Aa + SN + E + A, 1, D + Fk + HN + " +k=1" + s + N + Hn + EL + Aa + SN + E + A, 1, D + Fk + " +lon_0=2.5 +k=1" + s + N + Hn + EL + Aa + SN + E + A, 1, D + Fk + Vr + " +k=1" + s + N + Hn + EL + Aa + SN + E + A, 1, D + Fk + " +lon_0=10.16666666666667 +k=1" + s + N + Hn + EL + Aa + SN + E + A, 1, D + Fk + " +lon_0=14.16666666666667 +k=1" + s + N + Hn + EL + Aa + SN + E + A, 1, D + Fk + " +lon_0=18.33333333333333 +k=1" + s + N + Hn + EL + Aa + SN + E + A, 31, I + KA + R + JL + E + A, 64, D + BY + UZ + " +k=1 +x_0=180.598 +y_0=-86.98999999999999" + R + JL + E + A, 7, H + PD + PE + " +lon_0=5.399999999999999 +k_0=0.99950908" + O + Hk + " +a=6376523" + RA + ZM + E + A, 61, H + PD + PE + HN + " +k_0=0.999877341" + a + IK + AU + BN + Bk + Lv + E + A, 1, H + " +lat_1=46.8 +lat_0=46.8" + HN + " +k_0=0.99987742" + a + IK + AU + BN + Bk + Lv + E + A, 1, H + Xt + Xu + HN + " +k_0=0.999877499" + a + IK + AU + BN + Bk + Lv + E + A, 1, H + Xv + Xw + HN + " +k_0=0.99994471 +x_0=234.358 +y_0=185861.369" + AU + BN + Bk + Lv + E + A, 7, H + PD + PE + HN + " +k_0=0.999877341" + a + Tj + AU + BN + Bk + Lv + E + A, 1, H + " +lat_1=46.8 +lat_0=46.8" + HN + " +k_0=0.99987742" + a + " +y_0=2200000" + AU + BN + Bk + Lv + E + A, 1, H + Xt + Xu + HN + " +k_0=0.999877499" + a + " +y_0=3200000" + AU + BN + Bk + Lv + E + A, 1, H + Xv + Xw + HN + " +k_0=0.99994471 +x_0=234.358 +y_0=4185861.369" + AU + BN + Bk + Lv + E + A, 126, D + " +lat_0=49 +lon_0=-2 +k=0.9996012717" + u + " +y_0=-100000" + PV + Lx + E + A, 491, Ck + LH + LI + Qx + " +y_0=126867.909" + Nc + Nd + DS + E + A, 1, D + LH + LI + " +k=1" + Qx + " +y_0=1126867.909" + Nc + Nd + DS + E + A, 1, Ck + LH + LI + Qx + " +y_0=1126867.909" + Nc + Nd + DS + E + A, 39, I + JN + o + AU + BN + TH + E + A, 116, I + Mh + o + C + B + E + A, 1, I + Mi + o + C + B + E + A, 1, I + NS + o + C + B + E + A, 1, I + Mg + o + C + B + E + A, 1, I + NT + o + C + B + E + A, 1, I + Ot + o + C + B + E + A, 1, I + Nv + o + C + B + E + A, 1, I + PM + o + C + B + E + A, 1, I + Re + o + C + B + E + A, 1, I + SM + o + C + B + E + A, 1, I + MA + o + C + B + E + A, 46, D + L2 + Gl + " +k=1" + DP + N + M + F + E + A, 1, D + L2 + HO + " +k=1" + Eg + N + M + F + E + A, 1, D + L2 + IG + " +k=1" + Jt + N + M + F + E + A, 1, D + L2 + LN + " +k=1" + IM + N + M + F + E + A, 1, D + L2 + JS + " +k=1" + MS + N + M + F + E + A, 1, D + L2 + PS + " +k=1" + MT + N + M + F + E + A, 1, D + L2 + RL + " +k=1" + LY + N + M + F + E + A, 1, D + L2 + QW + " +k=1" + Jp + N + M + F + E + A, 1, D + L2 + RM + " +k=1" + LZ + N + M + F + E + A, 1, D + L2 + HP + " +k=1" + HU + N + M + F + E + A, 1, D + L2 + HQ + " +k=1" + Gw + N + M + F + E + A, 1, D + L2 + Hd + " +k=1" + Hu + N + M + F + E + A, 1, D + L2 + HR + " +k=1" + Hv + N + M + F + E + A, 1, D + L2 + HS + " +k=1" + It + N + M + F + E + A, 1, D + L2 + EN + " +k=1" + Hs + N + M + F + E + A, 1, D + L2 + Fy + " +k=1" + Ht + N + M + F + E + A, 1, D + L2 + Fm + " +k=1" + HV + N + M + F + E + A, 1, D + L2 + Fr + " +k=1" + Hw + N + M + F + E + A, 1, D + L2 + Ed + " +k=1" + HW + N + M + F + E + A, 1, D + L2 + Fn + " +k=1" + Hx + N + M + F + E + A, 1, D + L2 + Pf + " +k=1" + La + N + M + F + E + A, 1, D + L2 + Od + " +k=1" + Hy + N + M + F + E + A, 1, D + L2 + NY + " +k=1" + Hz + N + M + F + E + A, 1, D + L2 + Pg + " +k=1" + IA + N + M + F + E + A, 1, D + L2 + NZ + " +k=1" + IB + N + M + F + E + A, 1, D + L2 + Lf + " +k=1" + Gx + N + M + F + E + A, 1, D + L2 + KG + " +k=1" + IT + N + M + F + E + A, 1, D + L2 + KH + " +k=1" + Gc + N + M + F + E + A, 1, D + L2 + Lh + " +k=1" + IU + N + M + F + E + A, 168, D + " +lat_0=24.45" + Vv + Jl + h + Hk + R + QO + E + A, 391, GU + Xx + Yo + " +k=0.9999079" + s + N + Y + Fv + E + A, 1, GU + Xx + Yo + " +k=0.9999079 +x_0=155000 +y_0=463000" + Y + Fv + E + A, 109, UU + L2 + Nb + LX + Ak + x + Al + E + A, 67, I + IC + x + Al + E + A, 1, I + Hi + x + Al + E + A, 1, I + Gz + x + Al + E + A, 1, I + ID + x + Al + E + A, 1, I + Io + x + Al + E + A, 15, I + Ik + o + x + Al + E + A, 1, I + IC + o + x + Al + E + A, 1, I + Hi + o + x + Al + E + A, 1, I + Gz + o + x + Al + E + A, 1, I + ID + o + x + Al + E + A, 1, I + Io + o + x + Al + E + A, 1, I + MB + o + x + Al + E + A, 1, I + Nx + o + x + Al + E + A, 1, I + Nr + o + x + Al + E + A, 25, I + Gz + o + R + Nn + E + A, 1, I + ID + o + R + Nn + E + A, 112, I + KC + o + HB + Bt + E + A, 38, D + Pi + " +lon_0=11 +k=1" + s + N + Gk + HB + Bt + GK + A, 2, D + Pi + " +lon_0=13 +k=1" + s + N + Gk + HB + Bt + GK + A, 2, D + Pi + Gj + " +k=1" + s + N + Gk + HB + Bt + GK + A, 2, D + Pi + UE + " +k=1" + s + N + Gk + HB + Bt + GK + A, 2, D + Pi + RI + " +k=1" + s + N + Gk + HB + Bt + GK + A, 2, D + Pi + Gl + " +k=1" + s + N + Gk + HB + Bt + GK + A, 2, D + Pi + SP + " +k=1" + s + N + Gk + HB + Bt + GK + A, 2, D + Pi + RJ + " +k=1" + s + N + Gk + HB + Bt + GK + A, 317, CU + " +lat_0=-18.9 +lonc=44.10000000000001 +alpha=18.9" + EP + u + CO + " +gamma=18.9" + R + HD + Lv + E + A, 36, I + JZ + o + R + HD + E + A, 1, I + JM + o + R + HD + E + A, 110, I + Mi + Lo + GD + E + A, 1, I + NS + Lo + GD + E + A, 21, CU + Qi + Yz + PF + Ph + " +x_0=590476.8714630401 +y_0=442857.653094361" + If + Lo + GD + " +to_meter=20.11676512155263" + A, 1, CU + Qi + Yz + PF + Ph + " +x_0=590476.8727431979 +y_0=442857.6545573985" + If + Lo + GD + " +to_meter=0.3047994715386762" + A, 1, CU + Qi + Yz + PF + Ph + " +x_0=590476.87 +y_0=442857.65" + If + Lo + GD + E + A, 28, D + YA + " +lon_0=-8 +k=1" + h + KJ + PV + Bb + E + A, 1, D + YA + " +lon_0=-8 +k=1.000035" + h + KJ + Ok + Bb + E + A, 1, D + YA + " +lon_0=-8 +k=1.000035" + h + KJ + Ok + Bb + E + A, 258, D + PT + Zz + V + s + N + Y + g + E + A, 1, D + PT + NX + V + s + N + Y + g + E + A, 1, D + GM + Ox + V + s + N + Y + g + E + A, 1, D + PT + Tk + V + s + N + Y + g + E + A, 1, D + GM + Oy + V + s + N + Y + g + E + A, 1, D + GM + Rw + V + s + N + Y + g + E + A, 1, D + GM + Oz + V + s + N + Y + g + E + A, 1, D + GM + aA + V + s + N + Y + g + E + A, 1, D + GM + PA + V + s + N + Y + g + E + A, 1, D + Fs + PB + V + s + N + Y + g + E + A, 1, D + IZ + ZH + V + s + N + Y + g + E + A, 1, D + IZ + ZI + V + s + N + Y + g + E + A, 1, D + IZ + ZJ + V + s + N + Y + g + E + A, 1, D + IQ + " +lon_0=142" + V + s + N + Y + g + E + A, 1, D + IQ + Pj + V + s + N + Y + g + E + A, 1, D + IQ + " +lon_0=124" + V + s + N + Y + g + E + A, 1, D + IQ + NX + V + s + N + Y + g + E + A, 1, D + " +lat_0=20" + Rw + V + s + N + Y + g + E + A, 1, D + IQ + ZR + V + s + N + Y + g + E + A, 21, Ck + Vs + UX + " +x_0=86501.46392051999" + aS + Ee + Ef + JK + Vo + A, 139, I + JM + Gn + E + A, 1, I + Me + Gn + E + A, 151, H + " +lat_1=36" + GM + SC + QL + O + Hk + AU + BN + JC + E + A, 1, H + Sd + Se + SC + Nk + O + Hk + AU + BN + JC + E + A, 1, H + " +lat_1=36" + GM + SC + QL + O + Hk + AU + BN + E + A, 1, H + Sd + Se + SC + Nk + O + Hk + AU + BN + E + A, 235, I + KA + c + Af + E + A, 1, I + Oq + c + Af + E + A, 1, I + QD + c + Af + E + A, 1, I + JN + c + Af + E + A, 59, H + " +lat_1=36" + GM + SC + QL + " +x_0=500135 +y_0=300090" + c + Af + E + A, 1, H + Sd + Se + SC + Nk + " +x_0=500135 +y_0=300090" + c + Af + E + A, 236, I + Ja + AU + BN + E + A, 93, I + ID + R + HE + E + A, 33, D + L2 + Nb + AP + O + N + R + HE + E + A, 16, D + L2 + Vn + AP + O + N + R + HE + E + A, 1, D + L2 + Vn + V + O + N + R + HE + E + A, 80, D + L2 + RP + " +k=1" + s + EO + Y + Aw + Ls + E + A, 1, D + L2 + QQ + " +k=1" + s + EO + Y + Aw + Ls + E + A, 1, D + L2 + ZG + " +k=1" + s + EO + Y + Aw + Ls + E + A, 1, D + L2 + PG + " +k=1" + s + EO + Y + z + E + A, 1, D + L2 + Ig + " +k=1" + s + EO + Y + z + E + A, 1, D + L2 + PH + " +k=1" + s + EO + Y + z + E + A, 1, D + L2 + PG + " +k=1" + Bn + EO + Y + z + E + A, 1, D + L2 + Ig + " +k=1 +x_0=450000" + EO + Y + z + E + A, 1, D + L2 + PH + " +k=1" + YL + EO + Y + z + E + A, 22, D + L2 + RP + " +k=1" + s + N + Y + Aw + Ls + E + A, 1, D + L2 + QQ + " +k=1" + s + N + Y + Aw + Ls + E + A, 1, D + L2 + ZG + " +k=1" + s + N + Y + Aw + Ls + E + A, 1, D + L2 + PG + " +k=1" + Bn + N + Y + z + E + A, 1, D + L2 + Ig + " +k=1 +x_0=450000" + N + Y + z + E + A, 1, D + L2 + PH + " +k=1" + YL + N + Y + z + E + A, 1, H + LM + Nh + " +lat_0=47.5" + Ig + u + Is + Y + z + E + A, 1, D + L2 + RP + " +k=1" + Bn + N + Y + Aw + Ls + E + A, 1, D + L2 + QQ + " +k=1 +x_0=450000" + N + Y + Aw + Ls + E + A, 1, D + L2 + ZG + " +k=1" + YL + N + Y + Aw + Ls + E + A, 10, H + Ks + Kt + Hr + " +lon_0=4.356939722222222 +x_0=150000.01256 +y_0=5400088.4378" + R + GP + E + A, 70, H + " +lat_1=51.16666723333333 +lat_2=49.8333339" + Hr + " +lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438" + R + GP + E + A, 96, D + L2 + ZO + " +k=1" + Ci + N + Y + AC + E + A, 1, D + L2 + KB + " +k=1" + Bo + N + Y + AC + E + A, 1, D + L2 + IH + " +k=1" + DP + N + Y + AC + E + A, 1, D + L2 + Gj + " +k=1" + Eg + N + Y + AC + E + A, 59, I + Ja + AU + BN + No + E + A, 1, I + KA + AU + BN + No + E + A, 71, GU + " +lat_0=45.9 +lon_0=25.39246588888889 +k=0.9996667" + O + Ae + R + QP + E + A, 238, I + JZ + j + MR + E + A, 1, I + JM + j + MR + E + A, 62, D + L2 + SQ + " +k=1" + O + N + C + Rr + E + A, 64, I + Ns + C + B + E + A, 1, I + Nt + C + B + E + A, 1, I + Nu + C + B + E + A, 1, I + Nw + C + B + E + A, 1, I + NP + C + B + E + A, 1, I + NQ + C + B + E + A, 1, I + Ik + C + B + E + A, 1, I + IC + C + B + E + A, 1, I + Hi + C + B + E + A, 1, I + Gz + C + B + E + A, 1, I + ID + C + B + E + A, 1, I + Io + C + B + E + A, 1, I + Ik + o + C + B + E + A, 1, I + IC + o + C + B + E + A, 1, I + Hi + o + C + B + E + A, 1, I + Gz + o + C + B + E + A, 1, I + ID + o + C + B + E + A, 1, I + Io + o + C + B + E + A, 1, I + MB + o + C + B + E + A, 1, I + Nx + o + C + B + E + A, 1, I + Nr + o + C + B + E + A, 1, I + Ik + C + B + E + A, 1, I + IC + C + B + E + A, 1, I + Hi + C + B + E + A, 1, I + Gz + C + B + E + A, 1, I + ID + C + B + E + A, 1, I + Io + C + B + E + A, 1, I + Ik + o + C + B + E + A, 1, I + IC + o + C + B + E + A, 1, I + Hi + o + C + B + E + A, 1, I + Gz + o + C + B + E + A, 1, I + ID + o + C + B + E + A, 1, I + Io + o + C + B + E + A, 1, I + MB + o + C + B + E + A, 1, I + Nx + o + C + B + E + A, 1, I + Nr + o + C + B + E + A, 1, H + " +lat_1=48.71666666666667 +lat_2=47.85" + Ib + IS + Z + N + X + J + A, 1, H + " +lat_1=47.88333333333333 +lat_2=46.45 +lat_0=45.83333333333334" + IS + Z + N + X + J + A, 1, H + " +lat_1=46.4 +lat_2=44.86666666666667" + IZ + IS + Z + N + X + J + A, 2, H + " +lat_1=41.85 +lat_2=42.81666666666667 +lat_0=41.33333333333334" + CS + Z + N + X + J + A, 1, H + " +lat_1=40.28333333333333" + Dk + BY + " +lon_0=-99.5" + Z + N + X + J + A, 1, D + CQ + DF + V + e + N + X + J + A, 1, D + CQ + DG + V + e + N + X + J + A, 1, D + CQ + DH + V + e + N + X + J + A, 1, D + Fp + DI + AO + e + N + X + J + A, 1, D + BA + " +lon_0=-74.66666666666667" + EQ + Z + N + X + J + A, 1, D + Bl + Cu + Hm + e + N + X + J + A, 1, D + Bl + Iy + V + e + N + X + J + A, 1, D + Bl + Cv + Iz + e + N + X + J + A, 1, D + Fs + " +lon_0=-74.33333333333333" + AO + e + N + X + J + A, 1, D + Fs + Cw + Ad + e + N + X + J + A, 1, D + Fs + Cx + Ad + e + N + X + J + A, 2, H + " +lat_1=34.33333333333334 +lat_2=36.16666666666666" + LT + NW + Z + N + X + J + A, 1, H + " +lat_1=47.43333333333333" + Xy + Ib + EZ + Z + N + X + J + A, 1, H + " +lat_1=46.18333333333333 +lat_2=47.48333333333333" + Be + EZ + Z + N + X + J + A, 1, H + " +lat_1=40.43333333333333 +lat_2=41.7" + BY + ET + Z + N + X + J + A, 1, H + " +lat_1=38.73333333333333 +lat_2=40.03333333333333" + Ch + ET + Z + N + X + J + A, 1, H + " +lat_1=35.56666666666667" + Du + QU + Fl + Z + N + X + J + A, 1, H + " +lat_1=33.93333333333333 +lat_2=35.23333333333333" + Do + Fl + Z + N + X + J + A, 1, H + " +lat_1=44.33333333333334" + Nh + AK + AJ + Z + N + X + J + A, 1, H + " +lat_1=42.33333333333334 +lat_2=44" + p + AJ + Z + N + X + J + A, 1, H + " +lat_1=40.88333333333333 +lat_2=41.95" + BB + Ea + Z + N + X + J + A, 2, D + EI + GE + " +k=0.9999938" + e + N + X + J + A, 1, H + " +lat_1=33.76666666666667 +lat_2=34.96666666666667" + PT + CR + Z + N + X + J + A, 2, H + " +lat_1=32.33333333333334 +lat_2=33.66666666666666" + Dr + CR + Z + N + X + J + A, 1, H + " +lat_1=44.41666666666666 +lat_2=45.68333333333333" + AL + CS + Z + N + X + J + A, 1, H + " +lat_1=42.83333333333334 +lat_2=44.4" + EJ + Ag + Z + N + X + J + A, 2, H + aL + " +lat_2=36.18333333333333" + QV + Jr + Z + N + X + J + A, 1, H + " +lat_1=32.13333333333333 +lat_2=33.96666666666667" + Ds + " +lon_0=-97.5" + Z + N + X + J + A, 1, H + " +lat_1=30.11666666666667 +lat_2=31.88333333333333" + Cb + Ag + Z + N + X + J + A, 1, H + " +lat_1=28.38333333333333 +lat_2=30.28333333333333" + Dt + Ji + Z + N + X + J + A, 1, H + " +lat_1=26.16666666666667 +lat_2=27.83333333333333" + Cc + CV + Z + N + X + J + A, 1, H + " +lat_1=40.71666666666667 +lat_2=41.78333333333333" + Br + BI + Z + N + X + J + A, 1, H + " +lat_1=39.01666666666667 +lat_2=40.65" + AQ + BI + Z + N + X + J + A, 1, H + " +lat_1=37.21666666666667 +lat_2=38.35" + f + BI + Z + N + X + J + A, 1, D + Fp + LW + JA + e + N + X + J + A, 1, H + " +lat_1=38.03333333333333 +lat_2=39.2" + AA + GF + Z + N + X + J + A, 1, H + Dn + " +lat_2=37.96666666666667" + AB + GF + Z + N + X + J + A, 1, H + " +lat_1=47.5" + Xy + Ib + Cy + Z + N + X + J + A, 1, H + " +lat_1=45.83333333333334 +lat_2=47.33333333333334" + Dv + AJ + Z + N + X + J + A, 1, H + " +lat_1=39 +lat_2=40.25" + Mr + Ga + Z + N + X + J + A, 1, H + " +lat_1=37.48333333333333 +lat_2=38.88333333333333" + QX + CR + Z + N + X + J + A, 1, H + " +lat_1=45.56666666666667 +lat_2=46.76666666666667" + Dw + Bu + Z + N + X + J + A, 1, H + " +lat_1=44.25" + Hl + AL + Bu + Z + N + X + J + A, 1, H + " +lat_1=42.73333333333333 +lat_2=44.06666666666667" + PR + Bu + Z + N + X + J + A, 1, D + LL + DJ + Am + e + N + X + J + A, 1, D + LL + DK + Am + e + N + X + J + A, 1, D + LL + JB + Am + e + N + X + J + A, 1, D + LL + DL + Am + e + N + X + J + A, 6, D + L2 + Ji + AP + k + N + X + J + A, 1, D + L2 + Rs + AP + k + N + X + J + A, 1, D + L2 + Jh + AP + k + N + X + J + A, 1, D + L2 + CR + AP + k + N + X + J + A, 14, D + L2 + " +lon_0=-53" + V + Ab + N + X + E + A, 1, D + L2 + Zd + V + Ab + N + X + E + A, 1, D + L2 + Tf + V + Ab + N + X + E + A, 1, D + L2 + RQ + V + Ab + N + X + E + A, 1, D + L2 + RR + V + Ab + N + X + E + A, 1, D + L2 + Tg + V + Ab + N + X + E + A, 12, H + UF + Nh + IZ + HJ + s + N + X + E + A, 1, H + CD + CE + Cc + Bi + Z + N + X + J + A, 1, H + LM + RK + MV + IS + a + N + C + B + E + A, 4, H + JT + Jn + FZ + CS + O + N + C + B + E + A, 3, D + CQ + DF + V + h + Tm + C + B + E + A, 1, D + CQ + DG + V + O + Hh + C + B + E + A, 1, D + CQ + DH + V + CX + LV + C + B + E + A, 1, D + Fp + DI + AO + AI + N + C + B + E + A, 1, D + BA + Gp + V + Bn + N + C + B + E + A, 1, D + Bl + Cu + Hm + OC + N + C + B + E + A, 1, D + Bl + Iy + V + O + N + C + B + E + A, 1, D + Bl + Cv + Iz + YD + N + C + B + E + A, 1, D + BA + Gp + V + Bn + N + C + B + E + A, 1, D + Fs + Cw + Ad + Bv + N + C + B + E + A, 1, D + Fs + Cx + Ad + Qo + N + C + B + E + A, 1, H + Dl + Dm + BB + Oc + AI + N + C + B + E + A, 1, H + Et + Eu + LT + NW + Rh + N + C + B + E + A, 1, H + BH + Ev + Ib + EZ + a + N + C + B + E + A, 1, H + Ew + Ex + Be + EZ + a + N + C + B + E + A, 1, H + OK + Fa + BY + ET + a + N + C + B + E + A, 1, H + Fb + Fc + Ch + ET + a + N + C + B + E + A, 1, H + Dn + Ey + QU + Fl + a + N + C + B + E + A, 1, H + Ez + FA + Do + Fl + a + N + C + B + E + A, 1, H + PP + CZ + AK + AJ + Ci + N + C + B + E + A, 1, H + PQ + Ca + p + AJ + AV + N + C + B + E + A, 1, H + MW + FB + BB + Ea + a + N + C + B + E + A, 1, H + Dp + Dq + y + Ea + a + N + C + B + E + A, 1, D + EI + GE + Lb + BU + N + C + B + E + A, 3, H + FC + OD + Dr + CR + OE + N + C + B + E + A, 1, H + Fd + Fe + AL + CS + a + N + C + B + E + A, 1, H + OL + Ff + EJ + Ag + a + N + C + B + E + A, 1, H + FD + MX + BC + MQ + a + N + C + B + E + A, 1, H + FE + MY + QV + Jr + h + AH + C + B + E + A, 1, H + FF + FG + Ds + CV + a + Cl + C + B + E + A, 1, H + FH + FI + Cb + Ag + EW + Fq + C + B + E + A, 1, H + FJ + FK + Dt + Ji + a + LV + C + B + E + A, 1, H + CD + CE + Cc + CV + AI + Ju + C + B + E + A, 1, H + AY + CF + Br + BI + O + AH + C + B + E + A, 1, H + JF + CG + AQ + BI + O + Cl + C + B + E + A, 1, H + JG + CH + f + BI + O + Fq + C + B + E + A, 1, D + Fp + LW + JA + O + N + C + B + E + A, 1, H + OF + FL + AA + GF + Bo + Cl + C + B + E + A, 1, H + Az + Du + AB + GF + Bo + AH + C + B + E + A, 1, H + BH + OG + Ib + Cy + O + N + C + B + E + A, 1, H + FM + FN + Dv + AJ + O + N + C + B + E + A, 1, H + Mb + RN + Mr + Ga + a + N + C + B + E + A, 1, H + Fg + Fh + QX + CR + a + N + C + B + E + A, 1, H + FO + FP + Dw + Bu + a + N + C + B + E + A, 1, H + Jc + MZ + AL + Bu + a + N + C + B + E + A, 1, H + FQ + FR + PR + Bu + a + N + C + B + E + A, 1, D + CA + DJ + Ad + h + N + C + B + E + A, 1, D + CA + DK + Ad + u + EK + C + B + E + A, 1, D + CA + JB + Ad + a + N + C + B + E + A, 1, D + CA + DL + Ad + CX + EK + C + B + E + A, 3, H + GW + GX + GY + GA + h + IK + C + B + E + A, 3, D + L2 + Ji + AP + k + N + C + B + J + A, 1, D + L2 + Rs + AP + k + N + C + B + J + A, 1, D + L2 + Jh + AP + k + N + C + B + J + A, 1, D + L2 + CR + AP + k + N + C + B + J + A, 14, D + L2 + " +lon_0=-53" + V + Ab + N + C + B + E + A, 1, D + L2 + Zd + V + Ab + N + C + B + E + A, 1, D + L2 + Tf + V + Ab + N + C + B + E + A, 1, D + L2 + RQ + V + Ab + N + C + B + E + A, 1, D + L2 + RR + V + Ab + N + C + B + E + A, 1, D + L2 + Tg + V + Ab + N + C + B + E + A, 1, D + L2 + IL + V + Ab + N + C + B + E + A, 1, D + L2 + Th + V + Ab + N + C + B + E + A, 1, D + L2 + Ti + V + Ab + N + C + B + E + A, 1, D + L2 + Ga + V + Ab + N + C + B + E + A, 1, D + L2 + ET + V + Ab + N + C + B + E + A, 1, D + L2 + CR + V + Ab + N + C + B + E + A, 1, D + L2 + NV + V + Ab + N + C + B + E + A, 1, D + L2 + Jh + V + Ab + N + C + B + E + A, 1, D + L2 + Bu + V + Ab + N + C + B + E + A, 1, D + L2 + Rs + V + Ab + N + C + B + E + A, 1, D + L2 + OZ + V + Ab + N + C + B + E + A, 1, H + UF + Nh + IZ + HJ + s + N + C + B + E + A, 1, H + CD + CE + " +lat_0=25.5" + Bi + BZ + N + C + B + E + A, 2, I + SK + T + P + E + A, 1, I + TV + T + P + E + A, 1, I + Xz + T + P + E + A, 1, I + TY + T + P + E + A, 1, I + RG + T + P + E + A, 1, I + Ro + T + P + E + A, 1, I + RH + T + P + E + A, 1, I + TW + T + P + E + A, 1, I + TX + T + P + E + A, 1, I + QE + T + P + E + A, 1, I + Ns + T + P + E + A, 1, I + Nt + T + P + E + A, 1, I + Nu + T + P + E + A, 1, I + Nw + T + P + E + A, 1, I + NP + T + P + E + A, 1, I + NQ + T + P + E + A, 1, I + Ik + T + P + E + A, 1, I + IC + T + P + E + A, 1, I + Hi + T + P + E + A, 1, I + Gz + T + P + E + A, 1, I + ID + T + P + E + A, 1, I + Io + T + P + E + A, 1, I + MB + T + P + E + A, 1, I + Nx + T + P + E + A, 1, I + Nr + T + P + E + A, 1, I + Os + T + P + E + A, 1, I + SL + T + P + E + A, 1, I + Ja + T + P + E + A, 1, I + KA + T + P + E + A, 1, I + Oq + T + P + E + A, 1, I + QD + T + P + E + A, 1, I + JN + T + P + E + A, 1, I + KC + T + P + E + A, 1, I + NR + T + P + E + A, 1, I + Ki + T + P + E + A, 1, I + Mf + T + P + E + A, 1, I + KD + T + P + E + A, 1, I + JZ + T + P + E + A, 1, I + JM + T + P + E + A, 1, I + Me + T + P + E + A, 1, I + Rb + T + P + E + A, 1, I + Rc + T + P + E + A, 1, I + SO + T + P + E + A, 1, I + Td + T + P + E + A, 1, I + Te + T + P + E + A, 1, I + QF + T + P + E + A, 1, I + Ny + T + P + E + A, 1, I + Mh + T + P + E + A, 1, I + Mi + T + P + E + A, 1, I + NS + T + P + E + A, 1, I + Mg + T + P + E + A, 1, I + NT + T + P + E + A, 1, I + Ot + T + P + E + A, 1, I + Nv + T + P + E + A, 1, I + PM + T + P + E + A, 1, I + Re + T + P + E + A, 1, I + SM + T + P + E + A, 1, I + MA + T + P + E + A, 1, I + Nq + T + P + E + A, 1, I + PL + T + P + E + A, 41, I + SK + o + T + P + E + A, 1, I + TV + o + T + P + E + A, 1, I + Xz + o + T + P + E + A, 1, I + TY + o + T + P + E + A, 1, I + RG + o + T + P + E + A, 1, I + Ro + o + T + P + E + A, 1, I + RH + o + T + P + E + A, 1, I + TW + o + T + P + E + A, 1, I + TX + o + T + P + E + A, 1, I + QE + o + T + P + E + A, 1, I + Ns + o + T + P + E + A, 1, I + Nt + o + T + P + E + A, 1, I + Nu + o + T + P + E + A, 1, I + Nw + o + T + P + E + A, 1, I + NP + o + T + P + E + A, 1, I + NQ + o + T + P + E + A, 1, I + Ik + o + T + P + E + A, 1, I + IC + o + T + P + E + A, 1, I + Hi + o + T + P + E + A, 1, I + Gz + o + T + P + E + A, 1, I + ID + o + T + P + E + A, 1, I + Io + o + T + P + E + A, 1, I + MB + o + T + P + E + A, 1, I + Nx + o + T + P + E + A, 1, I + Nr + o + T + P + E + A, 1, I + Os + o + T + P + E + A, 1, I + SL + o + T + P + E + A, 1, I + Ja + o + T + P + E + A, 1, I + KA + o + T + P + E + A, 1, I + Oq + o + T + P + E + A, 1, I + QD + o + T + P + E + A, 1, I + JN + o + T + P + E + A, 1, I + KC + o + T + P + E + A, 1, I + NR + o + T + P + E + A, 1, I + Ki + o + T + P + E + A, 1, I + Mf + o + T + P + E + A, 1, I + KD + o + T + P + E + A, 1, I + JZ + o + T + P + E + A, 1, I + JM + o + T + P + E + A, 1, I + Me + o + T + P + E + A, 1, I + Rb + o + T + P + E + A, 1, I + Rc + o + T + P + E + A, 1, I + SO + o + T + P + E + A, 1, I + Td + o + T + P + E + A, 1, I + Te + o + T + P + E + A, 1, I + QF + o + T + P + E + A, 1, I + Ny + o + T + P + E + A, 1, I + Mh + o + T + P + E + A, 1, I + Mi + o + T + P + E + A, 1, I + NS + o + T + P + E + A, 1, I + Mg + o + T + P + E + A, 1, I + NT + o + T + P + E + A, 1, I + Ot + o + T + P + E + A, 1, I + Nv + o + T + P + E + A, 1, I + PM + o + T + P + E + A, 1, I + Re + o + T + P + E + A, 1, I + SM + o + T + P + E + A, 1, I + MA + o + T + P + E + A, 1, I + Nq + o + T + P + E + A, 1, I + PL + o + T + P + E + A, 41, I + SK + T + Q + E + A, 1, I + TV + T + Q + E + A, 1, I + Xz + T + Q + E + A, 1, I + TY + T + Q + E + A, 1, I + RG + T + Q + E + A, 1, I + Ro + T + Q + E + A, 1, I + RH + T + Q + E + A, 1, I + TW + T + Q + E + A, 1, I + TX + T + Q + E + A, 1, I + QE + T + Q + E + A, 1, I + Ns + T + Q + E + A, 1, I + Nt + T + Q + E + A, 1, I + Nu + T + Q + E + A, 1, I + Nw + T + Q + E + A, 1, I + NP + T + Q + E + A, 1, I + NQ + T + Q + E + A, 1, I + Ik + T + Q + E + A, 1, I + IC + T + Q + E + A, 1, I + Hi + T + Q + E + A, 1, I + Gz + T + Q + E + A, 1, I + ID + T + Q + E + A, 1, I + Io + T + Q + E + A, 1, I + MB + T + Q + E + A, 1, I + Nx + T + Q + E + A, 1, I + Nr + T + Q + E + A, 1, I + Os + T + Q + E + A, 1, I + SL + T + Q + E + A, 1, I + Ja + T + Q + E + A, 1, I + KA + T + Q + E + A, 1, I + Oq + T + Q + E + A, 1, I + QD + T + Q + E + A, 1, I + JN + T + Q + E + A, 1, I + KC + T + Q + E + A, 1, I + NR + T + Q + E + A, 1, I + Ki + T + Q + E + A, 1, I + Mf + T + Q + E + A, 1, I + KD + T + Q + E + A, 1, I + JZ + T + Q + E + A, 1, I + JM + T + Q + E + A, 1, I + Me + T + Q + E + A, 1, I + Rb + T + Q + E + A, 1, I + Rc + T + Q + E + A, 1, I + SO + T + Q + E + A, 1, I + Td + T + Q + E + A, 1, I + Te + T + Q + E + A, 1, I + QF + T + Q + E + A, 1, I + Ny + T + Q + E + A, 1, I + Mh + T + Q + E + A, 1, I + Mi + T + Q + E + A, 1, I + NS + T + Q + E + A, 1, I + Mg + T + Q + E + A, 1, I + NT + T + Q + E + A, 1, I + Ot + T + Q + E + A, 1, I + Nv + T + Q + E + A, 1, I + PM + T + Q + E + A, 1, I + Re + T + Q + E + A, 1, I + SM + T + Q + E + A, 1, I + MA + T + Q + E + A, 1, I + Nq + T + Q + E + A, 1, I + PL + T + Q + E + A, 41, I + SK + o + T + Q + E + A, 1, I + TV + o + T + Q + E + A, 1, I + Xz + o + T + Q + E + A, 1, I + TY + o + T + Q + E + A, 1, I + RG + o + T + Q + E + A, 1, I + Ro + o + T + Q + E + A, 1, I + RH + o + T + Q + E + A, 1, I + TW + o + T + Q + E + A, 1, I + TX + o + T + Q + E + A, 1, I + QE + o + T + Q + E + A, 1, I + Ns + o + T + Q + E + A, 1, I + Nt + o + T + Q + E + A, 1, I + Nu + o + T + Q + E + A, 1, I + Nw + o + T + Q + E + A, 1, I + NP + o + T + Q + E + A, 1, I + NQ + o + T + Q + E + A, 1, I + Ik + o + T + Q + E + A, 1, I + IC + o + T + Q + E + A, 1, I + Hi + o + T + Q + E + A, 1, I + Gz + o + T + Q + E + A, 1, I + ID + o + T + Q + E + A, 1, I + Io + o + T + Q + E + A, 1, I + MB + o + T + Q + E + A, 1, I + Nx + o + T + Q + E + A, 1, I + Nr + o + T + Q + E + A, 1, I + Os + o + T + Q + E + A, 1, I + SL + o + T + Q + E + A, 1, I + Ja + o + T + Q + E + A, 1, I + KA + o + T + Q + E + A, 1, I + Oq + o + T + Q + E + A, 1, I + QD + o + T + Q + E + A, 1, I + JN + o + T + Q + E + A, 1, I + KC + o + T + Q + E + A, 1, I + NR + o + T + Q + E + A, 1, I + Ki + o + T + Q + E + A, 1, I + Mf + o + T + Q + E + A, 1, I + KD + o + T + Q + E + A, 1, I + JZ + o + T + Q + E + A, 1, I + JM + o + T + Q + E + A, 1, I + Me + o + T + Q + E + A, 1, I + Rb + o + T + Q + E + A, 1, I + Rc + o + T + Q + E + A, 1, I + SO + o + T + Q + E + A, 1, I + Td + o + T + Q + E + A, 1, I + Te + o + T + Q + E + A, 1, I + QF + o + T + Q + E + A, 1, I + Ny + o + T + Q + E + A, 1, I + Mh + o + T + Q + E + A, 1, I + Mi + o + T + Q + E + A, 1, I + NS + o + T + Q + E + A, 1, I + Mg + o + T + Q + E + A, 1, I + NT + o + T + Q + E + A, 1, I + Ot + o + T + Q + E + A, 1, I + Nv + o + T + Q + E + A, 1, I + PM + o + T + Q + E + A, 1, I + Re + o + T + Q + E + A, 1, I + SM + o + T + Q + E + A, 1, I + MA + o + T + Q + E + A, 1, I + Nq + o + T + Q + E + A, 1, I + PL + o + T + Q + E + A, 41, I + SK + S + E + A, 1, I + TV + S + E + A, 1, I + Xz + S + E + A, 1, I + TY + S + E + A, 1, I + RG + S + E + A, 1, I + Ro + S + E + A, 1, I + RH + S + E + A, 1, I + TW + S + E + A, 1, I + TX + S + E + A, 1, I + QE + S + E + A, 1, I + Ns + S + E + A, 1, I + Nt + S + E + A, 1, I + Nu + S + E + A, 1, I + Nw + S + E + A, 1, I + NP + S + E + A, 1, I + NQ + S + E + A, 1, I + Ik + S + E + A, 1, I + IC + S + E + A, 1, I + Hi + S + E + A, 1, I + Gz + S + E + A, 1, I + ID + S + E + A, 1, I + Io + S + E + A, 1, I + MB + S + E + A, 1, I + Nx + S + E + A, 1, I + Nr + S + E + A, 1, I + Os + S + E + A, 1, I + SL + S + E + A, 1, I + Ja + S + E + A, 1, I + KA + S + E + A, 1, I + Oq + S + E + A, 1, I + QD + S + E + A, 1, I + JN + S + E + A, 1, I + KC + S + E + A, 1, I + NR + S + E + A, 1, I + Ki + S + E + A, 1, I + Mf + S + E + A, 1, I + KD + S + E + A, 1, I + JZ + S + E + A, 1, I + JM + S + E + A, 1, I + Me + S + E + A, 1, I + Rb + S + E + A, 1, I + Rc + S + E + A, 1, I + SO + S + E + A, 1, I + Td + S + E + A, 1, I + Te + S + E + A, 1, I + QF + S + E + A, 1, I + Ny + S + E + A, 1, I + Mh + S + E + A, 1, I + Mi + S + E + A, 1, I + NS + S + E + A, 1, I + Mg + S + E + A, 1, I + NT + S + E + A, 1, I + Ot + S + E + A, 1, I + Nv + S + E + A, 1, I + PM + S + E + A, 1, I + Re + S + E + A, 1, I + SM + S + E + A, 1, I + MA + S + E + A, 1, I + Nq + S + E + A, 1, I + PL + S + E + A, 1, BP + Hr + Qm + HN + Rd + Bd + Cl + S + E + A, 3, D + L2 + Ji + AP + k + N + S + J + A, 1, D + L2 + Rs + AP + k + N + S + J + A, 1, D + L2 + Jh + AP + k + N + S + J + A, 1, D + L2 + CR + AP + k + N + S + J + A, 34, I + SK + o + S + E + A, 1, I + TV + o + S + E + A, 1, I + Xz + o + S + E + A, 1, I + TY + o + S + E + A, 1, I + RG + o + S + E + A, 1, I + Ro + o + S + E + A, 1, I + RH + o + S + E + A, 1, I + TW + o + S + E + A, 1, I + TX + o + S + E + A, 1, I + QE + o + S + E + A, 1, I + Ns + o + S + E + A, 1, I + Nt + o + S + E + A, 1, I + Nu + o + S + E + A, 1, I + Nw + o + S + E + A, 1, I + NP + o + S + E + A, 1, I + NQ + o + S + E + A, 1, I + Ik + o + S + E + A, 1, I + IC + o + S + E + A, 1, I + Hi + o + S + E + A, 1, I + Gz + o + S + E + A, 1, I + ID + o + S + E + A, 1, I + Io + o + S + E + A, 1, I + MB + o + S + E + A, 1, I + Nx + o + S + E + A, 1, I + Nr + o + S + E + A, 1, I + Os + o + S + E + A, 1, I + SL + o + S + E + A, 1, I + Ja + o + S + E + A, 1, I + KA + o + S + E + A, 1, I + Oq + o + S + E + A, 1, I + QD + o + S + E + A, 1, I + JN + o + S + E + A, 1, I + KC + o + S + E + A, 1, I + NR + o + S + E + A, 1, I + Ki + o + S + E + A, 1, I + Mf + o + S + E + A, 1, I + KD + o + S + E + A, 1, I + JZ + o + S + E + A, 1, I + JM + o + S + E + A, 1, I + Me + o + S + E + A, 1, I + Rb + o + S + E + A, 1, I + Rc + o + S + E + A, 1, I + SO + o + S + E + A, 1, I + Td + o + S + E + A, 1, I + Te + o + S + E + A, 1, I + QF + o + S + E + A, 1, I + Ny + o + S + E + A, 1, I + Mh + o + S + E + A, 1, I + Mi + o + S + E + A, 1, I + NS + o + S + E + A, 1, I + Mg + o + S + E + A, 1, I + NT + o + S + E + A, 1, I + Ot + o + S + E + A, 1, I + Nv + o + S + E + A, 1, I + PM + o + S + E + A, 1, I + Re + o + S + E + A, 1, I + SM + o + S + E + A, 1, I + MA + o + S + E + A, 1, I + Nq + o + S + E + A, 1, I + PL + o + S + E + A, 1, BP + m + " +lat_ts=-90" + HN + Rd + Bd + Cl + S + E + A, 5, D + L2 + PN + AP + O + Ak + S + E + A].reduce((acc, it, i2) => {
    if (i2 % 2 === 0) {
      const cur = acc.prev + it;
      const code = "EPSG:" + cur;
      acc.defs.push([code]);
      acc.prev = cur;
    } else {
      acc.defs[acc.defs.length - 1].push(it);
    }
    return acc;
  }, { defs: [], prev: 0 }).defs;
  return proj4jsDefinitions;
}
var proj4FullyLoaded$3;
var hasRequiredProj4FullyLoaded$2;
function requireProj4FullyLoaded$2() {
  if (hasRequiredProj4FullyLoaded$2) return proj4FullyLoaded$3;
  hasRequiredProj4FullyLoaded$2 = 1;
  let proj42 = require$$0;
  const defs = requireProj4jsDefinitions();
  if (typeof proj42 === "object" && typeof proj42.defs !== "function" && typeof proj42.default === "function") {
    proj42 = proj42.default;
  }
  proj42.defs(defs);
  proj4FullyLoaded$3 = proj42;
  return proj4FullyLoaded$3;
}
var hasRequiredReprojectGeojson;
function requireReprojectGeojson() {
  if (hasRequiredReprojectGeojson) return reprojectGeojson.exports;
  hasRequiredReprojectGeojson = 1;
  (function(module) {
    const proj42 = requireProj4FullyLoaded$2();
    const reprojectGeoJSONPluggable = requirePluggable$1();
    function reprojectGeoJSON(data, { from: _from = "EPSG:4326", in_place = false, to: _to = "EPSG:4326" }) {
      if (typeof _from === "number" || _from.match(/^\d+$/)) _from = "EPSG:" + _from;
      if (typeof _to === "number" || _to.match(/^\d+$/)) _to = "EPSG:" + _to;
      return reprojectGeoJSONPluggable(data, {
        in_place,
        reproject: proj42(_from, _to).forward
      });
    }
    module.exports = reprojectGeoJSON;
    if (typeof window === "object") window.reprojectGeoJSON = reprojectGeoJSON;
    if (typeof self === "object") self.reprojectGeoJSON = reprojectGeoJSON;
  })(reprojectGeojson);
  return reprojectGeojson.exports;
}
var hasRequiredGeomask;
function requireGeomask() {
  if (hasRequiredGeomask) return geomask.exports;
  hasRequiredGeomask = 1;
  (function(module) {
    const lite2 = requireLite();
    const reprojectGeoJSON = requireReprojectGeojson();
    function calcMask({
      debug = false,
      fname,
      raster_bbox,
      raster_srs,
      raster_height,
      raster_width,
      pixel_height,
      pixel_width,
      mask,
      mask_srs
    }) {
      if (raster_srs !== mask_srs) {
        mask = reprojectGeoJSON(mask, { from: mask_srs, to: raster_srs });
      }
      return lite2[fname]({
        debug,
        raster_bbox,
        raster_height,
        raster_width,
        pixel_height,
        pixel_width,
        mask
      });
    }
    function inside(options) {
      return calcMask({ ...options, fname: "inside" });
    }
    function outside(options) {
      return calcMask({ ...options, fname: "outside" });
    }
    const geomask2 = { inside, outside };
    module.exports = geomask2;
  })(geomask);
  return geomask.exports;
}
var core;
var hasRequiredCore;
function requireCore() {
  if (hasRequiredCore) return core;
  hasRequiredCore = 1;
  function maskImageData({
    data,
    data_bbox,
    data_height,
    data_width,
    data_srs,
    debug = false,
    geomask: geomask2,
    mask,
    mask_srs,
    reproject,
    strategy = "outside",
    edition
  }) {
    if (!["inside", "outside"].includes(strategy)) {
      throw new Error(`[geocanvas] strategy can be either "inside" or "outside". you provided "${strategy}"`);
    }
    const { rows } = geomask2[strategy]({
      raster_bbox: data_bbox,
      raster_height: data_height,
      raster_width: data_width,
      raster_srs: data_srs,
      mask,
      mask_srs,
      reproject
    });
    rows.forEach((ranges, r) => {
      if (ranges) {
        const row_offset = r * 4 * data_width;
        ranges.forEach(([start, end]) => {
          for (let c = start; c <= end; c++) {
            data[row_offset + c * 4 + 3] = 0;
          }
        });
      }
    });
  }
  function maskCanvas({
    canvas,
    canvas_bbox,
    canvas_srs,
    geomask: geomask2,
    mask,
    mask_srs,
    reproject,
    strategy = "outside",
    edition,
    debug = false
  }) {
    if (debug) console.log("[geocanvas] starting to mask canvas");
    if (!["inside", "outside"].includes(strategy)) {
      throw new Error(`[geocanvas] strategy can be either "inside" or "outside". you provided "${strategy}"`);
    }
    const context = canvas.getContext("2d");
    const { height, width } = canvas;
    if (debug) console.log(`[geocanvas] canvas height is ${height} pixels`);
    if (debug) console.log(`[geocanvas] canvas width is ${width} pixels`);
    const imageData = context.getImageData(0, 0, width, height);
    maskImageData({
      data: imageData.data,
      data_bbox: canvas_bbox,
      data_height: height,
      data_srs: canvas_srs,
      data_width: width,
      debug,
      geomask: geomask2,
      mask,
      mask_srs,
      reproject,
      strategy
    });
    if (debug) console.log("[geocanvas] image data after masking:", imageData);
    context.putImageData(imageData, 0, 0);
    if (debug) console.log("[geocanvas] put image data back");
    return canvas;
  }
  core = { maskImageData, maskCanvas };
  return core;
}
var hasRequiredFull;
function requireFull() {
  if (hasRequiredFull) return full.exports;
  hasRequiredFull = 1;
  (function(module) {
    const geomask2 = requireGeomask();
    const core2 = requireCore();
    function maskImageData(options) {
      return core2.maskImageData({ ...options, edition: "full", geomask: geomask2 });
    }
    function maskCanvas(options) {
      return core2.maskCanvas({ ...options, edition: "full", geomask: geomask2 });
    }
    const geocanvas2 = { maskImageData, maskCanvas };
    module.exports = geocanvas2;
    if (typeof self === "object") self.geocanvas = geocanvas2;
    if (typeof window === "object") window.geocanvas = geocanvas2;
  })(full);
  return full.exports;
}
var fullExports = requireFull();
const geocanvas = /* @__PURE__ */ getDefaultExportFromCjs(fullExports);
var iterFun = { exports: {} };
var hasRequiredIterFun;
function requireIterFun() {
  if (hasRequiredIterFun) return iterFun.exports;
  hasRequiredIterFun = 1;
  (function(module) {
    function addSymbolIterator(obj2) {
      try {
        obj2[Symbol.iterator] = function() {
          return this;
        };
      } catch (error) {
      }
    }
    function addSymbolIteratorFallback(obj2) {
      obj2["@@iterator"] = function() {
        return this;
      };
    }
    function wrapNextFunction(next) {
      const iter = { next };
      addSymbolIterator(iter);
      addSymbolIteratorFallback(iter);
      return iter;
    }
    function isArray(data) {
      try {
        return data.constructor.name.endsWith("Array");
      } catch {
        return false;
      }
    }
    function hasNext(data) {
      try {
        return typeof data.next === "function";
      } catch {
        return false;
      }
    }
    function hasIterator(data) {
      try {
        return "@@iterator" in data;
      } catch {
        return false;
      }
    }
    function hasSymbolIterator(data) {
      try {
        return Symbol.iterator in data.constructor.prototype;
      } catch {
        return false;
      }
    }
    function isIterator(data) {
      try {
        return Symbol.iterator in data && typeof data.next === "function" && data.propertyIsEnumerable("next") === false;
      } catch {
        return false;
      }
    }
    function getIterator(data) {
      const iter = data["@@iterator"];
      if (hasNext(iter)) {
        return iter;
      } else if (typeof iter === "function") {
        return iter();
      }
    }
    function createIterator(data) {
      let i = 0;
      let len = data.length;
      const next = () => i++ < len ? { value: data[i], done: false } : { done: true };
      return wrapNextFunction(next);
    }
    function getOrCreateIterator(data) {
      if (isIterator(data)) {
        return data;
      } else if (hasSymbolIterator(data)) {
        return data[Symbol.iterator]();
      } else if (hasNext(data)) {
        return wrapNextFunction(data.next);
      } else if (hasIterator(data)) {
        return getIterator(data);
      } else if (typeof data === "string" || isArray(data)) {
        return createIterator(data);
      } else {
        throw "[iter-fun] unable to determine iterator";
      }
    }
    function zip2(iters) {
      iters = iters.map(getOrCreateIterator);
      return wrapNextFunction(function next() {
        const values = iters.map((iter) => iter.next());
        if (values.every(({ done }) => done)) {
          return { done: true };
        } else {
          return {
            done: false,
            value: values.map(({ value }) => value)
          };
        }
      });
    }
    {
      module.exports = {
        addSymbolIterator,
        addSymbolIteratorFallback,
        isIterator,
        isArray,
        hasNext,
        hasSymbolIterator,
        hasIterator,
        getIterator,
        createIterator,
        getOrCreateIterator,
        wrapNextFunction,
        zip: zip2
      };
    }
  })(iterFun);
  return iterFun.exports;
}
var preparedSelectFuncs;
var hasRequiredPreparedSelectFuncs;
function requirePreparedSelectFuncs() {
  if (hasRequiredPreparedSelectFuncs) return preparedSelectFuncs;
  hasRequiredPreparedSelectFuncs = 1;
  preparedSelectFuncs = {
    "1": function({ point: point2 }) {
      const parent = this.data;
      const index = point2[this.d0v0];
      return { parent, index, value: parent[index] };
    },
    "2": function({ point: point2 }) {
      const parent = this.data;
      const index = this.m0v0 * point2[this.d0v0] + this.m0v1 * point2[this.d0v1];
      return { parent, index, value: parent[index] };
    },
    "3": function({ point: point2 }) {
      const parent = this.data;
      const index = this.m0v0 * point2[this.d0v0] + this.m0v1 * point2[this.d0v1] + this.m0v2 * point2[this.d0v2];
      return { parent, index, value: parent[index] };
    },
    "4": function({ point: point2 }) {
      const parent = this.data;
      const index = this.m0v0 * point2[this.d0v0] + this.m0v1 * point2[this.d0v1] + this.m0v2 * point2[this.d0v2] + this.m0v3 * point2[this.d0v3];
      return { parent, index, value: parent[index] };
    },
    "5": function({ point: point2 }) {
      const parent = this.data;
      const index = this.m0v0 * point2[this.d0v0] + this.m0v1 * point2[this.d0v1] + this.m0v2 * point2[this.d0v2] + this.m0v3 * point2[this.d0v3] + this.m0v4 * point2[this.d0v4];
      return { parent, index, value: parent[index] };
    },
    "1,1": function({ point: point2 }) {
      const parent = this.data[point2[this.d0v0]];
      const index = point2[this.d1v0];
      return { parent, index, value: parent[index] };
    },
    "1,2": function({ point: point2 }) {
      const parent = this.data[point2[this.d0v0]];
      const index = this.m1v0 * point2[this.d1v0] + this.m1v1 * point2[this.d1v1];
      return { parent, index, value: parent[index] };
    },
    "1,3": function({ point: point2 }) {
      const parent = this.data[point2[this.d0v0]];
      const index = this.m1v0 * point2[this.d1v0] + this.m1v1 * point2[this.d1v1] + this.m1v2 * point2[this.d1v2];
      return { parent, index, value: parent[index] };
    },
    "1,4": function({ point: point2 }) {
      const parent = this.data[point2[this.d0v0]];
      const index = this.m1v0 * point2[this.d1v0] + this.m1v1 * point2[this.d1v1] + this.m1v2 * point2[this.d1v2] + this.m1v3 * point2[this.d1v3];
      return { parent, index, value: parent[index] };
    },
    "1,5": function({ point: point2 }) {
      const parent = this.data[point2[this.d0v0]];
      const index = this.m1v0 * point2[this.d1v0] + this.m1v1 * point2[this.d1v1] + this.m1v2 * point2[this.d1v2] + this.m1v3 * point2[this.d1v3] + this.m1v4 * point2[this.d1v4];
      return { parent, index, value: parent[index] };
    },
    "1,1,1": function({ point: point2 }) {
      const parent = this.data[point2[this.d0v0]][point2[this.d1v0]];
      const index = point2[this.d2v0];
      return { parent, index, value: parent[index] };
    },
    "1,1,2": function({ point: point2 }) {
      const parent = this.data[point2[this.d0v0]][point2[this.d1v0]];
      const index = this.m2v0 * point2[this.d2v0] + this.m2v1 * point2[this.d2v1];
      return { parent, index, value: parent[index] };
    },
    "1,1,3": function({ point: point2 }) {
      const parent = this.data[point2[this.d0v0]][point2[this.d1v0]];
      const index = this.m2v0 * point2[this.d2v0] + this.m2v1 * point2[this.d2v1] + this.m2v2 * point2[this.d2v2];
      return { parent, index, value: parent[index] };
    },
    "1,1,4": function({ point: point2 }) {
      const parent = this.data[point2[this.d0v0]][point2[this.d1v0]];
      const index = this.m2v0 * point2[this.d2v0] + this.m2v1 * point2[this.d2v1] + this.m2v2 * point2[this.d2v2] + this.m2v3 * point2[this.d2v3];
      return { parent, index, value: parent[index] };
    },
    "1,1,5": function({ point: point2 }) {
      const parent = this.data[point2[this.d0v0]][point2[this.d1v0]];
      const index = this.m2v0 * point2[this.d2v0] + this.m2v1 * point2[this.d2v1] + this.m2v2 * point2[this.d2v2] + this.m2v3 * point2[this.d2v3] + this.m2v4 * point2[this.d2v4];
      return { parent, index, value: parent[index] };
    },
    "1,1,1,1": function({ point: point2 }) {
      const parent = this.data[point2[this.d0v0]][point2[this.d1v0]][point2[this.d2v0]];
      const index = point2[this.d3v0];
      return { parent, index, value: parent[index] };
    },
    "1,1,1,2": function({ point: point2 }) {
      const parent = this.data[point2[this.d0v0]][point2[this.d1v0]][point2[this.d2v0]];
      const index = this.m3v0 * point2[this.d3v0] + this.m3v1 * point2[this.d3v1];
      return { parent, index, value: parent[index] };
    },
    "1,1,1,3": function({ point: point2 }) {
      const parent = this.data[point2[this.d0v0]][point2[this.d1v0]][point2[this.d2v0]];
      const index = this.m3v0 * point2[this.d3v0] + this.m3v1 * point2[this.d3v1] + this.m3v2 * point2[this.d3v2];
      return { parent, index, value: parent[index] };
    },
    "1,1,1,4": function({ point: point2 }) {
      const parent = this.data[point2[this.d0v0]][point2[this.d1v0]][point2[this.d2v0]];
      const index = this.m3v0 * point2[this.d3v0] + this.m3v1 * point2[this.d3v1] + this.m3v2 * point2[this.d3v2] + this.m3v3 * point2[this.d3v3];
      return { parent, index, value: parent[index] };
    },
    "1,1,1,5": function({ point: point2 }) {
      const parent = this.data[point2[this.d0v0]][point2[this.d1v0]][point2[this.d2v0]];
      const index = this.m3v0 * point2[this.d3v0] + this.m3v1 * point2[this.d3v1] + this.m3v2 * point2[this.d3v2] + this.m3v3 * point2[this.d3v3] + this.m3v4 * point2[this.d3v4];
      return { parent, index, value: parent[index] };
    },
    "1,1,1,1,1": function({ point: point2 }) {
      const parent = this.data[point2[this.d0v0]][point2[this.d1v0]][point2[this.d2v0]][point2[this.d3v0]];
      const index = point2[this.d4v0];
      return { parent, index, value: parent[index] };
    },
    "1,1,1,1,2": function({ point: point2 }) {
      const parent = this.data[point2[this.d0v0]][point2[this.d1v0]][point2[this.d2v0]][point2[this.d3v0]];
      const index = this.m4v0 * point2[this.d4v0] + this.m4v1 * point2[this.d4v1];
      return { parent, index, value: parent[index] };
    },
    "1,1,1,1,3": function({ point: point2 }) {
      const parent = this.data[point2[this.d0v0]][point2[this.d1v0]][point2[this.d2v0]][point2[this.d3v0]];
      const index = this.m4v0 * point2[this.d4v0] + this.m4v1 * point2[this.d4v1] + this.m4v2 * point2[this.d4v2];
      return { parent, index, value: parent[index] };
    },
    "1,1,1,1,4": function({ point: point2 }) {
      const parent = this.data[point2[this.d0v0]][point2[this.d1v0]][point2[this.d2v0]][point2[this.d3v0]];
      const index = this.m4v0 * point2[this.d4v0] + this.m4v1 * point2[this.d4v1] + this.m4v2 * point2[this.d4v2] + this.m4v3 * point2[this.d4v3];
      return { parent, index, value: parent[index] };
    },
    "1,1,1,1,5": function({ point: point2 }) {
      const parent = this.data[point2[this.d0v0]][point2[this.d1v0]][point2[this.d2v0]][point2[this.d3v0]];
      const index = this.m4v0 * point2[this.d4v0] + this.m4v1 * point2[this.d4v1] + this.m4v2 * point2[this.d4v2] + this.m4v3 * point2[this.d4v3] + this.m4v4 * point2[this.d4v4];
      return { parent, index, value: parent[index] };
    }
  };
  return preparedSelectFuncs;
}
var preparedUpdateFuncs;
var hasRequiredPreparedUpdateFuncs;
function requirePreparedUpdateFuncs() {
  if (hasRequiredPreparedUpdateFuncs) return preparedUpdateFuncs;
  hasRequiredPreparedUpdateFuncs = 1;
  preparedUpdateFuncs = {
    "1": function({ point: point2, value }) {
      this.data[point2[this.d0v0]] = value;
    },
    "2": function({ point: point2, value }) {
      this.data[this.m0v0 * point2[this.d0v0] + this.m0v1 * point2[this.d0v1]] = value;
    },
    "3": function({ point: point2, value }) {
      this.data[this.m0v0 * point2[this.d0v0] + this.m0v1 * point2[this.d0v1] + this.m0v2 * point2[this.d0v2]] = value;
    },
    "4": function({ point: point2, value }) {
      this.data[this.m0v0 * point2[this.d0v0] + this.m0v1 * point2[this.d0v1] + this.m0v2 * point2[this.d0v2] + this.m0v3 * point2[this.d0v3]] = value;
    },
    "5": function({ point: point2, value }) {
      this.data[this.m0v0 * point2[this.d0v0] + this.m0v1 * point2[this.d0v1] + this.m0v2 * point2[this.d0v2] + this.m0v3 * point2[this.d0v3] + this.m0v4 * point2[this.d0v4]] = value;
    },
    "1,1": function({ point: point2, value }) {
      this.data[point2[this.d0v0]][point2[this.d1v0]] = value;
    },
    "1,2": function({ point: point2, value }) {
      this.data[point2[this.d0v0]][this.m1v0 * point2[this.d1v0] + this.m1v1 * point2[this.d1v1]] = value;
    },
    "1,3": function({ point: point2, value }) {
      this.data[point2[this.d0v0]][this.m1v0 * point2[this.d1v0] + this.m1v1 * point2[this.d1v1] + this.m1v2 * point2[this.d1v2]] = value;
    },
    "1,4": function({ point: point2, value }) {
      this.data[point2[this.d0v0]][this.m1v0 * point2[this.d1v0] + this.m1v1 * point2[this.d1v1] + this.m1v2 * point2[this.d1v2] + this.m1v3 * point2[this.d1v3]] = value;
    },
    "1,5": function({ point: point2, value }) {
      this.data[point2[this.d0v0]][this.m1v0 * point2[this.d1v0] + this.m1v1 * point2[this.d1v1] + this.m1v2 * point2[this.d1v2] + this.m1v3 * point2[this.d1v3] + this.m1v4 * point2[this.d1v4]] = value;
    },
    "1,1,1": function({ point: point2, value }) {
      this.data[point2[this.d0v0]][point2[this.d1v0]][point2[this.d2v0]] = value;
    },
    "1,1,2": function({ point: point2, value }) {
      this.data[point2[this.d0v0]][point2[this.d1v0]][this.m2v0 * point2[this.d2v0] + this.m2v1 * point2[this.d2v1]] = value;
    },
    "1,1,3": function({ point: point2, value }) {
      this.data[point2[this.d0v0]][point2[this.d1v0]][this.m2v0 * point2[this.d2v0] + this.m2v1 * point2[this.d2v1] + this.m2v2 * point2[this.d2v2]] = value;
    },
    "1,1,4": function({ point: point2, value }) {
      this.data[point2[this.d0v0]][point2[this.d1v0]][this.m2v0 * point2[this.d2v0] + this.m2v1 * point2[this.d2v1] + this.m2v2 * point2[this.d2v2] + this.m2v3 * point2[this.d2v3]] = value;
    },
    "1,1,5": function({ point: point2, value }) {
      this.data[point2[this.d0v0]][point2[this.d1v0]][this.m2v0 * point2[this.d2v0] + this.m2v1 * point2[this.d2v1] + this.m2v2 * point2[this.d2v2] + this.m2v3 * point2[this.d2v3] + this.m2v4 * point2[this.d2v4]] = value;
    },
    "1,1,1,1": function({ point: point2, value }) {
      this.data[point2[this.d0v0]][point2[this.d1v0]][point2[this.d2v0]][point2[this.d3v0]] = value;
    },
    "1,1,1,2": function({ point: point2, value }) {
      this.data[point2[this.d0v0]][point2[this.d1v0]][point2[this.d2v0]][this.m3v0 * point2[this.d3v0] + this.m3v1 * point2[this.d3v1]] = value;
    },
    "1,1,1,3": function({ point: point2, value }) {
      this.data[point2[this.d0v0]][point2[this.d1v0]][point2[this.d2v0]][this.m3v0 * point2[this.d3v0] + this.m3v1 * point2[this.d3v1] + this.m3v2 * point2[this.d3v2]] = value;
    },
    "1,1,1,4": function({ point: point2, value }) {
      this.data[point2[this.d0v0]][point2[this.d1v0]][point2[this.d2v0]][this.m3v0 * point2[this.d3v0] + this.m3v1 * point2[this.d3v1] + this.m3v2 * point2[this.d3v2] + this.m3v3 * point2[this.d3v3]] = value;
    },
    "1,1,1,5": function({ point: point2, value }) {
      this.data[point2[this.d0v0]][point2[this.d1v0]][point2[this.d2v0]][this.m3v0 * point2[this.d3v0] + this.m3v1 * point2[this.d3v1] + this.m3v2 * point2[this.d3v2] + this.m3v3 * point2[this.d3v3] + this.m3v4 * point2[this.d3v4]] = value;
    },
    "1,1,1,1,1": function({ point: point2, value }) {
      this.data[point2[this.d0v0]][point2[this.d1v0]][point2[this.d2v0]][point2[this.d3v0]][point2[this.d4v0]] = value;
    },
    "1,1,1,1,2": function({ point: point2, value }) {
      this.data[point2[this.d0v0]][point2[this.d1v0]][point2[this.d2v0]][point2[this.d3v0]][this.m4v0 * point2[this.d4v0] + this.m4v1 * point2[this.d4v1]] = value;
    },
    "1,1,1,1,3": function({ point: point2, value }) {
      this.data[point2[this.d0v0]][point2[this.d1v0]][point2[this.d2v0]][point2[this.d3v0]][this.m4v0 * point2[this.d4v0] + this.m4v1 * point2[this.d4v1] + this.m4v2 * point2[this.d4v2]] = value;
    },
    "1,1,1,1,4": function({ point: point2, value }) {
      this.data[point2[this.d0v0]][point2[this.d1v0]][point2[this.d2v0]][point2[this.d3v0]][this.m4v0 * point2[this.d4v0] + this.m4v1 * point2[this.d4v1] + this.m4v2 * point2[this.d4v2] + this.m4v3 * point2[this.d4v3]] = value;
    },
    "1,1,1,1,5": function({ point: point2, value }) {
      this.data[point2[this.d0v0]][point2[this.d1v0]][point2[this.d2v0]][point2[this.d3v0]][this.m4v0 * point2[this.d4v0] + this.m4v1 * point2[this.d4v1] + this.m4v2 * point2[this.d4v2] + this.m4v3 * point2[this.d4v3] + this.m4v4 * point2[this.d4v4]] = value;
    }
  };
  return preparedUpdateFuncs;
}
var xdim;
var hasRequiredXdim;
function requireXdim() {
  if (hasRequiredXdim) return xdim;
  hasRequiredXdim = 1;
  const layoutCache = {};
  const { wrapNextFunction } = requireIterFun();
  const preparedSelectFunctions = requirePreparedSelectFuncs();
  const preparedUpdateFunctions = requirePreparedUpdateFuncs();
  const ARRAY_TYPES = {
    Array,
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Float32Array,
    Float64Array
  };
  try {
    ARRAY_TYPES.BigInt64Array = BigInt64Array;
    ARRAY_TYPES.BigUint64Array = BigUint64Array;
  } catch (error) {
  }
  function parseDimensions(str) {
    const dims = {};
    const re = /[A-Za-z]+/g;
    let arr;
    while ((arr = re.exec(str)) !== null) {
      const [match] = arr;
      dims[match] = {
        name: match
      };
    }
    return dims;
  }
  const parseVectors = (str) => str.match(/\[[^\]]+\]/g);
  const removeBraces = (str) => str.startsWith("[") && str.endsWith("]") ? str.substring(1, str.length - 1) : str;
  const removeParentheses = (str) => str.startsWith("(") && str.endsWith(")") ? str.substring(1, str.length - 1) : str;
  const matchSequences = (str) => str.match(/(\(.*?\)|[^\(,\s]+)(?=\s*,|\s*$)/g);
  const parseSequences = (str) => {
    str = removeBraces(str);
    str = removeParentheses(str);
    const seqs = matchSequences(str);
    if (seqs.length === 1) {
      return {
        type: "Vector",
        dim: seqs[0]
      };
    } else {
      return {
        type: "Matrix",
        parts: seqs.map(parseSequences)
      };
    }
  };
  function checkValidity(str) {
    const invalid = str.match(/[^ A-Za-z,\[\]]/g);
    if (invalid) {
      throw new Error("The following invalid characters were used: " + invalid.map((c) => `"${c}"`).join(", "));
    } else {
      return true;
    }
  }
  function parse(str, { useLayoutCache = true } = { useLayoutCache: true }) {
    if (useLayoutCache && str in layoutCache) return layoutCache[str];
    checkValidity(str);
    const vectors = parseVectors(str);
    const dims = vectors.map(parseSequences);
    const result2 = {
      type: "Layout",
      summary: dims.map((it) => it.type === "Matrix" ? it.parts.length : 1),
      dims
    };
    if (useLayoutCache) layoutCache[str] = result2;
    return result2;
  }
  function update({ useLayoutCache = true, data, layout, point: point2, sizes = {}, value }) {
    if (typeof layout === "string") layout = parse(layout, { useLayoutCache });
    const { dims } = layout;
    for (let idim = 0; idim < dims.length; idim++) {
      const last = idim === dims.length - 1;
      const arr = dims[idim];
      let offset;
      if (arr.type === "Vector") {
        offset = point2[arr.dim];
      } else {
        const { parts } = arr;
        offset = 0;
        let multiplier = 1;
        for (let i = parts.length - 1; i >= 0; i--) {
          const part = parts[i];
          const { dim } = part;
          offset += multiplier * point2[dim];
          if (i > 0) {
            if (!(dim in sizes)) throw new Error(`you cannot calculate the location without knowing the size of the "${dim}" dimension.`);
            multiplier *= sizes[dim];
          }
        }
      }
      if (last) {
        data[offset] = value;
      } else {
        data = data[offset];
      }
    }
  }
  function prepareUpdate({ useLayoutCache = true, data, layout, sizes = {} }) {
    if (typeof layout === "string") {
      layout = parse(layout, { useLayoutCache });
    }
    const { dims } = layout;
    const numDims = dims.length;
    const multipliers = getMultipliers({ useLayoutCache, layout, sizes });
    const end = numDims - 1;
    const key = layout.summary.toString();
    if (key in preparedUpdateFunctions) {
      const _this = { data };
      layout.dims.map((it, depth) => {
        if (it.type === "Vector") {
          _this[`d${depth}v0`] = it.dim;
        } else if (it.type === "Matrix") {
          it.parts.forEach((part, ipart) => {
            _this[`d${depth}v${ipart}`] = part.dim;
            _this[`m${depth}v${ipart}`] = multipliers[part.dim];
          });
        }
      });
      return preparedUpdateFunctions[key].bind(_this);
    }
    return ({ point: point2, value }) => {
      let currentData = data;
      for (let idim = 0; idim < numDims; idim++) {
        const last = idim === end;
        const arr = dims[idim];
        let offset;
        if (arr.type === "Vector") {
          offset = point2[arr.dim];
        } else {
          offset = arr.parts.reduce((acc, { dim }) => acc + multipliers[dim] * point2[dim], 0);
        }
        if (last) {
          currentData[offset] = value;
        } else {
          currentData = currentData[offset];
        }
      }
    };
  }
  function iterClip({ data, layout, order, rect = {}, sizes = {}, useLayoutCache = true }) {
    if (!data) throw new Error("[xdim] must specify data");
    if (!layout) throw new Error("[xdim] must specify layout");
    const points = iterPoints({ order, sizes, rect });
    return wrapNextFunction(function next() {
      const { value: point2, done } = points.next();
      if (done) {
        return { done: true };
      } else {
        const { value } = select({ data, layout, point: point2, sizes, useLayoutCache });
        return { done: false, value };
      }
    });
  }
  function validateRect({ rect = {} }) {
    if (rect) {
      for (let key in rect) {
        const value = rect[key];
        if (value.length !== 2) throw new Error(`[xdim] uh oh. invalid hyper-rectangle`);
        const [start, end] = value;
        if (start > end) throw new Error(`[xdim] uh oh. invalid range for "${key}".  Start of ${start} can't be greater than end of ${end}.`);
        if (start < 0) throw new Error(`[xdim] uh oh. invalid hyper-rectangle with start ${start}`);
      }
    }
  }
  function clip({ useLayoutCache = true, data, layout, rect, sizes = {}, flat = false, validate = true }) {
    if (validate) validateRect({ rect });
    if (typeof layout === "string") layout = parse(layout, { useLayoutCache });
    let datas = [data];
    layout.dims.forEach((arr) => {
      let new_datas = [];
      datas.forEach((data2) => {
        if (arr.type === "Vector") {
          const [start, end] = rect[arr.dim];
          new_datas = new_datas.concat(data2.slice(start, end + 1));
        } else {
          const { parts } = arr;
          let offsets = [0];
          let multiplier = 1;
          for (let i = parts.length - 1; i >= 0; i--) {
            const part = parts[i];
            const { dim } = part;
            const [start, end] = rect[dim];
            const new_offsets = [];
            for (let n = start; n <= end; n++) {
              offsets.forEach((offset) => {
                new_offsets.push(offset + multiplier * n);
              });
            }
            offsets = new_offsets;
            multiplier *= sizes[dim];
          }
          offsets.forEach((offset) => {
            new_datas.push(data2[offset]);
          });
        }
      });
      datas = new_datas;
    });
    if (flat) {
      return {
        data: datas
      };
    }
    const out_sizes = Object.fromEntries(Object.entries(rect).map(([dim, [start, end]]) => [dim, end - start + 1]));
    const { data: out_data } = prepareData({
      layout,
      sizes: out_sizes
    });
    const max_depth = layout.dims.length;
    const step = (arr, depth) => {
      if (depth === max_depth) {
        for (let i = 0; i < arr.length; i++) {
          arr[i] = datas.shift();
        }
      } else {
        arr.forEach((sub) => step(sub, depth + 1));
      }
    };
    step(out_data, 1);
    return { data: out_data };
  }
  function getMultipliers({ useLayoutCache = true, layout, sizes }) {
    if (typeof layout === "string") {
      layout = parse(layout, { useLayoutCache });
    }
    const { dims } = layout;
    const numDims = dims.length;
    let multipliers = {};
    for (let idim = 0; idim < numDims; idim++) {
      const arr = dims[idim];
      if (arr.type === "Vector") {
        multipliers[arr.dim] = 1;
      } else {
        const { parts } = arr;
        let multiplier = 1;
        for (let i = parts.length - 1; i >= 0; i--) {
          const { dim } = parts[i];
          multipliers[dim] = multiplier;
          multiplier *= sizes[parts[i].dim];
        }
      }
    }
    return multipliers;
  }
  function prepareSelect({ useLayoutCache = true, data, layout, sizes = {} }) {
    if (typeof layout === "string") {
      layout = parse(layout, { useLayoutCache });
    }
    const { dims } = layout;
    const numDims = dims.length;
    const multipliers = getMultipliers({ useLayoutCache, layout, sizes });
    const end = numDims - 1;
    const key = layout.summary.toString();
    if (key in preparedSelectFunctions) {
      const _this = { data };
      layout.dims.map((it, depth) => {
        if (it.type === "Vector") {
          _this[`d${depth}v0`] = it.dim;
        } else if (it.type === "Matrix") {
          it.parts.forEach((part, ipart) => {
            _this[`d${depth}v${ipart}`] = part.dim;
            _this[`m${depth}v${ipart}`] = multipliers[part.dim];
          });
        }
      });
      return preparedSelectFunctions[key].bind(_this);
    }
    return ({ point: point2 }) => {
      let currentData = data;
      for (let idim = 0; idim < numDims; idim++) {
        const last = idim === end;
        const arr = dims[idim];
        let offset;
        if (arr.type === "Vector") {
          offset = point2[arr.dim];
        } else {
          offset = arr.parts.reduce((acc, { dim }) => acc + multipliers[dim] * point2[dim], 0);
        }
        if (last) {
          return {
            index: offset,
            parent: currentData,
            value: currentData[offset]
          };
        } else {
          currentData = currentData[offset];
        }
      }
    };
  }
  function select({ useLayoutCache = true, data, layout, point: point2, sizes = {} }) {
    if (typeof layout === "string") {
      layout = parse(layout, { useLayoutCache });
    }
    let parent;
    let index;
    let value = data;
    const { dims } = layout;
    const len = dims.length;
    for (let idim = 0; idim < len; idim++) {
      const arr = dims[idim];
      if (arr.type === "Vector") {
        const i = point2[arr.dim];
        parent = value;
        index = i;
        value = value[i];
      } else {
        const { parts } = arr;
        let offset = 0;
        let multiplier = 1;
        for (let i = parts.length - 1; i >= 0; i--) {
          const part = parts[i];
          if (part.type === "Vector") {
            const { dim } = part;
            offset += multiplier * point2[dim];
            if (i > 0) {
              if (!(dim in sizes)) throw new Error(`you cannot calculate the location without knowing the size of the "${dim}" dimension.`);
              multiplier *= sizes[dim];
            }
          }
        }
        parent = value;
        index = offset;
        value = value[offset];
      }
    }
    return { index, value, parent };
  }
  function addDims({ arr, fill = void 0, lens, arrayTypes }) {
    if (lens.length === 0) return arr;
    const len = lens[0];
    if (lens.length === 1) {
      const lastArrayType = arrayTypes ? arrayTypes[arrayTypes.length - 1] : "Array";
      for (let i = 0; i < arr.length; i++) {
        arr[i] = new ARRAY_TYPES[lastArrayType](len).fill(fill);
      }
    } else {
      for (let i = 0; i < arr.length; i++) {
        const sub = new Array(len).fill(fill);
        arr[i] = sub;
        addDims({ arr: sub, fill, lens: lens.slice(1), arrayTypes });
      }
    }
    return arr;
  }
  function createMatrix({ fill = void 0, shape, arrayTypes }) {
    const len = shape[0];
    if (shape.length === 1) {
      if (Array.isArray(arrayTypes) && arrayTypes.length !== 1) throw new Error("[xdim] shape and arrayTypes have different lengths");
      const arrayType = Array.isArray(arrayTypes) ? arrayTypes[0] : "Array";
      return new ARRAY_TYPES[arrayType](len).fill(fill);
    }
    const arr = new Array(len).fill(fill);
    return addDims({ arr, fill, lens: shape.slice(1), arrayTypes });
  }
  function prepareData({ fill = void 0, layout, useLayoutCache = true, sizes, arrayTypes }) {
    if (typeof layout === "string") layout = parse(layout, { useLayoutCache });
    const shape = layout.dims.map((it) => {
      if (it.type === "Vector") {
        return sizes[it.dim];
      } else if (it.type === "Matrix") {
        return it.parts.reduce((total, part) => {
          if (!(part.dim in sizes)) throw new Error(`[xdim] could not find "${part.dim}" in sizes: { ${Object.keys(sizes).join(", ")} }`);
          return total * sizes[part.dim];
        }, 1);
      }
    });
    const data = createMatrix({ fill, shape, arrayTypes });
    return { data, shape, arrayTypes };
  }
  function iterRange({ start = 0, end = 100 }) {
    let i = start - 1;
    end = end + 1;
    return wrapNextFunction(function next() {
      i++;
      if (i === end) {
        return { done: true };
      } else {
        return { done: false, value: i };
      }
    });
  }
  function iterPoints({ order, sizes, rect = {} }) {
    const names = Array.isArray(order) ? order : Object.keys(sizes).sort((a, b) => sizes[a] - sizes[b]);
    const iters = new Array(names.length);
    const current = {};
    for (let i = 0; i < names.length - 1; i++) {
      const name = names[i];
      const [start2, end2] = rect[name] || [0, sizes[name] - 1];
      iters[i] = iterRange({ start: start2 + 1, end: end2 });
      current[name] = start2;
    }
    const lastName = names[names.length - 1];
    const [start, end] = rect[lastName] || [0, sizes[lastName] - 1];
    iters[iters.length - 1] = iterRange({ start, end });
    current[lastName] = start - 1;
    return wrapNextFunction(function next() {
      for (let i = iters.length - 1; i >= 0; i--) {
        const { value, done } = iters[i].next();
        if (done) {
          if (i === 0) {
            return { done: true };
          }
        } else {
          for (let ii = i + 1; ii < iters.length; ii++) {
            const nameii = names[ii];
            const [start2, end2] = rect[nameii] || [0, sizes[nameii] - 1];
            iters[ii] = iterRange({ start: start2 + 1, end: end2 });
            current[nameii] = start2;
          }
          current[names[i]] = value;
          return { value: current, done: false };
        }
      }
    });
  }
  function transform({ data, fill = void 0, from, to, sizes, useLayoutCache = true }) {
    if (typeof from === "string") from = parse(from, { useLayoutCache });
    if (typeof to === "string") to = parse(to, { useLayoutCache });
    const { data: out_data } = prepareData({ fill, layout: to, sizes });
    const update2 = prepareUpdate({
      useLayoutCache,
      data: out_data,
      layout: to,
      sizes
    });
    const points = iterPoints({ sizes });
    for (point of points) {
      const { value } = select({
        data,
        layout: from,
        point,
        sizes
      });
      update2({
        point,
        value
      });
    }
    return { data: out_data };
  }
  xdim = {
    addDims,
    checkValidity,
    createMatrix,
    iterClip,
    iterRange,
    iterPoints,
    matchSequences,
    parse,
    parseDimensions,
    parseSequences,
    parseVectors,
    prepareData,
    prepareSelect,
    prepareUpdate,
    removeBraces,
    removeParentheses,
    select,
    transform,
    update,
    clip,
    validateRect
  };
  return xdim;
}
requireXdim();
var quickScale = { exports: {} };
var hasRequiredQuickScale;
function requireQuickScale() {
  if (hasRequiredQuickScale) return quickScale.exports;
  hasRequiredQuickScale = 1;
  (function(module) {
    function _identity(n) {
      return n;
    }
    function _scale_number(old_min, old_range, new_min, new_range, n) {
      return new_min + new_range * (n - old_min) / old_range;
    }
    function _scale_and_flip_number(old_min, old_range, new_max, new_range, n) {
      return new_max - new_range * (n - old_min) / old_range;
    }
    function _scale_and_round_number(old_min, old_range, new_min, new_range, n) {
      return Math.round(new_min + new_range * (n - old_min) / old_range);
    }
    function _scale_and_flip_and_round_number(old_min, old_range, new_max, new_range, n) {
      return Math.round(new_max - new_range * (n - old_min) / old_range);
    }
    function createScaleFunction([old_min, old_max], [new_min, new_max], { flip, no_range_value, no_range_value_strategy = "highest", round = false } = {}) {
      const old_range = old_max - old_min;
      const new_range = new_max - new_min;
      if (old_range === 0) {
        if (typeof no_range_value === "number") {
          return _identity.bind(null, no_range_value);
        } else if (no_range_value_strategy === "highest") {
          return _identity.bind(null, new_max);
        } else if (no_range_value_strategy === "lowest") {
          return _identity.bind(null, new_min);
        } else if (no_range_value_strategy === "middle") {
          let n = (new_max - new_min) / 2;
          if (round) n = Math.round(n);
          return _identity.bind(null, n);
        }
      }
      if (flip) {
        if (round) {
          return _scale_and_flip_and_round_number.bind(null, old_min, old_range, new_max, new_range);
        } else {
          return _scale_and_flip_number.bind(null, old_min, old_range, new_max, new_range);
        }
      } else {
        if (round) {
          return _scale_and_round_number.bind(null, old_min, old_range, new_min, new_range);
        } else {
          return _scale_number.bind(null, old_min, old_range, new_min, new_range);
        }
      }
    }
    function _scale(pixel, ...rest) {
      return create(rest)(pixel);
    }
    const quickScale2 = {
      _identity,
      _scale,
      _scale_number,
      _scale_and_flip_number,
      _scale_and_round_number,
      _scale_and_flip_and_round_number,
      createScaleFunction
    };
    module.exports = quickScale2;
    if (typeof window === "object") window.quickScale = quickScale2;
    if (typeof self === "object") self.quickScale = quickScale2;
  })(quickScale);
  return quickScale.exports;
}
var quickScaleExports = requireQuickScale();
let Layout;
(function(Layout2) {
  Layout2["[band][row][column]"] = "[band][row][column]";
  Layout2["[band][row,column]"] = "[band][row,column]";
  Layout2["[band,row,column]"] = "[band,row,column]";
  Layout2["[row,column,band]"] = "[row,column,band]";
  Layout2["[row,column][band]"] = "[row,column][band]";
  Layout2["[row][column][band]"] = "[row][column][band]";
  Layout2["[row][column,band]"] = "[row][column,band]";
})(Layout || (Layout = {}));
function makeNoDataRGB(noDataValue) {
  return [noDataValue, noDataValue, noDataValue];
}
function convert_raw_one_band_pixel_to_rgb(noDataValue, noDataPixel, scale, pixel) {
  if (pixel.includes(noDataValue)) return noDataPixel;
  const scaled = scale(pixel[0]);
  return [scaled, scaled, scaled];
}
function convert_raw_one_band_pixel_to_rgb_str(noDataValue, noDataPixel, scale, pixel) {
  if (pixel.includes(noDataValue)) return noDataPixel;
  const scaled = scale(pixel[0]);
  return "rgb(" + scaled + ", " + scaled + ", " + scaled + ")";
}
function convert_raw_two_band_pixel_to_rgb$1(noDataValue, noDataPixel, scaleFunction1, scaleFunction2, pixel) {
  if (pixel.includes(noDataValue)) return noDataPixel;
  return [scaleFunction1(pixel[0]), scaleFunction2(pixel[1]), 0];
}
function convert_raw_two_band_pixel_to_rgb_str$1(noDataValue, noDataPixel, scaleFunction1, scaleFunction2, pixel) {
  if (pixel.includes(noDataValue)) return noDataPixel;
  return "rgb(" + scaleFunction1(pixel[0]) + ", " + scaleFunction2(pixel[1]) + ", 0)";
}
function convert_raw_three_band_pixel_to_rgb(noDataValue, noDataPixel, scaleFunction1, scaleFunction2, scaleFunction3, pixel) {
  if (pixel.includes(noDataValue)) return noDataPixel;
  return [scaleFunction1(pixel[0]), scaleFunction2(pixel[1]), scaleFunction3(pixel[2])];
}
function convert_raw_three_band_pixel_to_rgb_css(noDataValue, noDataPixel, scaleFunction1, scaleFunction2, scaleFunction3, pixel) {
  if (pixel.includes(noDataValue)) return noDataPixel;
  return "rgb(" + scaleFunction1(pixel[0]) + ", " + scaleFunction2(pixel[1]) + ", " + scaleFunction3(pixel[2]) + ")";
}
function convert_raw_two_band_pixel_to_rgb(noDataValue, noDataPixel, scaleFunction1, scaleFunction2, scaleFunction3, pixel) {
  pixel = pixel.slice(0, 3);
  if (pixel.includes(noDataValue)) return noDataPixel;
  return [scaleFunction1(pixel[0]), scaleFunction2(pixel[1]), scaleFunction3(pixel[2])];
}
function convert_raw_two_band_pixel_to_rgb_str(noDataValue, noDataPixel, scaleFunction1, scaleFunction2, scaleFunction3, pixel) {
  pixel = pixel.slice(0, 3);
  if (pixel.includes(noDataValue)) return noDataPixel;
  return "rgb(" + scaleFunction1(pixel[0]) + ", " + scaleFunction2(pixel[1]) + ", " + scaleFunction3(pixel[2]) + ")";
}
function rgbToStr([r, g, b]) {
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
function rawToRgb({
  format = "array",
  ranges,
  flip,
  new_no_data_pixel,
  new_no_data_value,
  no_range_value,
  no_range_value_strategy,
  old_no_data_value,
  round = true
}) {
  const nbands = ranges.length;
  if (new_no_data_pixel && new_no_data_value) {
    throw new Error("[pixel-utils/raw-to-rgb] can't specify both new_no_data_pixel and new_no_data_value");
  }
  if (new_no_data_pixel === void 0 || new_no_data_pixel === null) {
    if (new_no_data_value === void 0 || new_no_data_value === null) {
      new_no_data_pixel = makeNoDataRGB(null);
    } else {
      new_no_data_pixel = makeNoDataRGB(new_no_data_value);
    }
  }
  if (new_no_data_pixel === void 0) throw new Error("[raw-to-rgb] undefined new_no_data_pixel");
  const new_range = [0 === new_no_data_value ? 1 : 0, 255 === new_no_data_value ? 254 : 255];
  const options = {
    flip,
    no_range_value,
    no_range_value_strategy,
    round
  };
  const scalefns = ranges.slice(0, 3).map((rng) => quickScaleExports.createScaleFunction(rng, new_range, options));
  if (nbands === 1) {
    if (format === "string") {
      return convert_raw_one_band_pixel_to_rgb_str.bind(null, old_no_data_value, rgbToStr(new_no_data_pixel), ...scalefns);
    } else {
      return convert_raw_one_band_pixel_to_rgb.bind(null, old_no_data_value, new_no_data_pixel, ...scalefns);
    }
  } else if (nbands === 2) {
    if (format === "string") {
      return convert_raw_two_band_pixel_to_rgb_str$1.bind(null, old_no_data_value, rgbToStr(new_no_data_pixel), ...scalefns);
    } else {
      return convert_raw_two_band_pixel_to_rgb$1.bind(null, old_no_data_value, new_no_data_pixel, ...scalefns);
    }
  } else if (nbands === 3) {
    if (format === "string") {
      return convert_raw_three_band_pixel_to_rgb_css.bind(null, old_no_data_value, rgbToStr(new_no_data_pixel), ...scalefns);
    } else {
      return convert_raw_three_band_pixel_to_rgb.bind(null, old_no_data_value, new_no_data_pixel, ...scalefns);
    }
  } else if (nbands >= 4) {
    if (format === "string") {
      return convert_raw_two_band_pixel_to_rgb_str.bind(null, old_no_data_value, rgbToStr(new_no_data_pixel), ...scalefns);
    } else {
      return convert_raw_two_band_pixel_to_rgb.bind(null, old_no_data_value, new_no_data_pixel, ...scalefns);
    }
  } else {
    throw new Error("[pixel-utils/raw-to-rgb] invalid number of bands: " + nbands);
  }
}
var isUTM$1;
var hasRequiredIsUTM;
function requireIsUTM() {
  if (hasRequiredIsUTM) return isUTM$1;
  hasRequiredIsUTM = 1;
  isUTM$1 = function isUTM2(projection) {
    const projstr = projection.toString();
    return projstr.startsWith("326") || projstr.startsWith("327");
  };
  return isUTM$1;
}
var isUTMExports = requireIsUTM();
const isUTM = /* @__PURE__ */ getDefaultExportFromCjs(isUTMExports);
var getZone;
var hasRequiredGetZone;
function requireGetZone() {
  if (hasRequiredGetZone) return getZone;
  hasRequiredGetZone = 1;
  getZone = function getZone2(projection) {
    return Number.parseInt(projection.toString().substring(3));
  };
  return getZone;
}
var getHemisphere;
var hasRequiredGetHemisphere;
function requireGetHemisphere() {
  if (hasRequiredGetHemisphere) return getHemisphere;
  hasRequiredGetHemisphere = 1;
  getHemisphere = function getHemisphere2(projection) {
    const projstr = projection.toString();
    if (projstr.startsWith("326")) {
      return "N";
    } else if (projstr.startsWith("327")) {
      return "S";
    }
  };
  return getHemisphere;
}
var getProjString$1;
var hasRequiredGetProjString;
function requireGetProjString() {
  if (hasRequiredGetProjString) return getProjString$1;
  hasRequiredGetProjString = 1;
  const getZone2 = requireGetZone();
  const getHemisphere2 = requireGetHemisphere();
  getProjString$1 = function getProjString2(projection) {
    const zone = getZone2(projection);
    const hemisphere = getHemisphere2(projection);
    return `+proj=utm +zone=${zone}${hemisphere === "S" ? " +south " : " "}+ellps=WGS84 +datum=WGS84 +units=m +no_defs`;
  };
  return getProjString$1;
}
var getProjStringExports = requireGetProjString();
const getProjString = /* @__PURE__ */ getDefaultExportFromCjs(getProjStringExports);
var proj4FullyLoaded$2 = { exports: {} };
var hasRequiredProj4FullyLoaded$1;
function requireProj4FullyLoaded$1() {
  if (hasRequiredProj4FullyLoaded$1) return proj4FullyLoaded$2.exports;
  hasRequiredProj4FullyLoaded$1 = 1;
  (function(module) {
    let proj42 = require$$0;
    const defs = requireProj4jsDefinitions();
    if (typeof proj42 === "object" && typeof proj42.defs !== "function" && typeof proj42.default === "function") {
      proj42 = proj42.default;
    }
    proj42.defs(defs);
    {
      module.exports = proj42;
      module.exports.default = proj42;
    }
  })(proj4FullyLoaded$2);
  return proj4FullyLoaded$2.exports;
}
var proj4FullyLoadedExports = requireProj4FullyLoaded$1();
const proj4FullyLoaded$1 = /* @__PURE__ */ getDefaultExportFromCjs(proj4FullyLoadedExports);
var add$1 = { exports: {} };
var compare_positive = { exports: {} };
var hasRequiredCompare_positive;
function requireCompare_positive() {
  if (hasRequiredCompare_positive) return compare_positive.exports;
  hasRequiredCompare_positive = 1;
  function compare_positive$12(a, b) {
    const alen = a.length;
    const blen = b.length;
    const aidx = a.indexOf(".");
    const bidx = b.indexOf(".");
    const a_adjusted_dot_index = aidx === -1 ? alen : aidx;
    const b_adjusted_dot_index = bidx === -1 ? blen : bidx;
    const offset = a_adjusted_dot_index - b_adjusted_dot_index;
    let left = Math.max(a_adjusted_dot_index, b_adjusted_dot_index);
    let right = Math.max(alen - a_adjusted_dot_index, blen - b_adjusted_dot_index);
    let aoffset = offset < 0 ? -1 * offset : 0;
    let boffset = offset <= 0 ? 0 : offset;
    let imax = left + 1 + right - 1;
    let i = 0;
    while (i < imax) {
      const ai = i - aoffset;
      const achar = ai === a_adjusted_dot_index ? "." : a[ai] || "0";
      const bi = i - boffset;
      const bchar = bi === b_adjusted_dot_index ? "." : b[bi] || "0";
      if (achar !== bchar) {
        if (achar > bchar) return ">";
        else if (achar < bchar) return "<";
      }
      i++;
    }
    return "=";
  }
  compare_positive.exports = compare_positive$12;
  compare_positive.exports.default = compare_positive$12;
  return compare_positive.exports;
}
var expand = { exports: {} };
var hasRequiredExpand;
function requireExpand() {
  if (hasRequiredExpand) return expand.exports;
  hasRequiredExpand = 1;
  function expand$12(n) {
    if (n[0] === "+") n = n.substring(1);
    const sign = n[0] === "-" ? "-" : "";
    if (sign === "-") n = n.substring(1);
    const index_of_e = n.indexOf("e");
    if (index_of_e === -1) return sign + n;
    let index_of_dot = n.indexOf(".");
    if (index_of_dot === -1) index_of_dot = index_of_e;
    const shift = Number(n.substring(index_of_e + 1));
    const base = n.substring(0, index_of_e).replace(".", "");
    const normshift = index_of_dot + shift;
    const baselen = base.length;
    if (normshift >= baselen) {
      const zct = normshift - baselen;
      let result2 = base;
      for (let i = 0; i < zct; i++) result2 += "0";
      return sign + result2;
    } else if (normshift < 0) {
      let result2 = "0.";
      for (let i = 0; i > normshift; i--) result2 += "0";
      result2 += base;
      return sign + result2;
    } else {
      return sign + base.substring(0, normshift) + "." + base.substring(normshift);
    }
  }
  expand.exports = expand$12;
  expand.exports.default = expand$12;
  return expand.exports;
}
var clean;
var hasRequiredClean;
function requireClean() {
  if (hasRequiredClean) return clean;
  hasRequiredClean = 1;
  const expand2 = requireExpand();
  clean = function clean2(n) {
    if (n[0] === "+") n = n.substring(1);
    n = expand2(n);
    n = n.replace(/^0+(?=\d)/, "");
    if (n.includes(".")) n = n.replace(/\.?0+$/, "");
    if (n === "") n = "0";
    if (n === "-0") n = "0";
    return n;
  };
  return clean;
}
var long_addition = { exports: {} };
var constants;
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  const MAX_SAFE_INTEGER = 9007199254740991;
  const MAX_SAFE_INTEGER_LENGTH = MAX_SAFE_INTEGER.toString().length - 1;
  constants = {
    MAX_SAFE_INTEGER,
    MAX_SAFE_INTEGER_LENGTH
  };
  return constants;
}
var hasRequiredLong_addition;
function requireLong_addition() {
  if (hasRequiredLong_addition) return long_addition.exports;
  hasRequiredLong_addition = 1;
  const { MAX_SAFE_INTEGER_LENGTH } = requireConstants();
  function long_addition$12(a, b) {
    const alen = a.length;
    const blen = b.length;
    const aidx = a.indexOf(".");
    const bidx = b.indexOf(".");
    const a_adjusted_dot_index = aidx === -1 ? alen : aidx;
    const b_adjusted_dot_index = bidx === -1 ? blen : bidx;
    if (aidx === -1 && bidx === -1 && alen < MAX_SAFE_INTEGER_LENGTH && blen < MAX_SAFE_INTEGER_LENGTH) {
      return (Number(a) + Number(b)).toFixed();
    }
    const offset = a_adjusted_dot_index - b_adjusted_dot_index;
    let left = Math.max(a_adjusted_dot_index, b_adjusted_dot_index);
    let right = Math.max(alen - a_adjusted_dot_index - 1, blen - b_adjusted_dot_index - 1);
    let aoffset = offset < 0 ? -1 * offset : 0;
    let boffset = offset <= 0 ? 0 : offset;
    let imax = left + 1 + right - 1;
    let result2 = "";
    let carried = 0;
    let i = imax;
    if (right > 0) {
      while (i > imax - right) {
        const achar = a[i - aoffset] || "0";
        const bchar = b[i - boffset] || "0";
        let n = Number(achar) + Number(bchar) + carried;
        if (n >= 10) {
          n -= 10;
          carried = 1;
        } else {
          carried = 0;
        }
        if (result2 !== "" || n !== 0) {
          result2 = n + result2;
        }
        i--;
      }
      if (result2) result2 = "." + result2;
      i--;
    }
    if (left > 0) {
      while (i >= 0) {
        const achar = a[i - aoffset] || "0";
        const bchar = b[i - boffset] || "0";
        let n = Number(achar) + Number(bchar) + carried;
        if (n >= 10) {
          n -= 10;
          carried = 1;
        } else {
          carried = 0;
        }
        result2 = n + result2;
        i--;
      }
    }
    if (carried === 1) {
      result2 = carried + result2;
    }
    if (result2[0] === ".") result2 = "0" + result2;
    return result2;
  }
  long_addition.exports = long_addition$12;
  long_addition.exports.default = long_addition$12;
  return long_addition.exports;
}
var long_subtraction = { exports: {} };
var hasRequiredLong_subtraction;
function requireLong_subtraction() {
  if (hasRequiredLong_subtraction) return long_subtraction.exports;
  hasRequiredLong_subtraction = 1;
  const { MAX_SAFE_INTEGER_LENGTH } = requireConstants();
  function long_subtraction$12(a, b) {
    const alen = a.length;
    const blen = b.length;
    const aidx = a.indexOf(".");
    const bidx = b.indexOf(".");
    const a_adjusted_dot_index = aidx === -1 ? alen : aidx;
    const b_adjusted_dot_index = bidx === -1 ? blen : bidx;
    if (aidx === -1 && bidx === -1 && alen < MAX_SAFE_INTEGER_LENGTH && blen < MAX_SAFE_INTEGER_LENGTH) {
      return (Number(a) - Number(b)).toFixed();
    }
    const offset = a_adjusted_dot_index - b_adjusted_dot_index;
    let left = Math.max(a_adjusted_dot_index, b_adjusted_dot_index);
    let right = Math.max(alen - a_adjusted_dot_index - 1, blen - b_adjusted_dot_index - 1);
    let aoffset = offset < 0 ? -1 * offset : 0;
    let boffset = offset <= 0 ? 0 : offset;
    let imax = left + 1 + right - 1;
    let result2 = "";
    let borrowed = 0;
    let i = imax;
    if (right > 0) {
      while (i > imax - right) {
        let top = a[i - aoffset] || "0";
        let bottom = b[i - boffset] || "0";
        top -= borrowed;
        borrowed = 0;
        let n = top - bottom;
        if (n < 0) {
          while (n < 0) {
            borrowed++;
            n += 10;
          }
        } else if (borrowed) {
          borrowed--;
        }
        if (result2 !== "" || n !== 0) {
          result2 = n + result2;
        }
        i--;
      }
      if (result2 !== "") {
        result2 = "." + result2;
      }
      i--;
    }
    if (left > 0) {
      while (i > 0) {
        let top = a[i - aoffset] || "0";
        let bottom = b[i - boffset] || "0";
        top -= borrowed;
        borrowed = 0;
        let n2 = top - bottom;
        if (n2 < 0) {
          while (n2 < 0) {
            borrowed++;
            n2 += 10;
          }
        } else if (borrowed) {
          borrowed--;
        }
        result2 = n2 + result2;
        i--;
      }
      const achar = a[0 - aoffset] || "0";
      const bchar = b[0 - boffset] || "0";
      let n = Number(achar) - (borrowed > 0 ? 1 : 0) - Number(bchar);
      if (n !== 0) {
        result2 = n + result2;
      }
      result2 = result2.replace(/^0+/, "");
    }
    if (result2[0] === ".") result2 = "0" + result2;
    return result2;
  }
  long_subtraction.exports = long_subtraction$12;
  long_subtraction.exports.default = long_subtraction$12;
  return long_subtraction.exports;
}
var hasRequiredAdd;
function requireAdd() {
  if (hasRequiredAdd) return add$1.exports;
  hasRequiredAdd = 1;
  const compare_positive2 = requireCompare_positive();
  const clean2 = requireClean();
  const long_addition2 = requireLong_addition();
  const long_subtraction2 = requireLong_subtraction();
  function add2(a, b) {
    a = clean2(a);
    b = clean2(b);
    const apos = a[0] !== "-";
    const bpos = b[0] !== "-";
    if (apos && bpos) {
      return long_addition2(a, b);
    } else if (!apos && !bpos) {
      return "-" + long_addition2(a.substring(1), b.substring(1));
    } else if (!apos && bpos) {
      a = a.substring(1);
      switch (compare_positive2(a, b)) {
        case "=":
          return "0";
        case "<":
          return long_subtraction2(b, a);
        case ">":
          return "-" + long_subtraction2(a, b);
      }
    } else if (apos && !bpos) {
      b = b.substring(1);
      switch (compare_positive2(a, b)) {
        case "=":
          return "0";
        case "<":
          return "-" + long_subtraction2(b, a);
        case ">":
          return long_subtraction2(a, b);
      }
    }
  }
  add$1.exports = add2;
  add$1.exports.default = add2;
  return add$1.exports;
}
var addExports = requireAdd();
const add = /* @__PURE__ */ getDefaultExportFromCjs(addExports);
var divide$1 = { exports: {} };
var absolute = { exports: {} };
var hasRequiredAbsolute;
function requireAbsolute() {
  if (hasRequiredAbsolute) return absolute.exports;
  hasRequiredAbsolute = 1;
  const clean2 = requireClean();
  function absolute$12(n) {
    n = clean2(n);
    if (n[0] === "-") return n.substring(1);
    else return n;
  }
  absolute.exports = absolute$12;
  absolute.exports.default = absolute$12;
  return absolute.exports;
}
var long_division = { exports: {} };
var subtract$1 = { exports: {} };
var hasRequiredSubtract;
function requireSubtract() {
  if (hasRequiredSubtract) return subtract$1.exports;
  hasRequiredSubtract = 1;
  const clean2 = requireClean();
  const compare_positive2 = requireCompare_positive();
  const long_addition2 = requireLong_addition();
  const long_subtraction2 = requireLong_subtraction();
  function subtract2(a, b) {
    a = clean2(a);
    b = clean2(b);
    const a_is_positive = a[0] !== "-";
    const b_is_positive = b[0] !== "-";
    if (a_is_positive) {
      if (b_is_positive) {
        const comparison = compare_positive2(a, b);
        if (comparison === ">") {
          return long_subtraction2(a, b);
        } else if (comparison === "<") {
          return "-" + long_subtraction2(b, a);
        } else {
          return "0";
        }
      } else {
        return long_addition2(a, b.substring(1));
      }
    } else if (b_is_positive) {
      return "-" + long_addition2(a.substring(1), b);
    } else {
      a = a.substring(1);
      b = b.substring(1);
      const comparison = compare_positive2(a, b);
      if (comparison === ">") {
        return "-" + long_subtraction2(a, b);
      } else if (comparison === "<") {
        return long_subtraction2(b, a);
      } else {
        return "0";
      }
    }
  }
  subtract$1.exports = subtract2;
  subtract$1.exports.default = subtract2;
  return subtract$1.exports;
}
var round_last_decimal = { exports: {} };
var truncate_decimal = { exports: {} };
var hasRequiredTruncate_decimal;
function requireTruncate_decimal() {
  if (hasRequiredTruncate_decimal) return truncate_decimal.exports;
  hasRequiredTruncate_decimal = 1;
  function truncate_decimal$1(n) {
    return n.substring(0, n.indexOf("."));
  }
  truncate_decimal.exports = truncate_decimal$1;
  truncate_decimal.exports.default = truncate_decimal$1;
  return truncate_decimal.exports;
}
var hasRequiredRound_last_decimal;
function requireRound_last_decimal() {
  if (hasRequiredRound_last_decimal) return round_last_decimal.exports;
  hasRequiredRound_last_decimal = 1;
  const add2 = requireAdd();
  const truncate_decimal2 = requireTruncate_decimal();
  const up = ["5", "6", "7", "8", "9"];
  function round_last_decimal$12(n) {
    if (n.match(/\.9+$/)) {
      return add2(truncate_decimal2(n), "1");
    }
    if (n[0] === "+") n = n.substring(1);
    const len = n.length;
    let result2 = "";
    const last_char = n[n.length - 1];
    if (up.includes(last_char)) {
      let i;
      for (i = len - 2; i >= 0; i--) {
        const char = n[i];
        if (char === "." || char === "-") continue;
        const nchar = Number(char) + 1;
        if (nchar === 10) {
          result2 = "0" + result2;
        } else {
          result2 = nchar + result2;
          break;
        }
      }
      if (i > 0) result2 = n.substring(0, i) + result2;
    } else {
      result2 = n.substring(0, len - 1);
    }
    if (result2[result2.length - 1] === ".") result2 = result2.substring(0, result2.length - 1);
    if (result2.indexOf(".") > -1) result2 = result2.replace(/0+$/, "");
    return result2;
  }
  round_last_decimal.exports = round_last_decimal$12;
  round_last_decimal.exports.default = round_last_decimal$12;
  return round_last_decimal.exports;
}
var hasRequiredLong_division;
function requireLong_division() {
  if (hasRequiredLong_division) return long_division.exports;
  hasRequiredLong_division = 1;
  const compare_positive2 = requireCompare_positive();
  const add2 = requireAdd();
  const subtract2 = requireSubtract();
  const round_last_decimal2 = requireRound_last_decimal();
  function long_division$12(dividend, divisor, { max_decimal_digits = 100, ellipsis = false } = {}) {
    if (dividend[0] === "0") dividend = dividend.substring(1);
    if (divisor[0] === "0") divisor = divisor.substring(1);
    const dividend_index_of_dot = dividend.indexOf(".");
    const divisor_index_of_dot = divisor.indexOf(".");
    const adjusted_dividend_index_of_dot = dividend_index_of_dot === -1 ? dividend.length : dividend_index_of_dot;
    const divisor_num_decimal_places = divisor_index_of_dot === -1 ? 0 : divisor.length - 1 - divisor_index_of_dot;
    let repeating = false;
    dividend = dividend.replace(/\./, "");
    divisor = divisor.replace(/\./, "");
    const dividend_length = dividend.length;
    let current = "";
    let quotient = "";
    let comparison;
    let offset = -1 * divisor_num_decimal_places;
    let skip = 0;
    for (let i = 0; i < dividend_length; i++) {
      const char = dividend[i];
      current += char;
      comparison = compare_positive2(current, divisor);
      if (comparison === ">") {
        let times = 1;
        let product = add2(divisor, divisor);
        let passed_product = divisor;
        while (compare_positive2(product, current) !== ">") {
          times++;
          passed_product = product;
          product = add2(product, divisor);
        }
        times = times.toString();
        if (quotient !== "") {
          for (let i2 = times.length; i2 <= skip; i2++) quotient += "0";
        }
        quotient += times;
        current = subtract2(current, passed_product);
        skip = 0;
      } else if (comparison === "<") {
        if (quotient === "") {
          offset++;
        }
        skip++;
        continue;
      } else if (comparison === "=") {
        if (quotient !== "") {
          for (let i2 = 0; i2 < skip; i2++) quotient += "0";
        }
        quotient += "1";
        current = "0";
        skip = 0;
      }
    }
    if (current.match(/^0+$/g)) {
      if (comparison === "<") {
        quotient += current.substring(0, current.length - 1);
      }
    } else {
      const previous = {};
      const idot2 = adjusted_dividend_index_of_dot - offset;
      const qlen2 = quotient.length;
      const imax = idot2 - qlen2 + max_decimal_digits + 1;
      if (quotient === "") {
        skip = 0;
      }
      for (let i = 0; i < imax; i++) {
        current += "0";
        if (ellipsis) {
          if (current in previous) {
            previous[current]++;
            if (previous[current] > 3) {
              quotient += "...";
              repeating = true;
              break;
            }
          } else {
            previous[current] = 1;
          }
        }
        const comparison2 = compare_positive2(current, divisor);
        if (comparison2 === ">") {
          let times = 1;
          let product = add2(divisor, divisor);
          let passed_product = divisor;
          while (compare_positive2(product, current) !== ">") {
            times++;
            passed_product = product;
            product = add2(product, divisor);
          }
          times = times.toString();
          for (let i2 = times.length; i2 <= skip; i2++) quotient += "0";
          quotient += times;
          current = subtract2(current, passed_product);
          if (current === "0") {
            break;
          }
          skip = 0;
        } else if (comparison2 === "<") {
          skip++;
          continue;
        } else if (comparison2 === "=") {
          for (let i2 = 0; i2 < skip; i2++) quotient += "0";
          quotient += "1";
          skip = 0;
          break;
        }
      }
    }
    const idot = adjusted_dividend_index_of_dot - offset;
    const qlen = quotient.length;
    let num_decimals;
    if (idot === qlen) {
      num_decimals = 0;
    } else if (idot < 0) {
      quotient = "0." + "0".repeat(Math.abs(idot)) + quotient;
      num_decimals = qlen - idot;
    } else if (idot > qlen) {
      for (let i = qlen; i < idot; i++) quotient += "0";
      num_decimals = 0;
    } else if (idot < qlen) {
      quotient = quotient.substring(0, idot) + "." + quotient.substring(idot);
      num_decimals = qlen - idot;
    } else if (idot === 0) {
      quotient = "0." + quotient;
      num_decimals = qlen;
    }
    quotient = quotient.replace(/^0+/, "");
    quotient = quotient.replace(/\.\d+0+$/, "");
    if (!repeating) {
      const extra_decimals = num_decimals - max_decimal_digits;
      if (extra_decimals > 0) {
        quotient = round_last_decimal2(quotient.substring(0, quotient.length - extra_decimals + 1));
      }
    }
    if (quotient[0] === ".") quotient = "0" + quotient;
    return quotient;
  }
  long_division.exports = long_division$12;
  long_division.exports.default = long_division$12;
  return long_division.exports;
}
var hasRequiredDivide;
function requireDivide() {
  if (hasRequiredDivide) return divide$1.exports;
  hasRequiredDivide = 1;
  const absolute2 = requireAbsolute();
  const clean2 = requireClean();
  const long_division2 = requireLong_division();
  function divide2(dividend, divisor, options) {
    dividend = clean2(dividend);
    divisor = clean2(divisor);
    if (divisor === "0") throw new Error("[preciso] division by zero");
    if (dividend === "" || dividend === "0") return "0";
    const dividend_is_positive = dividend[0] !== "-";
    const divisor_is_positive = divisor[0] !== "-";
    const out_sign = dividend_is_positive !== divisor_is_positive ? "-" : "";
    if (!dividend_is_positive) dividend = absolute2(dividend);
    if (!divisor_is_positive) divisor = absolute2(divisor);
    return out_sign + long_division2(dividend, divisor, options);
  }
  divide$1.exports = divide2;
  divide$1.exports.default = divide2;
  return divide$1.exports;
}
var divideExports = requireDivide();
const divide = /* @__PURE__ */ getDefaultExportFromCjs(divideExports);
var multiply$1 = { exports: {} };
var long_multiplication = { exports: {} };
var hasRequiredLong_multiplication;
function requireLong_multiplication() {
  if (hasRequiredLong_multiplication) return long_multiplication.exports;
  hasRequiredLong_multiplication = 1;
  const { MAX_SAFE_INTEGER_LENGTH } = requireConstants();
  const CHUNK_SIZE = 15;
  function long_multiplication$12(a, b) {
    if (a === "0" || b === "0") return "0";
    const top_index_of_dot = a.indexOf(".");
    const bottom_index_of_dot = b.indexOf(".");
    const a_num_integer_places = top_index_of_dot === -1 ? a.length : top_index_of_dot;
    const b_num_integer_places = bottom_index_of_dot === -1 ? b.length : bottom_index_of_dot;
    const max_total_num_integer_places = a_num_integer_places + b_num_integer_places;
    const a_num_decimal_places = top_index_of_dot === -1 ? 0 : a.length - 1 - top_index_of_dot;
    const b_num_decimal_places = bottom_index_of_dot === -1 ? 0 : b.length - 1 - bottom_index_of_dot;
    const out_num_decimal_places = a_num_decimal_places + b_num_decimal_places;
    if (out_num_decimal_places === 0 && max_total_num_integer_places < MAX_SAFE_INTEGER_LENGTH) {
      return (Number(a) * Number(b)).toFixed(0);
    }
    const aint = a.replace(".", "");
    const bint = b.replace(".", "");
    const alen = aint.length;
    const blen = bint.length;
    const chunks = [];
    let i = alen;
    while (i >= 0) {
      const end = i;
      const start = i -= CHUNK_SIZE;
      const str = aint.substring(start, end);
      chunks.push([Number(str), str.length]);
    }
    const partial_products = [];
    const partials = [];
    for (let i2 = 0, ireverse = blen - 1; ireverse >= 0; ireverse--, i2++) {
      const bstr = bint[ireverse];
      const bnum = Number(bstr);
      let carried2 = 0;
      let partial = "";
      const ichunklast = chunks.length - 1;
      chunks.forEach(([chunk, chunklen], c) => {
        const subpartial = carried2 + bnum * chunk;
        let subpartstr = subpartial.toString();
        const subpartcharlen = subpartstr.length;
        if (subpartcharlen > chunklen && c !== ichunklast) {
          const islice = -1 * chunklen;
          partial = subpartstr.slice(islice) + partial;
          carried2 = Number(subpartstr.slice(0, islice));
        } else {
          const imax = chunklen - subpartcharlen;
          for (let i3 = 0; i3 < imax; i3++) {
            subpartstr = "0" + subpartstr;
          }
          carried2 = 0;
          partial = subpartstr + partial;
        }
      });
      partial += "0".repeat(i2);
      partial_products.push(partial);
      partials.push([Array.from(partial).map((char) => Number(char)), partial.length]);
    }
    const num_partials = partial_products.length;
    const number_of_columns = partials[partials.length - 1][1] + num_partials;
    let result2 = "";
    let carried = 0;
    for (let icol = 0; icol < number_of_columns; icol++) {
      let sum = carried;
      const pmax = Math.min(icol, num_partials - 1);
      for (let p = 0; p <= pmax; p++) {
        const [pnums, plen] = partials[p];
        const i2 = plen - 1 - icol;
        if (i2 >= 0) {
          sum += pnums[i2];
        }
      }
      if (sum >= 10) {
        sum = sum.toString();
        result2 = sum[sum.length - 1] + result2;
        carried = Number(sum.slice(0, -1));
      } else {
        result2 = sum + result2;
        carried = 0;
      }
    }
    if (out_num_decimal_places === 0) {
      result2 = result2.replace(/^0+/, "");
    } else {
      const idot = result2.length - out_num_decimal_places;
      result2 = result2.substring(0, idot) + "." + result2.substring(idot);
      result2 = result2.replace(/^0+/, "");
      result2 = result2.replace(/\.?0+$/, "");
      if (result2[0] === ".") result2 = "0" + result2;
    }
    return result2;
  }
  long_multiplication.exports = long_multiplication$12;
  long_multiplication.exports.default = long_multiplication$12;
  return long_multiplication.exports;
}
var hasRequiredMultiply;
function requireMultiply() {
  if (hasRequiredMultiply) return multiply$1.exports;
  hasRequiredMultiply = 1;
  const absolute2 = requireAbsolute();
  const clean2 = requireClean();
  const compare_positive2 = requireCompare_positive();
  const long_multiplication2 = requireLong_multiplication();
  function multiply2(a, b) {
    a = clean2(a);
    b = clean2(b);
    const apos = a[0] !== "-";
    const bpos = b[0] !== "-";
    const out_sign = apos !== bpos ? "-" : "";
    a = absolute2(a);
    b = absolute2(b);
    const comparison = compare_positive2(a, b);
    if (comparison === "<") {
      const aold = a;
      const bold = b;
      a = bold;
      b = aold;
    }
    return out_sign + long_multiplication2(a, b);
  }
  multiply$1.exports = multiply2;
  multiply$1.exports.default = multiply2;
  return multiply$1.exports;
}
var multiplyExports = requireMultiply();
const multiply = /* @__PURE__ */ getDefaultExportFromCjs(multiplyExports);
var subtractExports = requireSubtract();
const subtract = /* @__PURE__ */ getDefaultExportFromCjs(subtractExports);
var getEpsgCodeAll_node_min$1 = { exports: {} };
var getEpsgCodeAll_node_min = getEpsgCodeAll_node_min$1.exports;
var hasRequiredGetEpsgCodeAll_node_min;
function requireGetEpsgCodeAll_node_min() {
  if (hasRequiredGetEpsgCodeAll_node_min) return getEpsgCodeAll_node_min$1.exports;
  hasRequiredGetEpsgCodeAll_node_min = 1;
  (function(module, exports) {
    !(function(t, e) {
      module.exports = e();
    })("undefined" != typeof self ? self : getEpsgCodeAll_node_min, (function() {
      return (function(t) {
        var e = {};
        function o(r) {
          if (e[r]) return e[r].exports;
          var n = e[r] = { i: r, l: false, exports: {} };
          return t[r].call(n.exports, n, n.exports, o), n.l = true, n.exports;
        }
        return o.m = t, o.c = e, o.d = function(t2, e2, r) {
          o.o(t2, e2) || Object.defineProperty(t2, e2, { enumerable: true, get: r });
        }, o.r = function(t2) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
        }, o.t = function(t2, e2) {
          if (1 & e2 && (t2 = o(t2)), 8 & e2) return t2;
          if (4 & e2 && "object" == typeof t2 && t2 && t2.__esModule) return t2;
          var r = /* @__PURE__ */ Object.create(null);
          if (o.r(r), Object.defineProperty(r, "default", { enumerable: true, value: t2 }), 2 & e2 && "string" != typeof t2) for (var n in t2) o.d(r, n, (function(e3) {
            return t2[e3];
          }).bind(null, n));
          return r;
        }, o.n = function(t2) {
          var e2 = t2 && t2.__esModule ? function() {
            return t2.default;
          } : function() {
            return t2;
          };
          return o.d(e2, "a", e2), e2;
        }, o.o = function(t2, e2) {
          return Object.prototype.hasOwnProperty.call(t2, e2);
        }, o.p = "", o(o.s = 1);
      })([function(t, e, o) {
        const r = o(5);
        t.exports = function(t2, e2, o2) {
          const n = o2 && o2.debug || false, a = o2 && o2.startIndex || 0;
          n && console.log("starting findTag with", e2, " and ", o2);
          const i = r(t2, `<${e2}[ >]`, a);
          if (n && console.log("start:", i), -1 === i) return;
          const s = i + e2.length + r(t2.slice(i + e2.length), "[ /]" + e2 + ">", 0) + 1 + e2.length + 1;
          if (n && console.log("end:", s), -1 === s) return;
          const C = t2.slice(i, s);
          return { inner: C.slice(C.indexOf(">") + 1, C.lastIndexOf("<")), outer: C, start: i, end: s };
        };
      }, function(t, e, o) {
        var r = o(2), n = o(0), a = o(6), i = o(12).default, s = o(7), C = o(8), E = (C.ARRAY_TYPE, C.EXCLUDED_FORMATS), d = C.BYTES_PER_VALUE, f = C.DATA_VIEW_READER_NAME, D = C.FORMATS, c = C.HASHED_FIELDS, g = C.NUM_FIELDS, l = (C.NUM_HASHED_FIELDS, C.UNSUPPORTED_MSG), p = D.ESRI_WKT, A = D.GEOSERVER, u = D.MAPFILE, Q = D.MAPNIK, h = D.OGC_GML, R = D.OGC_XML, G = D.OGC_WKT, I = D.POSTGIS, x = D.PROJ_4, w = D.PROJ_4_JS, M = o(9), m = new DataView(M), B = o(11).hash, F = ["PROJECTEDCRS", "PROJCRS", "GEOGCS", "GEOCCS", "PROJCS", "LOCAL_CS", "GEODCRS", "GEODETICCRS", "GEODETICDATUM", "ENGCRS", "ENGINEERINGCRS"];
        function O(t2) {
          return (function(t3) {
            return !(!(t3 = t3.trim()).startsWith("PROJCS[") && !t3.startsWith("GEOGCS[")) && F.some((function(e2) {
              return t3.includes(e2);
            }));
          })(t2) ? t2.includes("AUTHORITY") ? G : p : t2.includes("gml:ProjectedCRS") || t2.includes("gml:GeodeticCRS") || t2.includes("gml:GeographicCRS") ? t2.includes("gml:srsID") ? R : h : t2.startsWith("+proj=") ? x : t2.startsWith('proj4.defs("EPSG:') ? w : /^\d{1,6}\=(PROJCS|GEOGCS)/.test(t2) ? A : t2.startsWith("PROJECTION") && t2.endsWith("END") ? u : t2.endsWith("</Map>") ? Q : t2.startsWith("INSERT") ? I : "SOMETHING ELSE";
        }
        function k(t2, e2, o2) {
          o2 && console.log("looking up " + e2);
          var r2 = B(t2);
          o2 && console.log("hashed:", r2);
          var n2 = c.indexOf(e2) + 1;
          o2 && console.log("offset:", n2);
          for (var a2 = n2 * d; a2 < M.byteLength; a2 += g * d) {
            if (r2 === m[f](a2, true)) return m[f](a2 - n2 * d, true);
          }
        }
        function T(t2, e2) {
          var o2 = !(!e2 || !e2.debug) && e2.debug, C2 = O(t2);
          if (o2 && console.log("dataType:", C2), o2 && console.log("EXCLUDED_FORMATS:", E), E.includes(C2.toLowerCase())) throw new Error(l.replace("{}", C2));
          if (C2 === G) {
            var d2 = i(t2);
            if (o2 && console.log("parsed:", d2), d2.AUTHORITY) {
              var f2 = d2.AUTHORITY;
              return Number(f2.epsg || f2.EPSG);
            }
          } else {
            if (C2 == p) {
              var D2 = i(t2);
              if (o2 && console.log("parsed:", D2), D2.name.match(/^WGS_1984_UTM_Zone_\d{1,2}(N|S)$/)) {
                var c2 = D2.name.split("_").pop(), g2 = c2.substring(0, c2.length - 1), M2 = "N" == c2.substr(-1) ? 6 : 7;
                return Number.parseInt("32" + M2 + g2);
              }
              return k(t2 = s(t2), p, false);
            }
            if (C2 === h) {
              var m2 = n(t2, "gml:identifier", { debug: o2 }).inner;
              return Number(m2.replace("urn:ogc:def:crs:EPSG::", ""));
            }
            if (C2 === R) return Number(r(t2, ["gml:srsID", "gml:name"], { debug: o2 }).inner);
            if (C2 === x) {
              if (t2.startsWith("+proj=utm")) {
                var B2 = t2.split(" ").find((function(t3) {
                  return t3.startsWith("+zone=");
                })).split("=")[1], F2 = t2.includes("+south") ? "7" : "6";
                return Number.parseInt("32" + F2 + B2);
              }
              return k(t2, x);
            }
            if (C2 === w) return Number(t2.substring(17, t2.indexOf('"', 17)));
            if (C2 === A) return Number(t2.match(/^\d{1,6}/)[0]);
            if (C2 === u) {
              if (t2.includes("init=epsg:")) return Number.parseInt(/("init\=epsg:)(\d{1,10})(")/.exec(t2)[2]);
              if (t2.includes('"proj=utm"')) {
                var Z = /("zone\=)(\d{1,2})(")/.exec(t2)[2], H = t2.includes('"south"') ? "7" : "6";
                return Number.parseInt("32" + H + Z);
              }
              return k(t2, u);
            }
            if (C2 === Q) {
              var U = n(t2, "Map");
              return T(a(U.outer, "srs"));
            }
            if (C2 === I) return Number(t2.substring(t2.indexOf("values (") + 8, t2.indexOf("EPSG") - 3).trim());
          }
        }
        void 0 !== t.exports && (t.exports = T), "undefined" != typeof window ? window.getEPSGCode = T : "undefined" != typeof self && (self.getEPSGCode = T);
      }, function(t, e, o) {
        const r = o(3);
        t.exports = function(t2, e2, o2) {
          const n = o2 && o2.debug || false, a = r(t2, e2, { debug: n, returnOnFirst: true });
          return Array.isArray(a) && 1 === a.length ? a[0] : void 0;
        };
      }, function(t, e, o) {
        const r = o(4);
        t.exports = function(t2, e2, o2) {
          const n = o2 && o2.debug || false, a = o2 && o2.returnOnFirst || false;
          let i = r(t2, e2.shift(), { debug: n });
          n && console.log("first tags are:", i);
          for (let t3 = 0; t3 < e2.length; t3++) {
            const o3 = e2[t3];
            let s = [];
            for (let C = 0; C < i.length; C++) {
              const E = i[C], d = r(E.outer, o3, { debug: n, startIndex: 1 });
              if (d.length > 0) {
                if (d.forEach((t4) => {
                  t4.start += E.start, t4.end += E.start;
                }), a && t3 === e2.length - 1) return [d[0]];
                s = s.concat(d);
              }
            }
            i = s;
          }
          return i;
        };
      }, function(t, e, o) {
        const r = o(0);
        t.exports = function(t2, e2, o2) {
          const n = [], a = o2 && o2.debug || false;
          let i, s = o2 && o2.startIndex || 0;
          for (; i = r(t2, e2, { debug: a, startIndex: s }); ) s = i.end, n.push(i);
          return n;
        };
      }, function(t, e) {
        t.exports = function(t2, e2, o) {
          const r = new RegExp(e2).exec(t2.slice(o));
          return r ? o + r.index : -1;
        };
      }, function(t, e) {
        t.exports = function(t2, e2, o) {
          const r = o && o.debug || false;
          r && console.log("getting " + e2 + " in " + t2);
          const n = "object" == typeof t2 ? t2.outer : t2, a = `${e2}\\="(.*)"`;
          r && console.log("pattern:", a);
          const i = new RegExp(a).exec(n);
          if (i) return i[1];
        };
      }, function(t, e) {
        t.exports = function(t2) {
          return t2 = (t2 = t2.replace('DATUM["D_', 'DATUM["')).replace(/\.\d{16,}/g, (function(t3) {
            return t3.substr(0, 16);
          }));
        };
      }, function(t, e) {
        var o = ["esriwkt", "mapfile", "proj4"], r = o;
        var n = [];
        r.includes("esriwkt") || n.push("esriwkt"), r.includes("mapfile") || n.push("mapfile"), r.includes("proj4") || (n.push("mapnik"), n.push("proj4")), n.sort();
        var a = r.length, i = a + 1, s = Int16Array;
        t.exports = { ARRAY_TYPE: s, DATA_VIEW_READER_NAME: "getInt16", BYTES_PER_VALUE: 2, DEFAULT_HASHED_FIELDS: o, EXCLUDED_FORMATS: n, FORMATS: { ESRI_WKT: "esriwkt", GEOSERVER: "geoserver", MAPFILE: "mapfile", MAPNIK: "mapnik", OGC_GML: "gml", OGC_XML: "xml", OGC_WKT: "wkt", POSTGIS: "postgis", PROJ_4: "proj4", PROJ_4_JS: "js" }, HASHED_FIELDS: r, NUM_HASHED_FIELDS: a, NUM_FIELDS: i, UNSUPPORTED_MSG: "[get-epsg-code] {} format not supported" };
      }, function(t, e, o) {
        t.exports = o(10)("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");
      }, function(t, e, o) {
        t.exports = function(t2) {
          for (var e2 = "undefined" != typeof window && "function" == typeof window.atob ? window.atob(t2) : Buffer.from(t2, "base64").toString("binary"), o2 = new Uint8Array(e2.length), r = 0; r < e2.length; ++r) o2[r] = e2.charCodeAt(r);
          return o2.buffer;
        };
      }, function(t, e) {
        t.exports = { hash: function(t2) {
          var e2, o = 0;
          if (0 === (t2 = (t2 = t2.trim()).replace(/  /g, " ")).length) return o;
          for (t2.length, e2 = 0; e2 < t2.length; e2++) o = (o << 5) - o + t2.charCodeAt(e2), o |= 0;
          return o = Math.round(o / Math.pow(2, 16));
        } };
      }, function(t, e, o) {
        o.r(e);
        var r = function(t2) {
          return new E(t2).output();
        }, n = /\s/, a = /[A-Za-z]/, i = /[A-Za-z84]/, s = /[,\]]/, C = /[\d\.E\-\+]/;
        function E(t2) {
          if ("string" != typeof t2) throw new Error("not a string");
          this.text = t2.trim(), this.level = 0, this.place = 0, this.root = null, this.stack = [], this.currentObject = null, this.state = 1;
        }
        function d(t2, e2, o2) {
          Array.isArray(e2) && (o2.unshift(e2), e2 = null);
          var r2 = e2 ? {} : t2, n2 = o2.reduce((function(t3, e3) {
            return f(e3, t3), t3;
          }), r2);
          e2 && (t2[e2] = n2);
        }
        function f(t2, e2) {
          if (Array.isArray(t2)) {
            var o2, r2 = t2.shift();
            if ("PARAMETER" === r2 && (r2 = t2.shift()), 1 === t2.length) return Array.isArray(t2[0]) ? (e2[r2] = {}, void f(t2[0], e2[r2])) : void (e2[r2] = t2[0]);
            if (t2.length) if ("TOWGS84" !== r2) switch (Array.isArray(r2) || (e2[r2] = {}), r2) {
              case "UNIT":
              case "PRIMEM":
              case "VERT_DATUM":
                return e2[r2] = { name: t2[0].toLowerCase(), convert: t2[1] }, void (3 === t2.length && f(t2[2], e2[r2]));
              case "SPHEROID":
              case "ELLIPSOID":
                return e2[r2] = { name: t2[0], a: t2[1], rf: t2[2] }, void (4 === t2.length && f(t2[3], e2[r2]));
              case "PROJECTEDCRS":
              case "PROJCRS":
              case "GEOGCS":
              case "GEOCCS":
              case "PROJCS":
              case "LOCAL_CS":
              case "GEODCRS":
              case "GEODETICCRS":
              case "GEODETICDATUM":
              case "EDATUM":
              case "ENGINEERINGDATUM":
              case "VERT_CS":
              case "VERTCRS":
              case "VERTICALCRS":
              case "COMPD_CS":
              case "COMPOUNDCRS":
              case "ENGINEERINGCRS":
              case "ENGCRS":
              case "FITTED_CS":
              case "LOCAL_DATUM":
              case "DATUM":
                return t2[0] = ["name", t2[0]], void d(e2, r2, t2);
              default:
                for (o2 = -1; ++o2 < t2.length; ) if (!Array.isArray(t2[o2])) return f(t2, e2[r2]);
                return d(e2, r2, t2);
            }
            else e2[r2] = t2;
            else e2[r2] = true;
          } else e2[t2] = true;
        }
        E.prototype.readCharicter = function() {
          var t2 = this.text[this.place++];
          if (4 !== this.state) for (; n.test(t2); ) {
            if (this.place >= this.text.length) return;
            t2 = this.text[this.place++];
          }
          switch (this.state) {
            case 1:
              return this.neutral(t2);
            case 2:
              return this.keyword(t2);
            case 4:
              return this.quoted(t2);
            case 5:
              return this.afterquote(t2);
            case 3:
              return this.number(t2);
            case -1:
              return;
          }
        }, E.prototype.afterquote = function(t2) {
          if ('"' === t2) return this.word += '"', void (this.state = 4);
          if (s.test(t2)) return this.word = this.word.trim(), void this.afterItem(t2);
          throw new Error(`havn't handled "` + t2 + '" in afterquote yet, index ' + this.place);
        }, E.prototype.afterItem = function(t2) {
          return "," === t2 ? (null !== this.word && this.currentObject.push(this.word), this.word = null, void (this.state = 1)) : "]" === t2 ? (this.level--, null !== this.word && (this.currentObject.push(this.word), this.word = null), this.state = 1, this.currentObject = this.stack.pop(), void (this.currentObject || (this.state = -1))) : void 0;
        }, E.prototype.number = function(t2) {
          if (!C.test(t2)) {
            if (s.test(t2)) return this.word = parseFloat(this.word), void this.afterItem(t2);
            throw new Error(`havn't handled "` + t2 + '" in number yet, index ' + this.place);
          }
          this.word += t2;
        }, E.prototype.quoted = function(t2) {
          '"' !== t2 ? this.word += t2 : this.state = 5;
        }, E.prototype.keyword = function(t2) {
          if (i.test(t2)) this.word += t2;
          else {
            if ("[" === t2) {
              var e2 = [];
              return e2.push(this.word), this.level++, null === this.root ? this.root = e2 : this.currentObject.push(e2), this.stack.push(this.currentObject), this.currentObject = e2, void (this.state = 1);
            }
            if (!s.test(t2)) throw new Error(`havn't handled "` + t2 + '" in keyword yet, index ' + this.place);
            this.afterItem(t2);
          }
        }, E.prototype.neutral = function(t2) {
          if (a.test(t2)) return this.word = t2, void (this.state = 2);
          if ('"' === t2) return this.word = "", void (this.state = 4);
          if (C.test(t2)) return this.word = t2, void (this.state = 3);
          if (!s.test(t2)) throw new Error(`havn't handled "` + t2 + '" in neutral yet, index ' + this.place);
          this.afterItem(t2);
        }, E.prototype.output = function() {
          for (; this.place < this.text.length; ) this.readCharicter();
          if (-1 === this.state) return this.root;
          throw new Error('unable to parse string "' + this.text + '". State is ' + this.state);
        };
        function D(t2) {
          return 0.017453292519943295 * t2;
        }
        e.default = function(t2) {
          var e2 = r(t2), o2 = e2.shift(), n2 = e2.shift();
          e2.unshift(["name", n2]), e2.unshift(["type", o2]);
          var a2 = {};
          return f(e2, a2), (function(t3) {
            "GEOGCS" === t3.type ? t3.projName = "longlat" : "LOCAL_CS" === t3.type ? (t3.projName = "identity", t3.local = true) : "object" == typeof t3.PROJECTION ? t3.projName = Object.keys(t3.PROJECTION)[0] : t3.projName = t3.PROJECTION, t3.UNIT && (t3.units = t3.UNIT.name.toLowerCase(), "metre" === t3.units && (t3.units = "meter"), t3.UNIT.convert && ("GEOGCS" === t3.type ? t3.DATUM && t3.DATUM.SPHEROID && (t3.to_meter = t3.UNIT.convert * t3.DATUM.SPHEROID.a) : t3.to_meter = t3.UNIT.convert));
            var e3 = t3.GEOGCS;
            function o3(e4) {
              return e4 * (t3.to_meter || 1);
            }
            "GEOGCS" === t3.type && (e3 = t3), e3 && (e3.DATUM ? t3.datumCode = e3.DATUM.name.toLowerCase() : t3.datumCode = e3.name.toLowerCase(), "d_" === t3.datumCode.slice(0, 2) && (t3.datumCode = t3.datumCode.slice(2)), "new_zealand_geodetic_datum_1949" !== t3.datumCode && "new_zealand_1949" !== t3.datumCode || (t3.datumCode = "nzgd49"), "wgs_1984" === t3.datumCode && ("Mercator_Auxiliary_Sphere" === t3.PROJECTION && (t3.sphere = true), t3.datumCode = "wgs84"), "_ferro" === t3.datumCode.slice(-6) && (t3.datumCode = t3.datumCode.slice(0, -6)), "_jakarta" === t3.datumCode.slice(-8) && (t3.datumCode = t3.datumCode.slice(0, -8)), ~t3.datumCode.indexOf("belge") && (t3.datumCode = "rnb72"), e3.DATUM && e3.DATUM.SPHEROID && (t3.ellps = e3.DATUM.SPHEROID.name.replace("_19", "").replace(/[Cc]larke\_18/, "clrk"), "international" === t3.ellps.toLowerCase().slice(0, 13) && (t3.ellps = "intl"), t3.a = e3.DATUM.SPHEROID.a, t3.rf = parseFloat(e3.DATUM.SPHEROID.rf, 10)), e3.DATUM && e3.DATUM.TOWGS84 && (t3.datum_params = e3.DATUM.TOWGS84), ~t3.datumCode.indexOf("osgb_1936") && (t3.datumCode = "osgb36"), ~t3.datumCode.indexOf("osni_1952") && (t3.datumCode = "osni52"), (~t3.datumCode.indexOf("tm65") || ~t3.datumCode.indexOf("geodetic_datum_of_1965")) && (t3.datumCode = "ire65"), "ch1903+" === t3.datumCode && (t3.datumCode = "ch1903"), ~t3.datumCode.indexOf("israel") && (t3.datumCode = "isr93")), t3.b && !isFinite(t3.b) && (t3.b = t3.a), [["standard_parallel_1", "Standard_Parallel_1"], ["standard_parallel_2", "Standard_Parallel_2"], ["false_easting", "False_Easting"], ["false_northing", "False_Northing"], ["central_meridian", "Central_Meridian"], ["latitude_of_origin", "Latitude_Of_Origin"], ["latitude_of_origin", "Central_Parallel"], ["scale_factor", "Scale_Factor"], ["k0", "scale_factor"], ["latitude_of_center", "Latitude_Of_Center"], ["latitude_of_center", "Latitude_of_center"], ["lat0", "latitude_of_center", D], ["longitude_of_center", "Longitude_Of_Center"], ["longitude_of_center", "Longitude_of_center"], ["longc", "longitude_of_center", D], ["x0", "false_easting", o3], ["y0", "false_northing", o3], ["long0", "central_meridian", D], ["lat0", "latitude_of_origin", D], ["lat0", "standard_parallel_1", D], ["lat1", "standard_parallel_1", D], ["lat2", "standard_parallel_2", D], ["azimuth", "Azimuth"], ["alpha", "azimuth", D], ["srsCode", "name"]].forEach((function(e4) {
              return o4 = t3, n3 = (r2 = e4)[0], a3 = r2[1], void (!(n3 in o4) && a3 in o4 && (o4[n3] = o4[a3], 3 === r2.length && (o4[n3] = r2[2](o4[n3]))));
              var o4, r2, n3, a3;
            })), t3.long0 || !t3.longc || "Albers_Conic_Equal_Area" !== t3.projName && "Lambert_Azimuthal_Equal_Area" !== t3.projName || (t3.long0 = t3.longc), t3.lat_ts || !t3.lat1 || "Stereographic_South_Pole" !== t3.projName && "Polar Stereographic (variant B)" !== t3.projName || (t3.lat0 = D(t3.lat1 > 0 ? 90 : -90), t3.lat_ts = t3.lat1);
          })(a2), a2;
        };
      }]);
    }));
  })(getEpsgCodeAll_node_min$1);
  return getEpsgCodeAll_node_min$1.exports;
}
var getEpsgCodeAll_node_minExports = requireGetEpsgCodeAll_node_min();
const getEPSGCode = /* @__PURE__ */ getDefaultExportFromCjs(getEpsgCodeAll_node_minExports);
var reprojectBbox = { exports: {} };
var proj4Merge = { exports: {} };
var hasRequiredProj4Merge;
function requireProj4Merge() {
  if (hasRequiredProj4Merge) return proj4Merge.exports;
  hasRequiredProj4Merge = 1;
  (function(module) {
    function merge() {
      const instances = [];
      const isEmpty = (it) => typeof it === "object" && Object.keys(it).length === 0 && JSON.stringify(it) === "{}";
      const add2 = (it) => {
        if (!it) return;
        if (Array.isArray(it)) return it.forEach(add2);
        if (it.default) it = it.default;
        if (isEmpty(it)) return;
        instances.push(it);
      };
      Array.from(arguments).forEach(add2);
      if (instances.length === 0) throw Error("[proj4-merge] merge called with zero instances of proj4");
      const [first, ...rest] = instances;
      rest.forEach((instance) => {
        first.defs(Object.entries(instance.defs));
      });
      return first;
    }
    {
      module.exports = merge;
      module.exports.default = merge;
    }
  })(proj4Merge);
  return proj4Merge.exports;
}
var proj4FullyLoaded = { exports: {} };
var hasRequiredProj4FullyLoaded;
function requireProj4FullyLoaded() {
  if (hasRequiredProj4FullyLoaded) return proj4FullyLoaded.exports;
  hasRequiredProj4FullyLoaded = 1;
  (function(module) {
    let proj42 = require$$0;
    const defs = requireProj4jsDefinitions();
    if (typeof proj42 === "object" && typeof proj42.defs !== "function" && typeof proj42.default === "function") {
      proj42 = proj42.default;
    }
    proj42.defs(defs);
    {
      module.exports = proj42;
      module.exports.default = proj42;
    }
  })(proj4FullyLoaded);
  return proj4FullyLoaded.exports;
}
var pluggable = { exports: {} };
var hasRequiredPluggable;
function requirePluggable() {
  if (hasRequiredPluggable) return pluggable.exports;
  hasRequiredPluggable = 1;
  (function(module) {
    function reprojectBoundingBoxPluggable({ bbox, reproject }) {
      const [xmin, ymin, xmax, ymax] = bbox;
      const topleft = reproject([xmin, ymax]);
      const topright = reproject([xmax, ymax]);
      const bottomleft = reproject([xmin, ymin]);
      const bottomright = reproject([xmax, ymin]);
      const corners = [topleft, topright, bottomleft, bottomright];
      const xs = corners.map((corner) => corner[0]);
      const ys = corners.map((corner) => corner[1]);
      return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
    }
    {
      module.exports = reprojectBoundingBoxPluggable;
      module.exports.default = reprojectBoundingBoxPluggable;
    }
    if (typeof window === "object") window.reprojectBoundingBoxPluggable = reprojectBoundingBoxPluggable;
    if (typeof self === "object") self.reprojectBoundingBoxPluggable = reprojectBoundingBoxPluggable;
  })(pluggable);
  return pluggable.exports;
}
var hasRequiredReprojectBbox;
function requireReprojectBbox() {
  if (hasRequiredReprojectBbox) return reprojectBbox.exports;
  hasRequiredReprojectBbox = 1;
  (function(module) {
    const merge = requireProj4Merge();
    const proj42 = requireProj4FullyLoaded();
    const reprojectBoundingBoxPluggable = requirePluggable();
    if (typeof merge !== "function") {
      console.warn("[reproject-bbox] failed to import proj4-merge");
    }
    function reprojectBoundingBox2({ bbox, from, proj4: _proj4, to }) {
      if (typeof from === "number") from = "EPSG:" + from;
      if (typeof to === "number") to = "EPSG:" + to;
      const instances = [_proj4, proj42];
      if (typeof window === "object" && window.proj4) instances.push(window.proj4);
      if (typeof self === "object" && self.proj4) instances.push(self.proj4);
      const proj = merge(instances);
      const fwd = proj(from, to).forward;
      return reprojectBoundingBoxPluggable({ bbox, reproject: fwd });
    }
    {
      module.exports = reprojectBoundingBox2;
      module.exports.default = reprojectBoundingBox2;
    }
    if (typeof window === "object") {
      window.reprojectBoundingBox = reprojectBoundingBox2;
    }
    if (typeof self === "object") {
      self.reprojectBoundingBox = reprojectBoundingBox2;
    }
  })(reprojectBbox);
  return reprojectBbox.exports;
}
var reprojectBboxExports = requireReprojectBbox();
const reprojectBoundingBox = /* @__PURE__ */ getDefaultExportFromCjs(reprojectBboxExports);
const avg = (a, b) => divide(add(a.toString(), b.toString()), "2");
const isAry = (o) => Array.isArray(o);
const isDef = (o) => o !== void 0 && o !== null && o !== "";
const isFunc = (o) => typeof o === "function";
const isObj = (o) => typeof o === "object";
const isStr = (o) => typeof o === "string";
const isNum = (o) => typeof o === "number";
const isBoxStr = (o) => isStr(o) && !!o.match(/^[-|+]?[\d\.]+(, ?[-|+]?[\d\.]+){3}$/);
const isLeafletLatLngBounds = (o) => isObj(o) && hasFuncs(o, ["getEast", "getNorth", "getSouth", "getWest"]);
const hasFunc = (o, f) => isObj(o) && isFunc(o[f]);
const hasObj = (o, k) => isObj(o) && isObj(o[k]);
const hasFuncs = (o, fs) => fs.every((f) => hasFunc(o, f));
const hasObjs = (o, ks) => ks.every((k) => hasObj(o, k));
const hasKey = (o, k) => isObj(o) && o[k] !== void 0 && o[k] !== null;
const hasKeys = (o, ks) => ks.every((k) => hasKey(o, k));
const allNums = (ary) => isAry(ary) && ary.every(isNum);
const allStrs = (ary) => isAry(ary) && ary.every(isStr);
const getConstructor = (o) => typeof obj === "object" && typeof obj.constructor === "function" || void 0;
const normalize = (srs) => {
  if (!srs) return srs;
  if (isStr(srs) && srs.startsWith("EPSG:")) return srs;
  if (isStr(srs) && srs.match(/^\d+$/)) return "EPSG:" + srs;
  else if (isNum(srs)) return "EPSG:" + srs;
  const code = getEPSGCode(srs);
  if (isNum(code)) return "EPSG:" + code;
  return srs;
};
class GeoExtent {
  constructor(o, { srs } = {}) {
    this.srs = normalize(srs);
    let xmin, xmax, ymin, ymax;
    let xmin_str, xmax_str, ymin_str, ymax_str;
    if (getConstructor() === this.constructor) {
      ({ xmin, xmax, ymin, ymax } = o);
      if (isDef(o.srs)) {
        this.srs = normalize(o.srs);
      }
    }
    if (isBoxStr(o)) o = o.split(/, ?/);
    if (isAry(o) && o.length === 4 && allNums(o)) {
      [xmin, ymin, xmax, ymax] = o;
    } else if (isAry(o) && o.length === 4 && allStrs(o)) {
      [xmin_str, ymin_str, xmax_str, ymax_str] = o;
      [xmin, ymin, xmax, ymax] = o.map((str) => Number(str));
    } else if (isAry(o) && o.length === 2 && o.every(isAry) && o.every((o2) => o2.length === 2 && allNums(o2))) {
      [[ymin, xmin], [ymax, xmax]] = o;
    } else if (isLeafletLatLngBounds(o)) {
      xmin = o.getWest(), xmax = o.getEast(), ymin = o.getSouth(), ymax = o.getNorth();
      if (!isDef(this.srs)) this.srs = "EPSG:4326";
    } else if (isAry(o) && o.length === 2 && o.every((it) => hasKeys(it, ["x", "y"]))) {
      [{ x: xmin, y: ymin }, { x: xmax, y: ymax }] = o;
    } else if (isObj(o) && hasKeys(o, ["x", "y"]) && isNum(o.x) && isNum(o.y)) {
      xmin = xmax = o.x;
      ymin = ymax = o.y;
      if (hasKey(o, "spatialReference") && hasKey(o.spatialReference, "wkid")) {
        if (!isDef(this.srs)) this.srs = normalize(o.spatialReference.wkid);
      }
    } else if (isObj(o) && hasKeys(o, ["xmin", "xmax", "ymin", "ymax"])) {
      ({ xmin, xmax, ymin, ymax } = o);
      const keys = ["srs", "crs", "proj", "projection"];
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const v = o[k];
        const normalized = normalize(v);
        if (normalized) {
          this.srs = normalized;
          break;
        }
      }
      if (!this.srs && isDef(o.srs)) {
        this.srs = o.srs;
      }
    } else if (isAry(o) && o.length === 2 && allNums(o)) {
      xmin = xmax = o[0];
      ymin = ymax = o[1];
    } else if (isObj(o) && hasFuncs(o, ["getCoordinates"])) {
      const xy = o.getCoordinates();
      xmin = xmax = xy[0];
      ymin = ymax = xy[1];
    } else if (isObj(o) && hasKey(o, "bbox") && o.bbox.length === 4 && allNums(o)) {
      [xmin, ymin, xmax, ymax] = o.bbox;
    } else if (hasObj(o, "_bounds") && isLeafletLatLngBounds(o._bounds)) {
      const { _bounds } = o;
      xmin = _bounds.getWest(), xmax = _bounds.getEast(), ymin = _bounds.getSouth(), ymax = _bounds.getNorth();
      if (!this.srs) this.srs = "EPSG:4326";
    } else if (isObj(o) && isObj(o._bounds) && hasObjs(o._bounds, ["_southWest", "_northEast"])) {
      ({ lat: ymin, lng: xmin } = o._bounds._southWest);
      ({ lat: ymax, lng: xmax } = o._bounds._northEast);
      if (!isDef(this.srs)) this.srs = "EPSG:4326";
    } else {
      throw new Error("[geo-extent] unknown format");
    }
    this.xmin = xmin;
    this.xmin_str = xmin_str || xmin.toString();
    this.ymin = ymin;
    this.ymin_str = ymin_str || ymin.toString();
    this.xmax = xmax;
    this.xmax_str = xmax_str || xmax.toString();
    this.ymax = ymax;
    this.ymax_str = ymax_str || ymax.toString();
    this.width_str = subtract(this.xmax_str, this.xmin_str);
    this.width = Number(this.width_str);
    this.height_str = subtract(this.ymax_str, this.ymin_str);
    this.height = Number(this.height_str);
    this.bottomLeft = { x: xmin, y: ymin };
    this.bottomRight = { x: xmax, y: ymin };
    this.topLeft = { x: xmin, y: ymax };
    this.topRight = { x: xmax, y: ymax };
    this.leafletBounds = [
      [this.ymin, this.xmin],
      [this.ymax, this.xmax]
    ];
    this.area_str = multiply(this.width_str, this.height_str);
    this.area = Number(this.area_str);
    this.perimeter_str = add(multiply(this.width_str, "2"), multiply(this.height_str, "2"));
    this.perimeter = Number(this.perimeter_str);
    this.bbox = [xmin, ymin, xmax, ymax];
    this.bbox_str = [this.xmin_str, this.ymin_str, this.xmax_str, this.ymax_str];
    this.center_str = {
      x: avg(xmin_str || xmin, xmax_str || xmax),
      y: avg(ymin_str || ymin, ymax_str || ymax)
    };
    this.center = { x: Number(this.center_str.x), y: Number(this.center_str.y) };
    this.str = this.bbox_str.join(",");
  }
  _pre(_this, _other) {
    _other = new this.constructor(_other);
    if (!isDef(_this.srs) && !isDef(_other.srs)) ;
    else if (isDef(_this.srs) && !isDef(_other.srs)) {
      _other = new _this.constructor({ ..._other, srs: _this.srs });
    } else if (!isDef(_this.srs) && isDef(_other.srs)) {
      _this = new _this.constructor({ ..._this, srs: _other.srs });
    } else if (isDef(_this.srs) && isDef(_other.srs) && _this.srs !== _other.srs) {
      _other = _other.reproj(_this.srs);
    } else if (isDef(_this.srs) && isDef(_other.srs) && _this.srs === _other.srs) ;
    else {
      throw "UH OH";
    }
    return [_this, _other];
  }
  clone() {
    return new this.constructor(this);
  }
  contains(other) {
    const [_this, _other] = this._pre(this, other);
    const xContains = _other.xmin >= _this.xmin && _other.xmax <= _this.xmax;
    const yContains = _other.ymin >= _this.ymin && _other.ymax <= _this.ymax;
    return xContains && yContains;
  }
  // should return null if no overlap
  crop(other) {
    other = new this.constructor(other);
    if (this.overlaps(other, { quiet: true }) === false && other.overlaps(this, { quiet: true }) === false) return null;
    if (other.contains(this)) return this.clone();
    if (other.srs === "EPSG:4326" && (other.xmin < -180 || other.xmax > 180)) {
      const parts = other.unwrap();
      let cropped = parts.map((it) => this.crop(it));
      cropped = cropped.filter(Boolean);
      if (cropped.length === 0) return null;
      let combo = cropped[0];
      for (let i = 1; i < cropped.length; i++) combo = combo.combine(cropped[i]);
      return combo;
    }
    let another = isDef(this.srs) && isDef(other.srs) ? other.reproj(this.srs, { quiet: true }) : other.clone();
    if (another) {
      if (!this.overlaps(another)) return null;
      const xmin = Math.max(this.xmin, another.xmin);
      const ymin = Math.max(this.ymin, another.ymin);
      const xmax = Math.min(this.xmax, another.xmax);
      const ymax = Math.min(this.ymax, another.ymax);
      return new this.constructor([xmin, ymin, xmax, ymax], { srs: this.srs });
    }
    const this4326 = isDef(this.srs) ? this.reproj(4326) : this;
    const other4326 = isDef(other.srs) ? other.reproj(4326) : other;
    const [aMinLon, aMinLat, aMaxLon, aMaxLat] = this4326.bbox;
    const [bMinLon, bMinLat, bMaxLon, bMaxLat] = other4326.bbox;
    if (!this4326.overlaps(other4326)) return null;
    const minLon = Math.max(aMinLon, bMinLon);
    const minLat = Math.max(aMinLat, bMinLat);
    const maxLon = Math.min(aMaxLon, bMaxLon);
    const maxLat = Math.min(aMaxLat, bMaxLat);
    return new this.constructor([minLon, minLat, maxLon, maxLat], { srs: 4326 }).reproj(this.srs);
  }
  // add two extents together
  // result is a new extent in the projection of this
  combine(other) {
    if (isDef(this.srs) && isDef(other.srs)) {
      other = other.reproj(this.srs);
    }
    const xmin = Math.min(this.xmin, other.xmin);
    const xmax = Math.max(this.xmax, other.xmax);
    const ymin = Math.min(this.ymin, other.ymin);
    const ymax = Math.max(this.ymax, other.ymax);
    return new this.constructor({ xmin, xmax, ymin, ymax, srs: this.srs });
  }
  equals(other, { digits = 13, strict = true } = { digits: 13, strict: true }) {
    other = new this.constructor(other);
    if (isDef(this.srs) && isDef(other.srs)) {
      other = other.reproj(this.srs);
    } else if (strict && isDef(this.srs) !== !isDef(this.srs)) {
      return false;
    }
    const str1 = this.bbox.map((n) => n.toFixed(digits)).join(",");
    const str2 = other.bbox.map((n) => n.toFixed(digits)).join(",");
    return str1 === str2;
  }
  /*
    shouldn't accept GeoJSON as input because the extent created from a GeoJSON
    might overlap, but the actual polygon wouldn't.
    Or at least make the user have to be explicit about the functionality via
    a flag like overlaps(geojson, { strict: false })
  */
  overlaps(other, { quiet = false } = { quite: false }) {
    try {
      const [_this, _other] = this._pre(this, other);
      const yOverlaps = _other.ymin <= _this.ymax && _other.ymax >= _this.ymin;
      const xOverlaps = _other.xmin <= _this.xmax && _other.xmax >= _this.xmin;
      return xOverlaps && yOverlaps;
    } catch (error) {
      if (quiet) return;
      else throw error;
    }
  }
  reproj(to, { quiet = false } = { quiet: false }) {
    to = normalize(to);
    if (isDef(this.srs) && this.srs === normalize(to)) return this.clone();
    if (!isDef(this.srs)) {
      if (quiet) return;
      throw new Error(`[geo-extent] cannot reproject ${this.bbox} without a projection set`);
    }
    if (this.srs === "EPSG:4326" && (this.xmin < -180 || this.xmax > 180)) {
      try {
        const parts = this.unwrap().map((ext) => ext.reproj(to));
        let combo = parts[0];
        for (let i = 1; i < parts.length; i++) combo = combo.combine(parts[i]);
        return combo;
      } catch (error) {
        if (quiet) return;
        throw error;
      }
    }
    const reprojected = reprojectBoundingBox({
      bbox: this.bbox,
      from: this.srs,
      to
    });
    if (reprojected.some(isNaN)) {
      if (quiet) return;
      throw new Error(`[geo-extent] failed to reproject ${this.bbox} from ${this.srs} to ${to}`);
    }
    return new GeoExtent(reprojected, { srs: to });
  }
  unwrap() {
    const { xmin, ymin, xmax, ymax, srs } = this;
    if (srs !== "EPSG:4326") return [this.clone()];
    if (xmin > -180 && xmax < 180) return [this.clone()];
    if (xmin < -180 && xmax >= xmin + 360) return [new this.constructor([-180, ymin, 180, ymax], { srs: 4326 })];
    if (xmax > 180 && xmin <= xmax - 360) return [new this.constructor([-180, ymin, 180, ymax], { srs: 4326 })];
    let extents = [];
    if (xmin < -180) {
      extents.push(new this.constructor([xmin + 360, ymin, 180, ymax], { srs }));
    }
    extents.push(new this.constructor([xmin < -180 ? -180 : xmin, ymin, xmax > 180 ? 180 : xmax, ymax], { srs }));
    if (this.xmax > 180) {
      extents.push(new this.constructor([-180, ymin, xmax - 360, ymax], { srs }));
    }
    return extents;
  }
  asEsriJSON() {
    return {
      xmin: this.xmin,
      ymin: this.ymin,
      xmax: this.xmax,
      ymax: this.ymax,
      spatialReference: {
        wkid: this.srs
      }
    };
  }
  asGeoJSON() {
    const { xmin, ymin, xmax, ymax } = this.srs === "EPSG:4326" ? this : this.reproj(4326);
    return {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [xmin, ymax],
            [xmax, ymax],
            [xmax, ymin],
            [xmin, ymin],
            [xmin, ymax]
          ]
        ]
      }
    };
  }
  asObj() {
    const res = {};
    for (let k in this) {
      const v = this[k];
      if (!isFunc(v)) {
        res[k] = v;
      }
    }
    return res;
  }
}
if (typeof define === "function" && define.amd)
  define(function() {
    return GeoExtent;
  });
if (typeof self === "object") self.GeoExtent = GeoExtent;
if (typeof window === "object") window.GeoExtent = GeoExtent;
var snapBbox;
var hasRequiredSnapBbox;
function requireSnapBbox() {
  if (hasRequiredSnapBbox) return snapBbox;
  hasRequiredSnapBbox = 1;
  snapBbox = ({ bbox, container, debug, origin, padding, scale }) => {
    if (debug) console.log("[snap-bbox] starting");
    if (debug) console.log("[snap-bbox] bbox:", bbox);
    if (debug) console.log("[snap-bbox] debug:", debug);
    if (debug) console.log("[snap-bbox] origin:", origin);
    if (debug) console.log("[snap-bbox] padding:", padding);
    if (debug) console.log("[snap-bbox] scale:", scale);
    const [originX, originY] = origin;
    if (debug) console.log("[snap-bbox] originX:", originX);
    if (debug) console.log("[snap-bbox] originY:", originY);
    const [padX, padY] = padding || [0, 0];
    if (debug) console.log("[snap-bbox] padX:", padX);
    if (debug) console.log("[snap-bbox] padY:", padY);
    const [scale_x, scale_y] = scale;
    if (debug) console.log("[snap-bbox] scale_x:", scale_x);
    if (debug) console.log("[snap-bbox] scale_y:", scale_y);
    const sign_scale_x = Math.sign(scale_x);
    const sign_scale_y = Math.sign(scale_y);
    if (debug) console.log("[snap-bbox] sign_scale_x:", sign_scale_x);
    if (debug) console.log("[snap-bbox] sign_scale_y:", sign_scale_y);
    const [xmin, ymin, xmax, ymax] = bbox;
    if (debug) console.log("[snap-bbox] xmin:", xmin);
    if (debug) console.log("[snap-bbox] ymin:", ymin);
    if (debug) console.log("[snap-bbox] xmax:", xmax);
    if (debug) console.log("[snap-bbox] ymax:", ymax);
    const left = (xmin - originX) / scale_x;
    const right = (xmax - originX) / scale_x;
    const top = (ymax - originY) / scale_y;
    const bottom = (ymin - originY) / scale_y;
    if (debug) console.log("[snap-bbox] left:", left);
    if (debug) console.log("[snap-bbox] right:", right);
    if (debug) console.log("[snap-bbox] top:", top);
    if (debug) console.log("[snap-bbox] bottom:", bottom);
    let left_int = Math.floor(left) - padX;
    let right_int = Math.ceil(right) + padX;
    let top_int = Math.floor(top) - padY;
    let bottom_int = Math.ceil(bottom) + padY;
    if (debug) console.log("[snap-bbox] left_int:", left_int);
    if (debug) console.log("[snap-bbox] right_int:", right_int);
    if (debug) console.log("[snap-bbox] top_int:", top_int);
    if (debug) console.log("[snap-bbox] bottom_int:", bottom_int);
    if (container) {
      if (debug) console.log("[snap-bbox] container:", container);
      const min_left = (container[0] - originX) / scale_x;
      const max_right = (container[2] - originX) / scale_x;
      const min_top = (container[3] - originY) / scale_y;
      const max_bottom = (container[1] - originY) / scale_y;
      if (debug) console.log("[snap-bbox] min_left:", min_left);
      if (debug) console.log("[snap-bbox] max_right:", max_right);
      if (debug) console.log("[snap-bbox] min_top:", min_top);
      if (debug) console.log("[snap-bbox] max_bottom:", max_bottom);
      const min_left_int = Math.ceil(min_left);
      const max_right_int = Math.floor(max_right);
      const min_top_int = Math.ceil(min_top);
      const max_bottom_int = Math.floor(max_bottom);
      if (debug) console.log("[snap-bbox] min_left_int:", min_left_int);
      if (debug) console.log("[snap-bbox] max_right_int:", max_right_int);
      if (debug) console.log("[snap-bbox] min_top_int:", min_top_int);
      if (debug) console.log("[snap-bbox] max_bottom_int:", max_bottom_int);
      left_int = Math.max(left_int, min_left_int);
      right_int = Math.min(right_int, max_right_int);
      top_int = Math.max(top_int, min_top_int);
      bottom_int = Math.min(bottom_int, max_bottom_int);
      if (debug)
        console.log("[snap-bbox] after containment, left_int:", left_int);
      if (debug)
        console.log("[snap-bbox] after containment, right_int:", right_int);
      if (debug) console.log("[snap-bbox] after containment, top_int:", top_int);
      if (debug)
        console.log("[snap-bbox] after containment, bottom_int:", bottom_int);
    }
    const bbox_in_grid_cells = [
      left_int === 0 ? 0 : left_int,
      bottom_int === 0 ? 0 : bottom_int,
      right_int === 0 ? 0 : right_int,
      top_int === 0 ? 0 : top_int
    ];
    if (debug) console.log("[snap-bbox] bbox_in_grid_cells:", bbox_in_grid_cells);
    const bbox_in_coordinate_system = [
      originX + left_int * scale_x,
      // xmin
      originY + bottom_int * scale_y,
      // ymin
      originX + right_int * scale_x,
      // xmax
      originY + top_int * scale_y
      // ymax
    ];
    return { bbox_in_coordinate_system, bbox_in_grid_cells };
  };
  return snapBbox;
}
var snapBboxExports = requireSnapBbox();
const snap = /* @__PURE__ */ getDefaultExportFromCjs(snapBboxExports);
const EPSG4326 = 4326;
const PROJ4_SUPPORTED_PROJECTIONS = /* @__PURE__ */ new Set([3785, 3857, 4269, 4326, 900913, 102113]);
const MAX_NORTHING = 1e3;
const MAX_EASTING = 1e3;
const ORIGIN = [0, 0];
const log = (obj2) => console.log("[georaster-layer-for-leaflet] ", obj2);
const isSimpleCRS = (crs) => {
  var _crs$transformation, _crs$transformation2, _crs$transformation3, _crs$transformation4;
  return crs === leafletSrcExports.CRS.Simple || !crs.code && crs.infinite && (crs === null || crs === void 0 ? void 0 : (_crs$transformation = crs.transformation) === null || _crs$transformation === void 0 ? void 0 : _crs$transformation._a) === 1 && (crs === null || crs === void 0 ? void 0 : (_crs$transformation2 = crs.transformation) === null || _crs$transformation2 === void 0 ? void 0 : _crs$transformation2._b) === 0 && (crs === null || crs === void 0 ? void 0 : (_crs$transformation3 = crs.transformation) === null || _crs$transformation3 === void 0 ? void 0 : _crs$transformation3._c) === -1 && (crs === null || crs === void 0 ? void 0 : (_crs$transformation4 = crs.transformation) === null || _crs$transformation4 === void 0 ? void 0 : _crs$transformation4._d) === 0;
};
if (!L) console.warn("[georaster-layer-for-leaflet] can't find Leaflet.  If you are loading via <script>, please add the GeoRasterLayer script after the LeafletJS script.");
const zip = (a, b) => a.map((it, i) => [it, b[i]]);
const GeoRasterLayer = leafletSrcExports.GridLayer.extend({
  options: {
    updateWhenIdle: true,
    updateWhenZooming: false,
    keepBuffer: 25,
    resolution: 2 ** 5,
    debugLevel: 0
  },
  initialize: function(options) {
    try {
      if (options.georasters) {
        this.georasters = options.georasters;
      } else if (options.georaster) {
        this.georasters = [options.georaster];
      } else {
        throw new Error("You initialized a GeoRasterLayer without a georaster or georasters value.");
      }
      if (this.sourceType === "url") {
        options.updateWhenIdle = false;
        options.updateWhenZooming = true;
        options.keepBuffer = 16;
      }
      if (options.resampleMethod) {
        this.resampleMethod = options.resampleMethod;
      }
      const keys = ["height", "width", "noDataValue", "palette", "pixelHeight", "pixelWidth", "projection", "sourceType", "xmin", "xmax", "ymin", "ymax"];
      if (this.georasters.length > 1) {
        keys.forEach((key) => {
          if (this.same(this.georasters, key)) {
            this[key] = this.georasters[0][key];
          } else {
            throw new Error("all GeoRasters must have the same " + key);
          }
        });
      } else if (this.georasters.length === 1) {
        keys.forEach((key) => {
          this[key] = this.georasters[0][key];
        });
      }
      this._cache = {
        innerTile: {},
        tile: {}
      };
      this.extent = new GeoExtent([this.xmin, this.ymin, this.xmax, this.ymax], {
        srs: this.projection
      });
      this.ratio = this.height / this.width;
      this.debugLevel = options.debugLevel;
      if (this.debugLevel >= 1) log({
        options
      });
      if (this.georasters.every((georaster) => typeof georaster.values === "object")) {
        this.rasters = this.georasters.reduce((result2, georaster) => {
          if (georaster.values) {
            result2 = result2.concat(georaster.values);
            return result2;
          }
        }, []);
        if (this.debugLevel > 1) console.log("this.rasters:", this.rasters);
      }
      if (options.mask) {
        if (typeof options.mask === "string") {
          this.mask = fetch(options.mask).then((r) => r.json());
        } else if (typeof options.mask === "object") {
          this.mask = Promise.resolve(options.mask);
        }
        this.mask_srs = options.mask_srs || "EPSG:4326";
      }
      this.mask_strategy = options.mask_strategy || "outside";
      this.chroma = chroma;
      this.scale = chroma.scale();
      leafletSrcExports.Util.setOptions(this, options);
      const tileSize = this.getTileSize();
      this.tileHeight = tileSize.y;
      this.tileWidth = tileSize.x;
      if (this.georasters.length >= 4 && !options.pixelValuesToColorFn) {
        throw "you must pass in a pixelValuesToColorFn if you are combining rasters";
      }
      this.numBands = this.georasters.reduce((total, g) => total + g.numberOfRasters, 0);
      if (this.debugLevel > 1) console.log("this.numBands:", this.numBands);
      this.currentStats = {
        mins: new Array(this.numBands),
        maxs: new Array(this.numBands),
        ranges: new Array(this.numBands)
      };
      if ([1, 2, 3].includes(this.georasters.length) && this.georasters.every((g) => g.sourceType === "url") && this.georasters.every((g) => g.numberOfRasters === 1) && !options.pixelValuesToColorFn) {
        try {
          this.calcStats = true;
          this._dynamic = true;
          this.options.pixelValuesToColorFn = (values) => {
            const haveDataForAllBands = values.every((value) => value !== void 0 && value !== this.noDataValue);
            if (haveDataForAllBands) {
              return this.rawToRgb(values);
            }
          };
        } catch (error) {
          console.error("[georaster-layer-for-leaflet]", error);
        }
      }
      this.checkIfYCbCr = new Promise(async (resolve) => {
        if (this.options.pixelValuesToColorFn) return resolve(true);
        if (this.georasters.length === 1 && this.georasters[0].numberOfRasters === 3) {
          var _this$georasters$0$_g, _image$fileDirectory;
          const image = await ((_this$georasters$0$_g = this.georasters[0]._geotiff) === null || _this$georasters$0$_g === void 0 ? void 0 : _this$georasters$0$_g.getImage());
          if ((image === null || image === void 0 ? void 0 : (_image$fileDirectory = image.fileDirectory) === null || _image$fileDirectory === void 0 ? void 0 : _image$fileDirectory.PhotometricInterpretation) === 6) {
            this.options.pixelValuesToColorFn = (values) => {
              const r = Math.round(values[0] + 1.402 * (values[2] - 128));
              const g = Math.round(values[0] - 0.34414 * (values[1] - 128) - 0.71414 * (values[2] - 128));
              const b = Math.round(values[0] + 1.772 * (values[1] - 128));
              return `rgb(${r},${g},${b})`;
            };
          }
        }
        return resolve(true);
      });
    } catch (error) {
      console.error("ERROR initializing GeoTIFFLayer", error);
    }
  },
  getRasters: function(options) {
    const {
      innerTileTopLeftPoint,
      heightOfSampleInScreenPixels,
      widthOfSampleInScreenPixels,
      zoom,
      numberOfSamplesAcross,
      numberOfSamplesDown,
      ymax,
      xmin
    } = options;
    if (this.debugLevel >= 1) console.log("starting getRasters with options:", options);
    const rasterCoordsForTileCoords = (h, w) => {
      const xInMapPixels = innerTileTopLeftPoint.x + w * widthOfSampleInScreenPixels;
      const yInMapPixels = innerTileTopLeftPoint.y + h * heightOfSampleInScreenPixels;
      const mapPoint = leafletSrcExports.point(xInMapPixels, yInMapPixels);
      if (this.debugLevel >= 1) log({
        mapPoint
      });
      const {
        lat,
        lng
      } = this.getMap().unproject(mapPoint, zoom);
      if (this.projection === EPSG4326) {
        return {
          y: Math.round((ymax - lat) / this.pixelHeight),
          x: Math.round((lng - xmin) / this.pixelWidth)
        };
      } else if (this.getProjector()) {
        const [x, y] = this.getProjector().inverse([lng, lat]);
        if (x === Infinity || y === Infinity) {
          if (this.debugLevel >= 1) console.error("projector converted", [lng, lat], "to", [x, y]);
        }
        return {
          y: Math.round((ymax - y) / this.pixelHeight),
          x: Math.round((x - xmin) / this.pixelWidth)
        };
      } else {
        return null;
      }
    };
    const topLeft = rasterCoordsForTileCoords(0, 0);
    const bottomRight = rasterCoordsForTileCoords(numberOfSamplesDown, numberOfSamplesAcross);
    const getValuesOptions = {
      bottom: bottomRight === null || bottomRight === void 0 ? void 0 : bottomRight.y,
      height: numberOfSamplesDown,
      left: topLeft === null || topLeft === void 0 ? void 0 : topLeft.x,
      right: bottomRight === null || bottomRight === void 0 ? void 0 : bottomRight.x,
      top: topLeft === null || topLeft === void 0 ? void 0 : topLeft.y,
      width: numberOfSamplesAcross
    };
    if (!Object.values(getValuesOptions).every((it) => it !== void 0 && isFinite(it))) {
      console.error("getRasters failed because not all values are finite:", getValuesOptions);
    } else {
      return Promise.all(this.georasters.map((georaster) => georaster.getValues({
        ...getValuesOptions,
        resampleMethod: this.resampleMethod || "nearest"
      }))).then((valuesByGeoRaster) => valuesByGeoRaster.reduce((result2, values) => {
        result2 = result2.concat(values);
        return result2;
      }, []));
    }
  },
  createTile: function(coords, done) {
    const tile = leafletSrcExports.DomUtil.create("canvas", "leaflet-tile");
    tile.style.boxSizing = "content-box";
    tile.style.visibility = "hidden";
    const context = tile.getContext("2d");
    this.drawTile({
      tile,
      coords,
      context,
      done
    });
    return tile;
  },
  drawTile: function({
    tile,
    coords,
    context,
    done
  }) {
    try {
      const {
        debugLevel = 0
      } = this;
      if (debugLevel >= 2) console.log("starting drawTile with", {
        tile,
        coords,
        context,
        done
      });
      let error;
      const {
        z: zoom
      } = coords;
      const cacheKey = [coords.x, coords.y, coords.z].join(",");
      if (debugLevel >= 2) log({
        cacheKey
      });
      const mapCRS = this.getMapCRS();
      if (debugLevel >= 2) log({
        mapCRS
      });
      const inSimpleCRS = isSimpleCRS(mapCRS);
      if (debugLevel >= 2) log({
        inSimpleCRS
      });
      const {
        rasters,
        xmin,
        xmax,
        ymin,
        ymax
      } = this;
      const rasterHeight = this.height;
      const rasterWidth = this.width;
      const extentOfLayer = new GeoExtent(this.getBounds(), {
        srs: inSimpleCRS ? "simple" : 4326
      });
      if (debugLevel >= 2) log({
        extentOfLayer
      });
      const pixelHeight = inSimpleCRS ? extentOfLayer.height / rasterHeight : this.pixelHeight;
      const pixelWidth = inSimpleCRS ? extentOfLayer.width / rasterWidth : this.pixelWidth;
      if (debugLevel >= 2) log({
        pixelHeight,
        pixelWidth
      });
      const {
        xMinOfLayer,
        xMaxOfLayer,
        yMinOfLayer,
        yMaxOfLayer
      } = this;
      const boundsOfTile = this._tileCoordsToBounds(coords);
      if (debugLevel >= 2) log({
        boundsOfTile
      });
      const {
        code
      } = mapCRS;
      if (debugLevel >= 2) log({
        code
      });
      const extentOfTile = new GeoExtent(boundsOfTile, {
        srs: inSimpleCRS ? "simple" : 4326
      });
      if (debugLevel >= 2) log({
        extentOfTile
      });
      if (debugLevel >= 4) {
        if (!this._cache.tile[cacheKey]) {
          this._cache.tile[cacheKey] = leafletSrcExports.rectangle(extentOfTile.leafletBounds, {
            fillOpacity: 0
          }).addTo(this.getMap()).bindTooltip(cacheKey, {
            direction: "center",
            permanent: true
          });
        }
      }
      const extentOfTileInMapCRS = inSimpleCRS ? extentOfTile : extentOfTile.reproj(code);
      if (debugLevel >= 2) log({
        extentOfTileInMapCRS
      });
      let extentOfInnerTileInMapCRS = extentOfTileInMapCRS.crop(inSimpleCRS ? extentOfLayer : this.extent);
      if (debugLevel >= 2) console.log("[georaster-layer-for-leaflet] extentOfInnerTileInMapCRS", extentOfInnerTileInMapCRS.reproj(inSimpleCRS ? "simple" : 4326));
      if (debugLevel >= 2) log({
        coords,
        extentOfInnerTileInMapCRS,
        extent: this.extent
      });
      if (debugLevel >= 4) {
        if (!this._cache.innerTile[cacheKey]) {
          const ext = inSimpleCRS ? extentOfInnerTileInMapCRS : extentOfInnerTileInMapCRS.reproj(4326);
          this._cache.innerTile[cacheKey] = leafletSrcExports.rectangle(ext.leafletBounds, {
            color: "#F00",
            dashArray: "5, 10",
            fillOpacity: 0
          }).addTo(this.getMap());
        }
      }
      const widthOfScreenPixelInMapCRS = extentOfTileInMapCRS.width / this.tileWidth;
      const heightOfScreenPixelInMapCRS = extentOfTileInMapCRS.height / this.tileHeight;
      if (debugLevel >= 3) log({
        heightOfScreenPixelInMapCRS,
        widthOfScreenPixelInMapCRS
      });
      const oldExtentOfInnerTileInRasterCRS = inSimpleCRS ? extentOfInnerTileInMapCRS : extentOfInnerTileInMapCRS.reproj(this.projection);
      const snapped = snap({
        bbox: oldExtentOfInnerTileInRasterCRS.bbox,
        // pad xmax and ymin of container to tolerate ceil() and floor() in snap()
        container: inSimpleCRS ? [extentOfLayer.xmin, extentOfLayer.ymin - 0.25 * pixelHeight, extentOfLayer.xmax + 0.25 * pixelWidth, extentOfLayer.ymax] : [xmin, ymin - 0.25 * pixelHeight, xmax + 0.25 * pixelWidth, ymax],
        debug: debugLevel >= 2,
        origin: inSimpleCRS ? [extentOfLayer.xmin, extentOfLayer.ymax] : [xmin, ymax],
        scale: [pixelWidth, -pixelHeight]
        // negative because origin is at ymax
      });
      const extentOfInnerTileInRasterCRS = new GeoExtent(snapped.bbox_in_coordinate_system, {
        srs: inSimpleCRS ? "simple" : this.projection
      });
      const gridbox = snapped.bbox_in_grid_cells;
      const snappedSamplesAcross = Math.abs(gridbox[2] - gridbox[0]);
      const snappedSamplesDown = Math.abs(gridbox[3] - gridbox[1]);
      const rasterPixelsAcross = Math.ceil(oldExtentOfInnerTileInRasterCRS.width / pixelWidth);
      const rasterPixelsDown = Math.ceil(oldExtentOfInnerTileInRasterCRS.height / pixelHeight);
      const {
        resolution
      } = this.options;
      const layerCropExtent = inSimpleCRS ? extentOfLayer : this.extent;
      const recropTileOrig = oldExtentOfInnerTileInRasterCRS.crop(layerCropExtent);
      let maxSamplesAcross = 1;
      let maxSamplesDown = 1;
      if (recropTileOrig !== null) {
        const recropTileProj = inSimpleCRS ? recropTileOrig : recropTileOrig.reproj(code);
        const recropTile = recropTileProj.crop(extentOfTileInMapCRS);
        if (recropTile !== null) {
          maxSamplesAcross = Math.ceil(resolution * (recropTile.width / extentOfTileInMapCRS.width));
          maxSamplesDown = Math.ceil(resolution * (recropTile.height / extentOfTileInMapCRS.height));
        }
      }
      const overdrawTileAcross = rasterPixelsAcross < maxSamplesAcross;
      const overdrawTileDown = rasterPixelsDown < maxSamplesDown;
      const numberOfSamplesAcross = overdrawTileAcross ? snappedSamplesAcross : maxSamplesAcross;
      const numberOfSamplesDown = overdrawTileDown ? snappedSamplesDown : maxSamplesDown;
      if (debugLevel >= 3) console.log("[georaster-layer-for-leaflet] extent of inner tile before snapping " + extentOfInnerTileInMapCRS.reproj(inSimpleCRS ? "simple" : 4326).bbox.toString());
      {
        const oldrb = new GeoExtent(oldExtentOfInnerTileInRasterCRS.bbox);
        const newrb = new GeoExtent(extentOfInnerTileInRasterCRS.bbox);
        const oldmb = new GeoExtent(extentOfInnerTileInMapCRS.bbox);
        if (oldrb.width !== 0 && oldrb.height !== 0) {
          let n0 = (newrb.xmin - oldrb.xmin) / oldrb.width * oldmb.width;
          let n1 = (newrb.ymin - oldrb.ymin) / oldrb.height * oldmb.height;
          let n2 = (newrb.xmax - oldrb.xmax) / oldrb.width * oldmb.width;
          let n3 = (newrb.ymax - oldrb.ymax) / oldrb.height * oldmb.height;
          if (!overdrawTileAcross) {
            n0 = Math.max(n0, 0);
            n2 = Math.min(n2, 0);
          }
          if (!overdrawTileDown) {
            n1 = Math.max(n1, 0);
            n3 = Math.min(n3, 0);
          }
          const newbox = [oldmb.xmin + n0, oldmb.ymin + n1, oldmb.xmax + n2, oldmb.ymax + n3];
          extentOfInnerTileInMapCRS = new GeoExtent(newbox, {
            srs: extentOfInnerTileInMapCRS.srs
          });
        }
      }
      if (debugLevel >= 4) {
        if (!this._cache.innerTile[cacheKey]) {
          const ext = inSimpleCRS ? extentOfInnerTileInMapCRS : extentOfInnerTileInMapCRS.reproj(4326);
          this._cache.innerTile[cacheKey] = leafletSrcExports.rectangle(ext.leafletBounds, {
            color: "#F00",
            dashArray: "5, 10",
            fillOpacity: 0
          }).addTo(this.getMap());
        }
      }
      if (debugLevel >= 3) console.log("[georaster-layer-for-leaflet] extent of inner tile after snapping " + extentOfInnerTileInMapCRS.reproj(inSimpleCRS ? "simple" : 4326).bbox.toString());
      const padding = {
        left: Math.round((extentOfInnerTileInMapCRS.xmin - extentOfTileInMapCRS.xmin) / widthOfScreenPixelInMapCRS),
        right: Math.round((extentOfTileInMapCRS.xmax - extentOfInnerTileInMapCRS.xmax) / widthOfScreenPixelInMapCRS),
        top: Math.round((extentOfTileInMapCRS.ymax - extentOfInnerTileInMapCRS.ymax) / heightOfScreenPixelInMapCRS),
        bottom: Math.round((extentOfInnerTileInMapCRS.ymin - extentOfTileInMapCRS.ymin) / heightOfScreenPixelInMapCRS)
      };
      if (debugLevel >= 3) log({
        padding
      });
      const innerTileHeight = this.tileHeight - padding.top - padding.bottom;
      const innerTileWidth = this.tileWidth - padding.left - padding.right;
      if (debugLevel >= 3) log({
        innerTileHeight,
        innerTileWidth
      });
      if (debugLevel >= 4) {
        const xMinOfInnerTileInMapCRS = extentOfTileInMapCRS.xmin + padding.left * widthOfScreenPixelInMapCRS;
        const yMinOfInnerTileInMapCRS = extentOfTileInMapCRS.ymin + padding.bottom * heightOfScreenPixelInMapCRS;
        const xMaxOfInnerTileInMapCRS = extentOfTileInMapCRS.xmax - padding.right * widthOfScreenPixelInMapCRS;
        const yMaxOfInnerTileInMapCRS = extentOfTileInMapCRS.ymax - padding.top * heightOfScreenPixelInMapCRS;
        log({
          xMinOfInnerTileInMapCRS,
          yMinOfInnerTileInMapCRS,
          xMaxOfInnerTileInMapCRS,
          yMaxOfInnerTileInMapCRS
        });
      }
      const canvasPadding = {
        left: Math.max(padding.left, 0),
        right: Math.max(padding.right, 0),
        top: Math.max(padding.top, 0),
        bottom: Math.max(padding.bottom, 0)
      };
      const canvasHeight = this.tileHeight - canvasPadding.top - canvasPadding.bottom;
      const canvasWidth = this.tileWidth - canvasPadding.left - canvasPadding.right;
      tile.style.paddingTop = canvasPadding.top + "px";
      tile.style.paddingRight = canvasPadding.right + "px";
      tile.style.paddingBottom = canvasPadding.bottom + "px";
      tile.style.paddingLeft = canvasPadding.left + "px";
      tile.height = canvasHeight;
      tile.style.height = canvasHeight + "px";
      tile.width = canvasWidth;
      tile.style.width = canvasWidth + "px";
      if (debugLevel >= 3) console.log("setting tile height to " + canvasHeight + "px");
      if (debugLevel >= 3) console.log("setting tile width to " + canvasWidth + "px");
      const heightOfSampleInScreenPixels = innerTileHeight / numberOfSamplesDown;
      const heightOfSampleInScreenPixelsInt = Math.ceil(heightOfSampleInScreenPixels);
      const widthOfSampleInScreenPixels = innerTileWidth / numberOfSamplesAcross;
      const widthOfSampleInScreenPixelsInt = Math.ceil(widthOfSampleInScreenPixels);
      const map = this.getMap();
      const tileSize = this.getTileSize();
      const tileNwPoint = coords.scaleBy(tileSize);
      if (debugLevel >= 4) log({
        tileNwPoint
      });
      const xLeftOfInnerTile = tileNwPoint.x + padding.left;
      const yTopOfInnerTile = tileNwPoint.y + padding.top;
      const innerTileTopLeftPoint = {
        x: xLeftOfInnerTile,
        y: yTopOfInnerTile
      };
      if (debugLevel >= 4) log({
        innerTileTopLeftPoint
      });
      setTimeout(async () => {
        try {
          let tileRasters = null;
          if (!rasters) {
            tileRasters = await this.getRasters({
              innerTileTopLeftPoint,
              heightOfSampleInScreenPixels,
              widthOfSampleInScreenPixels,
              zoom,
              pixelHeight,
              pixelWidth,
              numberOfSamplesAcross,
              numberOfSamplesDown,
              ymax,
              xmin
            });
            if (tileRasters && this.calcStats) {
              const {
                noDataValue
              } = this;
              for (let bandIndex = 0; bandIndex < tileRasters.length; bandIndex++) {
                let min = this.currentStats.mins[bandIndex];
                let max = this.currentStats.maxs[bandIndex];
                const band = tileRasters[bandIndex];
                for (let rowIndex = 0; rowIndex < band.length; rowIndex++) {
                  const row = band[rowIndex];
                  for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
                    const value = row[columnIndex];
                    if (value !== noDataValue) {
                      if (min === void 0 || value < min) {
                        min = value;
                      }
                      if (max === void 0 || value > max) {
                        max = value;
                      }
                    }
                  }
                }
                this.currentStats.mins[bandIndex] = min;
                this.currentStats.maxs[bandIndex] = max;
                this.currentStats.ranges[bandIndex] = max - min;
              }
              if (this._dynamic) {
                try {
                  const rawToRgbFn = rawToRgb.default || rawToRgb;
                  this.rawToRgb = rawToRgbFn({
                    format: "string",
                    flip: this.currentStats.mins.length === 1 ? true : false,
                    ranges: zip(this.currentStats.mins, this.currentStats.maxs),
                    round: true
                  });
                } catch (error2) {
                  console.error(error2);
                }
              }
            }
          }
          await this.checkIfYCbCr;
          for (let h = 0; h < numberOfSamplesDown; h++) {
            const yCenterInMapPixels = yTopOfInnerTile + (h + 0.5) * heightOfSampleInScreenPixels;
            const latWestPoint = leafletSrcExports.point(xLeftOfInnerTile, yCenterInMapPixels);
            const {
              lat
            } = map.unproject(latWestPoint, zoom);
            if (lat > yMinOfLayer && lat < yMaxOfLayer) {
              const yInTilePixels = Math.round(h * heightOfSampleInScreenPixels) + Math.min(padding.top, 0);
              let yInRasterPixels = 0;
              if (inSimpleCRS || this.projection === EPSG4326) {
                yInRasterPixels = Math.floor((yMaxOfLayer - lat) / pixelHeight);
              }
              for (let w = 0; w < numberOfSamplesAcross; w++) {
                const latLngPoint = leafletSrcExports.point(xLeftOfInnerTile + (w + 0.5) * widthOfSampleInScreenPixels, yCenterInMapPixels);
                const {
                  lng: xOfLayer
                } = map.unproject(latLngPoint, zoom);
                if (xOfLayer > xMinOfLayer && xOfLayer < xMaxOfLayer) {
                  let xInRasterPixels = 0;
                  if (inSimpleCRS || this.projection === EPSG4326) {
                    xInRasterPixels = Math.floor((xOfLayer - xMinOfLayer) / pixelWidth);
                  } else if (this.getProjector()) {
                    const inverted = this.getProjector().inverse({
                      x: xOfLayer,
                      y: lat
                    });
                    const yInSrc = inverted.y;
                    yInRasterPixels = Math.floor((ymax - yInSrc) / pixelHeight);
                    if (yInRasterPixels < 0 || yInRasterPixels >= rasterHeight) continue;
                    const xInSrc = inverted.x;
                    xInRasterPixels = Math.floor((xInSrc - xmin) / pixelWidth);
                    if (xInRasterPixels < 0 || xInRasterPixels >= rasterWidth) continue;
                  }
                  let values = null;
                  if (tileRasters) {
                    values = tileRasters.map((band) => band[h][w]);
                  } else if (rasters) {
                    values = rasters.map((band) => {
                      return band[yInRasterPixels][xInRasterPixels];
                    });
                  } else {
                    done && done(Error("no rasters are available for, so skipping value generation"));
                    return;
                  }
                  const x = Math.round(w * widthOfSampleInScreenPixels) + Math.min(padding.left, 0);
                  const y = yInTilePixels;
                  const width = widthOfSampleInScreenPixelsInt;
                  const height = heightOfSampleInScreenPixelsInt;
                  if (this.options.customDrawFunction) {
                    this.options.customDrawFunction({
                      values,
                      context,
                      x,
                      y,
                      width,
                      height,
                      rasterX: xInRasterPixels,
                      rasterY: yInRasterPixels,
                      sampleX: w,
                      sampleY: h,
                      sampledRaster: tileRasters
                    });
                  } else {
                    const color = this.getColor(values);
                    if (color && context) {
                      context.fillStyle = color;
                      context.fillRect(x, y, width, height);
                    }
                  }
                }
              }
            }
          }
          if (this.mask) {
            if (inSimpleCRS) {
              console.warn("[georaster-layer-for-leaflet] mask is not supported when using simple projection");
            } else {
              this.mask.then((mask) => {
                geocanvas.maskCanvas({
                  canvas: tile,
                  // eslint-disable-next-line camelcase
                  canvas_bbox: extentOfInnerTileInMapCRS.bbox,
                  // need to support simple projection too
                  // eslint-disable-next-line camelcase
                  canvas_srs: 3857,
                  // default map crs, need to support simple
                  mask,
                  // eslint-disable-next-line camelcase
                  mask_srs: this.mask_srs,
                  strategy: this.mask_strategy
                  // hide everything inside or outside the mask
                });
              });
            }
          }
          tile.style.visibility = "visible";
        } catch (e) {
          console.error(e);
          error = e;
        }
        done && done(error, tile);
      }, 0);
      return tile;
    } catch (error) {
      console.error(error);
      done && done(error, tile);
    }
  },
  // copied from Leaflet with slight modifications,
  // including removing the lines that set the tile size
  _initTile: function(tile) {
    leafletSrcExports.DomUtil.addClass(tile, "leaflet-tile");
    tile.onselectstart = leafletSrcExports.Util.falseFn;
    tile.onmousemove = leafletSrcExports.Util.falseFn;
    if (leafletSrcExports.Browser.ielt9 && this.options.opacity < 1) {
      leafletSrcExports.DomUtil.setOpacity(tile, this.options.opacity);
    }
    if (leafletSrcExports.Browser.android && !leafletSrcExports.Browser.android23) {
      tile.style.WebkitBackfaceVisibility = "hidden";
    }
  },
  // method from https://github.com/Leaflet/Leaflet/blob/bb1d94ac7f2716852213dd11563d89855f8d6bb1/src/layer/ImageOverlay.js
  getBounds: function() {
    this.initBounds();
    return this._bounds;
  },
  getMap: function() {
    return this._map || this._mapToAdd;
  },
  getMapCRS: function() {
    var _this$getMap;
    return ((_this$getMap = this.getMap()) === null || _this$getMap === void 0 ? void 0 : _this$getMap.options.crs) || leafletSrcExports.CRS.EPSG3857;
  },
  // add in to ensure backwards compatability with Leaflet 1.0.3
  _tileCoordsToNwSe: function(coords) {
    const map = this.getMap();
    const tileSize = this.getTileSize();
    const nwPoint = coords.scaleBy(tileSize);
    const sePoint = nwPoint.add(tileSize);
    const nw = map.unproject(nwPoint, coords.z);
    const se = map.unproject(sePoint, coords.z);
    return [nw, se];
  },
  _tileCoordsToBounds: function(coords) {
    const [nw, se] = this._tileCoordsToNwSe(coords);
    let bounds = new leafletSrcExports.LatLngBounds(nw, se);
    if (!this.options.noWrap) {
      const {
        crs
      } = this.getMap().options;
      bounds = crs.wrapLatLngBounds(bounds);
    }
    return bounds;
  },
  _isValidTile: function(coords) {
    const crs = this.getMapCRS();
    if (!crs.infinite) {
      const globalBounds = this._globalTileRange;
      if (!crs.wrapLng && (coords.x < globalBounds.min.x || coords.x > globalBounds.max.x) || !crs.wrapLat && (coords.y < globalBounds.min.y || coords.y > globalBounds.max.y)) {
        return false;
      }
    }
    const bounds = this.getBounds();
    if (!bounds) {
      return true;
    }
    const {
      x,
      y,
      z
    } = coords;
    const layerExtent = new GeoExtent(bounds, {
      srs: 4326
    });
    const boundsOfTile = this._tileCoordsToBounds(coords);
    if (layerExtent.overlaps(boundsOfTile)) return true;
    if (isSimpleCRS(crs)) return false;
    const width = Math.pow(2, z);
    const leftCoords = leafletSrcExports.point(x - width, y);
    leftCoords.z = z;
    const leftBounds = this._tileCoordsToBounds(leftCoords);
    if (layerExtent.overlaps(leftBounds)) return true;
    const rightCoords = leafletSrcExports.point(x + width, y);
    rightCoords.z = z;
    const rightBounds = this._tileCoordsToBounds(rightCoords);
    if (layerExtent.overlaps(rightBounds)) return true;
    return false;
  },
  getColor: function(values) {
    if (this.options.pixelValuesToColorFn) {
      return this.options.pixelValuesToColorFn(values);
    } else {
      const numberOfValues = values.length;
      const haveDataForAllBands = values.every((value) => value !== void 0 && value !== this.noDataValue);
      if (haveDataForAllBands) {
        if (numberOfValues == 1) {
          const value = values[0];
          if (this.palette) {
            const [r, g, b, a] = this.palette[value];
            return `rgba(${r},${g},${b},${a / 255})`;
          } else if (this.georasters[0].mins) {
            const {
              mins,
              ranges
            } = this.georasters[0];
            return this.scale((values[0] - mins[0]) / ranges[0]).hex();
          } else if (this.currentStats.mins) {
            const min = this.currentStats.mins[0];
            const range2 = this.currentStats.ranges[0];
            return this.scale((values[0] - min) / range2).hex();
          }
        } else if (numberOfValues === 2) {
          return `rgb(${values[0]},${values[1]},0)`;
        } else if (numberOfValues === 3) {
          return `rgb(${values[0]},${values[1]},${values[2]})`;
        } else if (numberOfValues === 4) {
          return `rgba(${values[0]},${values[1]},${values[2]},${values[3] / 255})`;
        }
      }
    }
  },
  /**
   * Redraws the active map tiles updating the pixel values using the supplie callback
   */
  updateColors(pixelValuesToColorFn, {
    debugLevel = -1
  } = {
    debugLevel: -1
  }) {
    if (!pixelValuesToColorFn) {
      throw new Error("Missing pixelValuesToColorFn function");
    }
    if (debugLevel === -1) debugLevel = this.debugLevel;
    if (debugLevel >= 1) console.log("Start updating active tile pixel values");
    this.options.pixelValuesToColorFn = pixelValuesToColorFn;
    const tiles = this.getActiveTiles();
    if (!tiles) {
      console.error("No active tiles available");
      return this;
    }
    if (debugLevel >= 1) console.log("Active tiles fetched", tiles);
    tiles.forEach((tile) => {
      const {
        coords,
        el
      } = tile;
      this.drawTile({
        tile: el,
        coords,
        context: el.getContext("2d")
      });
    });
    if (debugLevel >= 1) console.log("Finished updating active tile colours");
    return this;
  },
  getTiles() {
    return Object.values(this._tiles);
  },
  getActiveTiles() {
    const tiles = this.getTiles();
    return tiles.filter((tile) => this._isValidTile(tile.coords));
  },
  isSupportedProjection: function() {
    if (this._isSupportedProjection === void 0) {
      const projection = this.projection;
      if (isUTM(projection)) {
        this._isSupportedProjection = true;
      } else if (PROJ4_SUPPORTED_PROJECTIONS.has(projection)) {
        this._isSupportedProjection = true;
      } else if (typeof proj4FullyLoaded$1 === "function" && `EPSG:${projection}` in proj4FullyLoaded$1.defs) {
        this._isSupportedProjection = true;
      } else if (typeof proj4 === "function" && typeof proj4.defs !== "undefined" && `EPSG:${projection}` in proj4.defs) {
        this._isSupportedProjection = true;
      } else {
        this._isSupportedProjection = false;
      }
    }
    return this._isSupportedProjection;
  },
  getProjectionString: function(projection) {
    if (isUTM(projection)) {
      return getProjString(projection);
    }
    return `EPSG:${projection}`;
  },
  initBounds: function(options) {
    if (!options) options = this.options;
    if (!this._bounds) {
      const {
        debugLevel,
        height,
        width,
        projection,
        xmin,
        xmax,
        ymin,
        ymax
      } = this;
      if (isSimpleCRS(this.getMapCRS())) {
        if (height === width) {
          this._bounds = leafletSrcExports.latLngBounds([ORIGIN, [MAX_NORTHING, MAX_EASTING]]);
        } else if (height > width) {
          this._bounds = leafletSrcExports.latLngBounds([ORIGIN, [MAX_NORTHING, MAX_EASTING / this.ratio]]);
        } else if (width > height) {
          this._bounds = leafletSrcExports.latLngBounds([ORIGIN, [MAX_NORTHING * this.ratio, MAX_EASTING]]);
        }
      } else if (projection === EPSG4326) {
        if (debugLevel >= 1) console.log(`georaster projection is in ${EPSG4326}`);
        const minLatWest = leafletSrcExports.latLng(ymin, xmin);
        const maxLatEast = leafletSrcExports.latLng(ymax, xmax);
        this._bounds = leafletSrcExports.latLngBounds(minLatWest, maxLatEast);
      } else if (this.getProjector()) {
        if (debugLevel >= 1) console.log("projection is UTM or supported by proj4");
        const bottomLeft = this.getProjector().forward({
          x: xmin,
          y: ymin
        });
        const minLatWest = leafletSrcExports.latLng(bottomLeft.y, bottomLeft.x);
        const topRight = this.getProjector().forward({
          x: xmax,
          y: ymax
        });
        const maxLatEast = leafletSrcExports.latLng(topRight.y, topRight.x);
        this._bounds = leafletSrcExports.latLngBounds(minLatWest, maxLatEast);
      } else {
        if (typeof proj4FullyLoaded$1 !== "function") {
          throw `You are using the lite version of georaster-layer-for-leaflet, which does not support rasters with the projection ${projection}.  Please try using the default build or add the projection definition to your global proj4.`;
        } else {
          throw `GeoRasterLayer does not provide built-in support for rasters with the projection ${projection}.  Add the projection definition to your global proj4.`;
        }
      }
      this.xMinOfLayer = this._bounds.getWest();
      this.xMaxOfLayer = this._bounds.getEast();
      this.yMaxOfLayer = this._bounds.getNorth();
      this.yMinOfLayer = this._bounds.getSouth();
      options.bounds = this._bounds;
    }
  },
  getProjector: function() {
    if (this.isSupportedProjection()) {
      if (!proj4FullyLoaded$1 && !proj4) {
        throw "proj4 must be found in the global scope in order to load a raster that uses this projection";
      }
      if (!this._projector) {
        const projString = this.getProjectionString(this.projection);
        if (this.debugLevel >= 1) log({
          projString
        });
        let proj4Lib;
        if (projString.startsWith("EPSG")) {
          if (typeof proj4 === "function" && typeof proj4.defs === "function" && projString in proj4.defs) {
            proj4Lib = proj4;
          } else if (typeof proj4FullyLoaded$1 === "function" && typeof proj4FullyLoaded$1.defs === "function" && projString in proj4FullyLoaded$1.defs) {
            proj4Lib = proj4FullyLoaded$1;
          } else {
            throw "[georaster-layer-for-leaflet] projection not found in proj4 instance";
          }
        } else {
          if (typeof proj4 === "function") {
            proj4Lib = proj4;
          } else if (typeof proj4FullyLoaded$1 === "function") {
            proj4Lib = proj4FullyLoaded$1;
          } else {
            throw "[georaster-layer-for-leaflet] projection not found in proj4 instance";
          }
        }
        this._projector = proj4Lib(projString, `EPSG:${EPSG4326}`);
        if (this.debugLevel >= 1) console.log("projector set");
      }
      return this._projector;
    }
  },
  same(array, key) {
    return new Set(array.map((item) => item[key])).size === 1;
  }
});
if (typeof window === "object") {
  window["GeoRasterLayer"] = GeoRasterLayer;
}
if (typeof self !== "undefined") {
  self["GeoRasterLayer"] = GeoRasterLayer;
}
export {
  GeoRasterLayer as G
};
//# sourceMappingURL=georaster-layer-for-leaflet-WdWWdDW4.js.map
