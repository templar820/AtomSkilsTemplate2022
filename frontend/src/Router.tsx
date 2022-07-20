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
import Pdf from "@pages/Pdf/Pdf";
import AuthorizationPage from "@pages/AuthorizationPage/AuthorizationPage";
import Auth from "@components/system/Auth";

function Router(props: MOBXDefaultProps) {
  const userStore = props.UserStore;

  const getPage = (routerProps, Component, type?:any) => {
    if (!userStore.isLogin) {
      return <Redirect to="/authorization" />
    }
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
        <Auth>
          <Switch>
            {
              userStore.isLogin
              && <Redirect from="/authorization" to="/" />
            }
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
            <Route
              exact
              path="/examples/pdf"
              render={p => getPage(p, Pdf)}
            />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/authorization">
              <AuthorizationPage />
            </Route>
            <Route exact path="*" render={p => <WindowFactory type={WindowType.NotFoundPage} />} />
          </Switch>
        </Auth>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
export default MobXRouterDecorator(Router, false);
