import { factorToFitInMinimumRowHeight } from '@dreamgrid/utils/factor-to-fit-in-minimum-row-height'
import type { Dimension } from '@dreamgrid/utils/types'

export const widthAtMinimumRowHeight = (
  dimension: Dimension,
  minimumRowHeight: number,
): number => factorToFitInMinimumRowHeight(dimension, minimumRowHeight) * dimension.width
