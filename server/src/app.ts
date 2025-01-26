import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import searchRoutes from './routes/question.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();
const app = express();

// Security middleware
app.use(cors({
    origin: 'https://questssearch.vercel.app',
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['Access-Control-Allow-Origin']
}));

app.use(express.json());

//ROUTES:-
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api', searchRoutes);

app.use(errorHandler);

app.use((req, res) => {
    res.status(404).sendFile('404.html', { root: __dirname });
});

export default app;
