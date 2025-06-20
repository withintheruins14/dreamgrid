import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { VariableSizeList } from 'react-window'

import Row from './row'
import {
  getItemSize,
  scaleDimension,
  makeDimensions,
  factorToFitInMinimumRowHeight,
  widthAtMinimumRowHeight,
  makeRows,
} from './utils'

let minimumRowHeight, maximumRowHeight
export default class DreamGrid extends Component {
  static propTypes = {
    minimumRowHeight: PropTypes.number,
    maximumRowHeight: PropTypes.number,
    size: PropTypes.objectOf(PropTypes.number),
    images: PropTypes.array,
    renderItem: PropTypes.func
  }

  constructor(props) {
    super(props)
    minimumRowHeight = props.minimumRowHeight
    maximumRowHeight = props.maximumRowHeight
    this.list = createRef()
  }

  componentDidUpdate(prevProps) {
    const { height, width } = this.props.size
    if (prevProps.size.height !== height || prevProps.size.width !== width) {
      this.list.resetAfterIndex(0, true)
    }
  }

  render() {
    const { images, size, renderItem } = this.props
    const { height, width } = size
    const rows = makeRows([], makeDimensions(images), width, minimumRowHeight, maximumRowHeight)
    const itemData = { rows, images, renderItem }
    return (
      <VariableSizeList
        height={height}
        width={width}
        itemData={itemData}
        itemSize={(index) => getItemSize(rows, index)}
        itemCount={rows.length}
        ref={(node) => { this.list = node }}
      >
        {Row}
      </VariableSizeList>
    )
  }
}
