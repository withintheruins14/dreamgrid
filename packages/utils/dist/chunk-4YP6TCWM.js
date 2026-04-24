// dist/chunk-FTY62T32.js
var factorToFitInMinimumRowHeight = (dimension, minimumRowHeight) => {
  return minimumRowHeight / dimension.height;
};
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
var widthAtMinimumRowHeight = (dimension, minimumRowHeight) => factorToFitInMinimumRowHeight(dimension, minimumRowHeight) * dimension.width;
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
var makeRows = (dimensions, width, minimumRowHeight, maximumRowHeight) => {
  const rows = [];
  const remaining = [...dimensions];
  while (remaining.length > 0) {
    const { next } = makeNextRow(remaining, width, minimumRowHeight, maximumRowHeight);
    rows.push(next);
  }
  return rows;
};

export {
  makeRows
};
