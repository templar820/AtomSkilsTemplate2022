import path from 'path';

require('dotenv').config({
  path: path.resolve(__dirname, '../../../.env'),
});

export default {
  SECRET_KEY: process.env.SECRET_KEY,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  PORT: process.env.BACKEND_PORT,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_HOST: process.env.MY_POSTGRESS_HOST,
  LOGIN_PASSWORD: process.env.LOGIN_PASSWORD,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
};
