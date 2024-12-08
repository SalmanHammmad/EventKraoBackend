import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: ['Catering', 'Venue', 'Photography', 'Entertainment', 'Decor'], required: true },
    price: { type: Number, required: true },
    image: { type: String },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    availability: [{ type: Date }], // Dates when the service is available
    rating: { type: Number, default: 0 },
    reviews: [{
        rating: { type: Number },
        comment: { type: String },
        reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }]
}, { timestamps: true });

const Service = mongoose.model("Service", serviceSchema);
export default Service;
