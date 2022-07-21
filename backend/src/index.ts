import express, { Response } from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import SequelizeErd from 'sequelize-erd';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import { createTerminus } from '@godaddy/terminus';
import db from './db';
import { auth, authMiddleware } from './middleware/authMiddleware';
import healthCheck from './utils/healthCheck';
import { responseHandler } from './middleware/responseHandler';
import swaggerDocument from '../swagger.json';
import logger from './middleware/logger';
import IoModel from './socket/IoModel';
import startFileManagerServer from './filemanager';
import router from './routes';
import initData from './models/initData';

const PORT = process.env.BACKEND_PORT || 8080;
const app = express();
startFileManagerServer();
app.use(cors());
app.use(cookieParser());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'));
app.use(fileUpload({}));

app.get('/erd', (req: Request, res: Response) => {
  SequelizeErd({ source: db }).then((erd: string) => {
    res.send(erd);
  });
});

const options = {
  swaggerOptions: {
    url: '/api/docs/swagger.json',
  },
};
app.get('/api/docs/swagger.json', (req, res) => res.json(swaggerDocument));
app.use('/api/docs', swaggerUi.serveFiles(null, options), swaggerUi.setup(null, options));
app.use(responseHandler);
app.use(authMiddleware);
const io = new IoModel(app);

app.use('/api', router);

createTerminus(io.http, healthCheck);

app.use((req, res) => {
  res.status(404);
  res.json({ error: 'notFound' });
});

Promise.all([db.authenticate(), db.sync()]).then(async () => {
  console.log('DB CONNECT');
  await initData(db);
  io.http.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${ PORT}`));
});
