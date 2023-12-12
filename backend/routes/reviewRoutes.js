const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const jwt = require('../auth/auth.js');
const reviewController = require('../controllers/reviewController.js');

router.post('/', upload.none(), jwt.auth, reviewController.createReview);
router.delete('/', upload.none(), jwt.auth, reviewController.deleteReview);

router.get('/sortByScoreUser/:id?', upload.none(), jwt.auth, reviewController.sortByScoreUser);
router.get('/sortByScoreLeastUser/:id?', upload.none(), jwt.auth, reviewController.sortByScoreLeastUser);
router.get('/sortByTimeOldUser/:id?', upload.none(), jwt.auth, reviewController.sortByTimeOldUser);
router.get('/sortByTimeNewUser/:id?', upload.none(), jwt.auth, reviewController.sortByTimeNewUser);

router.get('/sortByScore', upload.none(), jwt.auth, reviewController.sortByScore);
router.get('/sortByScoreLeast', upload.none(), jwt.auth, reviewController.sortByScoreLeast);
router.get('/sortByTimeOld', upload.none(), jwt.auth, reviewController.sortByTimeOld);
router.get('/sortByTimeNew', upload.none(), jwt.auth, reviewController.sortByTimeNew);

module.exports = router;