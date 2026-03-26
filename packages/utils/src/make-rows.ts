import { makeNextRow } from '@dreamgrid/utils/make-next-row';

export const makeRows = (accumulatedRows: { contents: any; rowHeight: number; horizontalWhitespace: number }[], dimensions: any, width: any, minimumRowHeight: any, maximumRowHeight: any) => {
  const { next, remaining } = makeNextRow(dimensions, width, minimumRowHeight, maximumRowHeight)
  accumulatedRows.push(next)
  if (remaining.length > 0) {
    accumulatedRows.concat(makeRows(accumulatedRows, dimensions, width, minimumRowHeight, maximumRowHeight))
  }
  return accumulatedRows
}