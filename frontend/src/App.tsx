import React, { useEffect } from 'react';
import AppService from '@services/App.service';
import AuthService from '@services/Auth.service';
import { Provider } from 'mobx-react';
import { ThemeProvider } from '@mui/material';
import { IServices, IStores, StoresNames } from '@globalTypes';
import Loader from '@components/system/Loader';
import { SnackbarProvider } from 'notistack';
import { useRootStore } from '@hooks/useRootStore';
import { SvgIcons } from 'ui-kit';
import { makeStyles } from '@mui/styles';
import Router from './Router';
import theme from './styles/muiTheme';
import { Api, HttpClient } from './api/api';

const useStyles = makeStyles({
  wrappedRoot: {

  },
  success: { backgroundColor: 'white !important', color: 'black !important' },
  error: { backgroundColor: 'white !important', color: 'black !important' },
  warning: { backgroundColor: 'white !important', color: 'black !important' },
  info: { backgroundColor: 'white !important', color: 'black !important' },
});

function App() {
  const endpoint = process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_ENDPOINT_DEVELOP : process.env.REACT_APP_ENDPOINT_PRODUCTION;
  console.log("REACT_APP_ENDPOINT", endpoint);
  const httpClient = new HttpClient<any>({
    securityWorker: securityData => securityData,
    baseUrl: endpoint,
  });
  const apiService = new Api(httpClient);

  const stores = useRootStore();

  const appService = new AppService(stores.AppStore);

  const authService = new AuthService(apiService, appService, stores.UserStore);

  const services = {
    appService,
    authService,
  } as IServices;
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        classes={{
          variantSuccess: classes.success,
          variantError: classes.error,
          variantWarning: classes.warning,
          variantInfo: classes.info,
        }}
        iconVariant={{
          error: <SvgIcons name="error" width="24" height="24" className="logotype" />,
          info: <SvgIcons name="info" width="24" height="24" className="logotype" />,
          success: <SvgIcons name="success" width="24" height="24" className="logotype" />,
          warning: <SvgIcons name="warning" width="24" height="24" className="logotype" />,
        }}
      >
        <Provider {...stores} services={services}>
          <Loader />
          <Router />
          {/* <YMapSingleton /> */}
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
