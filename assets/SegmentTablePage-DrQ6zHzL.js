import { u as useNavigate, j as jsxRuntimeExports, a as ForwardRef$4 } from "./index-D694obFq.js";
import { b as reactExports } from "./leaflet-CCUyKKIY.js";
import { M as Map } from "./Map-DjRk7Cda.js";
import { i as indexedDBService } from "./indexedDBService-C0Tzj_Tb.js";
import { E as ErrorAlert } from "./ErrorAlert-DlvKuJCH.js";
import { F as ForwardRef$2 } from "./ArrowLeftIcon-DL0uFl_m.js";
import { F as ForwardRef$3 } from "./ArrowRightIcon-Dk6_6lE4.js";
import { F as ForwardRef$5 } from "./CheckCircleIcon-B9WHPi_i.js";
import { a as length, f as feature, d as featureCollection, c as bbox } from "./turf-C25yoSNr.js";
import "./georaster-layer-D-eO7TID.js";
import "./georaster-UMjhm2qh.js";
import "./geotiff-70LCDX0v.js";
/* empty css                      */
function MagnifyingGlassIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ reactExports.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ reactExports.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
  }));
}
const ForwardRef$1 = /* @__PURE__ */ reactExports.forwardRef(MagnifyingGlassIcon);
function TableCellsIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ reactExports.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ reactExports.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ reactExports.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
  }));
}
const ForwardRef = /* @__PURE__ */ reactExports.forwardRef(TableCellsIcon);
const ITEMS_PER_PAGE = 10;
function SegmentTablePage() {
  const navigate = useNavigate();
  const [segments, setSegments] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [selectedSegmentId, setSelectedSegmentId] = reactExports.useState(null);
  const [sortField, setSortField] = reactExports.useState("properties.index");
  const [sortDirection, setSortDirection] = reactExports.useState("asc");
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [mapInitialBounds, setMapInitialBounds] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const loadSegments = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await indexedDBService.getShorelineData("current-segments");
        if (!data) {
          setError("No segment data found. Please complete the segmentation step first.");
          navigate("/segmentation");
          return;
        }
        const loadedSegments = data.features.filter(
          (feature2) => feature2 && feature2.geometry && (feature2.geometry.type === "LineString" || feature2.geometry.type === "MultiLineString")
        ).map((feature$1, index) => {
          const segmentId = feature$1.properties?.id || `segment-${index + 1}`;
          let length$1 = feature$1.properties?.length;
          if (length$1 === void 0 || length$1 === null) {
            try {
              length$1 = length(feature(feature$1.geometry), { units: "meters" });
            } catch (e) {
              console.warn(`Could not calculate length for segment ${segmentId}:`, e);
              length$1 = 0;
            }
          }
          return {
            id: segmentId,
            type: "Feature",
            geometry: feature$1.geometry,
            properties: {
              ...feature$1.properties,
              id: segmentId,
              index: index + 1,
              length: length$1
            },
            parameters: {}
          };
        });
        if (loadedSegments.length === 0) {
          throw new Error("No valid line segments found in the data.");
        }
        if (loadedSegments.length > 0) {
          const featuresForBounds = loadedSegments.map((s) => ({
            type: "Feature",
            geometry: s.geometry,
            properties: {}
          }));
          const fc = featureCollection(featuresForBounds);
          try {
            const bbox$1 = bbox(fc);
            if (bbox$1 && bbox$1.length === 4 && bbox$1.every((b) => isFinite(b)) && bbox$1[0] <= bbox$1[2] && bbox$1[1] <= bbox$1[3]) {
              const bounds = [[bbox$1[1], bbox$1[0]], [bbox$1[3], bbox$1[2]]];
              setMapInitialBounds(bounds);
            } else {
              console.warn("SegmentTablePage: Could not calculate valid initial bounds.");
            }
          } catch (e) {
            console.error("SegmentTablePage: Error calculating initial bounds:", e);
          }
        }
        setSegments(loadedSegments);
      } catch (err) {
        console.error("Error loading segments:", err);
        setError(`Failed to load segment data: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    };
    loadSegments();
  }, [navigate]);
  const filteredSegments = reactExports.useMemo(() => {
    return segments.filter((segment) => {
      const searchStr = searchTerm.toLowerCase();
      return segment.id.toLowerCase().includes(searchStr) || String(segment.properties.index).includes(searchStr);
    });
  }, [segments, searchTerm]);
  const sortedSegments = reactExports.useMemo(() => {
    return [...filteredSegments].sort((a, b) => {
      let aValue = a;
      let bValue = b;
      const fields = sortField.split(".");
      for (const field of fields) {
        aValue = aValue?.[field];
        bValue = bValue?.[field];
      }
      if (aValue === void 0 || aValue === null) return sortDirection === "asc" ? -1 : 1;
      if (bValue === void 0 || bValue === null) return sortDirection === "asc" ? 1 : -1;
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredSegments, sortField, sortDirection]);
  const paginatedSegments = reactExports.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedSegments.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedSegments, currentPage]);
  const totalPages = Math.ceil(filteredSegments.length / ITEMS_PER_PAGE);
  const handleSegmentSelect = reactExports.useCallback((segmentId) => {
    const newSelectedId = segmentId === selectedSegmentId ? null : segmentId;
    setSelectedSegmentId(newSelectedId);
  }, [selectedSegmentId]);
  const handleSortChange = reactExports.useCallback((field) => {
    if (field === sortField) {
      setSortDirection((prev) => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  }, [sortField]);
  const handleBack = reactExports.useCallback(() => navigate("/segmentation"), [navigate]);
  const handleContinue = reactExports.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Continuing to parameter selection...");
      navigate("/parameter-selection");
    } catch (err) {
      console.error("Error preparing to continue:", err);
      setError("Failed to proceed. Please try again.");
      setLoading(false);
    }
  }, [navigate]);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const geoJSONForMap = reactExports.useMemo(() => {
    if (!segments || segments.length === 0) return null;
    return {
      type: "FeatureCollection",
      features: segments.map((segment) => ({
        type: "Feature",
        geometry: segment.geometry,
        properties: { ...segment.properties, id: segment.id }
      }))
    };
  }, [segments]);
  const selectedSegmentIds = reactExports.useMemo(() => {
    return selectedSegmentId ? [selectedSegmentId] : [];
  }, [selectedSegmentId]);
  if (loading && segments.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "ml-4 text-gray-600", children: "Loading segments..." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8", children: [
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-extrabold text-primary-900 tracking-tight", children: "3. Review Segments" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-lg text-gray-600", children: "Review the generated shoreline segments. Click a row to view on map." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-gray-500", children: [
        "Total Segments: ",
        segments.length.toLocaleString()
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorAlert, { message: error, onClose: () => setError(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-1 flex flex-col space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md border border-gray-200 flex-grow flex flex-col", children: [
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-center mb-4 gap-4 flex-shrink-0", children: [
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-semibold text-gray-800 flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "h-6 w-6 mr-2 text-primary-700" }),
              " Segment List"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-64", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$1, { className: "h-5 w-5 text-gray-400", "aria-hidden": "true" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Search by ID or #",
                  value: searchTerm,
                  onChange: (e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  },
                  className: "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-grow overflow-auto border border-gray-200 rounded-md", children: [
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("thead", { className: "bg-gray-50 sticky top-0 z-10", children: [
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "th",
                    {
                      scope: "col",
                      className: "px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100",
                      onClick: () => handleSortChange("properties.index"),
                      children: [
                        "#",
                        sortField === "properties.index" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1", children: sortDirection === "asc" ? "↑" : "↓" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "th",
                    {
                      scope: "col",
                      className: "px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100",
                      onClick: () => handleSortChange("properties.length"),
                      children: [
                        "Length (m)",
                        sortField === "properties.length" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1", children: sortDirection === "asc" ? "↑" : "↓" })
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "bg-white divide-y divide-gray-200", children: [
                paginatedSegments.map((segment) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    onClick: () => handleSegmentSelect(segment.id),
                    className: `hover:bg-primary-50 cursor-pointer transition-colors duration-150 ${selectedSegmentId === segment.id ? "bg-primary-100 font-medium" : ""}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center w-16", children: segment.properties.index }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center w-32", children: segment.properties?.length ? segment.properties.length.toFixed(1) : "N/A" })
                    ]
                  },
                  segment.id
                )),
                paginatedSegments.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 2, className: "px-6 py-4 text-center text-sm text-gray-500", children: searchTerm ? "No segments match search." : "No segments loaded." }) })
              ] })
            ] })
          ] }),
          totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "nav",
            {
              className: "mt-4 flex items-center justify-between border-t border-gray-200 px-1 pt-3 flex-shrink-0",
              "aria-label": "Pagination",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-700 flex-shrink-0 mr-4", children: [
                  " ",
                  "Showing ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: (currentPage - 1) * ITEMS_PER_PAGE + 1 }),
                  "- ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: Math.min(currentPage * ITEMS_PER_PAGE, filteredSegments.length) }),
                  " ",
                  "of",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: filteredSegments.length })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-1", children: [
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => handlePageChange(currentPage - 1),
                      disabled: currentPage === 1,
                      className: "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
                      children: "Previous"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => handlePageChange(currentPage + 1),
                      disabled: currentPage === totalPages,
                      className: "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
                      children: "Next"
                    }
                  )
                ] })
              ]
            }
          )
        ] }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center flex-shrink-0 mt-auto", children: [
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleBack,
              className: "inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
              disabled: loading,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$2, { className: "h-4 w-4 mr-2" }),
                " Back"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleContinue,
              className: "inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed",
              disabled: loading || segments.length === 0,
              title: segments.length === 0 ? "No segments loaded" : "Confirm segments and proceed to parameter selection",
              children: [
                loading ? "Processing..." : "Confirm & Continue",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$3, { className: "h-4 w-4 ml-2" })
              ]
            }
          )
        ] })
      ] }),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-1 flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-semibold text-gray-800 mb-4 flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$4, { className: "h-6 w-6 mr-2 text-primary-700" }),
          " Map Preview"
        ] }),
        selectedSegmentId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800 flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$5, { className: "h-5 w-5 mr-2 text-blue-600 flex-shrink-0" }),
          "Highlighting segment #",
          segments.find((s) => s.id === selectedSegmentId)?.properties.index || "",
          ". Map zoomed to selection."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-100 rounded-lg shadow-inner border border-gray-200 overflow-hidden h-[600px] lg:h-full lg:min-h-[600px] flex-grow", children: [
          " ",
          geoJSONForMap ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Map,
            {
              geoJSON: geoJSONForMap,
              segments,
              parameters: [],
              selectedParameter: null,
              selectedSegments: selectedSegmentIds,
              selectionPolygons: [],
              onSegmentSelect: handleSegmentSelect,
              onSelectionDelete: () => {
              },
              onAreaSelect: () => {
              },
              isEditing: false,
              initialBounds: mapInitialBounds,
              zoomToFeatureId: selectedSegmentId,
              stylingMode: "parameter"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full flex items-center justify-center text-gray-500", children: loading ? "Loading map data..." : "No shoreline data available" })
        ] })
      ] }),
      " "
    ] }),
    " "
  ] });
}
export {
  SegmentTablePage as default
};
//# sourceMappingURL=SegmentTablePage-DrQ6zHzL.js.map
