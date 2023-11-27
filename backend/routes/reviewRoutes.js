const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const jwt = require('../auth/auth.js');
const reviewController = require('../controllers/reviewController.js');

router.get('/', upload.none(), reviewController.getReview);
router.get('/sortByScore', upload.none(), reviewController.sortByScore);
router.get('/sortByScoreLeast', upload.none(), reviewController.sortByScoreLeast);
router.get('/sortByTimeOld', upload.none(), reviewController.sortByTimeOld);
router.get('/sortByTimeNew', upload.none(), reviewController.sortByTimeNew);
router.post('/', upload.none(), reviewController.createReview);
router.delete('/', upload.none(), reviewController.deleteReview);

module.exports = router;
