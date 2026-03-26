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

// src/width-at-minimum-row-height.ts
var width_at_minimum_row_height_exports = {};
__export(width_at_minimum_row_height_exports, {
  widthAtMinimumRowHeight: () => widthAtMinimumRowHeight
});
module.exports = __toCommonJS(width_at_minimum_row_height_exports);

// dist/chunk-RFG4H3P3.js
var factorToFitInMinimumRowHeight = (dimension, minimumRowHeight) => {
  return minimumRowHeight / dimension.height;
};

// src/width-at-minimum-row-height.ts
var widthAtMinimumRowHeight = (dimension, minimumRowHeight) => factorToFitInMinimumRowHeight(dimension, minimumRowHeight) * dimension.width;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  widthAtMinimumRowHeight
});
