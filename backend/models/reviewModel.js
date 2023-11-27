const pgPool = require('../config/connection.js');

const sql = {
  getReview: 'SELECT id_users, reviews, ratings FROM reviews WHERE id_reviews = $1',
  createReview: 'INSERT INTO reviews (username, score, reviews, time, movie_id, series_id) VALUES ($1, $2, $3, $4, $5)',
  deleteReview: 'DELETE FROM reviews WHERE id_review = $1',
  sortByScore: 'SELECT id_users, reviews, ratings FROM reviews ORDER BY ratings DESC LIMIT 10',
  sortByScoreLeast: 'SELECT id_users, reviews, ratings FROM reviews ORDER BY ratings ASC LIMIT 10',
  sortByTimeOld: 'SELECT id_users, reviews, ratings FROM reviews ORDER BY created_at ASC LIMIT 10',
  sortByTimeNew: 'SELECT id_users, reviews, ratings FROM reviews ORDER BY created_at DESC LIMIT 10',
};

const getReview = async (id_reviews) => {
  try {
    const result = await pgPool.query(sql.getReview, [id_reviews]);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {

      throw new Error('Review not found');
    }
  } catch (error) {
    console.error('Error in getReview', error);
    throw error;
  }
};

const createReview = async (reviewData) => {
  const { username, score, review, time, idMovie, idSeries } = reviewData;
  const values = [username, score, review, time, idMovie || null, idSeries || null];
  try {
    await pgPool.query(sql.createReview, values);
  } catch (error) {
    console.log('Error in createReview', error);
    throw new Error('Error in createReview');
  }
};

const deleteReview = async (reviewId) => {
  try {
    await pgPool.query(sql.deleteReview, [reviewId]);
  } catch (error) {
    console.log('Error in deleteReview', error);
    return error;
  }
};

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
  getReview,
  createReview,
  deleteReview,
  sortByScore,
  sortByScoreLeast,
  sortByTimeOld,
  sortByTimeNew,
};
