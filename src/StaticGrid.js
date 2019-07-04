import React, { Fragment } from 'react';
import images from './images.js';
import DreamGrid from './DreamGrid';
import { staticGrid } from './dictionary.js';
import PrismCode from 'react-prism';
require('prismjs');
require('prismjs/themes/prism.css');

const size = { height: 500, width: 400 };


export default () => {
  return (
    <Fragment>
      <h5>Static Grid</h5>
      <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...size, display: 'flex', flex: 1 }}>
          <DreamGrid
            size={size}
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
        </div>
        <div style={{ height: size.height, display: 'flex', flex: 1 }}>
          <PrismCode component="pre" className="language-javascript">
            {staticGrid}
          </PrismCode>
        </div>
      </section>
    </Fragment>
  );
}
