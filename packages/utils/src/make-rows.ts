import { makeNextRow } from '@dreamgrid/utils/make-next-row'
import type { Dimension, Row } from '@dreamgrid/utils/types'

export const makeRows = (
  dimensions: Dimension[],
  width: number,
  minimumRowHeight: number,
  maximumRowHeight: number,
): Row[] => {
  const rows: Row[] = []
  const remaining = [...dimensions]
  while (remaining.length > 0) {
    const { next } = makeNextRow(remaining, width, minimumRowHeight, maximumRowHeight)
    rows.push(next)
  }
  return rows
}
