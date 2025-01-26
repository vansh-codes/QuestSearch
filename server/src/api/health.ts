// src/api/health.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../utils/mongodb';

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Check database connection
        const mongoose = await connectToDatabase();
        const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

        const status = {
            timestamp: new Date(),
            service: 'QuestSearch API',
            status: 'healthy',
            database: dbStatus,
            environment: process.env.NODE_ENV,
            region: process.env.VERCEL_REGION || 'unknown',
            deploymentId: process.env.VERCEL_DEPLOYMENT_ID || 'unknown',
        };

        return res.status(200).json(status);
    } catch (error) {
        return res.status(503).json({
            status: 'unhealthy',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}