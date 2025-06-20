export const getItemSize = (
  rows: { [width: string]: { rowHeight: any } }, index: any
) => (rows?.[index]?.rowHeight) as any