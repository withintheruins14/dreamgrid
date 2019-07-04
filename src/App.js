import React, { Component } from 'react';
import { HashRouter, Route } from "react-router-dom";
import HomePage from './HomePage.js';
import Layout from './Layout.js';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Route
          exact
          path="/"
          component={HomePage}
        />
        <Route
          path="/docs"
          component={Layout}
        />
      </HashRouter>
    );
  }
}

export default App;
