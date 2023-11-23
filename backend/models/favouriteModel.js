const pgPool = require('../config/connection.js');
const bcrypt = require('bcrypt');
//Täällä tehdään peruslogiikkahaku.
const sql = {
  addFavourite: 'INSERT INTO favourites (id_favourites, id_users, id_group, movie_id, series_id, name, avatar VALUES ($1, $2, $3, $4, $5, $6, $7)',
  getAllFavouritesUser: 'SELECT * FROM favourites WHERE id_users = $1',
  getAllFavouritesGroup: 'SELECT * FROM favourites WHERE id_groups = $1',
  getAllFavourites: 'SELECT * FROM favourites',
  deleteFromUser: 'DELETE from favourites where id_users = $1',
  deleteFromGroup: 'DELETE from favourites where id_group = $1'
};
//Selvitä mitkä arvot saa idUser ja idGroup
//Deleten arvo kans 
const addToFavourites = async(addByUser) => {
  const { idUser, idGroup, movieId, seriesId, name, avatar } = addByUser;
  try {
    await pgPool.query(sql.addFavourite,[idUser, idGroup, movieId, seriesId, name, avatar])
  } catch (error) {
    console.log('Failed to add favourites', error);
    return error;
  }
};

const getAllFavourites = async () => {
  try {
      const result = await pgPool.query(sql.getAllFavourites);
      return result.rows;
  } catch (error) {
    console.error('Failed to get favourites', error);
  }
};

//GetByUserOrGroupId
/* const getAllFavourites = async ({ idUser = '', idGroup = '' }) => {
  try {
    if (idGroup === '') {
      // Fetch favorites for a specific user
      await pgPool.query(sql.getAllFavouritesUser, [idUser]);
    } else {
      // Fetch favorites for a specific group
      await pgPool.query(sql.getAllFavouritesGroup, [idGroup]);
    }
  } catch (error) {
    console.error('Failed to get favourites', error);
    return error;
  }
}; */

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
