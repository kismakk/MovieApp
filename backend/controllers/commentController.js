const comment = require('../models/commentModel');

const getComments = async (req, res) => {
  const groupId = req.query.id_groups;
  try {
    const getComments = await comment.getComments(groupId);
    console.log(getComments);
    res.status(200).json({ message: 'Success', getComments });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const postComments = async (req, res) => {
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
};

const deleteComment = async (req, res) => {
  const commentId = req.params;
  const userId = res.locals.userId;
  console.log(res.locals);

  try {
    const deletedRowCount = await comment.deleteComment(commentId, userId);
    console.log(deletedRowCount);
    if (deletedRowCount === 0) {
      res.status(404).json({ error: 'Comment not found or you do not have permission to delete it' });
    } else if (deletedRowCount === undefined) {
      res.status(500).json({ error: 'Something went wrong, try again later' });
    } else {
      return res.status(200).json({ message: 'Comment deleted successfully.' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getComments, postComments, deleteComment };
