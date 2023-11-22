const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
/* const jwt = require('../auth/auth.js'); */
const favouriteController = require('../controllers/favouriteController.js');

router.post('/add', upload.none(), favouriteController.addToFavourites)
router.get('/user/:id', upload.none(), favouriteController.getAllFavouritesUser)
router.get('/group/:id', upload.none(), favouriteController.getAllFavouritesGroup)
router.delete('/delete/:id', upload.none(), favouriteController.deleteFavourite)

module.exports = router;

//Todo:
/*
-Endpointit minttiin.
-Routtaukset kans
-Postgre minttiin
*/