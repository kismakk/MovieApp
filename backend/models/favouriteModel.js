const pgPool = require('../config/connection.js');
const bcrypt = require('bcrypt');

const sql = {
  addFavourite: 'INSERT INTO favourites ',
  getAllFavourites: '',
  deleteFavourite: 'SELECT * FROM users WHERE email = $1'
};

const addFavourite = async() => {

};

const getAllFavourite = async() => {

};

const deleteFavourite = async() => {

};

module.exports = {
};
