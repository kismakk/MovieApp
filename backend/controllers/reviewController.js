const reviews = require('../models/reviewModel.js');

const getReview = async (req, res) => {
  const reviewId = req.params.id;

  try {
    const review = await reviews.getReview(reviewId);
    res.status(200).json({ message: 'Review found', review });
  } catch (error) {
    res.status(404).json({ message: 'Review not found' });
  }
};

const createReview = async (req, res, next) => {
  const reviewData = req.body;
  console.log(reviewData);
  try {
    await reviews.createReview(reviewData);
    res.status(201).json({ message: 'Review created successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  const reviewId = req.body.reviewId;
  try {
    await reviews.deleteReview(reviewId);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getReview,
  createReview,
  deleteReview
};