import Router, { Express } from 'express';
import { asyncMiddleware } from '../middleware/asyncMiddleware';
import { ServerError } from '../middleware/errorHandler';
import { JWTUser } from '../models/DbModel';

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

  createHandleWithBody(request: requestType, path: string, handler: (body: any) => any, options?:RequestOptions) {
    this.router[request](path, asyncMiddleware(async (req: MyRequest, res: MyResponse, next) => {
      if (this.checkRole(req.user.role, options?.access)) {
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
