const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const jwt = require('../auth/auth.js');
const userController = require('../controllers/favouriteController.js');

router.post('/add', upload.none(), favouriteController.addFavourite)
router.get('/', upload.none(), favouriteController.getAllFavourite)
router.delete('/delete/:id', upload.none(), favouriteController.deleteFavourite)

module.exports = router;
