import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Redirect, Route, Switch} from 'react-router';
import WindowFactory, {WindowType} from '@components/HOC/WindowFactory';
import Page from '@components/system/Page/Page';
import ErrorBoundary from '@components/system/ErrorBoundary';
import {MOBXDefaultProps} from '@globalTypes';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import HomePage from '@pages/HomePage';
import TablePage from '@pages/Table';
import ProductPage from '@pages/Product';
import NotificationWindow from './NotificationWindow';
import Pdf from "@pages/Pdf/Pdf";
import AuthorizationPage from "@pages/AuthorizationPage/AuthorizationPage";
import Auth from "@components/system/Auth";
import {Roles} from "@services/Auth.service";
import AdminPanel from '@pages/AdminPanel';
import Analytics from "@pages/Analytics";

function Router(props: MOBXDefaultProps) {
  const userStore = props.UserStore;

  const getPage = (routerProps, Component, allowedRoles?: Roles[]) => {
    if (allowedRoles && !allowedRoles.includes(userStore.user?.role)) {
      return <WindowFactory type={WindowType.NotFoundPage} />;
    }
    return (
      <Page>
        <Component {...routerProps} />
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
            <Route path="/authorization">
              <AuthorizationPage />
            </Route>
            {
              !userStore.isLogin
              && <Redirect to="/authorization" />
            }
            <Route
              exact
              path="/home"
              render={p => getPage(p, HomePage)}
            />
            <Route
              exact
              path="/examples/table"
              render={p => getPage(p, TablePage, [Roles.ADMIN])}
            />
            <Route
              exact
              path="/examples/products"
              render={p => getPage(p, ProductPage, [Roles.ADMIN])}
            />
            <Route
              exact
              path="/examples/pdf"
              render={p => getPage(p, Pdf, [Roles.ADMIN])}
            />
            <Route
              exact
              path="/examples/analytics"
              render={p => getPage(p, Analytics, [Roles.ADMIN])}
            />
            <Route
              exact
              path="/admin-panel"
              render={p => getPage(p, AdminPanel, [Roles.ADMIN])}
            />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="*" render={p => <WindowFactory type={WindowType.NotFoundPage} />} />
          </Switch>
        </Auth>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
export default MobXRouterDecorator(Router, false);
