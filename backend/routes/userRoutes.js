const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const userController = require('../controllers/userController.js');

router.post('/signup', upload.none(), userController.createUser);
router.post('/signin', upload.none(), userController.signIn);

module.exports = router;
