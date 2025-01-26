import app from './app';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

startServer();
