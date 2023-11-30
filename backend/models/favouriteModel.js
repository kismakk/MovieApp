const pgPool = require('../config/connection.js');
const bcrypt = require('bcrypt');

const sql = {
  addFavourites: `INSERT INTO favourites (id_users, id_groups, movie_id, series_id, name, avatar)
  VALUES (
    COALESCE(NULLIF($1, '')::integer, NULL),
    COALESCE(NULLIF($2, '')::integer, NULL),
    COALESCE(NULLIF($3, '')::integer, NULL),
    COALESCE(NULLIF($4, '')::integer, NULL),
    COALESCE(NULLIF($5, ''), NULL),
    COALESCE(NULLIF($6, ''), NULL))`,
  getFavouritesUser: 'SELECT * FROM favourites WHERE id_users = $1',
  getFavouritesGroup: 'SELECT * FROM favourites WHERE id_groups = $1',
  getAllFavourites: 'SELECT * FROM favourites',
  deleteFavouriteUser: 'DELETE FROM favourites WHERE id_users = $1 AND name = $2',
  deleteFavouriteGroup:'DELETE FROM favourites WHERE id_groups = $1 AND name = $2',
  queryUser: 'SELECT * FROM favourites WHERE id_users = $1 AND (movie_id = $2 OR series_id = $3)',
  queryGroup: 'SELECT * FROM favourites WHERE id_groups = $1 AND (movie_id = $2 OR series_id = $3)'
};

const movieOrSeries = async (movie_id,series_id) => {
  if(movie_id !== '' && series_id !== '') {
    throw new Error('Adding to series and movie same time is not allowed');
  } else if (movie_id === '' && series_id === '') {
    throw new Error('Please add movie or series');
  }
};

const checkIfFavouriteExists = async (userOrGroup, idUserOrGroup, movieId, seriesId) => {
  let result;
  if (userOrGroup === 'user') {
    result = await pgPool.query(sql.queryUser, [idUserOrGroup, movieId || null, seriesId || null])
    return result
  } else if (userOrGroup === 'group') {
    result = await pgPool.query(sql.queryGroup, [idUserOrGroup, movieId || null, seriesId || null])
    return result
  } 
  if(result.rows.length > 0) {
    throw new Error('Allready in favourites')
  }
};

const addToFavourites = async(idUsers, idGroups, favouritesData) => {
    const { movie_id, series_id, name, avatar } = favouritesData;

    try {
      if(idGroups !== '' && idGroups !== undefined) {
          const id_users = '';
          const id_groups = idGroups
          await movieOrSeries(movie_id, series_id)
          await checkIfFavouriteExists('group', id_groups, movie_id, series_id)
          dataToArray = [id_users, id_groups, movie_id, series_id, name, avatar]
      } else if (idGroups === '' || idGroups === undefined) { 
          const id_users = idUsers
          const id_groups = ''
          await movieOrSeries(movie_id, series_id)
          await checkIfFavouriteExists('user', id_users, movie_id, series_id)
          dataToArray = [id_users, id_groups, movie_id, series_id, name, avatar]
      }
      const results = await pgPool.query(sql.addFavourites, dataToArray)
      return results;

    } catch (error) {
      console.log('Failed to add to user favourites', error);
      throw error
    }
};

const getFavourites = async(userOrGroup, byId) => {
  let results
  try {
    if(userOrGroup === 'user') {
      results = await pgPool.query(sql.getFavouritesUser, [byId])
    } else if (userOrGroup === 'group') {
      results = await pgPool.query(sql.getFavouritesGroup, [byId])
    } else {
      throw new Error('No user or group found')
    }

    if(results.rowCount === 0) {
      throw new Error('No favourites found. Check if user has favourites or id is correct.')
    } else {
      return results.rows
    }
  } catch (error) {
      console.error('Error in getFavourites:', error);
      throw error
  }
};


const getAllFavourites = async() => {
  try {
      const result = await pgPool.query(sql.getAllFavourites);
      return result.rows;
  } catch (error) {
    console.error('Failed to get favourites', error);
    throw new Error('Failed to get favourites')
  }
};

const deleteFavourite = async(userOrGroup, idBy, name) => {
  try {
    if(userOrGroup === 'user') {
      const result = await pgPool.query(sql.deleteFavouriteUser,[idBy, name])
      return result;
    } else if(userOrGroup === 'group') { 
      const result = await pgPool.query(sql.deleteFavouriteGroup,[idBy, name])
      return result;
    } 
  } catch (error) {
    console.log('Failed to delete', error);
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
