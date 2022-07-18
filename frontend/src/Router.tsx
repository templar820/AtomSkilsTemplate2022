import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router';
import WindowFactory, { WindowType } from '@components/HOC/WindowFactory';
import Page from '@components/system/Page/Page';
import ErrorBoundary from '@components/system/ErrorBoundary';
import { MOBXDefaultProps } from '@globalTypes';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import HomePage from '@pages/HomePage';
import TablePage from '@pages/Table';
import ProductPage from '@pages/Product';
import NotificationWindow from './NotificationWindow';

function Router(props: MOBXDefaultProps) {
  const getPage = (routerProps, Component, type?:any) => {
    return (
      <Page>
        <Component type={type} {...routerProps} />
      </Page>
    );
  };

  return (
    <BrowserRouter>
      <NotificationWindow />
      <ErrorBoundary throwError={props.services.appService.errorListener}>
        <Switch>
          <Route
            exact
            path="/home"
            render={p => getPage(p, HomePage)}
          />
          <Route
            exact
            path="/examples/table"
            render={p => getPage(p, TablePage)}
          />
          <Route
            exact
            path="/examples/products"
            render={p => getPage(p, ProductPage)}
          />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="*" render={p => <WindowFactory type={WindowType.NotFoundPage} />} />
        </Switch>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
export default MobXRouterDecorator(Router, false);
