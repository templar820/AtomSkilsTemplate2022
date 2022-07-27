import { Product } from '../models/DbModel';
import BaseService from './BaseService';

class ProductService extends BaseService {
    constructor() {
        super(Product);
    }
    async getStatistic() {
        const result = await Product.findAll();
        return {date: '', name: '123'};
    }
}

export default new ProductService();
