import ErrorWindow from '../model/Notifications/ErrorWindow';
import TradeSInfoWindow from '../model/Notifications/TradeSInfoWindow';
import ConfirmWindow from '../model/Notifications/ConfirmWindow';
import BaseNotification from '../model/Notifications/BaseNotification';
import EducationWindow from '../model/Notifications/EducationWindow';
import PageNotification from '../model/Notifications/PageNotification';
import AlertWindow from '../model/Notifications/AlertWindow';

export interface INotificationService {
  sendNotify: (notify: BaseNotification) => void;
  closeNotify: (notify: BaseNotification) => void;
}

class NotificationManager {
  private service: INotificationService;

  Confirm: ConfirmWindow;

  Error: ErrorWindow;

  Snack: PageNotification;

  Alert: AlertWindow;

  init(service: INotificationService) {
    this.service = service;
    this.Confirm = new ConfirmWindow(this.service);
    this.Error = new ErrorWindow(this.service);
    this.Snack = new PageNotification(this.service);
    this.Alert = new AlertWindow(this.service);
  }
}

export default new NotificationManager();
