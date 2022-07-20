import React from 'react';
import {
  Button,
  CardHeader,
  Dialog, Slide, Typography,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { DialogActions, DialogContent } from 'ui-kit';
import BaseNotification from './BaseNotification';
import BaseNotificationWindow from './BaseNotificationWindow';

interface IErrorConfig {
  message: string;
  status?: number;
  onClose?: () => void;
}

export default class ErrorWindow extends BaseNotification implements BaseNotificationWindow {
  protected message: string;

  protected status: number;

  protected onClose: (() => void) | undefined;

  open(config: IErrorConfig) {
    this.message = config.message;
    this.status = config.status;
    this.onClose = config.onClose;
    this.sendNotify();
  }

  getMessage(): React.ReactNode {
    return <Typography variant="subtitle2" className="text-center m-0">{this.message}</Typography>;
  }

  getIcon(): React.ReactNode {
    return <ErrorIcon style={{ fontSize: '40px' }} color="error" />;
  }

  closeNotification() {
    if (this.onClose) {
      this.onClose();
    }
    this.close();
  }

  getNotificationWindow(): React.ReactNode {
    return (
      <Dialog open maxWidth="lg" aria-labelledby="simple-dialog-title">
        <DialogContent className="dialogContent">
          <CardHeader avatar={this.getIcon()} subheader={this.getMessage()} />
          <DialogContent>
            <div className="extraField">
              <Typography variant="body2">
                {this.message}
              </Typography>
            </div>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.close();
            }}
            variant="contained"
            color="primary"
          >
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
