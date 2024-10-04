import mongoose from 'mongoose';

const VoteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Who voted
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Voted for which artist
    city: { type: String, required: true },
    voteCount: { type: Number, default: 1 }
});

module.exports = mongoose.model('Vote', VoteSchema);
