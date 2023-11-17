const user = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('../auth/auth.js');

const createUser = async (req, res, next) => {
  const userData = req.body;
  try {
    const { uname, pw, email } = userData;
    if (!uname || !pw || !email || uname === '' || pw === '' || email === '') {
      res.status(400);
      throw new Error('Invalid user data');
    }
    const isEmailInUse = await user.isEmailInUse(email);
    if (isEmailInUse) {
      res.status(400);
      throw new Error('Email already in use');
    }
    const result = await user.createUser(userData);
    const userId = result.rows[0].id_users;
    jwt.createToken(res, userId);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res) => {
  const uname = req.body.uname;
  const pw = req.body.pw;
  try {
    const dbResult = await user.getPasswordAndId(uname);
    if (!dbResult) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { pw: pwHash, id_users: userId } = dbResult[0];
    const isAuthenticated = await bcrypt.compare(pw, pwHash);
    if (!isAuthenticated) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    jwt.createToken(res, userId);
    res.status(200).json({ message: 'User signed in successfully' });
  } catch (error) {
    console.log('Error in signIn: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const signOut = async (req, res) => {
  res.cookie('uJwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

const getUserInfo = async (req, res) => {
  const uname = res.locals.username;

  try {
    const userInfo = await user.getUserInfo(uname);
    res.status(200).json({ message: 'Success', userInfo });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  signIn,
  signOut,
  getUserInfo
};
