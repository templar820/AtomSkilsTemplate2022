import AppService from '@services/App.service';
import { RouteComponentProps } from 'react-router';
import { RootStore } from './stores/Root.store';

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'production' | 'development';
    REACT_APP_ENDPOINT: string;
  }
}
declare module '*.scss';

export interface IServices {
  appService: AppService;
}
export interface IStores extends RootStore{
}

export interface MOBXDefaultProps extends IStores, RouteComponentProps{
  services: IServices;
}
