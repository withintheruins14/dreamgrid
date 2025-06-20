export const factorToFitInMinimumRowHeight = (dimension: { height: number }, minimumRowHeight: number) => {
  return minimumRowHeight / dimension.height
}