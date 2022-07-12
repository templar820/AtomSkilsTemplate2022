import ContactFactory from './ContactFactory';
import CategoriesFactory from './CategoriesFactory';

export default class UTILS {
  static ContactFactory = new ContactFactory();
  
  static getInPx = (number: number) => `${number}px`;
  
  static CategoriesFactory = new CategoriesFactory();
}
