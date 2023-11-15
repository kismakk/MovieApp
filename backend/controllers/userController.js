const user = require('../models/userModel.js');

const createUser = async (req, res) => {
  const userData = req.body;
  if (!userData.uname || !userData.pw || !userData.email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const result = await user.createUser(userData);
    res.status(201).json({ message: 'User created succesfully', username: result.rows[0].uname });
  } catch (error) {
    if (error.message === 'Email already in use') {
      return res.status(400).json({ error: error.message });
    }
    console.log('Error in createUser', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createUser
};
