const {createUser} = require('../models/userModel.js')

const createUserController = async (req, res) => {
    const userData = req.body;
    if (!userData.uname || !userData.pw || !userData.email) {
        return res.status(400).json({error: 'Missing required fields'});
    }
    try {
        const result = await createUser(userData);
        res.status(201).json(result);
    } catch (error) {
        console.log('Error in createUserController', error);
        res.status(500).json({error: 'Internal server error'});
    }
}

module.exports = {
    createUserController
}