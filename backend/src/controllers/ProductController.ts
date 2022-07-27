import {
    Body, Controller, Delete, Get, Patch, Post, Request, Route, Security, Tags
} from 'tsoa';
import autoBind from 'auto-bind';
import { ASController } from './interfaces';
import ProductService from '../services/ProductService';

export interface IProduct{
    id: string;
    name: string;
    price: string;
    typeId: string;
}

@Route('/product')
@Tags('Product')
@Security('api_key')
class ProductController extends Controller implements ASController<IProduct>{
    service;

    constructor() {
        super();
        this.service = ProductService;
        autoBind(this);
    }

    @Get('{id}')
    public async getOne(id: number): Promise<IProduct> {
        const answer = this.service.getOne(body as IProduct);
        return answer;
    }

    @Get()
    public async getAll(): Promise<IProduct[]> {
        const answer = this.service.getAll();
        return answer;
    }

    @Post()
    public async create(@Body() body: IProduct): Promise<IProduct> {
        const answer = this.service.create(body as IProduct);
        return answer;
    }

    @Patch()
    public async update(@Body() body: IProduct): Promise<IProduct> {
        const answer = this.service.update(body as IProduct);
        return answer;
    }

    @Delete('{id}')
    public async delete(@Body() body: IProduct): Promise<IProduct> {
        const answer = this.service.delete(body as IProduct);
        return answer;
    }

    @Get('/statistic')
    public async getStatistic(): Promise<{ date: string, name: string }>  {
        const aswer = this.service.getStatistic();
        return aswer
    }
}

export default new ProductController();
