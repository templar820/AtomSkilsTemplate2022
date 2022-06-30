import { v4 as uuidv4 } from 'uuid';
import { INotificationService } from '@/helpers/NotificationManager';

export default abstract class BaseNotification {
  private service: INotificationService;

  abstract open(config): void;

  constructor(service: INotificationService) {
    this.service = service;
  }

  id: string;

  protected sendNotify() {
    this.id = uuidv4();
    this.service.sendNotify(this);
  }

  protected close() {
    this.service.closeNotify(this);
  }
}
