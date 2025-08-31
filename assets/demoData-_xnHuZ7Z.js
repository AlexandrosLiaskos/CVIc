import { _ as __vitePreload } from "./index-Cgv5OTPG.js";
import { C as COASTAL_GEOMORPHOLOGY, b as COASTAL_SLOPE, M as MEAN_WAVE_HEIGHT, c as POPULATION_DENSITY } from "./standardParameters-pkf5Qrqa.js";
const DEMO_SHORELINE_DATA = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [23.7234, 37.9755],
          // Approximate coordinates for Greek coastline
          [23.7245, 37.976],
          [23.7256, 37.9765],
          [23.7267, 37.977],
          [23.7278, 37.9775],
          [23.7289, 37.978],
          [23.73, 37.9785],
          [23.7311, 37.979],
          [23.7322, 37.9795],
          [23.7333, 37.98],
          [23.7344, 37.9805],
          [23.7355, 37.981],
          [23.7366, 37.9815],
          [23.7377, 37.982],
          [23.7388, 37.9825]
        ]
      },
      properties: {
        id: "demo-shoreline-1",
        name: "Demo Mediterranean Coastline",
        description: "Sample shoreline data for demonstration purposes"
      }
    }
  ]
};
const DEMO_SEGMENTED_DATA = [
  {
    id: "demo-segment-1",
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [
        [23.7234, 37.9755],
        [23.7245, 37.976],
        [23.7256, 37.9765]
      ]
    },
    properties: {
      id: "demo-segment-1",
      length: 250,
      index: 1,
      parameters: {
        coastal_geomorphology: { type: "categorical", value: "medium_cliffs", vulnerability: 2 },
        coastal_slope: { type: "numerical", value: 15, vulnerability: 2 },
        mean_wave_height: { type: "numerical", value: 1.2, vulnerability: 2 },
        population_density: { type: "numerical", value: 150, vulnerability: 2 }
      },
      vulnerabilityIndex: 2,
      vulnerabilityFormula: "geometric-mean"
    },
    parameters: {
      coastal_geomorphology: { type: "categorical", value: "medium_cliffs", vulnerability: 2 },
      coastal_slope: { type: "numerical", value: 15, vulnerability: 2 },
      mean_wave_height: { type: "numerical", value: 1.2, vulnerability: 2 },
      population_density: { type: "numerical", value: 150, vulnerability: 2 }
    }
  },
  {
    id: "demo-segment-2",
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [
        [23.7256, 37.9765],
        [23.7267, 37.977],
        [23.7278, 37.9775]
      ]
    },
    properties: {
      id: "demo-segment-2",
      length: 280,
      index: 2,
      parameters: {
        coastal_geomorphology: { type: "categorical", value: "sandy_beaches", vulnerability: 4 },
        coastal_slope: { type: "numerical", value: 5, vulnerability: 4 },
        mean_wave_height: { type: "numerical", value: 1.8, vulnerability: 3 },
        population_density: { type: "numerical", value: 450, vulnerability: 3 }
      },
      vulnerabilityIndex: 3.5,
      vulnerabilityFormula: "geometric-mean"
    },
    parameters: {
      coastal_geomorphology: { type: "categorical", value: "sandy_beaches", vulnerability: 4 },
      coastal_slope: { type: "numerical", value: 5, vulnerability: 4 },
      mean_wave_height: { type: "numerical", value: 1.8, vulnerability: 3 },
      population_density: { type: "numerical", value: 450, vulnerability: 3 }
    }
  },
  {
    id: "demo-segment-3",
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [
        [23.7278, 37.9775],
        [23.7289, 37.978],
        [23.73, 37.9785]
      ]
    },
    properties: {
      id: "demo-segment-3",
      length: 260,
      index: 3,
      parameters: {
        coastal_geomorphology: { type: "categorical", value: "rocky_cliffs", vulnerability: 1 },
        coastal_slope: { type: "numerical", value: 25, vulnerability: 1 },
        mean_wave_height: { type: "numerical", value: 0.8, vulnerability: 1 },
        population_density: { type: "numerical", value: 80, vulnerability: 1 }
      },
      vulnerabilityIndex: 1,
      vulnerabilityFormula: "geometric-mean"
    },
    parameters: {
      coastal_geomorphology: { type: "categorical", value: "rocky_cliffs", vulnerability: 1 },
      coastal_slope: { type: "numerical", value: 25, vulnerability: 1 },
      mean_wave_height: { type: "numerical", value: 0.8, vulnerability: 1 },
      population_density: { type: "numerical", value: 80, vulnerability: 1 }
    }
  }
];
[
  {
    ...COASTAL_GEOMORPHOLOGY,
    enabled: true,
    weight: 0.25
  },
  {
    ...COASTAL_SLOPE,
    enabled: true,
    weight: 0.25
  },
  {
    ...MEAN_WAVE_HEIGHT,
    enabled: true,
    weight: 0.25
  },
  {
    ...POPULATION_DENSITY,
    enabled: true,
    weight: 0.25
  }
];
async function initializeDemoData() {
  try {
    const { indexedDBService } = await __vitePreload(async () => {
      const { indexedDBService: indexedDBService2 } = await import("./indexedDBService-BebV9TT6.js");
      return { indexedDBService: indexedDBService2 };
    }, true ? [] : void 0);
    await indexedDBService.storeShorelineData("demo-current-shoreline", DEMO_SHORELINE_DATA);
    const segmentedGeoJSON = {
      type: "FeatureCollection",
      features: DEMO_SEGMENTED_DATA.map((segment) => ({
        type: "Feature",
        geometry: segment.geometry,
        properties: segment.properties
      }))
    };
    await indexedDBService.storeShorelineData("demo-segmented-shoreline", segmentedGeoJSON);
    console.log("Demo data initialized successfully");
  } catch (error) {
    console.error("Error initializing demo data:", error);
  }
}
async function clearDemoData() {
  try {
    const { indexedDBService } = await __vitePreload(async () => {
      const { indexedDBService: indexedDBService2 } = await import("./indexedDBService-BebV9TT6.js");
      return { indexedDBService: indexedDBService2 };
    }, true ? [] : void 0);
    await indexedDBService.deleteShorelineData("demo-current-shoreline");
    await indexedDBService.deleteShorelineData("demo-segmented-shoreline");
    console.log("Demo data cleared successfully");
  } catch (error) {
    console.error("Error clearing demo data:", error);
  }
}
export {
  DEMO_SEGMENTED_DATA,
  DEMO_SHORELINE_DATA,
  clearDemoData,
  initializeDemoData
};
//# sourceMappingURL=demoData-_xnHuZ7Z.js.map
