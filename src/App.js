import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import logo from './logo.svg';
import contributions from './contributions.js';
import './App.css';
import DreamGrid from './DreamGrid.js';

const dimensions = {
  height: 400,
  width: 900,
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>DreamGrid</h1>
          <p>
            The <code>ideal</code> image grid component.
            <br/>
            <br/>
            <i>respects image aspect ratios.</i>
          </p>
          <BrowserRouter>
            <DreamGrid
              dimensions={dimensions}
              contributions={contributions}
            />
          </BrowserRouter>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </header>
      </div>
    );
  }
}

export default App;
