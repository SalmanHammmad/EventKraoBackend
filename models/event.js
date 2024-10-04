import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    location: {
        type: String
    },
    image: {
        type: String
    },
    
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isPublic: { type: Boolean, default: true }, // Can be public or private
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }],
    ticketPrice: { type: Number }, // If event is paid
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' }

}, { timestamps: true });


eventSchema.index({ title: 'text' }); // This allows efficient text search

const Event = mongoose.model("Event", eventSchema);
export default Event;