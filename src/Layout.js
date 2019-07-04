import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import ResponsiveGrid from './ResponsiveGrid.js';
import StaticGrid from './StaticGrid.js';

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

export default (props) => {
  return (
    <main style={mainStyles}>
      <section style={leftStyles}>
        <h1><Link to="/">DreamGrid</Link> • <Link to="/docs">Docs</Link></h1>
        <h3>Examples</h3>
        <Link to="/docs/responsive">Responsive Grid</Link>
        <br />
        <Link to="/docs/static">Static Grid</Link>
      </section>
      <section style={rightStyles}>
        <Switch>
          <Route
            exact
            path="/docs/static"
            component={StaticGrid}
          />
          <Route
            exact
            path={["/docs", "/docs/responsive"]}
            component={ResponsiveGrid}
          />
        </Switch>
      </section>
    </main>
  );
}
