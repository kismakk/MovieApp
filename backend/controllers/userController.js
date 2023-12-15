const user = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('../auth/auth.js');
const validator = require('validator');

const createUser = async (req, res, next) => {
  const userData = req.body;
  try {
    const { uname, pw, email } = userData;
    if (!uname || !pw || !email || uname === '' || pw === '' || email === '') {
      res.status(400);
      throw new Error('Missing required fields');
    }

    if (!validator.isEmail(email)) {
      res.status(400);
      throw new Error('Invalid email');
    }

    const usernameExists = await user.isUsernameInUse(uname);
    if (usernameExists) {
      res.status(400);
      throw new Error('Username already in use');
    }

    const isEmailInUse = await user.isEmailInUse(email);
    if (isEmailInUse) {
      res.status(400);
      throw new Error('Email already in use');
    }

    const dbResult = await user.createUser(userData);
    const userId = dbResult.id_users;
    jwt.createToken(res, userId);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const uname = req.body.uname;
  const pw = req.body.pw;
  try {
    const dbResult = await user.getPasswordAndId(uname);
    if (!dbResult) {
      res.status(404);
      throw new Error('User not found');
    }
    const { pw: pwHash, id_users: userId } = dbResult[0];
    const isAuthenticated = await bcrypt.compare(pw, pwHash);
    if (!isAuthenticated) {
      res.status(401);
      throw new Error('Invalid credentials');
    }
    jwt.createToken(res, userId);
    res.status(200).json({ message: 'User signed in successfully' });
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res) => {
  res.cookie('uJwt', '', {
    httpOnly: true,
    sameSite: 'none',
    expires: new Date(0)
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

const updateUser = async (req, res, next) => {
  const { fname, lname, avatar } = req.body;
  const userId = res.locals.userId;
  try {
    if ((fname === undefined || fname === '') && (lname === undefined || lname === '') && (avatar === undefined || avatar === '')) {
      res.status(400);
      throw new Error('No data to update');
    }
    const dbResult = await user.updateUser(fname, lname, avatar, userId);
    if (!dbResult) {
      res.status(404);
      throw new Error('User not found');
    }
    res.status(200).json({ message: 'User edited successfully', dbResult });
  } catch (error) {
    next(error);
  }
};

const getUserInfo = async (req, res, next) => {
  const userId = req.params.username || res.locals.userId;
  const local = 'local';
  const params = 'params';
  try {
    let userInfo = ''
    if(req.params.username) {
      userInfo = await user.getUserInfo(params, userId);
    } else {
      userInfo = await user.getUserInfo(local, userId);
    }
    res.status(200).json({ message: 'Success', userInfo });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const userId = res.locals.userId;
  try {
    const dbResult = await user.deleteUser(userId);
    res.cookie('uJwt', '', {
      httpOnly: true,
      expires: new Date(0)
    });
    res.status(200).json({ message: 'User deleted successfully', username: dbResult });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  signIn,
  signOut,
  updateUser,
  getUserInfo,
  deleteUser
};
