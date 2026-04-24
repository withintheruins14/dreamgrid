import type { Dimension, Row } from '@dreamgrid/utils/types';
export declare const makeNextRow: (remainingDimensions: Dimension[], width: number, minimumRowHeight: number, maximumRowHeight: number) => {
    next: Row;
    remaining: Dimension[];
};
