// src/use-grid.tsx
import { useMemo } from "react";
import { makeRows } from "@dreamgrid/utils/make-rows";
function useGrid(images, minimumRowHeight, maximumRowHeight, width) {
  const rows = useMemo(
    () => {
      const hasWidth = Boolean(width);
      return hasWidth ? makeRows([], [...images], width, minimumRowHeight, maximumRowHeight) : [];
    },
    [images, width, minimumRowHeight, maximumRowHeight]
  );
  return rows;
}

export {
  useGrid
};
