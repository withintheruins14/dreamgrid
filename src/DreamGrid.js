import React, { PureComponent } from 'react';
import { VariableSizeList as List } from 'react-window';
import { Link } from 'react-router-dom';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const minimumRowHeight = 225;
const maximumRowHeight = 375;

export class Files extends PureComponent {
  renderContents = (content, key, index) => {
    const { contributions } = this.props;
    const contribution = contributions.byId[parseInt(content.dimension.id, 10)];
    return (
      <Link
        key={`link-${contribution.id}`}
        to={`/contribute/files/${contribution.id}`}
        style={{
          width: 'unset',
          height: 'unset',
          padding: 'unset',
          display: 'block',
        }}
      >
        <img
          style={{
            width: content.dimension.x * content.scale,
            height: content.dimension.y * content.scale,
          }}
          key={`img-${contribution.id}`}
          src={contribution.thumbnail_url}
        />
      </Link>
    );
  }

  renderItem = ({ data, index, style }) => {
    const rows = data;
    const { contributions } = this.props;
    return (
      <GridList
        cellHeight={rows[index].rowHeight}
        key={index}
        cols={rows[index].length}
        style={{ width: '100%', margin: '5px 0', justifyContent: 'space-evenly', alignItems: 'center' }}
      >
        {rows[index].contents.map((content, i) => {
          const contribution = contributions.byId[parseInt(content.dimension.id, 10)];
          return (
            <GridListTile
              key={`tile-${contribution.id}`}
              cols={1}
              style={{
                padding: 'unset',
                width: content.dimension.x * content.scale,
                height: content.dimension.y * content.scale,
              }}
            >
              {this.renderContents(content, i, index)}
            </GridListTile>
          );
        })
      }
      </GridList>
    );
  }

  dimension = (id, x, y) => {
    return {id, x, y };
  }

  scaleDimension = (dimension, scale) => {
    return {
    	dimension: dimension,
      scale: scale
    };
  }

  row = (unscaledContents, scaleDueToHeight) => {
    const width = this.props.dimensions.width - 40;
  	const scaledContents = unscaledContents.map(unscaledDimension => {
    	const factor = this.factorToFitInMinimumRowHeight(unscaledDimension) * scaleDueToHeight;
      return this.scaleDimension(unscaledDimension, factor);
    })

    const remainingWhitespace = width - scaledContents
      .map(scaledContent => {
        return scaledContent.dimension.x * scaledContent.scale;
      })
      .reduce(( cur, prev ) => { return cur + prev; }, 0);

  	return {
    	contents: scaledContents,
      rowHeight: minimumRowHeight * scaleDueToHeight,
      horizontalWhitespace: remainingWhitespace
    }
  }

  makeNextRow = (remainingDimensions) => {
    const width = this.props.dimensions.width - 40;
  	let remainingRowWidth = width;
    let accumulatedRowDimensions = [];
    let rowFull = false;
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
    const { contributions } = this.props;
    const contribution = contributions.byId[id];
    const { image_width, image_height } = contribution;
    switch(contribution.image_orientation) {
      case 'LeftBottom':
        return {
          x: contribution.image_height,
          y: contribution.image_width,
        };
      default:
        return {
          x: contribution.image_width,
          y: contribution.image_height,
        };
      }
  }

  makeDimensions = () => {
    const { contributions, dimensions } = this.props;
    return contributions.allIds.filter((id) => {
      const { image_width, image_height } = contributions.byId[id];
      return image_width && image_height;
    }).map((id) => {
      const contribution = contributions.byId[id];
      const { x, y } = this.getImageDimensions(id);
      return this.dimension(id, x, y);
    })
  }

  getItemSize = index => this.rows[index].rowHeight;

  render() {
    const { contributions, dimensions } = this.props;
    const { height, width } = dimensions;
    const imageDimensions = this.makeDimensions();
    this.rows = this.makeRows([], imageDimensions);
    return (
      <div
        style={{
          overflow: 'auto',
          maxHeight: height,
          height,
          width,
        }}
      >
        <List
          height={height}
          width={width}
          itemCount={this.rows.length}
          itemSize={this.getItemSize}
          itemData={this.rows}
        >
          {this.renderItem}
        </List>
      </div>
    );
  }
}

export default (Files);

const Row = ({ data, index, style }) => {
  return data[index].contents.map();
}
