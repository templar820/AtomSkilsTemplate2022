import { Order } from '../models/DbModel';
import BaseService from './BaseService';

class OrderService extends BaseService {
  constructor() {
    super(Order);
  }
}

export default new OrderService();
