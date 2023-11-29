const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const jwt = require('../auth/auth.js');
const groupController = require('../controllers/groupController.js');

router.post('/create', upload.none(), jwt.auth, groupController.createGroup);
router.get('/:groupName', upload.none(), groupController.getGroupInfo);
router.delete('/delete/:id', upload.none(), jwt.auth, groupController.deleteGroup);
// router.put('/edit/:id', upload.none(), groupController.updateGroup); // TODO: group auth, only for group owner
router.get('/', upload.none(), groupController.getAllGroups);
module.exports = router;
