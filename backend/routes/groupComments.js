const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const commentController = require('../controllers/commentController.js');
const jwt = require('../auth/auth.js');

router.get('/', upload.none(), jwt.auth, commentController.getComments);
router.delete('/delete/:id', upload.none(), jwt.auth, commentController.deleteComment);
router.post('/comment/', upload.none(), jwt.auth, commentController.postComments);

module.exports = router;
