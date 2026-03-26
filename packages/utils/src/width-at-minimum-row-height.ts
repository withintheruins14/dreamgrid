import { factorToFitInMinimumRowHeight } from '@dreamgrid/utils/factor-to-fit-in-minimum-row-height';

export const widthAtMinimumRowHeight = (dimension: { width: number }, minimumRowHeight: any) => (
  factorToFitInMinimumRowHeight(dimension as any, minimumRowHeight) * dimension.width
)