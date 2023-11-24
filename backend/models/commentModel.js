const pgPool = require('../config/connection.js');

const sql = {
  postComment: 'INSERT INTO group_comments (user_comments, id_users, id_groups) VALUES ($1, $2, $3) RETURNING *',
  getComments: 'SELECT user_comments, id_users FROM group_comments WHERE id_groups = $1',
  deleteComment: 'DELETE FROM group_comments WHERE id_comments = $1 RETURNING *'
};

const getComments = async (idComments) => {
  try {
    const result = await pgPool.query(sql.getComments, [idComments]);

    if (result.rows.length > 0) {
      return result.rows;
    } else {
      throw new Error('Comments not found');
    }
  } catch (error) {
    console.log('Error in getComments', error);
  }
};

const postComments = async (userComments, idUsers, idGroups) => {
  try {
    const result = await pgPool.query(sql.postComment, [userComments, idUsers, idGroups]);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      throw new Error('Error posting comment');
    }
  } catch (error) {
    console.log('Error in postComments', error);
    throw error;
  }
};

const deleteComment = async (commentId) => {
  try {
    const result = await pgPool.query(sql.deleteComment, [commentId]);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      throw new Error('Comment not found');
    }
  } catch (error) {
    console.log('Error in deleteComment', error);
    throw error;
  }
};

module.exports = { getComments, postComments, deleteComment };
