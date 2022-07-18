import {
  Body, Controller, Delete, Get, Patch, Post, Request, Route, Security, Tags
} from 'tsoa';
import autoBind from 'auto-bind';
import OrderService from '../services/OrderService';

export interface IOrder{
  id: string;
  name: string;
}

@Route('/order')
@Tags('order')
@Security('api_key')
class OrderController extends Controller {
  service;

  constructor() {
    super();
    this.service = OrderService;
    autoBind(this);
  }

  @Get('{id}')
  public async getOne(id: number): Promise<IOrder> {
    return Promise.resolve(id);
    // const answer = this.service.getOne(body as IOrder);
    // return answer;
  }

  @Get()
  public async getAll(): Promise<IOrder> {
    const answer = this.service.getAll();
    return answer;
  }

  @Post()
  public async create(@Body() body: IOrder): Promise<IOrder> {
    const answer = this.service.create(body as IOrder);
    return answer;
  }

  @Patch()
  public async update(@Body() body: IOrder): Promise<IOrder> {
    const answer = this.service.update(body as IOrder);
    return answer;
  }

  @Delete('{id}')
  public async delete(@Body() body: IOrder): Promise<IOrder> {
    const answer = this.service.delete(body as IOrder);
    return answer;
  }
}

export default new OrderController();
