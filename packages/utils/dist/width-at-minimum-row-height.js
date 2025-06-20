import { factorToFitInMinimumRowHeight } from '@dreamgrid/utils/factor-to-fit-in-minimum-row-height';
export const widthAtMinimumRowHeight = (dimension, minimumRowHeight) => (factorToFitInMinimumRowHeight(dimension, minimumRowHeight) * dimension.width);
