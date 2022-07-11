import AppStore from './App.store';

export class RootStore {
  AppStore: AppStore;

  constructor() {
    this.AppStore = new AppStore();
  }
}

export default new RootStore();
