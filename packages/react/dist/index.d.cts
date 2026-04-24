type GridItem = {
    width: number;
    height: number;
};
type GridRow = {
    contents: {
        dimension: GridItem;
        scale: number;
    }[];
    rowHeight: number;
    horizontalWhitespace: number;
};
declare function grid<T extends GridItem>(items: T[], minimumRowHeight: number, maximumRowHeight: number, width?: number): GridRow[];

export { type GridItem, type GridRow, grid };
