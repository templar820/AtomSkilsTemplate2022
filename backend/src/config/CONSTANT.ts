export default {
  secretWord: process.env.SECRET_KEY || 'hacktemplate',
  MONGO_USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME || 'admin',
  MONGO_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD || 'admin',
  PORT: process.env.BACKEND_PORT || 8000,
  DATABASE_PORT: process.env.MONGO_PORT || 27017,
  DATABASE_NAME: process.env.MONGO_INITDB_DATABASE || 'as_2022',
  POSTGRESS_HOST: process.env.POSTGRESS_HOST || 'host.docker.internal'
};
