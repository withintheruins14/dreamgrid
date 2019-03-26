import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Files from './Files.js';

const dimensions = {
  height: 300,
  width: 600,
};

const contributions = { allIds: [], byId: {} };

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
          <Files
            dimensions={dimensions}
            contributions={contributions}
          />
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
