const comment = require('../models/commentModel');
const jwt = require('../auth/auth.js');

const getComments = async (req, res) => {
  jwt.auth(req, res, async () => {
    const groupId = req.query.id_groups;
    try {
      const getComments = await comment.getComments(groupId);
      console.log(getComments);
      res.status(200).json({ message: 'Success', getComments });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
};

const postComments = async (req, res) => {
  jwt.auth(req, res, async () => {
    const idGroups = req.body.id_groups;
    const idUsers = req.body.id_users;
    const userComments = req.body.user_comments;
    try {
      const postComments = await comment.postComments(
        userComments,
        idUsers,
        idGroups
      );
      res.status(200).json({ message: 'Comment posted', postComments });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
};

const deleteComment = async (req, res) => {
  jwt.auth(req, res, async () => {
    const commentId = req.params.id;
    const userId = res.locals.userId;
    try {
      const commentToDelete = await comment.getCommentsByUserId(userId);
      console.log(userId);
      console.log(res.locals.userId);
      const isAuthorizedToDelete = commentToDelete.some(comment => comment.id_users === userId);
      if (isAuthorizedToDelete) {
        const deletedComment = await comment.deleteComment(commentId);
        res.status(200).json({ message: 'Comment deleted', deletedComment });
      } else {
        res.status(404).json({ error: 'Unauthorized to delete this comment' });
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
};

module.exports = { getComments, postComments, deleteComment };
