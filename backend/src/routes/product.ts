import { Request } from 'express';
import BaseRouter, { requestType } from './BaseRouter';
import IoModel from '../socket/IoModel';
import OrderController, { IOrder } from '../controllers/OrderController';
import ProductController from '../controllers/ProductController';

class ProductRouter extends BaseRouter {
  constructor() {
    super();
    this.createHandleWithBody(requestType.GET, '/product/statistic', ProductController.getStatistic)
    this.generateCrud('/product', ProductController);
  }
}

export default new ProductRouter().router;
