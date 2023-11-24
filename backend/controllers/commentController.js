const comment = require('../models/commentModel');
const jwt = require('../auth/auth.js');

const getComments = async (req, res) => {
  jwt.auth(req, res, async () => {
    const groupId = req.query.id_groups;
    console.log(req.cookies.uJwt);
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
  const idGroups = req.body.id_groups;
  const idUsers = req.body.id_users;
  const userComments = req.body.user_comments;
  try {
    const postComments = await comment.postComments(userComments, idUsers, idGroups);
    res.status(200).json({ message: 'Comment posted', postComments });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  try {
    const deletedComment = await comment.deleteComment(commentId);
    res.status(200).json({ message: 'Comment deleted', deletedComment });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getComments, postComments, deleteComment };
