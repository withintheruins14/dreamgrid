import React, { Fragment } from 'react';
import ReactVirtualizedAutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList } from 'react-window';
import images from './images.js';
import DreamGrid from './DreamGrid';
import RowItem from './DreamGridRowItem';

import { responsiveGrid } from './dictionary.js';
import PrismCode from 'react-prism';
require('prismjs');
require('prismjs/themes/prism.css');

const size = {
  height: 400,
  width: 600,
};


export default () => {
  return (
    <Fragment>
      <h5>Responsive Grid</h5>
      <div style={{ ...size, width: '100%' }}>
        <ReactVirtualizedAutoSizer>
          {
            (sizes) => {
              return (
                <DreamGrid
                  size={sizes}
                  images={images}
                  minimumRowHeight={180}
                  maximumRowHeight={350}
                  renderItem={(data, content, index, image) => {
                    return (
                      <img
                          alt=""
                          src={image.url}
                          style={{
                              padding: 'unset',
                              width: content.dimension.x * content.scale,
                              height: content.dimension.y * content.scale,
                              // TODO spead height and width behind the scenes
                          }}
                      />
                    );
                  }}
                />
              );
            }
          }
        </ReactVirtualizedAutoSizer>
      </div>
      <PrismCode component="pre" className="language-javascript">
        {responsiveGrid}
      </PrismCode>
    </Fragment>
  );
}
