import { Request, Response } from 'express';
import { searchQuestions } from '../controllers/questionController';

export default async function handler(req: Request, res: Response) {
    if (req.method === 'GET') {
        await searchQuestions(req, res);
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}