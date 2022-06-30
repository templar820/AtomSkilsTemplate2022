import ErrorWindow from '../model/Notifications/ErrorWindow';
import TradeSInfoWindow from '../model/Notifications/TradeSInfoWindow';
import ConfirmWindow from '../model/Notifications/ConfirmWindow';
import BaseNotification from '../model/Notifications/BaseNotification';
import EducationWindow from '../model/Notifications/EducationWindow';

export interface INotificationService {
  sendNotify: (notify: BaseNotification) => void;
  closeNotify: (notify: BaseNotification) => void;
}

class NotificationManager {
  private service: INotificationService;

  Confirm: ConfirmWindow;

  Error: ErrorWindow;

  EducationWindow: EducationWindow;

  init(service: INotificationService) {
    this.service = service;
    this.Confirm = new ConfirmWindow(this.service);
    this.Error = new ErrorWindow(this.service);
    this.EducationWindow = new EducationWindow(this.service);
  }
}

export default new NotificationManager();
