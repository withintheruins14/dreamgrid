import { row } from '@dreamgrid/utils/row'
import { widthAtMinimumRowHeight } from '@dreamgrid/utils/width-at-minimum-row-height'
import type { Dimension, Row } from '@dreamgrid/utils/types'

export const makeNextRow = (
  remainingDimensions: Dimension[],
  width: number,
  minimumRowHeight: number,
  maximumRowHeight: number,
): { next: Row; remaining: Dimension[] } => {
  let remainingRowWidth = width
  const accumulatedRowDimensions: Dimension[] = []
  while (
    remainingDimensions.length > 0 &&
    remainingRowWidth > widthAtMinimumRowHeight(remainingDimensions[0]!, minimumRowHeight)
  ) {
    remainingRowWidth -= widthAtMinimumRowHeight(remainingDimensions[0]!, minimumRowHeight)
    accumulatedRowDimensions.push(remainingDimensions.shift()!)
  }

  if (accumulatedRowDimensions.length === 0 && remainingDimensions.length > 0) {
    accumulatedRowDimensions.push(remainingDimensions.shift()!)
  }

  const totalWidthAtMinimumHeight = accumulatedRowDimensions.reduce(
    (total, d) => total + widthAtMinimumRowHeight(d, minimumRowHeight),
    0,
  )
  const widthScaleFactor =
    totalWidthAtMinimumHeight === 0
      ? maximumRowHeight / minimumRowHeight
      : Math.min(width / totalWidthAtMinimumHeight, maximumRowHeight / minimumRowHeight)

  return {
    next: row(accumulatedRowDimensions, widthScaleFactor, width, minimumRowHeight),
    remaining: remainingDimensions,
  }
}
