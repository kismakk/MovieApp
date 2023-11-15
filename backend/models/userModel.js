const pgPool = require('../config/connection.js');
const bcrypt = require('bcrypt');

const sql = {
  create: 'INSERT INTO users (uname, pw, email) VALUES ($1, $2, $3) RETURNING uname',
  checkEmail: 'SELECT * FROM users WHERE email = $1'
};

const isEmailInUse = async (email) => {
  const result = await pgPool.query(sql.checkEmail, [email]);
  return result.rows.length > 0;
};

const createUser = async (userData) => {
  const { uname, pw, email } = userData;

  // Check if email already exists
  const emailInUse = await isEmailInUse(email);
  if (emailInUse) {
    throw new Error('Email already in use');
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(pw, saltRounds);
  const values = [uname, passwordHash, email];
  try {
    const result = await pgPool.query(sql.create, values);
    return result;
  } catch (error) {
    console.log('Error in createUser', error);
    return error;
  }
};

module.exports = { createUser };
