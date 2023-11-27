const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
/* const jwt = require('../auth/auth.js'); */
const favouriteController = require('../controllers/favouriteController.js');

router.get('/', upload.none(), favouriteController.getAllFavourites),
router.get('/from', upload.none(), favouriteController.getFavouritesFrom),
router.post('/add', upload.none(), favouriteController.addToFavourites),
router.delete('/', upload.none(), favouriteController.deleteFavourite)

module.exports = router;

//Todo:
/*
-Endpointit minttiin.
-Routtaukset kans
-Postgre minttiin
*/