const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const commentController = require('../controllers/commentController.js');

router.get('/', upload.none(), commentController.getComments);
router.delete('/delete/:id_comments', upload.none(), commentController.deleteComment);
router.post('/comment/', upload.none(), commentController.postComments);

module.exports = router;
