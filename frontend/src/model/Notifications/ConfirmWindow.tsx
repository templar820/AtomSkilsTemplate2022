import React from 'react';
import {
  Dialog, DialogContent, Button, CardHeader, DialogActions
} from '@mui/material';
import { SvgIcons } from 'ui-kit';
import BaseNotification from './BaseNotification';
import BaseNotificationWindow from './BaseNotificationWindow';

interface IConfirmConfig {
  title: string;
  buttonSubmitText?: string;
  buttonCancelText?: string;
  message: string;
  onSubmit: () => void;
  onClose?: () => void;
}

export default class ConfirmWindow extends BaseNotification implements BaseNotificationWindow {
  private title: string;

  private message: string;

  private buttonSubmitText?: string;

  private buttonCancelText?: string;

  private onSubmit: () => void;

  private onClose: (() => void) | undefined;

  open(config: IConfirmConfig) {
    this.title = config.title;
    this.message = config.message;
    this.buttonSubmitText = config.buttonSubmitText;
    this.buttonCancelText = config.buttonCancelText;
    this.onSubmit = config.onSubmit;
    this.onClose = config.onClose;

    this.sendNotify();
  }

  getMessage(): React.ReactNode {
    return <p>{this.message}</p>;
  }

  getIcon(): React.ReactNode {}

  getNotificationWindow(): React.ReactNode {
    return (
      <Dialog open minWidth={376} maxWidth="lg" aria-labelledby="confirmDialog">
        <DialogContent className="dialogContent">
          <CardHeader avatar={<SvgIcons name="warn" width={60} />} subheader={this.title} />
          <p className="contentBody">{this.message}</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.close();
              this.onSubmit();
            }}
            variant="contained"
            color="primary"
          >
            {this.buttonSubmitText || this.title}
          </Button>
          <Button
            color="primary"
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
}
