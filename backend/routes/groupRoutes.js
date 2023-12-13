const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const jwt = require('../auth/auth.js');
const groupController = require('../controllers/groupController.js');

router.get('/mygroups', upload.none(), jwt.auth, groupController.getUsersGroups);
router.post('/addmembers', upload.none(), jwt.auth, groupController.addUserFromInvite);
router.get('/:groupId/invites', upload.none(), jwt.auth, groupController.getInvites);
router.get('/members/:groupId', upload.none(), jwt.auth, groupController.getGroupMembers);
router.post('/create', upload.none(), jwt.auth, groupController.createGroup);
router.get('/:groupId', upload.none(), groupController.getGroupInfo);
router.delete('/:groupId/leave', upload.none(), jwt.auth, groupController.leaveGroup);
router.delete('/members/delete', upload.none(), jwt.auth, groupController.deleteMembers);
router.delete('/delete/:groupId', upload.none(), jwt.auth, groupController.deleteGroup);
router.put('/edit/:groupId', upload.none(), jwt.auth, groupController.editGroup);
router.get('/', upload.none(), groupController.getAllGroups);
router.post('/join', upload.none(), jwt.auth, groupController.joinGroup);

module.exports = router;
