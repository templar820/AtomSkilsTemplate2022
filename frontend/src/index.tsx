import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';
import App from './App';
import { RootStoreProvider } from '@hooks/useRootStore';

ReactDOM.render(
  <RootStoreProvider>
    <App />
  </RootStoreProvider>,
  document.getElementById('root')
);
