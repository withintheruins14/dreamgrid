import {
  factorToFitInMinimumRowHeight,
  scaleDimension
} from "./chunk-BH74GHR2.js";

// dist/chunk-GP2FG7CI.js
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
var widthAtMinimumRowHeight = (dimension, minimumRowHeight) => factorToFitInMinimumRowHeight(dimension, minimumRowHeight) * dimension.width;

// dist/chunk-PABQXCNW.js
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

// src/make-rows.ts
var makeRows = (accumulatedRows, dimensions, width, minimumRowHeight, maximumRowHeight) => {
  const { next, remaining } = makeNextRow(dimensions, width, minimumRowHeight, maximumRowHeight);
  accumulatedRows.push(next);
  if (remaining.length > 0) {
    accumulatedRows.concat(makeRows(accumulatedRows, dimensions, width, minimumRowHeight, maximumRowHeight));
  }
  return accumulatedRows;
};

export {
  makeRows
};
