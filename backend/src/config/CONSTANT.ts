export default {
  secretWord: process.env.SECRET_KEY || 'hacktemplate',
  POSTGRES_USER: process.env.POSTGRES_USER || 'user',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'pass',
  PORT: process.env.BACKEND_PORT || 8000,
  POSTGRES_PORT: process.env.POSTGRES_PORT || 27017,
  POSTGRES_DB: process.env.POSTGRES_DB || 'hacktemplate',
  POSTGRES_HOST: process.env.POSTGRESS_HOST || 'host.docker.internal', // 172.17.01 for unix
};
