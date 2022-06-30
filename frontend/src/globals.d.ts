import AppService from '@services/App.service';
import { RouteComponentProps } from 'react-router';
import AppStore from './stores/App.store';

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'production' | 'development';
    REACT_APP_ENDPOINT: string;
  }
}
declare module '*.scss';

export enum StoresNames {
  AppStore='AppStore',
}

export interface IServices {
  appService: AppService;
}
export interface IStores {
  AppStore: AppStore;
}

export interface MOBXDefaultProps extends IStores, RouteComponentProps{
  services: IServices;
}
