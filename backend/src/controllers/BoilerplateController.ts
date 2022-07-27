import {
  Body, Controller, Delete, Get, Patch, Post, Request, Route, Security, Tags
} from 'tsoa';
import autoBind from 'auto-bind';
import { ASController } from './interfaces';

export interface IExample{
  id: string;
  name: string;
  surname: string;
  status: string;
}

@Route('/example')
@Tags('example')
@Security('api_key')
class ExampleController extends Controller implements ASController<IExample>{
  service;

  constructor() {
    super();
    this.service = ExampleService;
    autoBind(this);
  }

  @Get('{id}')
  public async getOne(id: number): Promise<IExample> {
    const answer = this.service.getOne(body as IExample);
    return answer;
  }

  @Get()
  public async getAll(): Promise<IExample[]> {
    const answer = this.service.getAll();
    return answer;
  }

  @Post()
  public async create(@Body() body: IExample): Promise<IExample> {
    const answer = this.service.create(body as IExample);
    return answer;
  }

  @Patch()
  public async update(@Body() body: IExample): Promise<IExample> {
    const answer = this.service.update(body as IExample);
    return answer;
  }

  @Delete('{id}')
  public async delete(@Body() body: IExample): Promise<IExample> {
    const answer = this.service.delete(body as IExample);
    return answer;
  }
}

export default new ExampleController();
