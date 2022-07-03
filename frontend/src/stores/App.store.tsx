import {
  action, computed, makeAutoObservable, observable,
} from 'mobx';
import {
  Home, Android, Work, InsertDriveFile, ContactSupport, Settings
} from '@mui/icons-material/';
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

  @observable
  mainMenu = [
    {
      id: 'home',
      name: 'Главная',
      path: '/',
    },
    {
      id: 'examples',
      name: 'Примеры',
      children: [
        {
          id: 'table',
          name: 'Таблицы sdf sdf',
          path: '/examples/table'
        },
      ]
    },
  ];

  @observable
  botMenu = [
    {
      id: 'settings',
      name: 'Настройки',
      path: '/settings#account-general'
    },
    {
      id: 'support',
      name: 'Поддержка',
      path: '/support',
    }
  ];
}
