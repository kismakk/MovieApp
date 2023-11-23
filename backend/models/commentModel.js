const pgPool = require('../config/connection.js');

const sql = {
  postComment: 'INSERT INTO group_comments (user_comments) VALUES $1',
  getComments: 'SELECT user_comments FROM group_comments WHERE id_groups = $1',
  deleteComment: 'DELETE FROM group_comments WHERE id_comments = $1'
};

const getComments = async (idComments) => {
  try {
    const result = await pgPool.query(sql.getComments, [idComments]);

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      throw new Error('Comments not found');
    }
  } catch (error) {
    console.log('Error in getComments', error);
  }
};

const postComment = async (comment) => {
  try {
    const result = await pgPool.query(sql.postComment, [comment]);
    return result;
  } catch (error) {
    throw new Error('Error posting comment', error);
  }
};

module.exports = { getComments, postComment };
