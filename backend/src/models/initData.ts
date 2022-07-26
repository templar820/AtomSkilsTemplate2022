import { User } from './DbModel';
import constant from '../config/CONSTANT';

const initData = async () => {
  const users = await User.findAll();
  if (!users.length) {
    await User.bulkCreate([
      {email: constant.ADMIN_EMAIL, password: constant.LOGIN_PASSWORD, role: 'ADMIN'},
    ])
  }
}

export default initData;
