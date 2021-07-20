import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from './routesData';

function Routes() {
  return (
    <Switch>
      {routes.map((route) => (
        <Route key={ route.path } { ...route } />
      ))}
    </Switch>
  );
}

export default Routes;
