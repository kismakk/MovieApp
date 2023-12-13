const pgPool = require('../config/connection.js');

const sql = {
  createReview: 'INSERT INTO reviews (id_users, ratings, reviews, id_movies, id_series) VALUES ($1, $2, $3, $4, $5) RETURNING created_at',
  deleteReview: 'DELETE FROM reviews WHERE id_reviews = $1',

  sortByScoreUser: 'SELECT * FROM reviews WHERE id_users = $1 ORDER BY ratings DESC LIMIT 20',
  sortByScoreLeastUser: 'SELECT * FROM reviews WHERE id_users = $1 ORDER BY ratings ASC LIMIT 20',
  sortByTimeOldUser: 'SELECT * FROM reviews WHERE id_users = $1 ORDER BY created_at ASC LIMIT 20',
  sortByTimeNewUser: 'SELECT * FROM reviews WHERE id_users = $1 ORDER BY created_at DESC LIMIT 20',

  sortBy: 'SELECT users.id_users, uname AS username, reviews, ratings FROM reviews INNER JOIN users ON reviews.id_users = users.id_users WHERE'
};

const createReview = async (userId, reviewData) => {
  const { review, movieId, seriesId } = reviewData;
  const ratings = 0;
  const values = [userId, ratings, review, movieId || null, seriesId || null];
  try {
    if (review === '' || review === undefined) {
      throw new Error('Review is empty');
    }
    if (movieId === null && seriesId === null) {
      throw new Error('Provide either movieId or seriesId');
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

// For user
const sortByScoreUser = async (idUser) => {
  try {
    const result = await pgPool.query(sql.sortByScoreUser, [idUser]);
    return result.rows;
  } catch (error) {
    console.error('Error in sortByScore', error);
    throw error;
  }
};

const sortByScoreLeastUser = async (idUser) => {
  try {
    const result = await pgPool.query(sql.sortByScoreLeastUser, [idUser]);
    return result.rows;
  } catch (error) {
    console.error('Error in sortByScore', error);
    throw error;
  }
};

const sortByTimeOldUser = async (idUser) => {
  try {
    const result = await pgPool.query(sql.sortByTimeOldUser, [idUser]);
    return result.rows;
  } catch (error) {
    console.error('Error in sortByScore', error);
    throw error;
  }
};

const sortByTimeNewUser = async (idUser) => {
  try {
    const result = await pgPool.query(sql.sortByTimeNewUser, [idUser]);
    return result.rows;
  } catch (error) {
    console.error('Error in sortByScore', error);
    throw error;
  }
};
// For groups
const sortByScore = async (movieId, seriesId) => {
  try {
    let query = sql.sortBy; // Adding common query start

    if (movieId) {
      query += ' id_movies = $1'; // Adding movie condition
    } else if (seriesId) {
      query += ' id_series = $1'; // Adding series condition
    } else {
      throw new Error('Provide either movieId or seriesId');
    }

    query += ' ORDER BY ratings DESC LIMIT 10'; // Adding common query end
    console.log('Query:', query);

    const values = [movieId || seriesId]; // Values array based on ID provided

    const result = await pgPool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Error in sortByTimeNew', error);
    throw error;
  }
};

const sortByScoreLeast = async (movieId, seriesId) => {
  try {
    let query = sql.sortBy; // Adding common query start

    if (movieId) {
      query += ' id_movies = $1'; // Adding movie condition
    } else if (seriesId) {
      query += ' id_series = $1'; // Adding series condition
    } else {
      throw new Error('Provide either movieId or seriesId');
    }

    query += ' ORDER BY ratings ASC LIMIT 10'; // Adding common query end
    console.log('Query:', query);

    const values = [movieId || seriesId]; // Values array based on ID provided

    const result = await pgPool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Error in sortByTimeNew', error);
    throw error;
  }
};

const sortByTimeOld = async (movieId, seriesId) => {
  try {
    let query = sql.sortBy; // Adding common query start

    if (movieId) {
      query += ' id_movies = $1'; // Adding movie condition
    } else if (seriesId) {
      query += ' id_series = $1'; // Adding series condition
    } else {
      throw new Error('Provide either movieId or seriesId');
    }

    query += ' ORDER BY created_at ASC LIMIT 10'; // Adding common query end
    console.log('Query:', query);

    const values = [movieId || seriesId]; // Values array based on ID provided

    const result = await pgPool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Error in sortByTimeOld', error);
    throw error;
  }
};

const sortByTimeNew = async (movieId, seriesId) => {
  try {
    let query = sql.sortBy; // Adding common query start

    if (movieId) {
      query += ' id_movies = $1'; // Adding movie condition
    } else if (seriesId) {
      query += ' id_series = $1'; // Adding series condition
    } else {
      throw new Error('Provide either movieId or seriesId');
    }

    query += ' ORDER BY created_at DESC LIMIT 10'; // Adding common query end
    console.log('Query:', query);

    const values = [movieId || seriesId]; // Values array based on ID provided

    const result = await pgPool.query(query, values);
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
