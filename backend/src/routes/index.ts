import { Router } from 'express';
import { auth } from '../middleware/authMiddleware';
import orderRoutes from './order';
import authRouter from './authRouter';

const router = Router();

router.use(authRouter);
router.use(auth);
router.use(orderRoutes);

export default router;
