import React from 'react';
import {
  Backdrop,
  Dialog, Slide, Typography,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import BaseNotification from './BaseNotification';
import BaseNotificationWindow from './BaseNotificationWindow';
import Colors from "@colors"

interface IErrorConfig {
  message: string;
  status?: number;
  onClose?: () => void;
}

export default class EducationWindow extends BaseNotification implements BaseNotificationWindow {
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
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
        onClose={() => this.closeNotification()}
      >
        <div className="">
          <Typography variant="h2" color={Colors.gray7}>{'Пропустить'.toLocaleUpperCase()}</Typography>
  
          <Typography variant="h2" color={Colors.white}>{this.message}</Typography>
        </div>
      </Backdrop>
    );
  }
}
