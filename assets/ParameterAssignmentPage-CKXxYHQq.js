import { j as jsxRuntimeExports, u as useNavigate } from "./index-D694obFq.js";
import { b as reactExports } from "./leaflet-CCUyKKIY.js";
import { M as Map, g as getCviCategory, a as getCviRank } from "./Map-DjRk7Cda.js";
import { i as indexedDBService } from "./indexedDBService-C0Tzj_Tb.js";
import { a as availableFormulas } from "./formulas-CIcQv-hn.js";
import { a as length, d as featureCollection, c as bbox, p as polygon, e as booleanIntersects } from "./turf-C25yoSNr.js";
import { E as ErrorAlert } from "./ErrorAlert-DlvKuJCH.js";
import "./georaster-layer-D-eO7TID.js";
import "./georaster-UMjhm2qh.js";
import "./geotiff-70LCDX0v.js";
/* empty css                      */
const MapInteractionPanel = ({
  segments,
  parameters,
  selectedSegmentIds,
  selectedParameterId,
  selectionPolygons,
  onSegmentSelect,
  onSelectionDelete,
  onAreaSelect,
  initialBounds,
  geoJSON,
  onSelectAll,
  onClearSelection,
  mapContainerRef,
  isReadOnly = false
  // Default to false if not provided
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-4 rounded-lg shadow h-full flex flex-col", children: [
    !isReadOnly && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 flex-shrink-0 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onSelectAll,
            className: "px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 whitespace-nowrap",
            title: "Select all visible segments",
            disabled: segments.length === 0,
            children: "Select All"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClearSelection,
            className: "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap",
            title: "Deselect all segments",
            disabled: selectedSegmentIds.length === 0,
            children: "Clear Selection"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-600 hidden sm:block", children: "Use drawing tools (polygon/rectangle) on map to select segments by area." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-grow border rounded overflow-hidden", ref: mapContainerRef, children: segments.length > 0 && geoJSON ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Map,
      {
        segments,
        parameters,
        geoJSON,
        selectedSegments: selectedSegmentIds,
        selectedParameter: selectedParameterId,
        selectionPolygons,
        onSegmentSelect: !isReadOnly ? onSegmentSelect : () => {
        },
        onSelectionDelete: !isReadOnly ? onSelectionDelete : () => {
        },
        onAreaSelect: !isReadOnly ? onAreaSelect : () => {
        },
        isEditing: !isReadOnly,
        initialBounds
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full flex items-center justify-center bg-gray-50 text-gray-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: segments.length === 0 ? "No shoreline segments loaded." : "Loading shoreline data..." }) }) })
  ] });
};
const ParameterValuePanel = ({
  parameters,
  activeParameter,
  onParameterSelect,
  selectedValue,
  selectedVulnerability,
  onValueSelect,
  onApplyValue,
  selectedSegmentIds
}) => {
  const parameterOptions = reactExports.useMemo(() => {
    if (!activeParameter) return [];
    if (activeParameter.type === "categorical" && activeParameter.options) {
      const options = activeParameter.options.map((option) => ({
        label: option.label,
        value: typeof option.value === "string" ? option.value : String(option.value),
        vulnerability: option.vulnerability
      }));
      const valuesSeen = {};
      options.forEach((option) => {
        if (valuesSeen[option.value]) console.warn(`Duplicate option value detected for ${activeParameter.name}: ${option.value}`);
        valuesSeen[option.value] = true;
      });
      return options;
    } else if (activeParameter.vulnerabilityRanges) {
      const rangesToUse = activeParameter.indexSpecificRankingTable || activeParameter.vulnerabilityRanges;
      const optionsFromRanges = [];
      rangesToUse.forEach((range) => {
        let rangeLabel = `${range.label}`;
        if (range.criteria) {
          rangeLabel += ` - ${range.criteria}`;
        } else if (range.min !== null && range.max !== null) {
          rangeLabel += ` (${range.min} - ${range.max}${activeParameter.unit || ""})`;
        } else if (range.min !== null) {
          rangeLabel += ` (>= ${range.min}${activeParameter.unit || ""})`;
        } else if (range.max !== null) {
          rangeLabel += ` (< ${range.max}${activeParameter.unit || ""})`;
        }
        optionsFromRanges.push({
          label: rangeLabel,
          value: range.value.toString(),
          vulnerability: range.value
        });
      });
      optionsFromRanges.sort((a, b) => a.vulnerability - b.vulnerability);
      return optionsFromRanges;
    } else if (activeParameter.type === "numerical") {
      console.warn(`Numerical parameter "${activeParameter.name}" has no vulnerabilityRanges defined. Using generic 1-5 scale.`);
      const vulnLabels = ["Very Low", "Low", "Moderate", "High", "Very High"];
      return [1, 2, 3, 4, 5].map((i) => ({
        label: `${vulnLabels[i - 1]} (Score: ${i})`,
        value: i.toString(),
        vulnerability: i
      }));
    }
    return [];
  }, [activeParameter]);
  const handleValueChange = (event) => {
    const selectedOptionValue = event.target.value;
    const selectedOption = parameterOptions.find((opt) => opt.value === selectedOptionValue);
    if (selectedOption) {
      onValueSelect(selectedOption.value, selectedOption.vulnerability);
    } else {
      onValueSelect(null, 1);
    }
  };
  const applyButtonText = reactExports.useMemo(() => {
    if (!activeParameter) return "Select a Parameter First";
    if (selectedValue === null) return "Select a Value First";
    if (selectedSegmentIds.length === 0) return "Select Segments First";
    return `Apply ${activeParameter.name}: ${selectedValue} to ${selectedSegmentIds.length} Segments`;
  }, [activeParameter, selectedValue, selectedSegmentIds]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium mb-4", children: "Parameter Values" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-4 text-sm text-gray-600", children: [
      selectedSegmentIds.length,
      " selected"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "parameter-select", className: "block text-sm font-medium text-gray-700 mb-2", children: "Select Parameter" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          id: "parameter-select",
          value: activeParameter?.id || "",
          onChange: (e) => onParameterSelect(e.target.value),
          className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
          children: parameters.length > 0 ? parameters.map((param) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: param.id, children: param.name }, param.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "No parameters available" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "value-select", className: "block text-sm font-medium text-gray-700 mb-2", children: [
        "Select Value ",
        activeParameter && `for ${activeParameter.name}`
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          id: "value-select",
          value: selectedValue || "",
          onChange: handleValueChange,
          className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm",
          disabled: !activeParameter || selectedSegmentIds.length === 0,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a value..." }),
            parameterOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: option.value, children: [
              option.label,
              " (Vulnerability: ",
              option.vulnerability,
              ")"
            ] }, option.value)),
            parameterOptions.length === 0 && activeParameter && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: "No values available" })
          ]
        }
      ),
      (!activeParameter || selectedSegmentIds.length === 0) && selectedValue === null && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-red-500", children: !activeParameter ? "Select a parameter first" : "Select segments on the map first" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Vulnerability Preview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2 text-gray-600", children: "Value:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: selectedValue || "-" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-4 text-gray-600", children: "Vulnerability:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-6 h-6 rounded-full text-white text-center flex items-center justify-center text-xs font-medium",
            style: {
              backgroundColor: (() => {
                if (selectedVulnerability >= 0 && selectedVulnerability < 1) {
                  if (selectedVulnerability < 0.2) return "#1a9850";
                  if (selectedVulnerability < 0.4) return "#91cf60";
                  if (selectedVulnerability < 0.6) return "#fee08b";
                  if (selectedVulnerability < 0.8) return "#fc8d59";
                  return "#d73027";
                }
                const rank = Math.round(selectedVulnerability);
                switch (rank) {
                  case 1:
                    return "#1a9850";
                  case 2:
                    return "#91cf60";
                  case 3:
                    return "#fee08b";
                  case 4:
                    return "#fc8d59";
                  case 5:
                    return "#d73027";
                  default:
                    return "#808080";
                }
              })()
            },
            children: selectedVulnerability || "?"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onApplyValue,
        disabled: !activeParameter || selectedValue === null || selectedSegmentIds.length === 0,
        className: "w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed",
        children: applyButtonText
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-600", children: selectedSegmentIds.length > 0 ? `${selectedSegmentIds.length} segments selected` : "No segments selected. Click on the map or use Select All" }) })
  ] });
};
const CviFormulaPanel = ({
  selectedFormula,
  onCalculateCvi,
  completionPercentage,
  calculatingCvi,
  cviScores,
  segments
}) => {
  const cviStatistics = reactExports.useMemo(() => {
    const scores = Object.values(cviScores);
    if (scores.length === 0) return null;
    const min = Math.min(...scores);
    const max = Math.max(...scores);
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = sum / scores.length;
    let veryLowCount = 0;
    let lowCount = 0;
    let moderateCount = 0;
    let highCount = 0;
    let veryHighCount = 0;
    scores.forEach((score) => {
      const category = getCviCategory(score, selectedFormula?.type);
      if (category === "Very Low") veryLowCount++;
      else if (category === "Low") lowCount++;
      else if (category === "Moderate") moderateCount++;
      else if (category === "High") highCount++;
      else if (category === "Very High") veryHighCount++;
    });
    return {
      min: min.toFixed(2),
      max: max.toFixed(2),
      avg: avg.toFixed(2),
      count: scores.length,
      categories: {
        veryLow: veryLowCount,
        low: lowCount,
        moderate: moderateCount,
        high: highCount,
        veryHigh: veryHighCount
      }
    };
  }, [cviScores, selectedFormula]);
  const canCalculate = reactExports.useMemo(() => {
    return completionPercentage >= 100 && selectedFormula !== null && !calculatingCvi;
  }, [completionPercentage, selectedFormula, calculatingCvi]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium mb-4", children: "CVI Calculation" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Index Formula" }),
      selectedFormula ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-blue-600", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-blue-900", children: selectedFormula.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full", children: "Auto-selected" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-700 mb-2", children: selectedFormula.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-600", children: "✓ Formula automatically determined by your selected coastal vulnerability index" }),
        selectedFormula.name === "CVI" && selectedFormula.type === "geometric-mean" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 p-2 bg-amber-50 border border-amber-200 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Note:" }),
          " Geometric mean formula preferred over traditional CVI formula to avoid distribution distortions and enable proper ranking of results."
        ] }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 border border-gray-200 rounded-lg p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4 text-gray-400", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z", clipRule: "evenodd" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-700", children: "No Formula Selected" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-600", children: "Please select a coastal vulnerability index in the parameter selection step to automatically set the appropriate formula." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onCalculateCvi,
          disabled: !canCalculate,
          className: "w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: `h-5 w-5 mr-2 ${calculatingCvi ? "animate-spin" : ""}`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: calculatingCvi ? (
              // Spinner path (simplified)
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" })
            ) : (
              // Calculator icon path
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 7h6m0 10v-6m-6 2h6m-6-4h6M9 3a1 1 0 011-1h4a1 1 0 011 1v1H9V3zM15 21a2 2 0 01-2 2H11a2 2 0 01-2-2m4-18a2 2 0 00-2-2H11a2 2 0 00-2 2m4 18V7m-4 14V7" })
            ) }),
            calculatingCvi ? "Calculating..." : `Calculate CVI ${selectedFormula ? `(${selectedFormula.name})` : ""}`
          ]
        }
      ),
      !selectedFormula && completionPercentage >= 100 && !calculatingCvi && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-red-600", children: "Please select a formula before calculating." }),
      completionPercentage < 100 && !calculatingCvi && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-amber-600", children: [
        "Complete all parameter values (",
        completionPercentage.toFixed(0),
        "%) before calculating CVI."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium text-gray-700", children: "Calculation Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2 text-gray-600 w-28 flex-shrink-0", children: "Selected Formula:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: selectedFormula?.name || "None Selected" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2 text-gray-600 w-28 flex-shrink-0", children: "Segments w/ CVI:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: Object.keys(cviScores).length }),
        segments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs text-gray-500", children: [
          "(",
          Math.round(Object.keys(cviScores).length / segments.length * 100),
          "% of ",
          segments.length,
          ")"
        ] })
      ] })
    ] }),
    Object.keys(cviScores).length > 0 && cviStatistics && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "CVI Score Categories & Stats" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap space-x-4 mb-3", children: [
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-xs whitespace-nowrap", children: [
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 bg-green-600 rounded-full mr-1.5 border border-green-700 flex-shrink-0" }),
          "Very Low ",
          `(1)`,
          " [",
          cviStatistics.categories.veryLow,
          "]"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-xs whitespace-nowrap", children: [
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 bg-lime-500 rounded-full mr-1.5 border border-lime-600 flex-shrink-0" }),
          "Low ",
          `(2)`,
          " [",
          cviStatistics.categories.low,
          "]"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-xs whitespace-nowrap", children: [
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 bg-yellow-400 rounded-full mr-1.5 border border-yellow-500 flex-shrink-0" }),
          "Moderate ",
          `(3)`,
          " [",
          cviStatistics.categories.moderate,
          "]"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-xs whitespace-nowrap", children: [
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 bg-orange-500 rounded-full mr-1.5 border border-orange-600 flex-shrink-0" }),
          "High ",
          `(4)`,
          " [",
          cviStatistics.categories.high,
          "]"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-xs whitespace-nowrap", children: [
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 bg-red-600 rounded-full mr-1.5 border border-red-700 flex-shrink-0" }),
          "Very High ",
          `(5)`,
          " [",
          cviStatistics.categories.veryHigh,
          "]"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-gray-600 grid grid-cols-3 gap-x-2 gap-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "Min: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-800", children: cviStatistics.min })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "Max: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-800", children: cviStatistics.max })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "Avg: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-800", children: cviStatistics.avg })
        ] })
      ] })
    ] })
  ] });
};
const SEGMENTS_PER_PAGE = 10;
const SegmentTablePanel = ({
  segments,
  parameters: enabledParameters,
  selectedSegmentIds,
  onSegmentSelect,
  cviScores,
  selectedFormula,
  cviStatistics
}) => {
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const sortedSegments = reactExports.useMemo(() => {
    const segmentsCopy = [...segments];
    const compareSegmentIds = (idA, idB) => {
      const numA = parseInt(idA.split("-")[1] || "0", 10);
      const numB = parseInt(idB.split("-")[1] || "0", 10);
      return numA - numB;
    };
    segmentsCopy.sort((a, b) => {
      const isSelectedA = selectedSegmentIds.includes(a.id);
      const isSelectedB = selectedSegmentIds.includes(b.id);
      if (isSelectedA !== isSelectedB) {
        return isSelectedA ? -1 : 1;
      }
      return compareSegmentIds(a.id, b.id);
    });
    return segmentsCopy;
  }, [segments, selectedSegmentIds]);
  const paginatedSegments = reactExports.useMemo(() => {
    const startIndex = (currentPage - 1) * SEGMENTS_PER_PAGE;
    return sortedSegments.slice(startIndex, startIndex + SEGMENTS_PER_PAGE);
  }, [sortedSegments, currentPage]);
  const totalPages = Math.ceil(sortedSegments.length / SEGMENTS_PER_PAGE);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const getDisplayId = (segmentId) => {
    return segmentId.includes("segment-") ? segmentId.split("-")[1] : segmentId;
  };
  const getVulnerabilityColor = (vulnerability) => {
    if (vulnerability === null || vulnerability === void 0) return "#808080";
    if (vulnerability >= 0 && vulnerability < 1) {
      if (vulnerability < 0.2) return "#1a9850";
      if (vulnerability < 0.4) return "#91cf60";
      if (vulnerability < 0.6) return "#fee08b";
      if (vulnerability < 0.8) return "#fc8d59";
      return "#d73027";
    }
    const rank = Math.round(vulnerability);
    switch (rank) {
      case 1:
        return "#1a9850";
      case 2:
        return "#91cf60";
      case 3:
        return "#fee08b";
      case 4:
        return "#fc8d59";
      case 5:
        return "#d73027";
      default:
        return "#808080";
    }
  };
  const getCviColor = (score, formula) => {
    if (score === null || score === void 0 || isNaN(score)) return "#808080";
    const rank = getCviRank(score, formula);
    if (rank <= 1) return "#1a9850";
    if (rank === 2) return "#91cf60";
    if (rank === 3) return "#fee08b";
    if (rank === 4) return "#fc8d59";
    if (rank >= 5) return "#d73027";
    return "#808080";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium mb-4", children: "Segment Values" }),
    selectedFormula && cviStatistics && Object.keys(cviScores).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-blue-800 mr-2", children: "CVI Calculation:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-700", children: selectedFormula.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-blue-600", children: selectedFormula.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 grid grid-cols-3 gap-x-4 gap-y-1 text-sm", children: [
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500", children: "Segments:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-blue-800", children: [
            cviStatistics.count,
            " of ",
            segments.length
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500", children: "Range:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-blue-800", children: [
            cviStatistics.min,
            " - ",
            cviStatistics.max
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500", children: "Average:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-blue-800", children: cviStatistics.avg })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-3 pt-1 border-t border-blue-100 mt-1 text-xs", children: [
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-500", children: "Counts:" }),
          " Very Low: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-blue-800", children: cviStatistics.categories.veryLow }),
          ", Low: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-blue-800", children: cviStatistics.categories.low }),
          ", Moderate: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-blue-800", children: cviStatistics.categories.moderate }),
          ", High: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-blue-800", children: cviStatistics.categories.high }),
          ", Very High: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-blue-800", children: cviStatistics.categories.veryHigh })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full table-auto divide-y divide-gray-200 min-w-max", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[60px]", children: "ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]", children: "Length (m)" }),
          enabledParameters.map((param) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]", title: param.name, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center space-y-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center leading-tight break-words max-w-[90px]", children: param.name }) }) }, param.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "col", className: "px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "CVI" }),
            selectedFormula && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-blue-500 text-xs normal-case", title: selectedFormula.name, children: [
              "(",
              selectedFormula.name.length > 15 ? selectedFormula.name.substring(0, 12) + "..." : selectedFormula.name,
              ")"
            ] })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "bg-white divide-y divide-gray-200", children: [
          paginatedSegments.map((segment, index) => {
            const displayId = getDisplayId(segment.id);
            const isSelected = selectedSegmentIds.includes(segment.id);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: `${isSelected ? "bg-blue-50 font-medium" : index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-100 transition-colors duration-150`,
                onClick: () => onSegmentSelect(segment.id),
                style: { cursor: "pointer" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap text-xs text-gray-900", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "checkbox",
                        checked: isSelected,
                        onChange: (e) => {
                          e.stopPropagation();
                          onSegmentSelect(segment.id);
                        },
                        className: "mr-2 h-3 w-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500",
                        "aria-label": `Select segment ${displayId}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: displayId })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap text-xs text-gray-900", children: typeof segment.properties?.length === "number" ? segment.properties.length.toFixed(0) : "N/A" }),
                  enabledParameters.map((param) => {
                    const paramValue = segment.parameters?.[param.id];
                    const vulnerability = paramValue?.vulnerability ?? null;
                    return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-2 whitespace-nowrap text-xs text-center", children: vulnerability !== null ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", title: `Value: ${paramValue?.value ?? "N/A"}, Vulnerability: ${vulnerability}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        title: `Vulnerability: ${vulnerability}`,
                        className: "w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium",
                        style: { backgroundColor: getVulnerabilityColor(vulnerability) },
                        children: vulnerability
                      }
                    ) }) : "-" }, param.id);
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 whitespace-nowrap text-xs text-gray-900 text-center", children: cviScores[segment.id] !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      title: `CVI Score: ${cviScores[segment.id].toFixed(2)} (${getCviCategory(cviScores[segment.id], segment.properties.vulnerabilityFormula)})`,
                      className: "w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-medium",
                      style: { backgroundColor: getCviColor(cviScores[segment.id], segment.properties.vulnerabilityFormula) },
                      children: segment.properties.vulnerabilityFormula?.includes("icvi") ? cviScores[segment.id].toFixed(2) : getCviRank(cviScores[segment.id], segment.properties.vulnerabilityFormula)
                    }
                  ) : "-" })
                ]
              },
              segment.id
            );
          }),
          paginatedSegments.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: enabledParameters.length + 3, className: "px-2 py-4 text-center text-xs text-gray-500", children: "No segments to display for the current page." }) })
        ] })
      ] })
    ] }),
    totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between border-t pt-3", children: [
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gray-500 text-sm", children: [
        "Showing ",
        (currentPage - 1) * SEGMENTS_PER_PAGE + 1,
        " to ",
        Math.min(currentPage * SEGMENTS_PER_PAGE, sortedSegments.length),
        " of ",
        sortedSegments.length,
        " segments"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-1 sm:space-x-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handlePageChange(currentPage - 1),
            disabled: currentPage === 1,
            className: "px-3 py-1 border border-gray-300 rounded-md text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50",
            "aria-label": "Previous page",
            children: "Previous"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs p-1 text-gray-700", children: [
          " ",
          "Page ",
          currentPage,
          " of ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handlePageChange(currentPage + 1),
            disabled: currentPage === totalPages,
            className: "px-3 py-1 border border-gray-300 rounded-md text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50",
            "aria-label": "Next page",
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
};
const useParameterAssignmentData = () => {
  const navigate = useNavigate();
  const [segments, setSegments] = reactExports.useState([]);
  const [parameters, setParameters] = reactExports.useState([]);
  const [mapBounds, setMapBounds] = reactExports.useState(null);
  const [initialCviScores, setInitialCviScores] = reactExports.useState({});
  const [initialFormula, setInitialFormula] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const loadData = reactExports.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Loading data for Parameter Assignment...");
      const segmentData = await indexedDBService.getShorelineData("current-segments");
      if (!segmentData || !segmentData.features || segmentData.features.length === 0) {
        setError("No segments found. Please complete the segmentation step first.");
        navigate("/segment-table");
        setLoading(false);
        return;
      }
      const parameterData = await indexedDBService.getShorelineData("current-parameters");
      console.log("Raw parameter data from IndexedDB:", parameterData);
      if (!parameterData || !parameterData.features || parameterData.features.length === 0) {
        console.log("No parameter data found in IndexedDB");
        setError("No parameters found. Please complete the parameter selection step first.");
        navigate("/parameter-selection");
        setLoading(false);
        return;
      }
      const indexData = await indexedDBService.getShorelineData("current-index");
      console.log("Raw index data from IndexedDB:", indexData);
      let indexFormula = null;
      if (indexData && indexData.features && indexData.features.length > 0) {
        const savedIndex = indexData.features[0].properties;
        console.log("Loaded saved index:", savedIndex);
        if (savedIndex && savedIndex.formula) {
          const formulaType = savedIndex.formula;
          const formulaName = savedIndex.shortName || savedIndex.name || "Unknown Index";
          const formulaDescription = `${formulaName} formula`;
          indexFormula = {
            type: formulaType,
            name: formulaName,
            description: formulaDescription
          };
          console.log("Set formula from index:", indexFormula);
        }
      } else {
        console.warn("No index data found - formula will need to be selected manually");
      }
      const loadedSegments = segmentData.features.filter((feature) => feature && feature.geometry && (feature.geometry.type === "LineString" || feature.geometry.type === "MultiLineString")).map((feature, index) => {
        const segmentId = feature.properties?.id || `segment-${index + 1}`;
        const propertiesBase = feature.properties || {};
        const parametersFromProperties = propertiesBase.parameters && typeof propertiesBase.parameters === "object" ? propertiesBase.parameters : {};
        let length$1 = propertiesBase.length;
        if (length$1 === void 0 || length$1 === null || typeof length$1 !== "number") {
          try {
            length$1 = length(feature.geometry, { units: "meters" });
          } catch (e) {
            console.warn(`Could not calculate length for segment ${segmentId}:`, e);
            length$1 = 0;
          }
        }
        const finalProperties = {
          ...propertiesBase,
          id: segmentId,
          length: length$1,
          parameters: parametersFromProperties,
          index: propertiesBase.index ?? index + 1,
          vulnerabilityIndex: propertiesBase.vulnerabilityIndex,
          vulnerabilityFormula: propertiesBase.vulnerabilityFormula
        };
        return {
          id: segmentId,
          type: "Feature",
          geometry: feature.geometry,
          properties: finalProperties,
          parameters: parametersFromProperties
        };
      });
      if (loadedSegments.length === 0) throw new Error("No valid line segments found after filtering");
      console.log(`Processed ${loadedSegments.length} segments`);
      setSegments(loadedSegments);
      if (loadedSegments.length > 0) {
        const featuresForBounds = loadedSegments.map((s) => ({ type: "Feature", geometry: s.geometry, properties: {} }));
        const fc = featureCollection(featuresForBounds);
        try {
          const bbox$1 = bbox(fc);
          if (bbox$1 && bbox$1.length === 4 && bbox$1.every((b) => isFinite(b)) && bbox$1[0] <= bbox$1[2] && bbox$1[1] <= bbox$1[3]) {
            const bounds = [[bbox$1[1], bbox$1[0]], [bbox$1[3], bbox$1[2]]];
            setMapBounds(bounds);
            console.log("Calculated map bounds:", bounds);
          } else {
            console.warn("Could not calculate valid bounds from segments.");
          }
        } catch (e) {
          console.error("Error calculating bounds:", e);
        }
      }
      console.log("Parameter features from IndexedDB:", parameterData.features);
      const mappedParameters = parameterData.features.map((feature) => {
        console.log("Feature properties:", feature.properties);
        return feature.properties;
      });
      console.log("Mapped parameters:", mappedParameters);
      const loadedParameters = mappedParameters.filter((p) => {
        console.log(`Parameter ${p?.name}: enabled=${p?.enabled}, p !== null: ${p !== null}`);
        return p !== null && p.enabled === true;
      });
      console.log(`Processed ${loadedParameters.length} enabled parameters out of ${mappedParameters.length} total`);
      console.log("Final loaded parameters:", loadedParameters);
      setParameters(loadedParameters);
      const existingScores = loadedSegments.reduce((acc, seg) => {
        if (seg.properties.vulnerabilityIndex !== void 0 && seg.properties.vulnerabilityIndex !== null) {
          acc[seg.id] = seg.properties.vulnerabilityIndex;
        }
        return acc;
      }, {});
      if (Object.keys(existingScores).length > 0) {
        console.log(`Loaded ${Object.keys(existingScores).length} pre-existing CVI scores`);
        setInitialCviScores(existingScores);
      }
      if (indexFormula) {
        console.log(`Setting formula from saved index: ${indexFormula.name}`);
        setInitialFormula(indexFormula);
      } else {
        const firstSegmentWithFormula = loadedSegments.find((seg) => seg.properties.vulnerabilityFormula);
        if (firstSegmentWithFormula?.properties.vulnerabilityFormula) {
          const formula = availableFormulas.find((f) => f.type === firstSegmentWithFormula.properties.vulnerabilityFormula);
          if (formula) {
            console.log(`Setting fallback formula from segment: ${formula.name}`);
            setInitialFormula(formula);
          } else {
            console.warn(`Segment ${firstSegmentWithFormula.id} has unknown formula type: ${firstSegmentWithFormula.properties.vulnerabilityFormula}`);
          }
        }
      }
    } catch (err) {
      console.error("Error loading data:", err);
      setError(`Failed to load assignment data: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  }, [navigate]);
  reactExports.useEffect(() => {
    loadData();
  }, [loadData]);
  return {
    segments,
    setSegments,
    parameters,
    mapBounds,
    initialCviScores,
    initialFormula,
    loading,
    error,
    setError
  };
};
const applyParameterValueToSegments = async (segments, selectedSegmentIds, activeParameter, valueToApply, vulnerabilityToApply) => {
  console.log(`Applying value "${valueToApply}" (vuln: ${vulnerabilityToApply}) for "${activeParameter.name}" to ${selectedSegmentIds.length} segments`);
  let updateOccurred = false;
  const updatedSegments = segments.map((segment) => {
    if (selectedSegmentIds.includes(segment.id)) {
      let paramValue;
      let segmentNeedsUpdate = false;
      if (activeParameter.type === "numerical") {
        const numValue = parseFloat(valueToApply);
        if (!isNaN(numValue)) {
          paramValue = { type: "numerical", value: numValue, vulnerability: vulnerabilityToApply };
        } else {
          console.error(`Skipping segment ${segment.id}: Invalid numerical value ${valueToApply}`);
          return segment;
        }
      } else {
        paramValue = { type: "categorical", value: valueToApply, vulnerability: vulnerabilityToApply };
      }
      const existingValue = segment.parameters?.[activeParameter.id];
      if (!existingValue || existingValue.value !== paramValue.value || existingValue.vulnerability !== paramValue.vulnerability) {
        segmentNeedsUpdate = true;
      }
      if (segmentNeedsUpdate) {
        updateOccurred = true;
        const updatedDirectParameters = { ...segment.parameters, [activeParameter.id]: paramValue };
        const currentProperties = segment.properties || { id: segment.id };
        const currentPropertiesParams = currentProperties.parameters && typeof currentProperties.parameters === "object" ? currentProperties.parameters : {};
        const updatedProperties = {
          ...currentProperties,
          parameters: { ...currentPropertiesParams, [activeParameter.id]: paramValue }
        };
        return { ...segment, parameters: updatedDirectParameters, properties: updatedProperties };
      }
    }
    return segment;
  });
  if (updateOccurred) {
    try {
      const featuresToStore = updatedSegments.map((seg) => ({
        type: "Feature",
        geometry: seg.geometry,
        properties: seg.properties
      }));
      await indexedDBService.storeShorelineData("current-segments", {
        type: "FeatureCollection",
        features: featuresToStore
      });
      console.log("Stored updated segments after value application");
    } catch (error) {
      console.error("Failed to store updated segments:", error);
      throw new Error(`Failed to save changes: ${error instanceof Error ? error.message : String(error)}`);
    }
  } else {
    console.log("No actual segment values changed, skipping database update.");
  }
  return updatedSegments;
};
class CVICalculator {
  /**
   * Calculate CVI for a single set of values
   */
  static calculate(values) {
    if (values.length === 0) return 0;
    let product = 1;
    for (let i = 0; i < values.length; i++) {
      const value = Math.max(1e-9, values[i]);
      product *= value;
    }
    return Math.pow(product, 1 / values.length);
  }
  /**
   * Extract CVI parameter values from a segment
   */
  static extractValues(segment, parameters) {
    const values = [];
    parameters.forEach((param) => {
      const paramValue = segment.parameters?.[param.id];
      if (paramValue) {
        const vulnerability = Math.max(1, Math.min(5, paramValue.vulnerability));
        values.push(vulnerability);
      }
    });
    return values;
  }
  /**
   * Validate that segment has all required CVI parameters
   */
  static hasAllParameters(segment, parameters) {
    return parameters.every(
      (param) => segment.parameters && segment.parameters[param.id] !== void 0
    );
  }
}
class ICVICalculator {
  /**
   * Calculate ICVI using arithmetic mean approach
   * EVI = (a+b+c+d+e+f)/6, SVI = (g+h+i+j+k+l)/6, ICVI = (EVI+SVI)/2
   */
  static calculateArithmetic(parameters) {
    const { eviValues, sviValues } = this.extractEVISVIValues(parameters);
    const eviValue = eviValues.reduce((acc, val) => acc + val, 0) / eviValues.length;
    const sviValue = sviValues.reduce((acc, val) => acc + val, 0) / sviValues.length;
    const icviValue = (eviValue + sviValue) / 2;
    return {
      value: icviValue,
      formula: `ICVI = (EVI + SVI)/2 = (${eviValue.toFixed(3)} + ${sviValue.toFixed(3)})/2 = ${icviValue.toFixed(3)}`,
      components: {
        evi: eviValue,
        svi: sviValue
      }
    };
  }
  /**
   * Calculate ICVI using geometric mean approach
   * EVI = ⁶√(a×b×c×d×e×f), SVI = ⁶√(g×h×i×j×k×l), ICVI = (EVI+SVI)/2
   */
  static calculateGeometric(parameters) {
    const { eviValues, sviValues } = this.extractEVISVIValues(parameters);
    const eviProduct = eviValues.reduce((acc, val) => acc * val, 1);
    const eviValue = Math.pow(eviProduct, 1 / eviValues.length);
    const sviProduct = sviValues.reduce((acc, val) => acc * val, 1);
    const sviValue = Math.pow(sviProduct, 1 / sviValues.length);
    const icviValue = (eviValue + sviValue) / 2;
    return {
      value: icviValue,
      formula: `ICVI = (EVI + SVI)/2 = (${eviValue.toFixed(4)} + ${sviValue.toFixed(4)})/2 = ${icviValue.toFixed(4)}`,
      components: {
        evi: eviValue,
        svi: sviValue
      }
    };
  }
  /**
   * Extract EVI and SVI parameter values from parameters
   */
  static extractEVISVIValues(parameters) {
    const eviParams = parameters.filter(
      (p) => [
        "icvi_geomorphological_features",
        "icvi_slope",
        "icvi_shoreline_migration",
        "icvi_ecosystem_type",
        "icvi_conservation_measures",
        "icvi_species_interest"
      ].includes(p.id)
    );
    const sviParams = parameters.filter(
      (p) => [
        "icvi_land_use",
        "icvi_building_coast_ratio",
        "icvi_population_density",
        "icvi_economic_activity",
        "icvi_economic_value",
        "icvi_heritage"
      ].includes(p.id)
    );
    const eviValues = eviParams.map((p) => p.vulnerabilityValue || 0.1);
    const sviValues = sviParams.map((p) => p.vulnerabilityValue || 0.1);
    return { eviValues, sviValues };
  }
  /**
   * Extract ICVI parameter values from a segment
   */
  static extractValues(segment, parameters) {
    return parameters.map((param) => {
      const segmentValue = segment.parameters?.[param.id];
      return {
        ...param,
        vulnerabilityValue: segmentValue?.vulnerability || 0.1
      };
    });
  }
  /**
   * Validate that segment has all required ICVI parameters
   */
  static hasAllParameters(segment, parameters) {
    return parameters.every(
      (param) => segment.parameters && segment.parameters[param.id] !== void 0
    );
  }
}
class IndexCalculatorFactory {
  /**
   * Calculate index value for a segment using the specified formula
   */
  static calculate(segment, parameters, formula) {
    switch (formula.type) {
      case "cvi-geometric":
        return this.calculateCVI(segment, parameters);
      case "icvi-arithmetic":
        return this.calculateICVIArithmetic(segment, parameters);
      case "icvi-geometric":
        return this.calculateICVIGeometric(segment, parameters);
      default:
        throw new Error(`Unsupported formula type: ${formula.type}`);
    }
  }
  /**
   * Check if segment has all required parameters for the formula
   */
  static hasAllParameters(segment, parameters, formula) {
    switch (formula.type) {
      case "cvi-geometric":
        return CVICalculator.hasAllParameters(segment, parameters);
      case "icvi-arithmetic":
      case "icvi-geometric":
        return ICVICalculator.hasAllParameters(segment, parameters);
      default:
        return false;
    }
  }
  /**
   * Calculate CVI for a segment
   */
  static calculateCVI(segment, parameters) {
    const values = CVICalculator.extractValues(segment, parameters);
    const result = CVICalculator.calculate(values);
    return {
      value: result,
      formula: `CVI = ⁿ√(∏Vi) = ${result.toFixed(3)}`
    };
  }
  /**
   * Calculate ICVI using arithmetic mean
   */
  static calculateICVIArithmetic(segment, parameters) {
    const parametersWithValues = ICVICalculator.extractValues(segment, parameters);
    const result = ICVICalculator.calculateArithmetic(parametersWithValues);
    return {
      value: result.value,
      formula: result.formula,
      components: {
        "EVI (50%)": result.components.evi,
        "SVI (50%)": result.components.svi
      }
    };
  }
  /**
   * Calculate ICVI using geometric mean
   */
  static calculateICVIGeometric(segment, parameters) {
    const parametersWithValues = ICVICalculator.extractValues(segment, parameters);
    const result = ICVICalculator.calculateGeometric(parametersWithValues);
    return {
      value: result.value,
      formula: result.formula,
      components: {
        "EVI (50%)": result.components.evi,
        "SVI (50%)": result.components.svi
      }
    };
  }
}
const calculateAndSaveIndex = async (segments, parameters, formula, setSegments, setCviScores, setError) => {
  console.log("Calculating index using formula:", formula.name);
  setError(null);
  try {
    const newIndexScores = {};
    const updatedSegments = [...segments];
    let segmentsUpdated = false;
    const relevantParameters = parameters.filter((p) => p.weight === void 0 || p.weight > 0);
    if (relevantParameters.length === 0) {
      throw new Error("No relevant parameters found for calculation");
    }
    if (segments.length === 0) {
      throw new Error("No segments found for calculation");
    }
    segments.forEach((segment, index) => {
      if (!IndexCalculatorFactory.hasAllParameters(segment, relevantParameters, formula)) {
        return;
      }
      try {
        const result = IndexCalculatorFactory.calculate(segment, relevantParameters, formula);
        const indexScore = Math.round(result.value * 100) / 100;
        newIndexScores[segment.id] = indexScore;
        if (updatedSegments[index]?.properties && (updatedSegments[index].properties.vulnerabilityIndex !== indexScore || updatedSegments[index].properties.vulnerabilityFormula !== formula.type)) {
          updatedSegments[index].properties.vulnerabilityIndex = indexScore;
          updatedSegments[index].properties.vulnerabilityFormula = formula.type;
          segmentsUpdated = true;
        }
      } catch (calculationError) {
        console.error(`Failed to calculate ${formula.name} for segment ${segment.id}:`, calculationError);
        setError(`Calculation failed for segment ${segment.id}: ${calculationError}`);
        return;
      }
    });
    const geoJsonToStore = {
      type: "FeatureCollection",
      features: updatedSegments.map((seg) => ({
        type: "Feature",
        geometry: seg.geometry,
        properties: seg.properties
      }))
    };
    if (segmentsUpdated) {
      await indexedDBService.storeShorelineData("current-segments", geoJsonToStore);
      setSegments(updatedSegments);
    }
    setCviScores(newIndexScores);
    console.log(`${formula.name} calculation completed successfully`);
  } catch (error) {
    console.error(`${formula.name} calculation failed:`, error);
    setError(`${formula.name} calculation failed: ${error}`);
  }
};
const ParameterAssignmentHeader = ({
  title,
  completionPercentage
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-800", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600", children: "Overall Completion:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 bg-gray-200 rounded-full h-2.5 mt-1 dark:bg-gray-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-blue-600 h-2.5 rounded-full",
          style: { width: `${completionPercentage}%` }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 mt-0.5", children: [
        completionPercentage,
        "%"
      ] })
    ] })
  ] });
};
function ParameterAssignmentPage() {
  const navigate = useNavigate();
  const mapContainerRef = reactExports.useRef(null);
  const {
    segments,
    setSegments,
    parameters,
    mapBounds,
    initialCviScores,
    initialFormula,
    loading: dataLoading,
    error: dataError,
    setError: setDataError
  } = useParameterAssignmentData();
  const [selectedSegments, setSelectedSegments] = reactExports.useState([]);
  const [activeParameter, setActiveParameter] = reactExports.useState(null);
  const [selectionPolygons, setSelectionPolygons] = reactExports.useState([]);
  const [currentValueToApply, setCurrentValueToApply] = reactExports.useState(null);
  const [currentVulnerabilityToApply, setCurrentVulnerabilityToApply] = reactExports.useState(1);
  const [selectedFormula, setSelectedFormula] = reactExports.useState(null);
  const [cviScores, setCviScores] = reactExports.useState({});
  const [calculatingCvi, setCalculatingCvi] = reactExports.useState(false);
  const [pageError, setPageError] = reactExports.useState(null);
  const [activeTab, setActiveTab] = reactExports.useState("parameters");
  reactExports.useEffect(() => {
    if (!dataLoading && parameters.length > 0 && !activeParameter) {
      setActiveParameter(parameters[0]);
    }
    if (!dataLoading && initialFormula && !selectedFormula) {
      setSelectedFormula(initialFormula);
    }
    if (!dataLoading && Object.keys(initialCviScores).length > 0 && Object.keys(cviScores).length === 0) {
      setCviScores(initialCviScores);
    }
  }, [dataLoading, parameters, initialFormula, initialCviScores, activeParameter, selectedFormula, cviScores]);
  const completionPercentage = reactExports.useMemo(() => {
    if (segments.length === 0 || parameters.length === 0) return 0;
    const totalPossibleValues = segments.length * parameters.length;
    let filledValues = 0;
    segments.forEach((segment) => {
      parameters.forEach((param) => {
        if (segment.parameters && segment.parameters[param.id] !== void 0) filledValues++;
      });
    });
    return totalPossibleValues === 0 ? 0 : Math.round(filledValues / totalPossibleValues * 100);
  }, [segments, parameters]);
  const geoJSONForMap = reactExports.useMemo(() => {
    if (!segments || segments.length === 0) return null;
    return {
      type: "FeatureCollection",
      features: segments.map((segment) => ({
        type: "Feature",
        geometry: segment.geometry,
        properties: {
          ...segment.properties,
          id: segment.id,
          isSelected: selectedSegments.includes(segment.id),
          vulnerabilityIndex: segment.properties.vulnerabilityIndex,
          vulnerabilityFormula: segment.properties.vulnerabilityFormula
        }
      }))
    };
  }, [segments, selectedSegments]);
  const handleError = (message) => {
    setPageError(message);
    if (message) console.error("Error:", message);
  };
  const handleSegmentSelect = reactExports.useCallback((segmentId) => {
    setSelectedSegments((prev) => prev.includes(segmentId) ? prev.filter((id) => id !== segmentId) : [...prev, segmentId]);
  }, []);
  const handleSelectAll = reactExports.useCallback(() => {
    setSelectedSegments(segments.map((s) => s.id));
  }, [segments]);
  const handleClearSelection = reactExports.useCallback(() => {
    setSelectedSegments([]);
  }, []);
  const handleParameterSelect = reactExports.useCallback((parameterId) => {
    const parameter = parameters.find((p) => p.id === parameterId);
    if (parameter) {
      setActiveParameter(parameter);
      setCurrentValueToApply(null);
      setCurrentVulnerabilityToApply(1);
      console.log("Parameter selected:", parameter.name);
      handleError(null);
    } else {
      console.error("Parameter not found:", parameterId);
      handleError("Selected parameter could not be found.");
    }
  }, [parameters]);
  const handleValueSelect = reactExports.useCallback((value, vulnerability) => {
    setCurrentValueToApply(value);
    setCurrentVulnerabilityToApply(vulnerability ?? 1);
    console.log(`Value staged for application: ${value}, Vulnerability: ${vulnerability ?? 1}`);
    handleError(null);
  }, []);
  const handleApplyValue = reactExports.useCallback(async () => {
    if (!activeParameter || currentValueToApply === null || selectedSegments.length === 0) {
      const errorMsg = !activeParameter ? "Select a parameter first." : currentValueToApply === null ? "Select a value first." : "Select at least one segment on the map.";
      handleError(`Cannot apply value: ${errorMsg}`);
      return;
    }
    handleError(null);
    try {
      const updatedSegments = await applyParameterValueToSegments(
        segments,
        selectedSegments,
        activeParameter,
        currentValueToApply,
        currentVulnerabilityToApply
      );
      setSegments(updatedSegments);
      console.log("Successfully applied value and updated segments state.");
    } catch (err) {
      console.error("Error applying parameter value:", err);
      handleError(err instanceof Error ? err.message : "Failed to apply value.");
    }
  }, [activeParameter, currentValueToApply, currentVulnerabilityToApply, segments, selectedSegments, setSegments]);
  const handleCalculateCvi = reactExports.useCallback(async () => {
    if (!selectedFormula) {
      handleError("Please select a formula before calculating.");
      return;
    }
    const relevantParameters = parameters.filter((p) => p.weight === void 0 || p.weight > 0);
    const allValuesAssigned = segments.every(
      (segment) => relevantParameters.every((param) => segment.parameters && segment.parameters[param.id] !== void 0)
    );
    if (!allValuesAssigned) {
      handleError(`Cannot calculate: Assign values for all parameters to all segments first. (${completionPercentage}% complete)`);
      return;
    }
    handleError(null);
    setCalculatingCvi(true);
    console.log(`Calculating CVI using: ${selectedFormula.name}`);
    try {
      await calculateAndSaveIndex(
        segments,
        parameters,
        selectedFormula,
        setSegments,
        setCviScores,
        handleError
      );
      console.log("CVI calculation process finished successfully via utility.");
    } catch (err) {
      console.error("Error during CVI calculation process:", err);
      if (!pageError) {
        handleError(err instanceof Error ? err.message : "CVI calculation failed.");
      }
      setCviScores({});
    } finally {
      setCalculatingCvi(false);
    }
  }, [segments, parameters, selectedFormula, setSegments, setCviScores, completionPercentage, pageError]);
  const handleSelectionCreate = reactExports.useCallback((geometry) => {
    if (!geometry || !geometry.coordinates || geometry.coordinates.length === 0) {
      console.error("Invalid polygon geometry received for area selection");
      return;
    }
    console.log("Area selection polygon created, finding intersecting segments...");
    const selectionPolygonTurf = polygon(geometry.coordinates);
    const newlySelectedIds = [];
    segments.forEach((segment) => {
      try {
        if (booleanIntersects(segment.geometry, selectionPolygonTurf)) {
          newlySelectedIds.push(segment.id);
        }
      } catch (e) {
        console.warn(`Error checking intersection for segment ${segment.id}:`, e);
      }
    });
    console.log(`Found ${newlySelectedIds.length} segments intersecting the selected area.`);
    setSelectedSegments((prev) => [.../* @__PURE__ */ new Set([...prev, ...newlySelectedIds])]);
  }, [segments]);
  const handleSelectionDelete = reactExports.useCallback((polygonId) => {
    console.log("Selection polygon deletion requested (if applicable):", polygonId);
    setSelectionPolygons((prev) => prev.filter((p) => p.id !== polygonId));
  }, []);
  const handleContinue = reactExports.useCallback(async () => {
    const allValuesAssigned = segments.every(
      (segment) => parameters.every((param) => segment.parameters && segment.parameters[param.id] !== void 0)
    );
    const cviCalculatedForAll = Object.keys(cviScores).length === segments.length;
    if (!allValuesAssigned || completionPercentage < 100) {
      handleError(`Assign values for all parameters to all segments first. (${completionPercentage}% complete)`);
      return;
    }
    if (!cviCalculatedForAll) {
      handleError(`Calculate CVI scores for all ${segments.length} segments first. (${Object.keys(cviScores).length} calculated)`);
      return;
    }
    handleError(null);
    try {
      console.log("All checks passed. Navigating to results page...");
      navigate("/results");
    } catch (err) {
      console.error("Error preparing to navigate or navigating:", err);
      handleError("Failed to proceed to results.");
    }
  }, [segments, parameters, cviScores, completionPercentage, navigate]);
  const cviStatistics = reactExports.useMemo(() => {
    const scores = Object.values(cviScores);
    if (scores.length === 0) return null;
    const min = Math.min(...scores);
    const max = Math.max(...scores);
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = sum / scores.length;
    let veryLowCount = 0, lowCount = 0, moderateCount = 0, highCount = 0, veryHighCount = 0;
    scores.forEach((score) => {
      const rank = getCviRank(score, selectedFormula?.type);
      if (rank <= 1) veryLowCount++;
      else if (rank === 2) lowCount++;
      else if (rank === 3) moderateCount++;
      else if (rank === 4) highCount++;
      else if (rank >= 5) veryHighCount++;
    });
    return {
      min: min.toFixed(2),
      max: max.toFixed(2),
      avg: avg.toFixed(2),
      count: scores.length,
      categories: {
        veryLow: veryLowCount,
        low: lowCount,
        moderate: moderateCount,
        high: highCount,
        veryHigh: veryHighCount
      }
    };
  }, [cviScores, selectedFormula]);
  if (dataLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "ml-4 text-gray-600", children: "Loading assignment data..." })
    ] });
  }
  if (dataError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 max-w-lg mx-auto mt-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorAlert, { message: dataError, onClose: () => setDataError(null) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/"), className: "mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", children: "Go Home" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto w-full px-8 py-4 flex flex-col h-full", children: [
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ParameterAssignmentHeader,
        {
          title: "5. Parameter Assignment & CVI Calculation",
          completionPercentage
        }
      ) }),
      pageError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorAlert, { message: pageError, onClose: () => handleError(null) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col space-y-8 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-1 h-[500px] bg-transparent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 flex flex-col h-full overflow-hidden", children: [
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-grow overflow-hidden", children: [
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MapInteractionPanel,
                {
                  segments,
                  parameters,
                  geoJSON: geoJSONForMap,
                  initialBounds: mapBounds,
                  selectionPolygons,
                  selectedSegmentIds: selectedSegments,
                  selectedParameterId: activeParameter?.id ?? null,
                  onSegmentSelect: handleSegmentSelect,
                  onSelectAll: handleSelectAll,
                  onClearSelection: handleClearSelection,
                  onSelectionDelete: handleSelectionDelete,
                  onAreaSelect: handleSelectionCreate,
                  mapContainerRef
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-1 flex flex-col h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-gray-100 rounded-t-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setActiveTab("parameters"),
                  className: `flex-1 px-4 py-3 text-sm font-medium rounded-tl-lg transition-colors ${activeTab === "parameters" ? "bg-white text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`,
                  children: "Parameter Assignment"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setActiveTab("cvi"),
                  className: `flex-1 px-4 py-3 text-sm font-medium rounded-tr-lg transition-colors ${activeTab === "cvi" ? "bg-white text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`,
                  children: "CVI Calculation"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-grow bg-white rounded-b-lg overflow-y-auto p-4 relative max-h-[400px]", children: activeTab === "parameters" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              ParameterValuePanel,
              {
                parameters,
                activeParameter,
                selectedValue: currentValueToApply,
                selectedVulnerability: currentVulnerabilityToApply,
                onParameterSelect: handleParameterSelect,
                onValueSelect: handleValueSelect,
                onApplyValue: handleApplyValue,
                selectedSegmentIds: selectedSegments
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              CviFormulaPanel,
              {
                selectedFormula,
                onCalculateCvi: handleCalculateCvi,
                completionPercentage,
                calculatingCvi,
                cviScores,
                segments
              }
            ) }),
            activeTab === "cvi" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-4 rounded-b-lg border-t border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: handleContinue,
                className: "w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200",
                disabled: completionPercentage < 100 || Object.keys(cviScores).length !== segments.length || calculatingCvi,
                title: completionPercentage < 100 ? `Complete parameter assignment (${completionPercentage}%) first` : Object.keys(cviScores).length !== segments.length ? `Calculate CVI for all ${segments.length} segments first (${Object.keys(cviScores).length} done)` : calculatingCvi ? "Calculation in progress..." : "Proceed to results visualization",
                children: calculatingCvi ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { "aria-hidden": "true", role: "status", className: "inline w-4 h-4 mr-2 text-white animate-spin", viewBox: "0 0 100 101", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C0 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z", fill: "#E5E7EB" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z", fill: "currentColor" })
                  ] }),
                  "Calculating..."
                ] }) : "Continue to Results"
              }
            ) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-6 rounded-lg shadow border-t-4 border-gray-100", style: { minHeight: "200px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SegmentTablePanel,
          {
            segments,
            parameters,
            selectedSegmentIds: selectedSegments,
            onSegmentSelect: handleSegmentSelect,
            cviScores,
            selectedFormula,
            cviStatistics
          }
        ) }) })
      ] }),
      " "
    ] }),
    " "
  ] });
}
export {
  ParameterAssignmentPage as default
};
//# sourceMappingURL=ParameterAssignmentPage-CKXxYHQq.js.map
