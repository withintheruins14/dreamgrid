import * as React from 'react';
import { VariableSizeList } from 'react-window';
import Row from '../row';
import { dimension, scaleDimension } from '../utils';

const { useRef, useCallback, useEffect } = React;

export const DreamGrid = ({
  minimumRowHeight, maximumRowHeight, images, size: { height, width }, renderItem
}) => {
  const list = useRef();
  const pHeight = useRef();
  const pWidth = useRef();

  const setPreviousDimensions = () => {
    pHeight.current = height;
    pWidth.current = width;
  }

  useEffect(() => {
    if (pHeight !== height || pWidth !== width) { list.current.resetAfterIndex(0, true); }
  }, []);

  useCallback(() => setPreviousDimensions(), [height, width]);

  const getItemSize = (index) => (rows[index].rowHeight);
  const imageDimensions = makeDimensions();
  const rows = makeRows([], imageDimensions);
  const itemData = { rows, images, renderItem };

  return (
    <VariableSizeList
      height={height}
      width={width}
      itemData={itemData}
      itemSize={getItemSize}
      itemCount={rows.length}
      ref={list}
    >
      {Row}
    </VariableSizeList>
  )
}

export const useGrid = () => {};
