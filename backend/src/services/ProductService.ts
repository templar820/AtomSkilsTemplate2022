import { Substance, Product } from '../models/DbModel';
import { IProduct } from '../models/Product';
import db from '../config/db';
import { ServerError } from '../middleware/errorHandler';

class ProductService {
  async create({ name, substanceId }: IProduct) {
    return await Product.create({ name, substanceId });
  }

  async update({ name, id, substanceId }: IProduct) {
    const t = await db.transaction();
    try {
      await Product.update({ id, name, substanceId }, {
        transaction: t,
        where: {
          id,
        },
        individualHooks: true,
      });
      await t.commit();
      return Product.findOne({
        where: {
          id,
        },
        include: [{
          model: Substance,
          as: Substance.name,
          attributes: ['id', 'name', 'code']
        }],
      });
    } catch (e) {
      throw new ServerError(500, e.message);
    }
  }

  async getPart(offset: number, limit: number) {
    return await Product.findAll({
      offset,
      limit,
      include: [{
        model: Substance,
        as: Substance.name,
        attributes: ['id', 'name', 'code']
      }],
    });
  }

  async getCount() {
    return await Product.count();
  }

  async getById(id: number) {
    return await Product.findOne({
      where: {
        id
      },
      include: [{
        model: Substance,
        as: Substance.name,
        attributes: ['id', 'name', 'code']
      }],
    });
  }

  async deleteById(id: number) {
    return await Product.destroy({
      where: { id },
      individualHooks: true,
    });
  }
}

export default new ProductService();
