import React from 'react';
import {
  Dialog, DialogContent, Button, CardHeader, DialogActions
} from '@mui/material';
import BaseNotification from './BaseNotification';
import BaseNotificationWindow from './BaseNotificationWindow';

interface IConfirmConfig {
  message: string;
  onSubmit: () => void;
  onClose?: () => void;
}

export default class ConfirmWindow extends BaseNotification implements BaseNotificationWindow {
  private message: string;

  private onSubmit: () => void;

  private onClose: (() => void) | undefined;

  open(config: IConfirmConfig) {
    this.message = config.message;
    this.onSubmit = config.onSubmit;
    this.onClose = config.onClose;

    this.sendNotify();
  }

  getMessage(): React.ReactNode {
    return <p>{this.message}</p>;
  }

  getIcon(): React.ReactNode {
    return <></>;
  }

  getNotificationWindow(): React.ReactNode {
    return (
      <Dialog open maxWidth="lg" onClose={() => { this.close(); }} aria-labelledby="simple-dialog-title">
        <DialogContent className="dialogContent">
          <CardHeader
            avatar={this.getIcon()}
            subheader={this.getMessage()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { this.close(); this.onSubmit(); }} variant="contained" color="primary">Подтвердить</Button>
          <Button onClick={() => { this.close(); }} variant="contained" color="primary">Закрыть</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
