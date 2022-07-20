import { Sequelize } from 'sequelize';
import CONSTANT from '../config/CONSTANT';

console.log('POSTGRES_DB', CONSTANT.POSTGRES_DB);
console.log('POSTGRES_USER', CONSTANT.POSTGRES_USER);
console.log('POSTGRES_PASSWORD', CONSTANT.POSTGRES_PASSWORD);
console.log('POSTGRES_HOST', CONSTANT.POSTGRES_HOST);

export default new Sequelize(
  CONSTANT.POSTGRES_DB,
  CONSTANT.POSTGRES_USER,
  CONSTANT.POSTGRES_PASSWORD, {
    // host: process.env.POSTGRES_HOST || 'localhost',
    host: CONSTANT.POSTGRES_HOST,
    dialect: 'postgres'
  }
);
