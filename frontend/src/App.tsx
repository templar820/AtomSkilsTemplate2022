import React, { useEffect } from 'react';
import AppService from '@services/App.service';
import { Provider } from 'mobx-react';
import { v4 as uuidv4 } from 'uuid';
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
  const endpoint = process.env.REACT_APP_ENDPOINT;

  console.log(endpoint);
  const localStorageKeyId = 'as_user_id';
  let user_id = localStorage.getItem(localStorageKeyId);
  if (!user_id) {
    user_id = uuidv4();
    localStorage.setItem(localStorageKeyId, user_id);
  }

  const httpClient = new HttpClient<any>({
    securityWorker: securityData => securityData,
    baseUrl: endpoint,
  });
  httpClient.setSecurityData({
    headers: {
      Authorization: `Bearer ${user_id}`
    }
  });
  const apiService = new Api(httpClient);

  const stores = useRootStore();

  const appService = new AppService(stores.AppStore);

  const services = {
    appService,
  } as IServices;
  const classes = useStyles();

  useEffect(() => {
    apiService.order.getOne(6).then(data => {
      console.log(data);
    });
  }, []);
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
