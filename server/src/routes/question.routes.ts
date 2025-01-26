import { Router } from 'express';
import { searchQuestions } from '../controllers/questionController';

const router = Router();

router.get('/search', searchQuestions);

export default router;