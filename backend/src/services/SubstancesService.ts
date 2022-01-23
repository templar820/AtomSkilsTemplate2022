import {Substance, Product, ISubstance} from "../models/DbModel";

class SubstancesService {
  async create({name, code, products}: ISubstance) {
    return await Substance.create({name, code, products}, {
        include: [{
          model: Product,
        }]
      }
    )
  }

  async getAll() {
    return await Substance.findAll( {
        include: [{
          model: Product,
        }]
      }
    )
  }

}

export default new SubstancesService();
