import { Sequelize } from 'sequelize';
import CONSTANT from "./CONSTANT";

export default new Sequelize(CONSTANT.DATABASE_NAME, CONSTANT.MONGO_USERNAME, CONSTANT.MONGO_PASSWORD, {
  // host: process.env.POSTGRES_HOST || 'localhost',
  host: CONSTANT.,
  dialect: 'postgres'
});
