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

  @observable
  openMenu = JSON.parse(localStorage.AS_2022 || 'false');

  @action
  setNotifications(notifications: BaseNotification[]) {
    this.notifications = notifications;
  }

  @action
  addNotification(notify) {
    this.setNotifications([...this.notifications, notify]);
  }

  @action
  changeMenu() {
    this.openMenu = !this.openMenu;
    localStorage.AS_2022 = this.openMenu;
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
      icon: <Home />,
      path: '/home',
    },
    {
      id: 'signals',
      name: 'Платформы',
      icon: <Work />,
      path: '/platforms'
    },
    {
      id: 'bots',
      name: 'Боты',
      icon: <Android />,
      path: '/bots'
    },
    {
      id: 'docs',
      name: 'Документация',
      icon: <InsertDriveFile />,
      path: '/docs',
      children: [],
    }
  ];

  @observable
  botMenu = [
    {
      id: 'settings',
      name: 'Настройки',
      icon: <Settings />,
      path: '/settings#account-general'
    },
    {
      id: 'support',
      name: 'Поддержка',
      icon: <ContactSupport />,
      path: '/support',
    }
  ];
}
