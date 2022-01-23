import {
  Body, Controller, Delete, Get, Patch, Post, Request, Route, Security, Tags
} from 'tsoa';
import autoBind from 'auto-bind';
import CarsService from "../services/CarsService";

export interface ICars{
  id: string;
  name: string;
  oil: number[];
}

@Route('/cars')
@Security('api_key')
class CarsController extends Controller {
  constructor() {
    super();
    autoBind(this);
  }

  @Post()
  public async create(@Body() body: ICars): Promise<ICars> {
    const answer = CarsService.create(body as ICars);
    return answer;
  }
}

export default new CarsController();
