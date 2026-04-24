import {
  factorToFitInMinimumRowHeight
} from "./chunk-BGHW3Y3Y.js";

// dist/chunk-GMJQ5YNH.js
var scaleDimension = (dimension, scale) => ({ dimension, scale });

// src/row.ts
var row = (unscaledContents, scaleDueToHeight, width, minimumRowHeight) => {
  const scaledContents = unscaledContents.map((unscaledDimension) => {
    const factor = factorToFitInMinimumRowHeight(unscaledDimension, minimumRowHeight) * scaleDueToHeight;
    return scaleDimension(unscaledDimension, factor);
  });
  const occupiedWidth = scaledContents.reduce(
    (total, scaled) => total + scaled.dimension.width * scaled.scale,
    0
  );
  return {
    contents: scaledContents,
    rowHeight: minimumRowHeight * scaleDueToHeight,
    horizontalWhitespace: width - occupiedWidth
  };
};

export {
  row
};
