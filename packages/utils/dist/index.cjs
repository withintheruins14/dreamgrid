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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  factorToFitInMinimumRowHeight: () => factorToFitInMinimumRowHeight,
  getItemSize: () => getItemSize,
  makeNextRow: () => makeNextRow,
  makeRows: () => makeRows,
  row: () => row3,
  scaleDimension: () => scaleDimension4,
  widthAtMinimumRowHeight: () => widthAtMinimumRowHeight3
});
module.exports = __toCommonJS(index_exports);

// src/factor-to-fit-in-minimum-row-height.ts
var factorToFitInMinimumRowHeight = (dimension, minimumRowHeight) => {
  return minimumRowHeight / dimension.height;
};

// src/get-item-size.ts
var getItemSize = (rows, index) => rows?.[index]?.rowHeight;

// dist/chunk-BGHW3Y3Y.js
var factorToFitInMinimumRowHeight2 = (dimension, minimumRowHeight) => {
  return minimumRowHeight / dimension.height;
};

// dist/chunk-YJ7PA23E.js
var scaleDimension = (dimension, scale) => ({ dimension, scale });
var row = (unscaledContents, scaleDueToHeight, width, minimumRowHeight) => {
  const scaledContents = unscaledContents.map((unscaledDimension) => {
    const factor = factorToFitInMinimumRowHeight2(unscaledDimension, minimumRowHeight) * scaleDueToHeight;
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
var widthAtMinimumRowHeight = (dimension, minimumRowHeight) => factorToFitInMinimumRowHeight2(dimension, minimumRowHeight) * dimension.width;

// src/make-next-row.ts
var makeNextRow = (remainingDimensions, width, minimumRowHeight, maximumRowHeight) => {
  let remainingRowWidth = width;
  const accumulatedRowDimensions = [];
  while (remainingDimensions.length > 0 && remainingRowWidth > widthAtMinimumRowHeight(remainingDimensions[0], minimumRowHeight)) {
    remainingRowWidth -= widthAtMinimumRowHeight(remainingDimensions[0], minimumRowHeight);
    accumulatedRowDimensions.push(remainingDimensions.shift());
  }
  const widthsAtMinimumHeight = accumulatedRowDimensions.map((d) => widthAtMinimumRowHeight(d, minimumRowHeight));
  const totalWidthAtMinimumHeight = widthsAtMinimumHeight.reduce((a, b) => {
    return a + b;
  }, 0);
  const widthScaleFactor = Math.min(width / totalWidthAtMinimumHeight, maximumRowHeight / minimumRowHeight);
  return {
    next: row(accumulatedRowDimensions, widthScaleFactor, width, minimumRowHeight),
    remaining: remainingDimensions
  };
};

// dist/chunk-FTY62T32.js
var factorToFitInMinimumRowHeight3 = (dimension, minimumRowHeight) => {
  return minimumRowHeight / dimension.height;
};
var scaleDimension2 = (dimension, scale) => ({ dimension, scale });
var row2 = (unscaledContents, scaleDueToHeight, width, minimumRowHeight) => {
  const scaledContents = unscaledContents.map((unscaledDimension) => {
    const factor = factorToFitInMinimumRowHeight3(unscaledDimension, minimumRowHeight) * scaleDueToHeight;
    return scaleDimension2(unscaledDimension, factor);
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
var widthAtMinimumRowHeight2 = (dimension, minimumRowHeight) => factorToFitInMinimumRowHeight3(dimension, minimumRowHeight) * dimension.width;
var makeNextRow2 = (remainingDimensions, width, minimumRowHeight, maximumRowHeight) => {
  let remainingRowWidth = width;
  const accumulatedRowDimensions = [];
  while (remainingDimensions.length > 0 && remainingRowWidth > widthAtMinimumRowHeight2(remainingDimensions[0], minimumRowHeight)) {
    remainingRowWidth -= widthAtMinimumRowHeight2(remainingDimensions[0], minimumRowHeight);
    accumulatedRowDimensions.push(remainingDimensions.shift());
  }
  const widthsAtMinimumHeight = accumulatedRowDimensions.map((d) => widthAtMinimumRowHeight2(d, minimumRowHeight));
  const totalWidthAtMinimumHeight = widthsAtMinimumHeight.reduce((a, b) => {
    return a + b;
  }, 0);
  const widthScaleFactor = Math.min(width / totalWidthAtMinimumHeight, maximumRowHeight / minimumRowHeight);
  return {
    next: row2(accumulatedRowDimensions, widthScaleFactor, width, minimumRowHeight),
    remaining: remainingDimensions
  };
};

// src/make-rows.ts
var makeRows = (accumulatedRows, dimensions, width, minimumRowHeight, maximumRowHeight) => {
  const { next, remaining } = makeNextRow2(dimensions, width, minimumRowHeight, maximumRowHeight);
  accumulatedRows.push(next);
  if (remaining.length > 0) {
    accumulatedRows.concat(makeRows(accumulatedRows, dimensions, width, minimumRowHeight, maximumRowHeight));
  }
  return accumulatedRows;
};

// dist/chunk-RFG4H3P3.js
var factorToFitInMinimumRowHeight4 = (dimension, minimumRowHeight) => {
  return minimumRowHeight / dimension.height;
};

// dist/chunk-GMJQ5YNH.js
var scaleDimension3 = (dimension, scale) => ({ dimension, scale });

// src/row.ts
var row3 = (unscaledContents, scaleDueToHeight, width, minimumRowHeight) => {
  const scaledContents = unscaledContents.map((unscaledDimension) => {
    const factor = factorToFitInMinimumRowHeight4(unscaledDimension, minimumRowHeight) * scaleDueToHeight;
    return scaleDimension3(unscaledDimension, factor);
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

// src/scale-dimension.ts
var scaleDimension4 = (dimension, scale) => ({ dimension, scale });

// src/width-at-minimum-row-height.ts
var widthAtMinimumRowHeight3 = (dimension, minimumRowHeight) => factorToFitInMinimumRowHeight4(dimension, minimumRowHeight) * dimension.width;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  factorToFitInMinimumRowHeight,
  getItemSize,
  makeNextRow,
  makeRows,
  row,
  scaleDimension,
  widthAtMinimumRowHeight
});
