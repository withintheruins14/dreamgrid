import { factorToFitInMinimumRowHeight } from '@dreamgrid/utils/factor-to-fit-in-minimum-row-height'
import { scaleDimension } from '@dreamgrid/utils/scale-dimension'
import type { Dimension, Row } from '@dreamgrid/utils/types'

export const row = (
  unscaledContents: Dimension[],
  scaleDueToHeight: number,
  width: number,
  minimumRowHeight: number,
): Row => {
  const scaledContents = unscaledContents.map((unscaledDimension) => {
    const factor = factorToFitInMinimumRowHeight(unscaledDimension, minimumRowHeight) * scaleDueToHeight
    return scaleDimension(unscaledDimension, factor)
  })

  const occupiedWidth = scaledContents.reduce(
    (total, scaled) => total + scaled.dimension.width * scaled.scale,
    0,
  )

  return {
    contents: scaledContents,
    rowHeight: minimumRowHeight * scaleDueToHeight,
    horizontalWhitespace: width - occupiedWidth,
  }
}
