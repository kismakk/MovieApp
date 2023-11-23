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

const postComment = async (req, res) => {
  const comment = req.body.user_comments;

  try {
    const newComment = await comment.postComment(comment);
    res.status(200).json({ message: 'Success', newComment });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getComments, postComment };
