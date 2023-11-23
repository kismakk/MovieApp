const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const commentController = require('../controllers/commentController.js');

router.get('/', upload.none(), commentController.getComments);
// Alustettu routesit deletelle ja postille.
// router.delete('/delete/:id', upload.none(), jwt.auth, commentController.deleteComment);
router.post('/comment/:id', upload.none(), commentController.postComment);

module.exports = router;
