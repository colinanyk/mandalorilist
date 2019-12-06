import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export function connect() {
    let options = {
        dbName: process.env.MONGO_DATABASE,
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD
    };

    return mongoose.connect(process.env.MONGO_HOST, options);
}

export default {
    connect
}