export const getItemSize = (rows, index) => (rows[index].rowHeight)

export const scaleDimension = (dimension, scale) => ({ dimension, scale })

export const widthAtMinimumRowHeight = (dimension, minimumRowHeight) => (
  factorToFitInMinimumRowHeight(dimension, minimumRowHeight) * dimension.x
)

export const factorToFitInMinimumRowHeight = (dimension, minimumRowHeight) => {
  return minimumRowHeight / dimension.y
}

export const makeDimensions = (images) => {
  return images
    .filter(({ width, height }) => (width && height))
    .map((image) => ({ ...getImageDimensions(image) }))
}

export const makeRows = (accumulatedRows, dimensions, width, minimumRowHeight, maximumRowHeight) => {
  const { next, remaining } = makeNextRow(dimensions, width, minimumRowHeight, maximumRowHeight)
  accumulatedRows.push(next)
  if (remaining.length > 0) {
    accumulatedRows.concat(makeRows(accumulatedRows, dimensions, width, minimumRowHeight, maximumRowHeight))
  }
  return accumulatedRows
}

const makeNextRow = (remainingDimensions, width, minimumRowHeight, maximumRowHeight) => {
  let remainingRowWidth = width
  let accumulatedRowDimensions = []
  while (remainingDimensions.length > 0 && remainingRowWidth > widthAtMinimumRowHeight(remainingDimensions[0], minimumRowHeight)) {
    remainingRowWidth -= widthAtMinimumRowHeight(remainingDimensions[0], minimumRowHeight)
    accumulatedRowDimensions.push(remainingDimensions.shift())
  }

  const widthsAtMinimumHeight = accumulatedRowDimensions.map(d => widthAtMinimumRowHeight(d, minimumRowHeight))
  const totalWidthAtMinimumHeight = widthsAtMinimumHeight.reduce((a, b) => { return a + b }, 0)
  const widthScaleFactor = Math.min(width / totalWidthAtMinimumHeight, maximumRowHeight / minimumRowHeight)
  return {
    next: row(accumulatedRowDimensions, widthScaleFactor, width, minimumRowHeight),
    remaining: remainingDimensions
  }
}

const row = (unscaledContents, scaleDueToHeight, width, minimumRowHeight) => {
  const scaledContents = unscaledContents.map(unscaledDimension => {
    const factor = factorToFitInMinimumRowHeight(unscaledDimension, minimumRowHeight) * scaleDueToHeight
    return scaleDimension(unscaledDimension, factor)
  })

  const remainingWhitespace = width - scaledContents
    .map(scaledContent => scaledContent.dimension.x * scaledContent.scale)
    .reduce((cur, prev) => { return cur + prev }, 0)

  return {
    contents: scaledContents,
    rowHeight: minimumRowHeight * scaleDueToHeight,
    horizontalWhitespace: remainingWhitespace
  }
}

const getImageDimensions = (image) => {
  const { width, height } = image
  switch (image.image_orientation) {
    case 'LeftBottom':
      return {
        x: height,
        y: width
      }
    default:
      return {
        x: width,
        y: height
      }
  }
}
