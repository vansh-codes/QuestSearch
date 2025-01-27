import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import searchRoutes from './routes/question.routes';
import healthRoutes from './routes/health.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();
const app = express();

// Security middleware
app.use(cors());
app.use(compression());
app.use(express.json());

//ROUTES:-
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api', searchRoutes);
app.use('/api', healthRoutes);

app.use(errorHandler);

app.use((req, res) => {
    res.status(404).sendFile('404.html', { root: __dirname });
});

export default app;
