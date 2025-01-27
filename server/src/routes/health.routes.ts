import { Router } from 'express';
import { healthCheck } from '../controllers/heathController';

const router = Router();

router.get('/health', healthCheck);

export default router;