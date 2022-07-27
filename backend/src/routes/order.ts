import { Request } from 'express';
import BaseRouter, { requestType } from './BaseRouter';
import IoModel from '../socket/IoModel';
import OrderController, { IOrder } from '../controllers/OrderController';

class OrderRouter extends BaseRouter {
    constructor() {
        super();
        this.generateCrud('/order', OrderController);
    }
}

export default new OrderRouter().router;
