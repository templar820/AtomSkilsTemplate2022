import Router, { Express } from 'express';
import { Controller } from 'tsoa';
import { asyncMiddleware } from '../middleware/asyncMiddleware';
import { ServerError } from '../middleware/errorHandler';
import { JWTUser } from '../models/DbModel';
import BaseController from '../controllers/BaseController';
import { ASController } from '../controllers/interfaces';

export enum requestType {
  GET='get',
  POST='post',
  PATCH='patch',
  DELETE='delete'
}

export interface MyResponse extends Response{
  sendFormat(data: any): void
}

export interface MyRequest extends Request{
  user: JWTUser
}

export interface RequestOptions {
  access?: string[],
  params?: string,
  callback?: (answer:any, req: MyRequest, res: MyResponse) => boolean
}

export default class BaseRouter {
  router: Express;

  constructor() {
    this.router = Router();
  }

  checkRole(role: string, access?: string[]) {
    if (!(access?.length) || access.includes(role)) {
      return true;
    }
    throw new ServerError(403, 'Нет доступа к операции');
  }

  /**
   * path - общий объединяющий путь
   * данная функция добавлет стандартный crud к этому пути
   * get/post/patch/delete
   * @param path
   * @param controller
   */
  generateCrud(path: string, controller: ASController) {
    Object.values(requestType).forEach((type) => {
      switch (type) {
        case 'get':
          this.createHandleWithBody(requestType.GET, path, controller.getAll);
          this.createHandleWithParams(requestType.GET, `${path}/:id`, controller.getOne, { params: ['id'] });
          break;
        case 'post':
          this.createHandleWithBody(requestType.POST, path, controller.create);
          break;
        case 'patch':
          this.createHandleWithBody(requestType.PATCH, path, controller.update);
          break;
        case 'delete':
          this.createHandleWithParams(requestType.DELETE, path, controller.delete);
          break;
      }
    });
  }

  createHandleMiddleware(request: requestType, path: string, handler: (body: any) => any, options?:RequestOptions) {
    this.router[request](path, asyncMiddleware(async (req: MyRequest, res: MyResponse, next) => {
      if (this.checkRole(req?.user?.role, options?.access)) {
        const answer = await handler(req.body);
        this.sendAnswer(answer, req, res, next, options);
      }
    }));
  }

  createHandleWithBody(request: requestType, path: string, handler: (body: any) => any, options?:RequestOptions) {
    this.router[request](path, asyncMiddleware(async (req: MyRequest, res: MyResponse, next) => {
      if (this.checkRole(req?.user?.role, options?.access)) {
        const answer = await handler(req.body);
        this.sendAnswer(answer, req, res, next, options);
      }
    }));
  }

  createHandleWithParams(request: requestType, path: string, handler: (params: any) => any, options?: RequestOptions) {
    this.router[request](path, asyncMiddleware(async (req: MyRequest, res: MyResponse, next: any) => {
      if (this.checkRole(req.user.role, options?.access)) {
        const answer = await handler(req.params[options?.params]);
        this.sendAnswer(answer, req, res, next, options);
      }
    }));
  }

  sendAnswer(answer: any, req: MyRequest, res: MyResponse, next, options?: RequestOptions) {
    if (!options?.callback || options?.callback(answer, req, res)) {
      res.sendFormat(answer);
    } else {
      next();
    }
  }
}
