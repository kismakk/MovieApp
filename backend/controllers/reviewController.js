const reviews = require('../models/reviewModel.js');

const getReview = async (req, res) => {
  const reviewId = req.query.reviewId;


  try {
    const review = await reviews.getReview(reviewId);
    res.status(200).json({ message: 'Review found', review });
  } catch (error) {
    res.status(404).json({ message: 'Review not found' });
  }
};

const sortByScore = async (req, res, next) => {
  try {
    const review = await reviews.sortByScore();
    res.status(200).json({ message: 'Review found', review });
  } catch (error) {
    next(error);
  }
};

const sortByScoreLeast = async (req, res, next) => {
  try {
    const review = await reviews.sortByScoreLeast();
    res.status(200).json({ message: 'Review found', review });
  } catch (error) {
    next(error);
  }
};

const sortByTimeOld = async (req, res, next) => {
  try {
    const review = await reviews.sortByTimeOld();
    res.status(200).json({ message: 'Review found', review });
  } catch (error) {
    next(error);
  }
};

const sortByTimeNew = async (req, res, next) => {
  try {
    const review = await reviews.sortByTimeNew();
    res.status(200).json({ message: 'Review found', review });
  } catch (error) {
    next(error);
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
  const reviewId = req.query.reviewId;  // Change from req.body to req.query
  try {
    const result = await reviews.deleteReview(reviewId);
    if (result.rowCount === 0) {
      // If no rows were affected, it means the review with reviewId does not exist
      res.status(404).json({ message: 'Review does not exist' });
    } else {
      // If rowCount is greater than 0, the review was deleted successfully
      res.status(200).json({ message: 'Review deleted successfully' });
    }
  } catch (error) {
    next(error);
  }
};



module.exports = {
  getReview,
  sortByScore,
  sortByScoreLeast,
  sortByTimeOld,
  sortByTimeNew,
  createReview,
  deleteReview
};