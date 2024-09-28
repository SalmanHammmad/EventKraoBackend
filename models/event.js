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
    location: {
        type: String
    },
    image: {
        type: String
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });


eventSchema.index({ title: 'text' }); // This allows efficient text search

const Event = mongoose.model("Event", eventSchema);
export default Event;