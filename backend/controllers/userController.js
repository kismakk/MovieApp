const user = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('../auth/auth.js');

const createUser = async (req, res) => {
  const userData = req.body;
  if (!userData.uname || !userData.pw || !userData.email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    await user.createUser(userData);
    const token = jwt.createToken(userData.uname);
    res.status(201).json({ message: 'User created succesfully', jwtToken: token });
  } catch (error) {
    if (error.message === 'Email already in use') {
      return res.status(400).json({ error: error.message });
    }
    console.log('Error in createUser: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const signIn = async (req, res) => {
  const uname = req.body.uname;
  const pw = req.body.pw;
  try {
    const pwHash = await user.getPassword(uname);
    if (!pwHash) {
      return res.status(404).json({ error: 'User not found' });
    }
    const isAuthenticated = await bcrypt.compare(pw, pwHash);
    if (!isAuthenticated) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const authToken = jwt.createToken(uname);
    res.status(200).json({ message: 'User signed in successfully', authToken });
  } catch (error) {
    console.log('Error in signIn: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createUser,
  signIn
};
