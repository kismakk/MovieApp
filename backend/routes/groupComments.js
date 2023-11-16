const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// const jwt = require('../auth/auth.js');
const commentController = require('../controllers/commentController.js');

router.get('/', upload.none(), commentController.getComments);
// router.delete('/delete/:id', upload.none(), jwt.auth, commentController.deleteComment);
// router.post('/comment/:id', upload.none(), jwt.auth, commentController.postComment);

module.exports = router;
