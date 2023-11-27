const pgPool = require('../config/connection.js');

const sql = {
  getGroupInfo: 'SELECT id_groups, groups_name, groups_avatar, groups_description FROM groups WHERE groups_name = $1', // group-name -> group name, group description
  getAllGroups: 'SELECT id_groups, groups_name, groups_avatar, groups_description FROM groups',
  createGroup: 'INSERT INTO groups (groups_name, groups_description, groups_avatar) VALUES ($1, $2, $3) RETURNING id_groups, groups_name, groups_description',
  addUserToGroup: 'INSERT INTO users_in_groups (id_groups, id_users, is_admin) VALUES ($1, $2, $3)'
};

const groupAlreadyExists = async (groupName) => {
  try {
    const result = await pgPool.query(sql.getGroupInfo, [groupName]);
    return result.rows.length > 0;
  } catch (error) {
    console.error('Error checking if group exists', error);
    throw new Error('Error checking if group exists');
  }
};

const createGroup = async (groupName, groupDescription, groupAvatar) => {
  try {
    const result = await pgPool.query(sql.createGroup, [groupName, groupDescription, groupAvatar]);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating group', error);
    throw new Error('Error creating group');
  }
};

const addUserToGroup = async (userId, groupId) => {
  try {
    const existingUsersInGroup = await pgPool.query('SELECT * FROM users_in_groups WHERE id_groups = $1', [groupId]);
    let isAdmin = true;
    if (existingUsersInGroup.rows.length > 0) {
      isAdmin = false;
    }
    await pgPool.query(sql.addUserToGroup, [groupId, userId, isAdmin]);
    console.log('User added to group');
  } catch (error) {
    console.error('Error adding user to group', error);
    throw new Error('Error adding user to group');
  }
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
  createGroup,
  groupAlreadyExists,
  addUserToGroup
};
