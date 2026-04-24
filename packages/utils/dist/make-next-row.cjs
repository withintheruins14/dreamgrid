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

// src/make-next-row.ts
var make_next_row_exports = {};
__export(make_next_row_exports, {
  makeNextRow: () => makeNextRow
});
module.exports = __toCommonJS(make_next_row_exports);

// dist/chunk-BGHW3Y3Y.js
var factorToFitInMinimumRowHeight = (dimension, minimumRowHeight) => {
  return minimumRowHeight / dimension.height;
};

// dist/chunk-YJ7PA23E.js
var scaleDimension = (dimension, scale) => ({ dimension, scale });
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

// dist/chunk-ZOJRGKJD.js
var widthAtMinimumRowHeight = (dimension, minimumRowHeight) => factorToFitInMinimumRowHeight(dimension, minimumRowHeight) * dimension.width;

// src/make-next-row.ts
var makeNextRow = (remainingDimensions, width, minimumRowHeight, maximumRowHeight) => {
  let remainingRowWidth = width;
  const accumulatedRowDimensions = [];
  while (remainingDimensions.length > 0 && remainingRowWidth > widthAtMinimumRowHeight(remainingDimensions[0], minimumRowHeight)) {
    remainingRowWidth -= widthAtMinimumRowHeight(remainingDimensions[0], minimumRowHeight);
    accumulatedRowDimensions.push(remainingDimensions.shift());
  }
  if (accumulatedRowDimensions.length === 0 && remainingDimensions.length > 0) {
    accumulatedRowDimensions.push(remainingDimensions.shift());
  }
  const totalWidthAtMinimumHeight = accumulatedRowDimensions.reduce(
    (total, d) => total + widthAtMinimumRowHeight(d, minimumRowHeight),
    0
  );
  const widthScaleFactor = totalWidthAtMinimumHeight === 0 ? maximumRowHeight / minimumRowHeight : Math.min(width / totalWidthAtMinimumHeight, maximumRowHeight / minimumRowHeight);
  return {
    next: row(accumulatedRowDimensions, widthScaleFactor, width, minimumRowHeight),
    remaining: remainingDimensions
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeNextRow
});
