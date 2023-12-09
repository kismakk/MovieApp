const pgPool = require('../config/connection.js');

const sql = {
  createReview: 'INSERT INTO reviews (id_users, ratings, reviews, id_movies, id_series) VALUES ($1, $2, $3, $4, $5) RETURNING created_at',
  deleteReview: 'DELETE FROM reviews WHERE id_reviews = $1',

  sortByScoreUser: 'SELECT * FROM reviews WHERE id_users = $1 ORDER BY ratings DESC LIMIT 20',
  sortByScoreLeastUser: 'SELECT * FROM reviews WHERE id_users = $1 ORDER BY ratings ASC LIMIT 20',
  sortByTimeOldUser: 'SELECT * FROM reviews WHERE id_users = $1 ORDER BY created_at ASC LIMIT 20',
  sortByTimeNewUser: 'SELECT * FROM reviews WHERE id_users = $1 ORDER BY created_at DESC LIMIT 20',

  sortByScore: 'SELECT id_users, reviews, ratings FROM reviews ORDER BY ratings DESC LIMIT 10',
  sortByScoreLeast: 'SELECT id_users, reviews, ratings FROM reviews ORDER BY ratings ASC LIMIT 10',
  sortByTimeOld: 'SELECT id_users, reviews, ratings FROM reviews ORDER BY created_at ASC LIMIT 10',
  sortByTimeNew: 'SELECT id_users, reviews, ratings FROM reviews ORDER BY created_at DESC LIMIT 10',
};

const createReview = async (idUsers, reviewData) => {
  let { ratings, review, idMovie, idSeries } = reviewData;
  if(ratings === '' || ratings === undefined ||ratings === null) {
    ratings = 0
  }
  let values = [idUsers, ratings, review, idMovie || null, idSeries || null];
  try {
    if(review === '' || review === undefined) {
      throw new Error('Review is empty');
    }
    await pgPool.query(sql.createReview, values);
  } catch (error) {
    console.log('Error in createReview', error);
    throw new Error('Error in createReview');
  }
};

const deleteReview = async (reviewId) => {
  try {
    console.log('Deleting review with ID:', reviewId);
    const result = await pgPool.query(sql.deleteReview, [reviewId]);
    console.log('Result of DELETE operation:', result);
    return result;
  } catch (error) {
    console.log('Error in deleteReview', error);
    throw error;
  }
};

//For user
const sortByScoreUser = async (idUser) => {
  try {
    const result = await pgPool.query(sql.sortByScoreUser,[idUser]);
    return result.rows;
  } catch (error) {
    console.error('Error in sortByScore', error);
    throw error;
  }
};

const sortByScoreLeastUser = async (idUser) => {
  try {
    const result = await pgPool.query(sql.sortByScoreLeastUser,[idUser]);
    return result.rows;
  } catch (error) {
    console.error('Error in sortByScore', error);
    throw error;
  }
};

const sortByTimeOldUser = async (idUser) => {
  try {
    const result = await pgPool.query(sql.sortByTimeOldUser,[idUser]);
    return result.rows;
  } catch (error) {
    console.error('Error in sortByScore', error);
    throw error;
  }
};

const sortByTimeNewUser = async (idUser) => {
  try {
    const result = await pgPool.query(sql.sortByTimeNewUser,[idUser]);
    return result.rows;
  } catch (error) {
    console.error('Error in sortByScore', error);
    throw error;
  }
};
//For groups
const sortByScore = async () => {
  try {
    const result = await pgPool.query(sql.sortByScore);
    return result.rows;
  } catch (error) {
    console.error('Error in sortByScore', error);
    throw error;
  }
};

const sortByScoreLeast = async () => {
  try {
    const result = await pgPool.query(sql.sortByScoreLeast);
    return result.rows;
  } catch (error) {
    console.error('Error in sortByScoreLeast', error);
    throw error;
  }
};

const sortByTimeOld = async () => {
  try {
    const result = await pgPool.query(sql.sortByTimeOld);
    return result.rows;
  } catch (error) {
    console.error('Error in sortByTimeOld', error);
    throw error;
  }
};

const sortByTimeNew = async () => {
  try {
    const result = await pgPool.query(sql.sortByTimeNew);
    return result.rows;
  } catch (error) {
    console.error('Error in sortByTimeNew', error);
    throw error;
  }
};



module.exports = {
  createReview,
  deleteReview,
  sortByScore,
  sortByScoreLeast,
  sortByTimeOld,
  sortByTimeNew,
  sortByScoreUser,
  sortByScoreLeastUser,
  sortByTimeOldUser,
  sortByTimeNewUser
};
