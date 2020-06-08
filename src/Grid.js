import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { VariableSizeList } from 'react-window'
import Row from './row'
import { dimension, scaleDimension } from './utils';

let minimumRowHeight, maximumRowHeight
export default class DreamGrid extends Component {
  static propTypes = {
    minimumRowHeight: PropTypes.number,
    maximumRowHeight: PropTypes.number,
    size: PropTypes.objectOf(PropTypes.number),
    images: PropTypes.object,
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

  row = (unscaledContents, scaleDueToHeight) => {
    const width = this.props.size.width
    const scaledContents = unscaledContents.map(unscaledDimension => {
      const factor = this.factorToFitInMinimumRowHeight(unscaledDimension) * scaleDueToHeight
      return this.scaleDimension(unscaledDimension, factor)
    })

    const remainingWhitespace = width - scaledContents
      .map(scaledContent => scaledContent.dimension.x * scaledContent.scale)
      .reduce((cur, prev) => { return cur + prev }, 0)

    return {
      contents: scaledContents,
      rowHeight: minimumRowHeight * scaleDueToHeight,
      horizontalWhitespace: remainingWhitespace
    }
  }

  makeNextRow = (remainingDimensions) => {
    const width = this.props.size.width
    let remainingRowWidth = width
    let accumulatedRowDimensions = []
    while (remainingDimensions.length > 0 && remainingRowWidth > this.widthAtMinimumRowHeight(remainingDimensions[0])) {
      remainingRowWidth -= this.widthAtMinimumRowHeight(remainingDimensions[0])
      accumulatedRowDimensions.push(remainingDimensions.shift())
    }

    const widthsAtMinimumHeight = accumulatedRowDimensions.map(d => this.widthAtMinimumRowHeight(d))
    const totalWidthAtMinimumHeight = widthsAtMinimumHeight.reduce((a, b) => { return a + b }, 0)
    const widthScaleFactor = Math.min(width / totalWidthAtMinimumHeight, maximumRowHeight / minimumRowHeight)
    return {
      next: this.row(accumulatedRowDimensions, widthScaleFactor),
      remaining: remainingDimensions
    }
  }

  makeRows = (accumulatedRows, dimensions) => {
    const { next, remaining } = this.makeNextRow(dimensions)
    accumulatedRows.push(next)
    if (remaining.length > 0) {
      accumulatedRows.concat(this.makeRows(accumulatedRows, remaining))
    }
    return accumulatedRows
  }

  widthAtMinimumRowHeight = (dimension) => {
    return this.factorToFitInMinimumRowHeight(dimension) * dimension.x
  }

  factorToFitInMinimumRowHeight = (dimension) => {
    return minimumRowHeight / dimension.y
  }

  getImageDimensions = (image) => {
    const { width, height } = image
    switch (image.image_orientation) {
      case 'LeftBottom':
        return {
          x: height,
          y: width
        }
      default:
        return {
          x: width,
          y: height
        }
    }
  }

  makeDimensions = () => {
    const { images } = this.props
    return images.filter(({ width, height }) => {
      return width && height
    }).map((image) => {
      const { x, y } = this.getImageDimensions(image)
      return this.dimension(x, y)
    })
  }

  getItemSize = index => {
    return this.rows[index].rowHeight
  };

  render() {
    const { images, size, renderItem } = this.props
    const { height, width } = size
    const imageDimensions = this.makeDimensions()
    this.rows = this.makeRows([], imageDimensions)
    const itemData = { rows: this.rows, images, renderItem }
    return (
      <VariableSizeList
        height={height}
        width={width}
        itemData={itemData}
        itemSize={this.getItemSize}
        itemCount={this.rows.length}
        ref={(node) => { this.list = node }}
      >
        {Row}
      </VariableSizeList>
    )
  }
}
