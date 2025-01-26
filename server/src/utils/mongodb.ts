import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let cachedDb: typeof mongoose | null = null;

export async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI!);
    cachedDb = db;
    return db;
}