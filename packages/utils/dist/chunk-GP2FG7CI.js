import {
  scaleDimension
} from "./chunk-CBHIJTAD.js";
import {
  factorToFitInMinimumRowHeight
} from "./chunk-T26RGEXY.js";

// dist/row.js
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

// dist/width-at-minimum-row-height.js
var widthAtMinimumRowHeight = (dimension, minimumRowHeight) => factorToFitInMinimumRowHeight(dimension, minimumRowHeight) * dimension.width;

export {
  row,
  widthAtMinimumRowHeight
};
