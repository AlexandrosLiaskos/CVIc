import { u as useNavigate, j as jsxRuntimeExports } from "./index-D694obFq.js";
import { b as reactExports } from "./leaflet-CCUyKKIY.js";
import { F as ForwardRef } from "./ArrowUpTrayIcon-CaILkGVF.js";
import { F as ForwardRef$1 } from "./PencilIcon-eUf_lbJt.js";
import { F as ForwardRef$2 } from "./ArrowRightIcon-Dk6_6lE4.js";
import "./georaster-layer-D-eO7TID.js";
import "./georaster-UMjhm2qh.js";
import "./geotiff-70LCDX0v.js";
function ShorelineSelectionPage() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = reactExports.useState(null);
  const handleContinue = () => {
    if (selectedOption === "upload") {
      navigate("/shoreline");
    } else if (selectedOption === "create") {
      navigate("/shoreline-source");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-extrabold text-primary-900 tracking-tight", children: "Shoreline Data" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-lg text-gray-600", children: "Choose how you want to provide shoreline data for your coastal vulnerability analysis." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `bg-white p-6 rounded-lg shadow-md border-2 transition-all cursor-pointer
            ${selectedOption === "upload" ? "border-primary-500 ring-2 ring-primary-200" : "border-gray-200 hover:border-gray-300"}`,
          onClick: () => setSelectedOption("upload"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary-100 p-3 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef, { className: "h-6 w-6 text-primary-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "ml-4 text-lg font-medium text-gray-900", children: "Upload Existing Shoreline" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-4", children: "Upload a zipped Shapefile (.zip) containing your existing shoreline data." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-gray-500 space-y-1 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Must contain .shp, .shx, and .dbf files" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Shoreline must be LineString or MultiLineString" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Maximum file size: 50MB" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center text-sm font-medium ${selectedOption === "upload" ? "text-primary-600" : "text-gray-500"}`, children: [
              "Select this option",
              selectedOption === "upload" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2", children: "✓" })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `bg-white p-6 rounded-lg shadow-md border-2 transition-all cursor-pointer
            ${selectedOption === "create" ? "border-primary-500 ring-2 ring-primary-200" : "border-gray-200 hover:border-gray-300"}`,
          onClick: () => setSelectedOption("create"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary-100 p-3 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$1, { className: "h-6 w-6 text-primary-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "ml-4 text-lg font-medium text-gray-900", children: "Create New Shoreline" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-4", children: "Digitize a new shoreline using satellite imagery." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-gray-500 space-y-1 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Upload your own satellite images" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Draw shoreline directly on the map" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center text-sm font-medium ${selectedOption === "create" ? "text-primary-600" : "text-gray-500"}`, children: [
              "Select this option",
              selectedOption === "create" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2", children: "✓" })
            ] }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: handleContinue,
        disabled: !selectedOption,
        className: "inline-flex items-center justify-center bg-primary-600 text-white font-semibold px-8 py-3 text-base rounded-lg shadow-md hover:bg-primary-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        children: [
          "Continue",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$2, { className: "ml-2 h-5 w-5" })
        ]
      }
    ) })
  ] });
}
export {
  ShorelineSelectionPage as default
};
//# sourceMappingURL=ShorelineSelectionPage-DnrGTx7A.js.map
