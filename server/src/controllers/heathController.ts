import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const healthCheck = async (req: Request, res: Response) => {
    try {
        // check database connection
        const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

        const status = {
            timestamp: new Date(),
            service: 'QuestSearch API',
            status: 'healthy',
            database: dbStatus,
            environment: process.env.NODE_ENV,
            uptime: process.uptime(),
            memory: process.memoryUsage(),
        };

        res.status(200).json(status);
    } catch (error) {
        res.status(503).json({
            status: 'unhealthy',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};