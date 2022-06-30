import {
  action, computed, makeAutoObservable, observable,
} from 'mobx';
import BaseNotification from '../model/Notifications/BaseNotification';

export default class AppStore {
  @observable
  notifications = [];

  @action
  setNotifications(notifications: BaseNotification[]) {
    this.notifications = notifications;
  }

  @action
  addNotification(notify) {
    this.setNotifications([...this.notifications, notify]);
  }
  
  
  @computed
  get currentNotification() {
    return this.notifications[0];
  }

  constructor() {
    makeAutoObservable(this);
  }
}
