import * as React from 'react';
import loadable from "@loadable/component";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from './routesConfig';
import GlobalState from '../context/GlobalState';

const Menu = loadable(() => import("../components/Menu"));

export function Routes() {
  const renderRoutes = (routes) => {
    let routeList = [];

    routes.forEach(({
      component: Component, path, childRoutes, ...rest
    }) => {
      routeList.push(
        <Route
          exact
          key={path}
          path={path}
          render={(props) => {
            const combinedProps = { ...rest, ...props };
            return <Component {...combinedProps} />;
          }}
          {...rest}
        />,
      );
      if (childRoutes && childRoutes.length > 0) {
        routeList = routeList.concat(this.renderRoutes(childRoutes));
      }
    });
    return routeList;
  }
  
  return (
    <GlobalState>
      <BrowserRouter>
        <Menu/>
        <Switch>{renderRoutes(routes)}</Switch>
      </BrowserRouter>
    </GlobalState>
  )
}
