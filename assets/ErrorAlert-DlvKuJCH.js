import { j as jsxRuntimeExports } from "./index-D694obFq.js";
const ErrorAlert = ({ message, onClose }) => {
  if (!message) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative", role: "alert", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-bold", children: "Error: " }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block sm:inline", children: message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-0 bottom-0 right-0 px-4 py-3", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "fill-current h-6 w-6 text-red-500", role: "button", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Close" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" })
    ] }) })
  ] });
};
export {
  ErrorAlert as E
};
//# sourceMappingURL=ErrorAlert-DlvKuJCH.js.map
