import {
  action, makeAutoObservable, observable, toJS
} from 'mobx';
import ProductModel from '../model/Product.model';
import UTILS from '../utils';

export default class ProductStore {
  get productList() {
    const criteria = this.filterNames.find(el => el.active);
    return UTILS.getSortableList(toJS(this._botList), criteria, `${criteria?.value}`);
  }

  set productList(value) {
    this._botList = value;
  }

  @observable _botList = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setBotList(list) {
    this.productList = list.map(el => new ProductModel(el));
  }

  filterNames = [
    {
      ascending: 'top',
      active: false,
      name: 'по названию',
      value: 'name'
    },
    {
      ascending: 'top',
      active: false,
      name: 'по количеству чатов',
      value: 'chats.length'
    }
  ];

  @action
  setFilterNames(list) {
    this.filterNames = list;
  }
}
