import React from 'react';
import {
  Dialog, Slide
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
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
    return <h5 className="text-center m-0">{this.message}</h5>;
  }

  getIcon(): React.ReactNode {
    return <ErrorIcon style={{ fontSize: '80px' }} color="error" />;
  }

  closeNotification() {
    if (this.onClose) {
      this.onClose();
    }
    this.close();
  }

  getNotificationWindow(): React.ReactNode {
    return (
      <Dialog
        onClose={() => this.closeNotification()}
        TransitionComponent={Slide}
        open
      >
        <div className="modal-dialog modal-confirm">
          <div className="modal-content">
            <div className="modal-header">
              <div className="icon-box">
                {this.getIcon()}
              </div>
              <h4 className="modal-title w-100">
                Ошибка:
                {this.status}
              </h4>
            </div>
            <div className="modal-body">
              {this.getMessage()}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger btn-block"
                onClick={() => { this.closeNotification(); }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}
