import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import searchRoutes from './routes/question.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();
const app = express();

// Security middleware
app.use(cors());
app.use(express.json());

//ROUTES:-

app.use('/api', searchRoutes);

app.use(errorHandler);

app.use('*', (req, res) => {
    res.status(404).sendFile(__dirname + '/404.html');
});

export default app;
