export const dimension = (x, y) => ({ x, y });

export const scaleDimension = (dimension, scale) => ({ dimension, scale });

export const widthAtMinimumRowHeight = (dimension) => (factorToFitInMinimumRowHeight(dimension) * dimension.x);

export const factorToFitInMinimumRowHeight = (dimension, minimumRowHeight) => (minimumRowHeight / dimension.y);

export const row = (unscaledContents, scaleDueToHeight, width) => {
  const scaledContents = unscaledContents.map(unscaledDimension => {
    const factor = factorToFitInMinimumRowHeight(unscaledDimension) * scaleDueToHeight;
    return scaleDimension(unscaledDimension, factor);
  });

  const remainingWhitespace = width - scaledContents
    .map(scaledContent => scaledContent.dimension.x * scaledContent.scale)
    .reduce((cur, prev) => { return cur + prev }, 0);

  return {
    contents: scaledContents,
    rowHeight: minimumRowHeight * scaleDueToHeight,
    horizontalWhitespace: remainingWhitespace,
  };
}

export const makeNextRow = (remainingDimensions, width) => {
  let remainingRowWidth = width
  let accumulatedRowDimensions = []

  while (remainingDimensions.length > 0 && remainingRowWidth > widthAtMinimumRowHeight(remainingDimensions[0])) {
    remainingRowWidth -= widthAtMinimumRowHeight(remainingDimensions[0])
    accumulatedRowDimensions.push(remainingDimensions.shift())
  }

  const widthsAtMinimumHeight = accumulatedRowDimensions.map(d => widthAtMinimumRowHeight(d))
  const totalWidthAtMinimumHeight = widthsAtMinimumHeight.reduce((a, b) => { return a + b }, 0)
  const widthScaleFactor = Math.min(width / totalWidthAtMinimumHeight, maximumRowHeight / minimumRowHeight);

  return {
    next: row(accumulatedRowDimensions, widthScaleFactor, width),
    remaining: remainingDimensions,
  }
}

export const makeRows = (accumulatedRows, dimensions, widtth) => {
  const { next, remaining } = makeNextRow(dimension, width);
  accumulatedRows.push(next);
  if (remaining.length > 0) {
    accumulatedRows.concat(makeRows(accumulatedRows, remaining));
  }
  return accumulatedRows;
}

export const getImageDimensions = ({ width: imageWidth, height: imageHeight, image_orientation }) => (
  image_orientation === 'LeftBottom'
    ? { x: imageHeight, y: imageWidth }
    : { x: imageWidth, y: imageHeight }
);

export const makeDimensions = (images, height, width ) => (
  images
    .filter(({ width, height }) => (width && height)
    .map((image) => {
      const { x, y } = getImageDimensions(image);
      return dimension(x, y);
    })
));