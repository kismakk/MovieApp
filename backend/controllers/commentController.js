const comment = require('../models/commentModel');

const getComments = async (req, res, next) => {
  const groupId = req.query.id_groups;
  try {
    const getComments = await comment.getComments(groupId);
    if (!groupId) {
      res.status(404);
      throw new Error('Missing groupId');
    }
    if (!getComments || getComments.length === 0) {
      res.status(404);
      throw new Error('No comments found for your group');
    }
    res.status(200).json({ message: 'Success', getComments });
  } catch (error) {
    next(error);
  }
};

const postComments = async (req, res, next) => {
  const idGroups = req.body.id_groups;
  const idUsers = res.locals.userId;
  const userComments = req.body.user_comments;
  try {
    if (idGroups === '' || !idUsers || userComments === '') {
      res.status(404);
      throw new Error('Invalid data');
    }
    const postComments = await comment.postComments(
      userComments,
      idUsers,
      idGroups
    );
    res.status(200).json({ message: 'Comment posted', postComments });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  const commentId = req.params.id;
  const userId = res.locals.userId;
  try {
    const deleted = await comment.deleteComment(commentId, userId);
    if (deleted) {
      res.status(200).json({ message: 'Comment deleted successfully' });
    } else {
      res.status(404);
      throw new Error('Comment not found or you do not have permission to delete it');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getComments, postComments, deleteComment };
