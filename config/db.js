
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
const MONGO_URI = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        const res = await mongoose.connect(MONGO_URI);
        console.log('Collection:', res.connection.name);
        
    } catch (error) {
        console.log('Error while connecting to MongoDB', error);
    }
}

export default connectDB;