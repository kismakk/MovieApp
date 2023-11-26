const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
/* const jwt = require('../auth/auth.js'); */
const favouriteController = require('../controllers/favouriteController.js');

router.get('/', upload.none(), favouriteController.getAllFavourites),
router.get('/from', upload.none(), favouriteController.getFavourites),
router.post('/add', upload.none(), favouriteController.addToFavourites),
router.delete('/:type/:id', upload.none(), favouriteController.deleteFavourite)

module.exports = router;

//Todo:
/*
-Endpointit minttiin.
-Routtaukset kans
-Postgre minttiin
*/