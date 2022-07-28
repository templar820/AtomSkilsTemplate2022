import {
    Body, Controller, Delete, Get, Patch, Post, Request, Route, Security, Tags
} from 'tsoa';
import autoBind from 'auto-bind';
import { ASController } from './interfaces';
import ProductTypeService from '../services/ProductTypeService';

export interface IProductType{
    id: number;
    name: string;
}

@Route('/product-type')
@Tags('ProductType')
@Security('api_key')
class ProductTypeController extends Controller implements ASController<IProductType>{
    service;

    constructor() {
        super();
        this.service = ProductTypeService;
        autoBind(this);
    }

    @Get('{id}')
    public async getOne(id: number): Promise<IProductType> {
        const answer = this.service.getOne(body as IProductType);
        return answer;
    }

    @Get()
    public async getAll(): Promise<IProductType[]> {
        const answer = this.service.getAll();
        return answer;
    }

    @Post()
    public async create(@Body() body: IProductType): Promise<IProductType> {
        const answer = this.service.create(body as IProductType);
        return answer;
    }

    @Patch()
    public async update(@Body() body: IProductType): Promise<IProductType> {
        const answer = this.service.update(body as IProductType);
        return answer;
    }

    @Delete('{id}')
    public async delete(@Body() body: IProductType): Promise<IProductType> {
        const answer = this.service.delete(body as IProductType);
        return answer;
    }
}

export default new ProductTypeController();
