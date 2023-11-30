const pgPool = require('../config/connection.js');
const bcrypt = require('bcrypt');

const sql = {
  createUser: 'INSERT INTO users (uname, pw, email) VALUES ($1, $2, $3) RETURNING id_users',
  checkEmail: 'SELECT * FROM users WHERE email = $1',
  getPassword: 'SELECT pw, id_users FROM users WHERE uname = $1',
  getUserInfo: 'SELECT lname, fname, uname, email FROM users WHERE id_users = $1',
  deleteUser: 'DELETE FROM users WHERE id_users = $1 RETURNING uname'
};

const isEmailInUse = async (email) => {
  const result = await pgPool.query(sql.checkEmail, [email]);
  return result.rows.length > 0;
};

const createUser = async (userData) => {
  const { uname, pw, email } = userData;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(pw, saltRounds);
  const values = [uname, passwordHash, email];
  try {
    const result = await pgPool.query(sql.createUser, values);
    return result.rows[0];
  } catch (error) {
    console.log('Error in createUser', error);
    throw new Error('Error in createUser');
  }
};

const getPasswordAndId = async (uname) => {
  const result = await pgPool.query(sql.getPassword, [uname]);
  if (result.rows.length > 0) {
    return result.rows;
  } else {
    return null;
  }
};

const updateUser = async (fname, lname, avatar, userId) => {
  try {
    const updates = {};
    const values = [];

    // Check for valid updates and add to updates object
    if (fname !== undefined && fname !== '') {
      updates.fname = fname;
      values.push(fname);
    }

    if (lname !== undefined && lname !== '') {
      updates.lname = lname;
      values.push(lname);
    }

    if (avatar !== undefined && avatar !== '') {
      updates.user_avatar = avatar;
      values.push(avatar);
    }

    if (Object.keys(updates).length === 0) {
      // No valid updates provided
      return null;
    }

    values.push(userId);

    // Build query string
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    // Add userId to end of values array
    const query = `UPDATE users SET ${setClause} WHERE id_users = $${values.length} RETURNING uname, fname, lname`;

    const result = await pgPool.query(query, values);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.log('Error in updateUser', error);
    throw new Error('Error in updateUser');
  }
};

const getUserInfo = async (userId) => {
  try {
    const result = await pgPool.query(sql.getUserInfo, [userId]);

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error in getUserInfo', error);
    throw new Error('Error in getUserInfo');
  }
};

const deleteUser = async (userId) => {
  try {
    const result = await pgPool.query(sql.deleteUser, [userId]);
    if (result.rows.length > 0) {
      return result.rows[0].uname;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error in deleteUser', error);
    throw new Error('Error in deleteUser');
  }
};

module.exports = {
  createUser,
  isEmailInUse,
  getPasswordAndId,
  getUserInfo,
  updateUser,
  deleteUser
};
