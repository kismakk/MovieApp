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
  getFavourites: 'SELECT * FROM favourites WHERE id_users = $1',
  getAllFavourites: 'SELECT * FROM favourites',
  delete: 'DELETE from favourites where id_users OR id_group= $1',
  queryUser: 'SELECT * FROM favourites WHERE id_users = $1 AND (movie_id = $2 OR series_id = $3)',
  queryGroup: 'SELECT * FROM favourites WHERE id_groups = $1 AND (movie_id = $2 OR series_id = $3)'
};

const movieOrSeries = async (movie_id,series_id) => {
  if(movie_id !== '' && series_id !== '') {
    throw new Error('Adding to series and movie same time is not allowed');
  } else if (movie_id == '' && series_id == '') {
    throw new Error('Please add movie or series');
  }
};

const checkIfFavouriteExists = async (userOrGroup, idUserOrGroup, movieId, seriesId) => {
  let result;
  console.groupCollapsed('the id is' + idUserOrGroup)
  if (userOrGroup === 'user') {
    result = await pgPool.query(sql.queryUser, [idUserOrGroup, movieId || null, seriesId || null])
  } else if (userOrGroup === 'group') {
    result = await pgPool.query(sql.queryGroup, [idUserOrGroup, movieId || null, seriesId || null])
  } 
  if(result.rows.length > 0) {
    throw new Error('Allready in favourites')
  }
};
//Add to favourites
const addToFavourites = async(favouritesData) => {
    const { id_users, id_groups, movie_id, series_id, name, avatar } = favouritesData;
    dataToArray = [id_users, id_groups, movie_id, series_id, name, avatar]

  if (id_users !== '' && id_groups !== '') { 
      throw new Error('Adding to user and group same time is not allowed');

  } else if(id_users !== '') {
    try {
      await checkIfFavouriteExists('user', id_users, movie_id, series_id)
      await movieOrSeries(movie_id, series_id)
      const results = await pgPool.query(sql.addFavourites, dataToArray)
      return results;
    } catch (error) {
      console.log('Failed to add to user favourites', error);
      throw error
    }

  } else if (id_groups !== '') { 
    try {
      await checkIfFavouriteExists('group', id_groups, movie_id, series_id)
      await movieOrSeries(movie_id, series_id)
      const results = await pgPool.query(sql.addFavourites, dataToArray)
      return results;
    } catch (error) {
      console.log('Failed to add to group favourites', error);
      throw error;
    }
  } else { 
    throw new Error('No user or group specified');
  }
};

const getFavourites = async() => {

}

//Get all favourites
const getAllFavourites = async() => {
  try {
      const result = await pgPool.query(sql.getAllFavourites);
      return result.rows;
  } catch (error) {
    console.error('Failed to get favourites', error);
  }
};

const deleteFavourite = async(deleteById) => {
  const {idUser, idGroup} = deleteById;
  if(idGroup === '') {
    try {
      await pgPool.query(sql.deleteById,[idUser])
    } catch (error) {
      console.log('Failed to delete from user', error);
    }
  } else { 
    try {
      await pgPool.query(sql.deleteById,[idGroup])
    } catch (error) {
      console.log('Failed to delete from group', error);
    }
  }
};

module.exports = {
  addToFavourites,
  getAllFavourites,
  deleteFavourite
};
