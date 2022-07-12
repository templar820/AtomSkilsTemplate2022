import React from 'react';
import {
  Button, CardHeader, Dialog, DialogActions, DialogContent, SvgIcons
} from 'ui-kit';
import BaseNotification from './BaseNotification';
import BaseNotificationWindow from './BaseNotificationWindow';

interface IConfirmConfig {
  title: string;
  buttonCancelText?: string;
  message: string;
  onClose?: () => void;
}

class AlertWindow extends BaseNotification implements BaseNotificationWindow {
  private title: string;

  private message: string;

  private buttonCancelText?: string;

  private onClose: (() => void) | undefined;

  open(config: IConfirmConfig) {
    this.title = config.title;
    this.message = config.message;
    this.buttonCancelText = config.buttonCancelText;
    this.onClose = config.onClose;

    this.sendNotify();
  }

  getMessage(): React.ReactNode {
    return <p>{this.message}</p>;
  }

  getNotificationWindow(): React.ReactNode {
    return (
      <Dialog open minWidth={376} maxWidth="lg" aria-labelledby="confirmDialog">
        <DialogContent className="dialogContent">
          <CardHeader avatar={<SvgIcons name="circled-warning" />} subheader={this.title} />
          <p className="contentBody">{this.message}</p>
        </DialogContent>
        <DialogActions className="justify-content-end">
          <Button
            onClick={() => {
              this.close();
            }}
          >
            {this.buttonCancelText || 'Закрыть'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  getIcon(): React.ReactNode {
    return null;
  }
}

export default AlertWindow;
