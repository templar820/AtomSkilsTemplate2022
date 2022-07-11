import {
  action, computed, makeAutoObservable, observable, toJS,
} from 'mobx';
import {
  Home, Android, Work, InsertDriveFile, ContactSupport, Settings
} from '@mui/icons-material/';
import BaseNotification from '../model/Notifications/BaseNotification';

export default class AppStore {
  @observable
  notifications = [];

  @observable
  isLoader = false;

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

  isTimer = false;

  @action
  setLoader(value, fromTimer = false) {
    if (fromTimer) {
      if (this.isTimer) this.isLoader = value;
      this.isTimer = false;
    } else {
      this.isLoader = value;
      this.isTimer = false;
    }
  }

  getLoader = () => toJS(this.isLoader);

  startLoader() {
    this.isTimer = true;
    setTimeout(() => {
      this.setLoader(true, true);
    }, 200);
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
          name: 'Таблицы',
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
