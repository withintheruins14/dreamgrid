import { makeRows } from '@dreamgrid/utils/make-rows'

export type GridItem = { width: number; height: number }

export type GridRow = {
  contents: { dimension: GridItem; scale: number }[]
  rowHeight: number
  horizontalWhitespace: number
}

export function grid<T extends GridItem>(
  items: T[],
  minimumRowHeight: number,
  maximumRowHeight: number,
  width?: number,
): GridRow[] {
  if (!width) return []
  return makeRows([], [...items], width, minimumRowHeight, maximumRowHeight)
}
