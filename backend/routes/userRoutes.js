const express = require('express');
const router = express.Router();
const {createUserController} = require('../controllers/userController.js')

router.post('/signup', createUserController);

module.exports = router;