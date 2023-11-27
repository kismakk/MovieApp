const pgPool = require('../config/connection.js');

const sql = {
  getGroupInfo: 'SELECT id_groups, groups_name, groups_avatar, groups_description FROM groups WHERE groups_name = $1', // group-name -> group name, group description
  getAllGroups: 'SELECT id_groups, groups_name, groups_avatar, groups_description FROM groups'
};

const getGroupInfo = async (groupName) => {
  try {
    const result = await pgPool.query(sql.getGroupInfo, [groupName]);
    return result.rows[0];
  } catch (error) {
    console.error('Error getting group information', error);
    throw new Error('Error getting group information');
  }
};

const getAllGroups = async () => {
  try {
    const result = await pgPool.query(sql.getAllGroups);
    return result.rows;
  } catch (error) {
    console.error('Error getting all groups', error);
    throw new Error('Error getting all groups');
  }
};

module.exports = {
  getGroupInfo,
  getAllGroups,
  sql
};
