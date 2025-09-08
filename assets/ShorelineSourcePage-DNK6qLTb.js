import { u as useNavigate, j as jsxRuntimeExports, F as ForwardRef$1 } from "./index-D694obFq.js";
import { b as reactExports } from "./leaflet-CCUyKKIY.js";
import { F as ForwardRef } from "./PhotoIcon-DzvH1I97.js";
import { F as ForwardRef$2 } from "./ArrowLeftIcon-DL0uFl_m.js";
import { F as ForwardRef$3 } from "./ArrowRightIcon-Dk6_6lE4.js";
import "./georaster-layer-D-eO7TID.js";
import "./georaster-UMjhm2qh.js";
import "./geotiff-70LCDX0v.js";
function ShorelineSourcePage() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = reactExports.useState(null);
  const handleContinue = () => {
    if (selectedOption === "upload") {
      navigate("/satellite-upload");
    }
  };
  const handleBack = () => {
    navigate("/shoreline-selection");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-extrabold text-primary-900 tracking-tight", children: "Satellite Image Source" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-lg text-gray-600", children: "Choose how you want to obtain satellite imagery for shoreline digitization." })
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "ml-4 text-lg font-medium text-gray-900", children: "Upload Existing Images" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-4", children: "Upload your own georeferenced satellite images." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-gray-500 space-y-1 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Supports GeoTIFF and Cloud Optimized GeoTIFF (COG) formats" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Images will be displayed on the map in their correct position" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Multiple images can be uploaded" })
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
            ${selectedOption === "acquire" ? "border-primary-500 ring-2 ring-primary-200" : "border-gray-200 hover:border-gray-300"}`,
          onClick: () => setSelectedOption("acquire"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary-100 p-3 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$1, { className: "h-6 w-6 text-primary-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "ml-4 text-lg font-medium text-gray-900", children: "Acquire Images" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-xl", children: "🚀" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-semibold text-blue-900 mb-2", children: "Coming Soon!" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pt-4 border-t border-blue-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-blue-500 text-center", children: [
                "Want to be notified when this feature launches?",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: " Contact us!" })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center text-sm font-medium ${selectedOption === "acquire" ? "text-primary-600" : "text-gray-500"}`, children: [
              "Select this option",
              selectedOption === "acquire" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2", children: "✓" })
            ] }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleBack,
          className: "inline-flex items-center justify-center bg-gray-100 text-gray-700 font-semibold px-6 py-3 text-base rounded-lg shadow-sm hover:bg-gray-200 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$2, { className: "mr-2 h-5 w-5" }),
            "Back"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleContinue,
          disabled: !selectedOption || selectedOption === "acquire",
          className: "inline-flex items-center justify-center bg-primary-600 text-white font-semibold px-8 py-3 text-base rounded-lg shadow-md hover:bg-primary-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          children: [
            "Continue",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardRef$3, { className: "ml-2 h-5 w-5" })
          ]
        }
      )
    ] })
  ] });
}
export {
  ShorelineSourcePage as default
};
//# sourceMappingURL=ShorelineSourcePage-DNK6qLTb.js.map
