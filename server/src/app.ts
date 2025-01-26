import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import searchRoutes from './routes/question.routes';

dotenv.config();
const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    skip: (req) => req.method === 'GET' // skip rate limiting for GET requests
});
app.use(limiter);

//ROUTES:-

// Add a GET route for '/'
app.get('/', (req, res) => {
    res.send("QuestSearch Backend API");
});

app.use('/api', searchRoutes);
app.use('*', (req, res) => {
    res.status(404).sendFile(__dirname + '/404.html');
});

export default app;
