import React, { Fragment } from 'react';
import images from './images.js';
import DreamGrid from './DreamGrid';
import { staticGrid, staticGridHooks, mockData } from './dictionary.js';
import PrismCode from 'react-prism';
require('prismjs');
require('prismjs/themes/prism.css');

const size = { height: 500, width: 400 };

export default () => {
  return (
    <Fragment>
      <h5 style={{ position: 'sticky', top: 0, margin: 0, height: 50, display: 'flex', alignItems: 'center' }}>Static Grid</h5>
      <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...size, display: 'flex', flex: 1, alignSelf: 'flex-start', position: 'sticky', top: 50 }}>
          <DreamGrid
            size={size}
            images={images}
            minimumRowHeight={180}
            maximumRowHeight={350}
            renderItem={(style, image) => (<img src={image.url} style={style} />)}
          />
        </div>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <PrismCode component="pre" className="language-javascript">
            {mockData}
          </PrismCode>
          <h3>
            Component
          </h3>
          <PrismCode component="pre" className="language-javascript">
            {staticGrid}
          </PrismCode>
          <h3>
            Hooks
          </h3>
          <PrismCode component="pre" className="language-javascript">
            {staticGridHooks}
          </PrismCode>
          <br />
          <br />
        </div>
      </section>
    </Fragment>
  );
}
