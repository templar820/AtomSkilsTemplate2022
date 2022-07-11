import React from 'react';
import PlaceCard from '@pages/Place';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import WindowFactory, { WindowType } from '@components/HOC/WindowFactory';
import Page from '@components/system/Page/Page';
import ErrorBoundary from '@components/system/ErrorBoundary';
import { MOBXDefaultProps } from '@globalTypes';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import HomePage from '@pages/HomePage';
import TablePage from '@pages/Table';
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
            path="/"
            render={p => getPage(p, HomePage)}
          />
          <Route
            exact
            path="/examples/table"
            render={p => getPage(p, TablePage)}
          />
        </Switch>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
export default MobXRouterDecorator(Router, false);
