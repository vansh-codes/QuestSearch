import { VercelRequest, VercelResponse } from '@vercel/node';

declare global {
    namespace Express {
        interface Request extends VercelRequest { }
        interface Response extends VercelResponse { }
    }
}