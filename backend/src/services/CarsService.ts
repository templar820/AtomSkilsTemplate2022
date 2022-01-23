import { Car, Oil } from '../models/DbModel';
import { ICars } from '../controllers/CarController';

class CarsService {
  async create({ name, oil }: ICars) {
    const auto = await Car.create({ name });
    for await (const el of oil) {
      const res = await Oil.create({ name: el });
      auto.addOil(res);
    }
    //
    // const result = await User.findOne({
    //   where: { username: 'p4dm3' },
    //   include: Profile
    // });
  }
}

export default new CarsService();
