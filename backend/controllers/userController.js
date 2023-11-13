const {createUser} = require('../models/userModel.js')

const createUserController = async (req, res) => {
    const userData = req.body;
    try {
        const result = await createUser(userData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
}

module.exports = {
    createUserController
}