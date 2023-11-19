const pgPool = require('../config/connection.js');

const sql = {
  getGroupInfo: 'SELECT id_groups, groups_name, groups_description FROM groups WHERE groups_name = $1' // group-name -> group name, group description
};

const getGroupInfo = async (groupName) => {
  try {
    const result = await pgPool.query(sql.getGroupInfo, [groupName]);
    return result.rows[0];
  } catch (error) {
    console.error('Error getting group information:', error);
    throw error;
  }
};

module.exports = {
  getGroupInfo,
  sql
};
