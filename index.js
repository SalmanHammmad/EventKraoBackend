import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import serviceBookingRoutes from './routes/serviceBookingRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';



dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, 
  }));
app.use(cookieParser());
app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/bookings', bookingRoutes);
app.use('/service-bookings', serviceBookingRoutes);
app.use('/reviews', reviewRoutes);
app.use('/notifications', notificationRoutes);


app.get('/', (req, res) => {
    res.send('API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
}
);

