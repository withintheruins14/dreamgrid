declare const factorToFitInMinimumRowHeight: (dimension: {
    height: number;
}, minimumRowHeight: number) => number;

declare const getItemSize: (rows: {
    [width: string]: {
        rowHeight: any;
    };
}, index: any) => any;

declare const makeNextRow: (remainingDimensions: any[], width: number, minimumRowHeight: number, maximumRowHeight: number) => {
    next: {
        contents: {
            dimension: any;
            scale: number;
        }[];
        rowHeight: number;
        horizontalWhitespace: number;
    };
    remaining: any[];
};

declare const makeRows: (accumulatedRows: {
    contents: any;
    rowHeight: number;
    horizontalWhitespace: number;
}[], dimensions: any, width: any, minimumRowHeight: any, maximumRowHeight: any) => {
    contents: any;
    rowHeight: number;
    horizontalWhitespace: number;
}[];

declare const row: (unscaledContents: any[], scaleDueToHeight: number, width: number, minimumRowHeight: number) => {
    contents: {
        dimension: any;
        scale: number;
    }[];
    rowHeight: number;
    horizontalWhitespace: number;
};

declare const scaleDimension: (dimension: any, scale: number) => {
    dimension: any;
    scale: number;
};

declare const widthAtMinimumRowHeight: (dimension: {
    width: number;
}, minimumRowHeight: any) => number;

export { factorToFitInMinimumRowHeight, getItemSize, makeNextRow, makeRows, row, scaleDimension, widthAtMinimumRowHeight };
