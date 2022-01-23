import express, { Response } from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import SequelizeErd from 'sequelize-erd';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import router from './routes/router';
import authRouter from './routes/authRouter';
import { errorHandler } from './middleware/errorHandler';
import db from './config/db';
import { auth, authMiddleware } from './middleware/authMiddleware';
import { responseHandler } from './middleware/responseHandler';
import swaggerDocument from '../swagger.json';
import logger from './middleware/logger';
import IoModel from './socket/IoModel';

const PORT = process.env.BACKEND_PORT || 8080;
const app = express();
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

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(responseHandler);
app.use(authMiddleware);
const io = new IoModel(app);

app.use('/api', authRouter);
app.use('/api', auth, router);
app.use(errorHandler);



Promise.all([db.authenticate(), db.sync()]).then(() => {
  console.log('DB CONNECT');
  io.http.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${ PORT}`));
});
