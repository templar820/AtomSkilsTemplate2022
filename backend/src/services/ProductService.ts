import { Product, ProductType } from '../models/DbModel';
import BaseService from './BaseService';

class ProductService extends BaseService {
    constructor() {
        super(Product);
    }
    async getStatistic() {
        const result = await Product.findAll();
        return {date: '', name: '123'};
    }

    async getOne(id: number) {
        return await this.model.findOne({ where: { id }, include: {model: ProductType, as: 'productType'} });
    }
}

export default new ProductService();
