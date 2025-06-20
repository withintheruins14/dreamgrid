import { factorToFitInMinimumRowHeight } from 'utils/factor-to-fit-in-minimum-row-height';
import { scaleDimension } from 'utils/scale-dimension';
export const row = (unscaledContents, scaleDueToHeight, width, minimumRowHeight) => {
    const scaledContents = unscaledContents.map((unscaledDimension) => {
        const factor = factorToFitInMinimumRowHeight(unscaledDimension, minimumRowHeight) * scaleDueToHeight;
        return scaleDimension(unscaledDimension, factor);
    });
    const remainingWhitespace = width - scaledContents
        .map((scaledContent) => scaledContent.dimension.width * scaledContent.scale)
        .reduce((cur, prev) => { return cur + prev; }, 0);
    return {
        contents: scaledContents,
        rowHeight: minimumRowHeight * scaleDueToHeight,
        horizontalWhitespace: remainingWhitespace
    };
};
