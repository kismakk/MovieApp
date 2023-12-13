const reviews = require('../models/reviewModel.js');

const createReview = async (req, res, next) => {
  const reviewData = req.body;
  const userId = res.locals.userId;
  try {
    await reviews.createReview(userId, reviewData);
    res.status(201).json({ message: 'Review created successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  const reviewId = req.query.reviewId; // Change from req.body to req.query
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

// For user
const sortByScoreUser = async (req, res, next) => {
  const idUser = res.locals.userId;
  try {
    const review = await reviews.sortByScoreUser(idUser);
    res.status(200).json({ message: 'Review found', review });
  } catch (error) {
    next(error);
  }
};

const sortByScoreLeastUser = async (req, res, next) => {
  const idUser = res.locals.userId;
  try {
    const review = await reviews.sortByScoreLeastUser(idUser);
    res.status(200).json({ message: 'Review found', review });
  } catch (error) {
    next(error);
  }
};

const sortByTimeOldUser = async (req, res, next) => {
  const idUser = res.locals.userId;
  try {
    const review = await reviews.sortByTimeOldUser(idUser);
    res.status(200).json({ message: 'Review found', review });
  } catch (error) {
    next(error);
  }
};

const sortByTimeNewUser = async (req, res, next) => {
  const idUser = res.locals.userId;
  try {
    const review = await reviews.sortByTimeNewUser(idUser);
    res.status(200).json({ message: 'Review found', review });
  } catch (error) {
    next(error);
  }
};

// For movie/series reviews
const sortByScore = async (req, res, next) => {
  const movieId = req.query.movieId;
  const seriesId = req.query.seriesId;
  try {
    const result = await reviews.sortByScore(movieId, seriesId);
    res.status(200).json({ message: 'Reviews found', result });
  } catch (error) {
    next(error);
  }
};

const sortByScoreLeast = async (req, res, next) => {
  const movieId = req.query.movieId;
  const seriesId = req.query.seriesId;
  try {
    const result = await reviews.sortByScoreLeast(movieId, seriesId);
    res.status(200).json({ message: 'Reviews found', result });
  } catch (error) {
    next(error);
  }
};

const sortByTimeOld = async (req, res, next) => {
  const movieId = req.query.movieId;
  const seriesId = req.query.seriesId;
  try {
    const result = await reviews.sortByTimeOld(movieId, seriesId);
    res.status(200).json({ message: 'Reviews found', result });
  } catch (error) {
    next(error);
  }
};

const sortByTimeNew = async (req, res, next) => {
  const movieId = req.query.movieId;
  const seriesId = req.query.seriesId;
  try {
    const result = await reviews.sortByTimeNew(movieId, seriesId);
    res.status(200).json({ message: 'Reviews found', result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sortByScore,
  sortByScoreLeast,
  sortByTimeOld,
  sortByTimeNew,
  createReview,
  deleteReview,
  sortByScoreUser,
  sortByScoreLeastUser,
  sortByTimeOldUser,
  sortByTimeNewUser
};
