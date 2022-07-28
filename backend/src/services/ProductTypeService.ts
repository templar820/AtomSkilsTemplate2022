import { ProductType } from '../models/DbModel';
import BaseService from './BaseService';

class ProductTypeService extends BaseService {
    constructor() {
        super(ProductType);
    }
}

export default new ProductTypeService();
