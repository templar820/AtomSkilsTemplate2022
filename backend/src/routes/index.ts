import { Router } from 'express';
import { auth } from '../middleware/authMiddleware';
import orderRoutes from './order';
import authRouter from './authRouter';
import { errorHandler } from '../middleware/errorHandler';

const router = Router();

router.use(authRouter);
router.use(auth);
router.use(orderRoutes);
router.use(errorHandler);

export default router;
