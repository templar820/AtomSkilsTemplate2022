import { Sequelize } from 'sequelize';

console.log('POSTGRES_DB', process.env.POSTGRES_DB);
console.log('POSTGRES_USER', process.env.POSTGRES_USER);
console.log('POSTGRES_PASSWORD', process.env.POSTGRES_PASSWORD);
console.log('POSTGRES_HOST', process.env.POSTGRES_HOST);

export default new Sequelize(process.env.POSTGRES_DB || 'hacktemplate', process.env.POSTGRES_USER || 'user', process.env.POSTGRES_PASSWORD || 'pass', {
  // host: process.env.POSTGRES_HOST || 'localhost',
  host: process.env.POSTGRES_HOST || '172.17.01',
  dialect: 'postgres'
});
