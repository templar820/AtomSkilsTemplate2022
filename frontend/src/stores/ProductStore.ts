import { action, makeObservable, observable } from 'mobx';
import ProductModel from "@/model/ProductModel";
interface IMode {
  value: 'all' | 'search';
  searchProduct: string;
}

export default class ProductStore {
  @observable products: ProductModel[] | null = null;
  @observable count: number = 0;

  mode: IMode = {value: 'all', searchProduct: ''};

  constructor() {
    makeObservable(this);
  }

  @action addProducts = (array: any[]) => {
    array = array.filter(item => item);
    const newProducts = array.map(obj => new ProductModel(obj));
    this.products = this.products
      ? [...this.products, ...newProducts]
      : newProducts;
  };

  @action deleteProduct = (id: number) => {
    if (!this.products) return;
    this.products = this.products.filter((product) => product.id !== id);
  };

  @action unshiftProduct = (obj: object) => {
    this.products = this.products
      ? [new ProductModel(obj), ...this.products]
      : [new ProductModel(obj)];
  };

  @action updateProduct = (obj: any) => {
    if (!this.products) return;
    this.products = this.products.map(product => {
      if (product.id !== obj.id) return product;
      return new ProductModel(obj);
    });
  };

  @action setCount = (count: number) => {
    this.count = count;
  }

  @action clearProducts = () => {
    this.products = null;
  };

  setMode(value: 'all' | 'search', searchProduct?: string) {
    this.mode.value = value;
    if (searchProduct) {
      this.mode.searchProduct = searchProduct;
    }
  }
}
