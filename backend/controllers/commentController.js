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
    const postComments = await comment.postComments(userComments, idUsers, idGroups);
    res.status(200).json({ message: 'Success', postComments })
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getComments, postComments};
