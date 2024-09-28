import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String },
    events: [{ type: mongoose.Types.ObjectId, ref: "Event" }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
