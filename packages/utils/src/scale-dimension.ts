import type { Dimension, ScaledItem } from '@dreamgrid/utils/types'

export const scaleDimension = (dimension: Dimension, scale: number): ScaledItem => ({
  dimension,
  scale,
})
