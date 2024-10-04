import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Service provider
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    totalCost: { type: Number, required: true }
});

module.exports = mongoose.model('Booking', BookingSchema);
