import AppStore from './App.store';
import ProductStore from './Product.store';
import UserStore from './User.store';

export class RootStore {
  AppStore: AppStore;

  ProductStore: ProductStore;

  UserStore: UserStore;

  constructor() {
    this.AppStore = new AppStore();
    this.ProductStore = new ProductStore();
    this.UserStore = new UserStore();
  }
}

export default new RootStore();
