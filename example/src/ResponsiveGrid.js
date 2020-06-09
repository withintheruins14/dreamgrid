import React, { Fragment } from 'react';
import ReactVirtualizedAutoSizer from 'react-virtualized-auto-sizer';
import images from './images.js';
import DreamGrid from './DreamGrid';

import { responsiveGrid, mockData } from './dictionary.js';
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
                  renderItem={(style, image) => {
                    return (
                      <img
                          alt=""
                          src={image.url}
                          style={style}
                      />
                    );
                  }}
                />
              );
            }
          }
        </ReactVirtualizedAutoSizer>
      </div>
      <br />
      <br />
      <PrismCode component="pre" className="language-javascript">
        {mockData}
      </PrismCode>
      <h3>With ReactVirtualizedAutoSizer</h3>
      <PrismCode component="pre" className="language-javascript">
        {responsiveGrid}
      </PrismCode>
      <br />
      <br />
    </Fragment>
  );
}
