import AppStore from './App.store';
import ProductStore from './Product.store';

export class RootStore {
  AppStore: AppStore;

  ProductStore: ProductStore;

  constructor() {
    this.AppStore = new AppStore();
    this.ProductStore = new ProductStore();
  }
}

export default new RootStore();
