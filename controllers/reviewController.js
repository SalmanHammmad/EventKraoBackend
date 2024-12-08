import Review from "../models/review.js";

// Fetch reviews for a specific target (service or artist)
export const getReviews = async (req, res) => {
  const { targetId } = req.params;
  try {
    const reviews = await Review.find({ target: targetId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Add a review
export const addReview = async (req, res) => {
  const review = req.body;
  try {
    const newReview = await Review.create(review);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
