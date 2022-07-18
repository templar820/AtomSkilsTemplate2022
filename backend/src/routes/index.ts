import { Router } from 'express';
import { auth } from '../middleware/authMiddleware';
import baseRouter from './router';
import authRouter from './authRouter';

const router = Router();

router.use(authRouter);
router.use(auth);
router.use(baseRouter);

export default router;
