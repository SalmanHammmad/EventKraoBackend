import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    isServiceProvider: { type: Boolean, default: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    image: { type: String },
    category: { type: String, enum: ['Musician', 'Painter', 'Dancer', 'Photographer', 'Comedian'], default: null }, // Artist category
    profile: { 
    bio: { type: String }, // Artist's bio
    experience: { type: Number }, // Years of experience
    // Other fields like social links, portfolio, etc.
    
  },
    servicesProvided: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }],
    bookedEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    location: { type: String },
    votesReceived: { type: Number, default: 0 }, // For artists getting votes
    budget: { type: Number }, // If they are clients
    reviews: [{
        rating: { type: Number },
        comment: { type: String },
        reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
