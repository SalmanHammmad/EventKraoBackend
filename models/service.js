import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The service provider
    description: { type: String },
    category: { type: String, required: true }, // E.g., 'Artist', 'Catering', 'Marquee'
    priceRange: { min: Number, max: Number }, // For budget-based recommendations
    availability: [{
        date: { type: Date },
        isBooked: { type: Boolean, default: false }
    }],
    reviews: [{
        rating: { type: Number, required: true },
        comment: { type: String },
        reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }]
});

module.exports = mongoose.model('Service', ServiceSchema);
