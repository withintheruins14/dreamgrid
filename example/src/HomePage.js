import React, { Component } from 'react';
import { Grid, useGrid } from 'dreamgrid';
import ReactVirtualizedAutoSizer from 'react-virtualized-auto-sizer';
import { Link } from 'react-router-dom';
import images from './images.js';

import hookedGrid from './hooked.js';

const mainStyles = {
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
};

const leftStyles = {
  height: '100%',
  width: 200,
};

const rightStyles = {
  height: '100%',
  width: '100%',
  overflowY: 'auto',
};

require('prismjs');
require('prismjs/themes/prism.css');

export default class HomePage extends Component {

  constructor(props) {
      super(props);
      this.animation = {}
      this.state = {
        size: {
          height: 400,
          width: 600
        }
      };
  }

  sizeUp() {
    clearInterval(this.animation);
    this.animation = setInterval(() => this.setState((state, props) => {
      return state.size.width <= 600 ? {
        size: {
          height: state.size.height,
          width: state.size.width + 25
        }
      } : this.sizeDown()
    }), 500);
  }

  sizeDown() {
    clearInterval(this.animation);
    this.animation = setInterval(() => this.setState((state, props) => {
      return state.size.width >= 300 ? {
        size: {
          height: state.size.height,
          width: state.size.width - 25
        }
      } : this.sizeUp()
    }), 500);
  }

  // componentDidMount() {
  //   this.sizeDown()
  //
  // }

  componentWillUnmount() {
    clearInterval(this.animation);
  }


  render() {
    return (
      <main style={mainStyles}>
        <section style={leftStyles}>
          <h1><Link to="/">DreamGrid</Link> • <Link to="/docs">Docs</Link></h1>
          <p>
            <i>The ideal image grid component</i>
          </p>
          <ol>
            <li>deterministic</li>
            <li>responsive</li>
            <li>respects image aspect ratios</li>
          </ol>
          <h3>Examples</h3>
          <Link to="/docs/responsive">Responsive Grid</Link>
          <br />
          <Link to="/docs/static">Static Grid</Link>
        </section>
        <section style={rightStyles}>
          <div className="App">
            <header className="App-header">
              <h1>DreamGrid 0.1.0 Beta is here and it's 🔥.</h1>
              <i>The ideal image grid component</i>
            </header>
            <br />
            <div style={{ ...this.state.size }}>
              <ReactVirtualizedAutoSizer>
                {(sizes) => {
                    return (
                      <Grid
                        size={sizes}
                        images={images}
                        minimumRowHeight={180}
                        maximumRowHeight={350}
                        renderItem={({ height, width, url }) => {
                          return (
                            <img
                              height={height}
                              width={width}
                              src={url}
                            />
                          );
                        }}
                    />
                  );
                }}
              </ReactVirtualizedAutoSizer>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
