import React from 'react';
import AppService from '@services/App.service';
import { Provider } from 'mobx-react';
import { v4 as uuidv4 } from 'uuid';
import { ThemeProvider } from '@mui/material';
import { IServices, IStores, StoresNames } from '@globalTypes';
import Loader from '@components/system/Loader';
import { SnackbarProvider } from 'notistack';
import Router from './Router';
import AppStore from './stores/App.store';
import theme from './styles/muiTheme';
import { Api, HttpClient } from './api/api';

function App() {
  const endpoint = process.env.REACT_APP_ENDPOINT;
  const localStorageKeyId = 'pick_spot_user_id';
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

  const appStore = new AppStore();

  const appService = new AppService(appStore);


  const stores = {
    [StoresNames.AppStore]: appStore,
  } as IStores;

  const services = {
    appService,
  } as IServices;
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
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
