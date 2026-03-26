import { factorToFitInMinimumRowHeight } from '@dreamgrid/utils/factor-to-fit-in-minimum-row-height'
import { scaleDimension } from '@dreamgrid/utils/scale-dimension'

export const row = (unscaledContents: any[], scaleDueToHeight: number, width: number, minimumRowHeight: number) => {
  const scaledContents = unscaledContents.map((unscaledDimension: any) => {
    const factor = factorToFitInMinimumRowHeight(unscaledDimension, minimumRowHeight) * scaleDueToHeight
    return scaleDimension(unscaledDimension, factor)
  })

  const remainingWhitespace = width - scaledContents
    .map((scaledContent: { dimension: { width: number }; scale: number }) => scaledContent.dimension.width * scaledContent.scale)
    .reduce((cur: any, prev: any) => { return cur + prev }, 0)

  return {
    contents: scaledContents,
    rowHeight: minimumRowHeight * scaleDueToHeight,
    horizontalWhitespace: remainingWhitespace
  }
}