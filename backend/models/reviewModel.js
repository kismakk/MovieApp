const pgPool = require('../config/connection.js');

const sql = {
  getReview: 'SELECT id_users, reviews, ratings FROM reviews WHERE id_reviews = $1',
  createReview: 'INSERT INTO reviews (id_users, ratings, reviews, id_movies, id_series) VALUES ($1, $2, $3, $4, $5) RETURNING created_at',
  deleteReview: 'DELETE FROM reviews WHERE id_reviews = $1',
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
  const { id_users, ratings, review, idMovie, idSeries } = reviewData;
  const values = [id_users, ratings, review, idMovie || null, idSeries || null];

  try {
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
