const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "uploads/" });
const {createUserController} = require('../controllers/userController.js')

router.post('/signup', upload.none(), createUserController);

module.exports = router;