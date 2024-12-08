import Voting from "../models/voting.js";

// Fetch votes for an event
export const getVotesForEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const votes = await Voting.find({ event: eventId }).populate("artist");
    res.status(200).json(votes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Cast a vote for an artist
export const castVote = async (req, res) => {
  const { eventId, artistId } = req.body;
  try {
    const vote = await Voting.findOneAndUpdate(
      { event: eventId, artist: artistId },
      { $inc: { votes: 1 }, $push: { voters: req.user.id } },
      { new: true, upsert: true }
    );
    res.status(200).json(vote);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
