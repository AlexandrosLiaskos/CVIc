const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/georaster.browser.bundle.min-DTXAUKPf.js","assets/index-OGmXEiPu.js","assets/index-Cj-sxlKB.css","assets/georaster-layer-for-leaflet-CKQVwzmC.js","assets/leaflet-src-CtcoMqTs.js","assets/index-JjBgob5T.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./index-OGmXEiPu.js";
let mapLibrariesLoaded = false;
let georaster, parse, fromArrays, GeoRasterLayer;
async function loadMapLibraries() {
  if (mapLibrariesLoaded) return { georaster, parse, fromArrays, GeoRasterLayer };
  try {
    console.log("Loading map libraries...");
    const georasterModule = await __vitePreload(() => import("./georaster.browser.bundle.min-DTXAUKPf.js").then((n) => n.g), true ? __vite__mapDeps([0,1,2]) : void 0);
    georaster = georasterModule.default;
    parse = georasterModule.parse;
    fromArrays = georasterModule.fromArrays;
    const geoRasterLayerModule = await __vitePreload(() => import("./georaster-layer-for-leaflet-CKQVwzmC.js"), true ? __vite__mapDeps([3,4,1,2,5]) : void 0);
    GeoRasterLayer = geoRasterLayerModule.default;
    mapLibrariesLoaded = true;
    console.log("Map libraries loaded successfully");
    return { georaster, parse, fromArrays, GeoRasterLayer };
  } catch (error) {
    console.error("Failed to load map libraries:", error);
    throw error;
  }
}
export {
  GeoRasterLayer,
  fromArrays,
  georaster,
  loadMapLibraries,
  parse
};
//# sourceMappingURL=mapLibraries-yn2o_HOR.js.map
