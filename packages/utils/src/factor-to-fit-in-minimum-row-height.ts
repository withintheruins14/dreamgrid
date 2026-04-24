import type { Dimension } from '@dreamgrid/utils/types'

export const factorToFitInMinimumRowHeight = (
  dimension: Pick<Dimension, 'height'>,
  minimumRowHeight: number,
): number => minimumRowHeight / dimension.height
