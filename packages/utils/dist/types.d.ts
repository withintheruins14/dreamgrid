export type Dimension = {
    width: number;
    height: number;
};
export type ScaledItem = {
    dimension: Dimension;
    scale: number;
};
export type Row = {
    contents: ScaledItem[];
    rowHeight: number;
    horizontalWhitespace: number;
};
