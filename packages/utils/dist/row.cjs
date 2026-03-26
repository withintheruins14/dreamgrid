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

// src/row.ts
var row_exports = {};
__export(row_exports, {
  row: () => row
});
module.exports = __toCommonJS(row_exports);

// dist/chunk-RFG4H3P3.js
var factorToFitInMinimumRowHeight = (dimension, minimumRowHeight) => {
  return minimumRowHeight / dimension.height;
};

// dist/chunk-GMJQ5YNH.js
var scaleDimension = (dimension, scale) => ({ dimension, scale });

// src/row.ts
var row = (unscaledContents, scaleDueToHeight, width, minimumRowHeight) => {
  const scaledContents = unscaledContents.map((unscaledDimension) => {
    const factor = factorToFitInMinimumRowHeight(unscaledDimension, minimumRowHeight) * scaleDueToHeight;
    return scaleDimension(unscaledDimension, factor);
  });
  const remainingWhitespace = width - scaledContents.map((scaledContent) => scaledContent.dimension.width * scaledContent.scale).reduce((cur, prev) => {
    return cur + prev;
  }, 0);
  return {
    contents: scaledContents,
    rowHeight: minimumRowHeight * scaleDueToHeight,
    horizontalWhitespace: remainingWhitespace
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  row
});
