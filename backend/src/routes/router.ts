import { Request } from 'express';
import BaseRouter, { requestType } from './BaseRouter';
import IoModel from '../socket/IoModel';
import OrderController, { IOrder } from '../controllers/OrderController';

class ProductRouter extends BaseRouter {
  constructor() {
    super();
    this.generateCrud('/order', OrderController);
  }

  deleteCallback(answer: any, req: Request, res: Response): boolean {
    const io = res.io as IoModel;
    io.sendInSession(req.user.email, 'connection', 'CURRENT');
    io.sendToUsers('connection', `FROM ${req.user.email}`, ['cypress@test']);
    io.sendAll('connection', 'ALL');
    return true;
  }
}

export default new ProductRouter().router;
