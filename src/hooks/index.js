import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { VariableSizeList } from 'react-window'

import Row from '../row'
import {
  getItemSize,
  scaleDimension,
  makeDimensions,
  factorToFitInMinimumRowHeight,
  widthAtMinimumRowHeight,
  makeRows,
} from '../utils'

export const useGrid = () => {
  const rows = useRef();
  return {
    renderRow: <Row />,
    itemData,
  }
};
