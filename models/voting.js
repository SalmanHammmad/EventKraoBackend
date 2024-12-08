import mongoose from "mongoose";

const votingSchema = new mongoose.Schema({
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Artist being voted
    votes: { type: Number, default: 0 },
    voters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // List of users who voted
}, { timestamps: true });

const Voting = mongoose.model("Voting", votingSchema);
export default Voting;
