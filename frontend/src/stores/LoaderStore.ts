import {
  action, makeObservable, observable
} from 'mobx';

export default class AppStore {
  isLoader: boolean = true;

  constructor() {
    makeObservable(this, {
      isLoader: observable,
      setLoader: action,
    });
  }

  setLoader(value: boolean) {
    this.isLoader = value;
  }
}
