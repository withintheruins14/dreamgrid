import React, { Component, createRef } from 'react';
import ReactVirtualizedAutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList } from 'react-window';
import Row from './Row';

let minimumRowHeight, maximumRowHeight;

export default class Responsive extends Component {

  constructor(props) {
    super(props);
    minimumRowHeight = props.minimumRowHeight;
    maximumRowHeight = props.maximumRowHeight;
    this.list = createRef();
  }

  componentDidUpdate(prevProps) {
    const { height, width } = this.props.size;
    if (prevProps.height !== height || prevProps.width !== width) {
      this.list.resetAfterIndex(0, true);
    }
  }

  dimension = (x, y) => {
    return { x, y };
  }

  scaleDimension = (dimension, scale) => {
    return {
    	dimension: dimension,
      scale: scale
    };
  }

  row = (unscaledContents, scaleDueToHeight) => {
    const width = this.props.size.width;
  	const scaledContents = unscaledContents.map(unscaledDimension => {
    	const factor = this.factorToFitInMinimumRowHeight(unscaledDimension) * scaleDueToHeight;
      return this.scaleDimension(unscaledDimension, factor);
    })

    const remainingWhitespace = width - scaledContents
      .map(scaledContent => scaledContent.dimension.x * scaledContent.scale)
      .reduce(( cur, prev ) => { return cur + prev; }, 0);

  	return {
    	contents: scaledContents,
      rowHeight: minimumRowHeight * scaleDueToHeight,
      horizontalWhitespace: remainingWhitespace
    }
  }

  makeNextRow = (remainingDimensions) => {
    const width = this.props.size.width;
  	let remainingRowWidth = width;
    let accumulatedRowDimensions = [];
    while (remainingDimensions.length > 0 && remainingRowWidth > this.widthAtMinimumRowHeight(remainingDimensions[0])) {
      remainingRowWidth -= this.widthAtMinimumRowHeight(remainingDimensions[0]);
    	accumulatedRowDimensions.push(remainingDimensions.shift());
    }

    const widthsAtMinimumHeight = accumulatedRowDimensions.map(d => this.widthAtMinimumRowHeight(d));
    const totalWidthAtMinimumHeight = widthsAtMinimumHeight.reduce((a, b) => { return a + b; }, 0);
    const widthScaleFactor = Math.min(width / totalWidthAtMinimumHeight, maximumRowHeight / minimumRowHeight);
    return {
      next: this.row(accumulatedRowDimensions, widthScaleFactor),
      remaining: remainingDimensions
    };
  }

  makeRows = (accumulatedRows, dimensions) => {
    const { next, remaining } = this.makeNextRow(dimensions);
    accumulatedRows.push(next);
    if (remaining.length > 0) {
    	accumulatedRows.concat(this.makeRows(accumulatedRows, remaining))
    }
    return accumulatedRows;
  }

  widthAtMinimumRowHeight = (dimension) => {
  	return this.factorToFitInMinimumRowHeight(dimension) * dimension.x;
  }

  factorToFitInMinimumRowHeight = (dimension) => {
  	return minimumRowHeight / dimension.y;
  }

  getImageDimensions = (id) => {
    const { images } = this.props;
    const image = images.byId[id];
    const { width, height } = image;
    switch(image.image_orientation) {
      case 'LeftBottom':
        return {
          x: height,
          y: width,
        };
      default:
        return {
          x: width,
          y: height,
        };
      }
  }

  makeDimensions = () => {
    const { images } = this.props;
    return images.allIds.filter((id) => {
      const { width, height } = images.byId[id];
      return width && height;
    }).map((id) => {
      const { x, y } = this.getImageDimensions(id);
      return this.dimension(x, y);
    })
  }

  getItemSize = index => {
    return this.rows[index].rowHeight;
  };

  render() {
    const { images, renderItem } = this.props;
    const imageDimensions = this.makeDimensions();
    this.rows = this.makeRows([], imageDimensions);
    const itemData = { rows: this.rows, images, renderItem };
    return (
      <ReactVirtualizedAutoSizer>
        {
          (sizes) => {
            return (
              <VariableSizeList
                height={sizes.height}
                width={sizes.width}
                itemData={itemData}
                itemSize={this.getItemSize}
                itemCount={this.rows.length}
                ref={(node) => { return this.list = node; }}
              >
                {Row}
              </VariableSizeList>
            );
          }
        }
      </ReactVirtualizedAutoSizer>
    );
  }
}
