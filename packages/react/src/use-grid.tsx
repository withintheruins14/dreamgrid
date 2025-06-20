import { useMemo } from 'react';
import { makeRows } from 'utils/make-rows';

export function useGrid(
  images: any[],
  minimumRowHeight: number,
  maximumRowHeight: number,
  width?: number
) {

  const rows = useMemo(
    () => {
      const hasWidth = Boolean(width);
      return hasWidth
        ? makeRows([], [...images], width, minimumRowHeight, maximumRowHeight)
        : [];
    },
    [images, width, minimumRowHeight, maximumRowHeight]
  );
  return rows;
}