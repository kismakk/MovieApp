const pgPool = require('../config/connection.js');
const bcrypt = require('bcrypt');
//Täällä tehdään peruslogiikkahaku.
const sql = {
  addFavourite: 'INSERT INTO favourites (id_user, id_group, movie_id, series_id, name, avatar VALUES ($1, $2, $3, $4, $5, $6)',
  getAllFavouritesUser: 'SELECT * FROM favourites WHERE id_user = $1',
  getAllFavouritesGroup: 'SELECT * FROM favourites WHERE id_group = $1',
  deleteFromUser: 'DELETE from favourites where id_user = $1',
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

const getAllFavourites = async(getByUser) => {
  const { idUser, idGroup} = getByUser;
  if(idGroup === '') {
    try {
      await pgPool.query(sql.getAllFavouritesUser,[idUser])
    } catch (error) {
      console.log('Failed to get favourites from user', error);
      return error;
    }
  } else {
    try {
      await pgPool.query(sql.getAllFavouritesGroup,[idGroup])
    } catch (error) {
      console.log('Failed to get favourites from group', error);
      return error;
    }
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
