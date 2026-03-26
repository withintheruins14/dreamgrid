import {
  row,
  widthAtMinimumRowHeight
} from "./chunk-GP2FG7CI.js";

// dist/make-next-row.js
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
