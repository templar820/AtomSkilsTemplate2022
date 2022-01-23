import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import React from 'react';
import { observer, inject } from 'mobx-react';
import Page from '@/components/System/Page';
import HomePage from '@pages/HomePage/HomePage';
import AuthorizationPage from '@pages/AuthorizationPage/AuthorizationPage';
import NotFound from '@pages/System/NotFound';
import {StoresNames} from "@/stores/StoresNames";
import UserStore from "@/stores/UserStore";

class Router extends React.Component {
  userStore: UserStore;
  constructor(props: any) {
    super(props);
    this.userStore = props[StoresNames.UserStore]
  }

  getPage(routerProps: any, Component: React.ComponentClass) {
    if (!this.userStore.isLogin) {
      return <Redirect to="/authorization"/>
    }
    return (
      <Page>
        <Component {...routerProps} />
      </Page>
    );
  }

  render() {
    if (!this.userStore.user) return null;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={p => this.getPage(p, HomePage)} />
          <Route path="/authorization">
            {
              this.userStore.isLogin
              && <Redirect to="/"/>
            }
            <AuthorizationPage/>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default inject(StoresNames.UserStore, 'services')(observer(Router));
