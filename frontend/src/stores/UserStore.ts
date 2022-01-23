import { action, makeObservable, observable } from 'mobx';
import UserModel from "@/model/UserModel";

export default class UserStore {
  @observable user: UserModel | null = null;
  @observable isLogin: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action setUser = (obj: any, isLogin: boolean) => {
    this.user = new UserModel(obj);
    this.isLogin = isLogin;
  };
}