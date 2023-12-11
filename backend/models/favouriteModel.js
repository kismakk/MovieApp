const pgPool = require('../config/connection.js');

const sql = {
  addFavourites: 'INSERT INTO favourites (id_users, id_groups, movie_id, series_id, name, avatar) VALUES ($1,$2,$3,$4,$5,$6)',
  getFavouritesUser: 'SELECT * FROM favourites WHERE id_users = $1 ORDER BY id_favourites DESC;' ,
  getFavouritesGroup: 'SELECT * FROM favourites WHERE id_groups = $1',
  getAllFavourites: 'SELECT * FROM favourites',
  deleteFavouriteUser: 'DELETE FROM favourites WHERE id_users = $1 AND name = $2',
  deleteFavouriteGroup: 'DELETE FROM favourites WHERE id_groups = $1 AND name = $2',
  queryUser: 'SELECT * FROM favourites WHERE id_users = $1 AND (movie_id = $2 OR series_id = $3)',
  queryGroup: 'SELECT * FROM favourites WHERE id_groups = $1 AND (movie_id = $2 OR series_id = $3)'
};

const movieOrSeries = async (movieId, seriesId) => {
  console.log('Wtf: ' + movieId + seriesId)
  if (movieId !== '' && seriesId !== '') {
    throw new Error('Adding to series and movie same time is not allowed');
  } else if (movieId === '' && seriesId === '') {
    throw new Error('Please add movie or series');
  } else {
    return true;
  }
};

const checkIfFavouriteExists = async (idUsers, idGroups, movieId, seriesId) => {
  let result;
  try {
    if (idGroups !== '' && idGroups !== undefined) {
      result = await pgPool.query(sql.queryGroup, [idGroups, movieId || null, seriesId || null]);
      return result;
    } else {
      result = await pgPool.query(sql.queryUser, [idUsers, movieId || null, seriesId || null]);
      return result;
    }
  } catch (error) {
    console.log('Failed to check favourites', error);
    throw new Error('Failed to check favourites');
  }
};

const addToFavourites = async (idUsers, idGroups, favouritesData) => {
  
  const { movie_id, series_id, name, avatar } = favouritesData;
  console.log(movie_id)
  let dataToArray;
  try {
    if (idGroups !== '' && idGroups !== undefined) {
      const idUsers = '';
      dataToArray = [idUsers || null, idGroups || null, movie_id || null, series_id || null, name || null, avatar || null];
    } else if (idUsers !== '' && idUsers !== undefined) {
      const idGroups = '';
      dataToArray = [idUsers || null, idGroups || null, movie_id || null, series_id || null, name || null, avatar || null];
    }
    await pgPool.query(sql.addFavourites, dataToArray);
  } catch (error) {
    console.log('Failed to add to user favourites', error);
    throw new Error('Failed to add to user favourites');
  }
};

const getFavourites = async (idUsers, idGroups) => {
  let results;
  try {
    if (idGroups !== '') {
      results = await pgPool.query(sql.getFavouritesGroup, [idGroups]);
      return results;
    } else if (idUsers !== '') {
      results = await pgPool.query(sql.getFavouritesUser, [idUsers]);
      return results;
    }
  } catch (error) {
    console.error('Error in getFavourites:', error);
    throw new Error('Error in getFavourites:');
  }
};

const getAllFavourites = async () => {
  try {
    const result = await pgPool.query(sql.getAllFavourites);
    return result.rows;
  } catch (error) {
    console.error('Failed to get favourites', error);
    throw new Error('Failed to get favourites');
  }
};

const deleteFavourite = async (idUsers, idGroups, name) => {
  try {
    if (idGroups !== '' && idGroups !== undefined) {
      const result = await pgPool.query(sql.deleteFavouriteGroup, [idGroups, name]);
      return result;
    } else if (idUsers !== '' && idGroups !== undefined) {
      const result = await pgPool.query(sql.deleteFavouriteUser, [idUsers, name]);
      return result;
    }
  } catch (error) {
    console.log('Failed to delete', error);
    throw new Error('Failed to delete');
  }
};

module.exports = {
  addToFavourites,
  getAllFavourites,
  getFavourites,
  deleteFavourite,
  movieOrSeries,
  checkIfFavouriteExists
};
