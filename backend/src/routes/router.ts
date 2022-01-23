import { Request } from 'express';
import ProductController from '../controllers/ProductController';
import BaseRouter, { requestType } from './BaseRouter';
import IoModel from '../socket/IoModel';
import CarController from "../controllers/CarController";

class ProductRouter extends BaseRouter {
  constructor() {
    super();
    this.createHandleWithBody(requestType.POST, '/products/part', ProductController.getPart);
    this.createHandleWithBody(requestType.POST, '/cars', CarController.create);
    this.createHandleWithBody(requestType.PATCH, '/products', ProductController.update);
    this.createHandleWithBody(requestType.POST, '/products', ProductController.insert, { access: ['ADMIN'] });
    this.createHandleWithParams(requestType.GET, '/products/:id', ProductController.getById, { params: 'id' });
    this.createHandleWithParams(requestType.DELETE, '/products/:id', ProductController.delete, {
      params: 'id',
      access: ['ADMIN'],
      callback: this.deleteCallback
    });
    this.createHandleWithBody(requestType.POST, '/products/search', ProductController.search);
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
