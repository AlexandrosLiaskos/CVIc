import { u as useNavigate, j as jsxRuntimeExports } from "./index-D694obFq.js";
import { b as reactExports } from "./leaflet-CCUyKKIY.js";
import { i as indexedDBService } from "./indexedDBService-C0Tzj_Tb.js";
import { g as getStandardizedIndexById, v as validateIndexParameters, S as STANDARDIZED_COASTAL_INDICES } from "./indices-CCVn6S0N.js";
import "./georaster-layer-D-eO7TID.js";
import "./georaster-UMjhm2qh.js";
import "./geotiff-70LCDX0v.js";
const PARAMETER_CATEGORY_LABELS = {
  [
    "physical"
    /* PHYSICAL */
  ]: "Physical",
  [
    "hydroclimate"
    /* HYDROCLIMATE */
  ]: "Hydroclimate",
  [
    "environmental"
    /* ENVIRONMENTAL */
  ]: "Environmental",
  [
    "socioeconomic"
    /* SOCIOECONOMIC */
  ]: "Socioeconomic",
  [
    "shoreline"
    /* SHORELINE */
  ]: "Shoreline",
  [
    "infrastructure"
    /* INFRASTRUCTURE */
  ]: "Infrastructure",
  [
    "physical_geological"
    /* PHYSICAL_GEOLOGICAL */
  ]: "Physical/Geological"
};
const PARAMETER_CATEGORY_MAP = {
  // Physical parameters
  "coastal_geomorphology": "physical",
  "coastal_slope": "physical",
  "rock_type": "physical",
  "beach_width": "physical",
  "dune_width": "physical",
  "median_grain_size": "physical_geological",
  "coastal_geotechnical_map": "physical_geological",
  // Hydroclimate parameters
  "sea_level_change": "hydroclimate",
  "mean_tide_range": "hydroclimate",
  "mean_wave_height": "hydroclimate",
  // Shoreline parameters
  "shoreline_change": "shoreline",
  "barrier_type": "shoreline",
  "shoreline_exposure": "shoreline",
  "sea_defences": "shoreline",
  // Environmental parameters
  "natural_protection": "environmental",
  "ecosystem_type": "environmental",
  "environmental_conservancy": "environmental",
  "interest_species": "environmental",
  "vegetation_distance": "environmental",
  "posidonia_oceanica": "environmental",
  // Socioeconomic parameters
  "population_density": "socioeconomic",
  "economic_value": "socioeconomic",
  "land_use": "socioeconomic",
  "building_coast_ratio": "socioeconomic",
  "sociocultural_heritage": "socioeconomic",
  "cultural_heritage": "socioeconomic",
  "use_of_territory": "socioeconomic",
  "commercial_properties": "socioeconomic",
  "residential_properties": "socioeconomic",
  // Infrastructure parameters
  "infrastructure_density": "infrastructure",
  "distance_built_structures": "infrastructure"
  /* INFRASTRUCTURE */
};
function getParameterCategory(standardName) {
  const category = PARAMETER_CATEGORY_MAP[standardName] || "physical";
  return {
    category,
    label: PARAMETER_CATEGORY_LABELS[category]
  };
}
function getParameterCategoryCounts(standardNames) {
  const counts = {};
  standardNames.forEach((name) => {
    const categoryInfo = getParameterCategory(name);
    const categoryLabel = categoryInfo.label;
    counts[categoryLabel] = (counts[categoryLabel] || 0) + 1;
  });
  return counts;
}
function ParameterSelectionPage() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = reactExports.useState("");
  const [selectedFormula, setSelectedFormula] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
  const currentIndex = selectedIndex ? getStandardizedIndexById(selectedIndex) : null;
  const selectedParameters = currentIndex ? currentIndex.requiredParameters : [];
  const handleIndexChange = (indexId) => {
    setSelectedIndex(indexId);
    setSelectedFormula("");
    const newIndex = getStandardizedIndexById(indexId);
    if (newIndex?.availableFormulas && newIndex.availableFormulas.length > 0) {
      setSelectedFormula(newIndex.availableFormulas[0].id);
    } else if (newIndex) {
      setSelectedFormula(newIndex.formula);
    }
  };
  const effectiveFormula = selectedFormula || (currentIndex?.formula ?? "");
  const getSelectedParameterCategoryCounts = () => {
    const standardNames = selectedParameters.map((param) => param.standardName);
    return getParameterCategoryCounts(standardNames);
  };
  const validation = currentIndex && selectedParameters.length > 0 ? validateIndexParameters(currentIndex.id, selectedParameters) : { errors: [] };
  const handleContinue = async () => {
    if (!currentIndex) {
      setError("Please select a coastal vulnerability index");
      return;
    }
    if (selectedParameters.length === 0) {
      setError("No parameters available for the selected index");
      return;
    }
    try {
      setError(null);
      const parametersForStorage = selectedParameters.map((param) => ({
        id: param.id,
        name: param.indexSpecificName,
        description: param.description,
        type: param.type,
        weight: param.weight,
        enabled: true,
        ...param.unit && { unit: param.unit },
        // Use the index-specific ranking table directly
        vulnerabilityRanges: param.rankingTable.map((range) => ({
          value: range.value,
          min: null,
          // Will be parsed from criteria during value assignment
          max: null,
          // Will be parsed from criteria during value assignment
          label: range.label,
          color: range.color,
          criteria: range.criteria
          // Include the exact criteria from the index
        })),
        // Store the complete ranking table for reference
        indexSpecificRankingTable: param.rankingTable,
        // Additional fields for compatibility
        category: "physical",
        standardId: param.standardName,
        indexId: param.indexId,
        indexSpecificName: param.indexSpecificName
      }));
      const parameterCollection = {
        type: "FeatureCollection",
        features: parametersForStorage.map((param) => ({
          type: "Feature",
          properties: param,
          geometry: {
            type: "Point",
            coordinates: [0, 0]
          }
        }))
      };
      const indexData = {
        id: currentIndex.id,
        name: currentIndex.name,
        shortName: currentIndex.shortName,
        description: currentIndex.description,
        formula: effectiveFormula,
        // Use the selected formula
        type: currentIndex.type,
        citation: currentIndex.citation,
        parameterCount: selectedParameters.length,
        selectedAt: (/* @__PURE__ */ new Date()).toISOString(),
        // Store additional formula info for ICVI
        availableFormulas: currentIndex.availableFormulas,
        selectedFormula,
        resultClassification: currentIndex.resultClassification
      };
      const indexCollection = {
        type: "FeatureCollection",
        features: [{
          type: "Feature",
          properties: indexData,
          geometry: {
            type: "Point",
            coordinates: [0, 0]
          }
        }]
      };
      console.log("Saving index:", indexData);
      console.log("Saving parameters:", parametersForStorage.length, "parameters");
      await indexedDBService.storeShorelineData("current-index", indexCollection);
      await indexedDBService.storeShorelineData("current-parameters", parameterCollection);
      console.log("Successfully saved index and parameters");
      navigate("/parameter-assignment");
    } catch (err) {
      console.error("Error saving index and parameters:", err);
      setError(`Failed to save data: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto mt-8 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-center mb-8", children: "4. Index & Parameter Selection" }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[700px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6 flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Select Coastal Vulnerability Index" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Choose a standardized coastal vulnerability index:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: selectedIndex,
              onChange: (e) => handleIndexChange(e.target.value),
              className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select an Index" }),
                STANDARDIZED_COASTAL_INDICES.map((index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: index.id, children: [
                  index.shortName,
                  " - ",
                  index.name
                ] }, index.id))
              ]
            }
          )
        ] }),
        currentIndex?.availableFormulas && currentIndex.availableFormulas.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Choose calculation method:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: selectedFormula,
              onChange: (e) => setSelectedFormula(e.target.value),
              className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500",
              children: currentIndex.availableFormulas.map((formula) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: formula.id, children: formula.name }, formula.id))
            }
          ),
          selectedFormula && currentIndex.availableFormulas.find((f) => f.id === selectedFormula) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-gray-600", children: currentIndex.availableFormulas.find((f) => f.id === selectedFormula)?.description })
        ] }),
        currentIndex && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-gray-300 rounded-lg shadow-sm p-6 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-gray-200 pb-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xl font-bold text-gray-900 mb-1", children: currentIndex.shortName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-sm font-medium text-gray-600", children: currentIndex.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-700 leading-relaxed", children: currentIndex.description }),
            currentIndex.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 italic mt-2 leading-relaxed whitespace-pre-line", children: currentIndex.notes })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 text-sm space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-800", children: "Formula:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800", children: effectiveFormula })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-800", children: "Parameters:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800", children: currentIndex.requiredParameters.length })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-800", children: "Weights:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800", children: currentIndex.requiresEqualWeights ? "equal" : "variable" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "font-semibold text-gray-800 mb-2", children: "Parameter Categories:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 items-center", children: Object.entries(getSelectedParameterCategoryCounts()).map(([category, count]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-700", children: [
              count,
              " × ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800", children: category })
            ] }, category)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-gray-200 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "font-semibold text-gray-800 mb-2", children: "Citations:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50 p-3 rounded border-l-4 border-blue-500", children: [
              currentIndex.citation,
              currentIndex.citation && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                "\n\n",
                "Roukounis, C.N., Tsihrintzis, V.A. Indices of Coastal Vulnerability to Climate Change: a Review. Environ. Process. 9, 29 (2022). https://doi.org/10.1007/s40710-022-00577-9"
              ] })
            ] })
          ] })
        ] }),
        !currentIndex && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-gray-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base", children: "No index selected" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-2", children: "Choose an index above to see its parameters" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg border border-gray-200 p-6 flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Parameter Ranking Tables" }) }),
        validation.errors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium text-yellow-800 mb-1", children: "Validation Issues:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-xs text-yellow-700 list-disc list-inside", children: validation.errors.map((error2, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: error2 }, index)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 flex-grow overflow-y-auto", children: selectedParameters.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-gray-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base", children: "No index selected" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-2", children: "Choose an index to see parameter ranking tables" })
        ] }) : selectedParameters.map((param) => {
          const categoryInfo = getParameterCategory(param.standardName);
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border border-gray-200 rounded-lg shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-grow min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-gray-900 text-base truncate mb-1", children: param.indexSpecificName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-2", children: param.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800", children: param.type === "numerical" ? "Numerical" : "Categorical" }),
                param.unit && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800", children: param.unit }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800", children: categoryInfo.label })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 border border-gray-300 rounded-lg overflow-hidden bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-100 border-b border-gray-300", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left font-semibold text-gray-800 w-12", children: "Rank" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left font-semibold text-gray-800 w-20", children: "Level" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left font-semibold text-gray-800", children: "Criteria" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-gray-200", children: param.rankingTable.map((range, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50 transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-flex items-center justify-center w-6 h-6 rounded font-bold text-white text-xs",
                    style: { backgroundColor: range.color },
                    children: range.value
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-medium text-gray-900", children: range.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-gray-700 leading-relaxed", children: range.criteria })
              ] }, index)) })
            ] }) })
          ] }) }, param.id);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 pt-6 border-t border-gray-200 flex justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => navigate("/segment-table"),
          className: "px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
          children: "Back to Segment Table"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleContinue,
          className: "px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
          children: "Continue to Parameter Assignment"
        }
      )
    ] })
  ] });
}
export {
  ParameterSelectionPage as default
};
//# sourceMappingURL=ParameterSelectionPage-eOHj2yrS.js.map
