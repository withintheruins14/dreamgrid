"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/use-grid.tsx
var use_grid_exports = {};
__export(use_grid_exports, {
  useGrid: () => useGrid
});
module.exports = __toCommonJS(use_grid_exports);
var import_react = require("react");
var import_make_rows = require("@dreamgrid/utils/make-rows");
function useGrid(images, minimumRowHeight, maximumRowHeight, width) {
  const rows = (0, import_react.useMemo)(
    () => {
      const hasWidth = Boolean(width);
      return hasWidth ? (0, import_make_rows.makeRows)([], [...images], width, minimumRowHeight, maximumRowHeight) : [];
    },
    [images, width, minimumRowHeight, maximumRowHeight]
  );
  return rows;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useGrid
});
