import { useMemo } from 'react';
import { makeRows } from '@dreamgrid/utils/make-rows';
export function useGrid(images, minimumRowHeight, maximumRowHeight, width) {
    const rows = useMemo(() => {
        const hasWidth = Boolean(width);
        return hasWidth
            ? makeRows([], [...images], width, minimumRowHeight, maximumRowHeight)
            : [];
    }, [images, width, minimumRowHeight, maximumRowHeight]);
    return rows;
}
