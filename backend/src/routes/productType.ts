import { Request } from 'express';
import BaseRouter, { requestType } from './BaseRouter';
import IoModel from '../socket/IoModel';
import OrderController, { IOrder } from '../controllers/OrderController';
import ProductType from '../controllers/ProductType';

class ProductRouter extends BaseRouter {
  constructor() {
    super();
    this.generateCrud('/product-type', ProductType);
  }
}

export default new ProductRouter().router;
