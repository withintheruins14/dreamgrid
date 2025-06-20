import { makeNextRow } from 'utils/make-next-row';
export const makeRows = (accumulatedRows, dimensions, width, minimumRowHeight, maximumRowHeight) => {
    const { next, remaining } = makeNextRow(dimensions, width, minimumRowHeight, maximumRowHeight);
    accumulatedRows.push(next);
    if (remaining.length > 0) {
        accumulatedRows.concat(makeRows(accumulatedRows, dimensions, width, minimumRowHeight, maximumRowHeight));
    }
    return accumulatedRows;
};
