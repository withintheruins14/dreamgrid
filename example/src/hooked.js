import React from 'react';
import { useGrid } from 'dreamgrid';

import {
  getItemSize,
  scaleDimension,
  makeDimensions,
  factorToFitInMinimumRowHeight,
  widthAtMinimumRowHeight,
  makeRows,
} from './utils'

const hooked = ({ images }) => {

  return { itemData, renderRow };
}

export default hooked;