import ContactFactory from './ContactFactory';
import CategoriesFactory from './CategoriesFactory';
import NotificationManager from '../helpers/NotificationManager';
import { SnackType } from '../model/Notifications/PageNotification';

export default class UTILS {
  static ContactFactory = new ContactFactory();

  static getInPx = (number: number) => `${number}px`;

  static CategoriesFactory = new CategoriesFactory();

  static saveEntity() {
    NotificationManager.Snack.open({
      message: 'Сохранено',
      snacktype: SnackType.Success,
    });
  }

  static updateEntity() {
    NotificationManager.Snack.open({
      message: 'Обновлено',
      snacktype: SnackType.Success,
    });
  }

  static getSortableList(list, criteria, key) {
    if (criteria?.value === key) {
      return list.sort((a, b) => {
        if (criteria.ascending === 'top') {
          return (a[`${key}`] < b[`${key}`]) ? 1 : -1;
        } if (criteria.ascending === 'bottom') {
          return (a[`${key}`] > b[`${key}`]) ? 1 : -1;
        }
      });
    }
    return list;
  }
}
