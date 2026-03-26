import {
  row,
  widthAtMinimumRowHeight
} from "./chunk-GP2FG7CI.js";

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

export {
  makeNextRow
};
