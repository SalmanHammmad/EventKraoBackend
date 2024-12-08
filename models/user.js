import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    isArtist: { type: Boolean, default: false }, // Determines if the user is an artist
    isServiceProvider: { type: Boolean, default: false },
    role: { type: String, enum: ['user', 'admin', 'artist'], default: 'user' },
    image: { type: String }, // Profile picture
    location: { type: String },
    category: { type: String, enum: ['Musician', 'Painter', 'Dancer', 'Photographer', 'Comedian'], default: null },
    artistProfile: {
        bio: { type: String },
        experience: { type: Number },
        portfolio: [{ type: String }], // URLs for portfolio items
        mp3Files: [{ type: String }], // For musicians
        votesReceived: { type: Number, default: 0 }
    },
    servicesProvided: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }],
    bookedEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    reviews: [{
        rating: { type: Number },
        comment: { type: String },
        reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
