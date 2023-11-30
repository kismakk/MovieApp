const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const jwt = require('../auth/auth.js');
const favouriteController = require('../controllers/favouriteController.js');

router.get('/', upload.none(), jwt.auth, favouriteController.getAllFavourites),
router.get('/from', upload.none(), jwt.auth, favouriteController.getFavouritesFrom),
router.post('/add', upload.none(), jwt.auth, favouriteController.addToFavourites),
router.delete('/', upload.none(), jwt.auth,favouriteController.deleteFavourite)

module.exports = router;

//Todo:
/*
-Endpointit minttiin.
-Routtaukset kans
-Postgre minttiin
*/