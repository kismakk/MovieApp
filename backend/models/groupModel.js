const pgPool = require('../config/connection.js');

const sql = {
  getGroupInfo: 'SELECT id_groups, groups_name, groups_avatar, groups_description FROM groups WHERE groups_name = $1', // group-name -> group name, group description
  getAllGroups: 'SELECT id_groups, groups_name, groups_avatar, groups_description FROM groups',
  createGroup: 'INSERT INTO groups (groups_name, groups_description, groups_avatar) VALUES ($1, $2, $3) RETURNING id_groups, groups_name, groups_description',
  addUserToGroup: 'INSERT INTO users_in_groups (id_groups, id_users, is_admin) VALUES ($1, $2, $3)',
  deleteGroup: 'DELETE FROM groups WHERE id_groups = $1',
  isUserGroupAdmin: 'SELECT * FROM users_in_groups WHERE id_users = $1 AND id_groups = $2 AND is_admin = true',
  editGroup: 'UPDATE groups SET groups_name = $1, groups_description = $2, groups_avatar = $3 WHERE id_groups = $4 RETURNING *',
  getIfGroupExists: 'SELECT * FROM groups WHERE id_groups = $1'
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

const getIfGroupExists = async (groupId) => {
  try {
    const result = await pgPool.query(sql.getIfGroupExists, [groupId]);
    return result.rows.length > 0;
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

const isUserGroupAdmin = async (userId, groupId) => {
  try {
    const result = await pgPool.query(sql.isUserGroupAdmin, [userId, groupId]);
    return result.rows.length > 0;
  } catch (error) {
    console.error('Error checking if user is group admin', error);
    throw new Error('Error checking if user is group admin');
  }
};

const deleteGroup = async (groupId) => {
  try {
    await pgPool.query(sql.deleteGroup, [groupId]);
    console.log('Group deleted successfully');
  } catch (error) {
    console.error('Error deleting group', error);
    throw new Error('Error deleting group');
  }
};

const editGroup = async (groupId, groupName, groupDescription, groupAvatar) => {
  try {
    const updates = {};
    const values = [];

    // Check for valid updates and add to updates object
    if (groupName !== undefined && groupName !== '') {
      updates.groups_name = groupName;
      values.push(groupName);
    }

    if (groupDescription !== undefined && groupDescription !== '') {
      updates.groups_description = groupDescription;
      values.push(groupDescription);
    }

    if (groupAvatar !== undefined && groupAvatar !== '') {
      updates.groups_avatar = groupAvatar;
      values.push(groupAvatar);
    }

    if (Object.keys(updates).length === 0) {
      // No valid updates provided
      return null;
    }

    values.push(groupId);

    // Build query string
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    // Add groupId to end of values array
    const query = `UPDATE groups SET ${setClause} WHERE id_groups = $${values.length} RETURNING *`;

    const result = await pgPool.query(query, values);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.log('Error in editGroup', error);
    throw new Error('Error in editGroup');
  }
};

module.exports = {
  getGroupInfo,
  getAllGroups,
  createGroup,
  groupAlreadyExists,
  addUserToGroup,
  isUserGroupAdmin,
  deleteGroup,
  editGroup,
  getIfGroupExists
};
