import { row } from '@dreamgrid/utils/row'
import { widthAtMinimumRowHeight } from '@dreamgrid/utils/width-at-minimum-row-height'

export const makeNextRow = (remainingDimensions: any[], width: number, minimumRowHeight: number, maximumRowHeight: number) => {
  let remainingRowWidth = width
  const accumulatedRowDimensions: any = []
  while (remainingDimensions.length > 0 && remainingRowWidth > widthAtMinimumRowHeight(remainingDimensions[0], minimumRowHeight)) {
    remainingRowWidth -= widthAtMinimumRowHeight(remainingDimensions[0], minimumRowHeight)
    accumulatedRowDimensions.push(remainingDimensions.shift())
  }

  const widthsAtMinimumHeight = accumulatedRowDimensions.map((d: any) => widthAtMinimumRowHeight(d, minimumRowHeight))
  const totalWidthAtMinimumHeight = widthsAtMinimumHeight.reduce((a: any, b: any) => { return a + b }, 0)
  const widthScaleFactor = Math.min(width / totalWidthAtMinimumHeight, maximumRowHeight / minimumRowHeight)
  return {
    next: row(accumulatedRowDimensions, widthScaleFactor, width, minimumRowHeight),
    remaining: remainingDimensions
  }
}