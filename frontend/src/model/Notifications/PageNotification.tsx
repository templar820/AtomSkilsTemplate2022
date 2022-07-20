import React from 'react';
import BaseNotification from './BaseNotification';

export enum SnackType {
  Success='success',
  Error='error',
  Info='info',
  Warning='warning',
}

interface ISnackConfig {
  message: string;
  snacktype: SnackType;
  onClose?: () => void;
  persist?: boolean;
  action?: React.ReactNode;
}

export default class PageNotification extends BaseNotification {
  private message: string;

  private snacktype: SnackType;

  private onClose: (() => void) | undefined;

  private persist: boolean;

  private action: React.ReactNode;

  open(config: ISnackConfig) {
    this.message = config.message;
    this.snacktype = config.snacktype;
    this.onClose = config.onClose;
    this.persist = Boolean(config.persist);
    this.action = config.action;

    this.sendNotify();
  }
}
