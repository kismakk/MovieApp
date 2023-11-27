const groupModel = require('../models/groupModel');

const createGroup = async (req, res, next) => {
  const userId = res.locals.userId;
  const groupName = req.body.groupName;
  const groupDescription = req.body.groupDescription || null;
  const groupsAvatar = req.body.groupsAvatar || null;

  try {
    if (!groupName || groupName === '') {
      res.status(400);
      throw new Error('Group name is required');
    }
    const groupExists = await groupModel.groupAlreadyExists(groupName);
    if (groupExists) {
      res.status(400);
      throw new Error('Group already exists');
    }
    const group = await groupModel.createGroup(groupName, groupDescription, groupsAvatar);
    if (!group) {
      res.status(400);
      throw new Error('Group could not be created');
    }
    const groupId = group.id_groups;
    await groupModel.addUserToGroup(userId, groupId);
    res.status(201).json({ message: 'Group created successfully', userId, group });
  } catch (error) {
    next(error);
  }
};

const getGroupInfo = async (req, res, next) => {
  const groupName = req.params.groupName;

  try {
    const groupInfo = await groupModel.getGroupInfo(groupName);

    if (!groupInfo) {
      res.status(404);
      throw new Error('Group not found');
    }

    res.status(200).json({ message: 'Success', groupInfo });
  } catch (error) {
    next(error);
  }
};

const getAllGroups = async (req, res, next) => {
  try {
    const allGroups = await groupModel.getAllGroups();

    if (allGroups.length === 0) {
      res.status(404);
      throw new Error('No groups found');
    }

    res.status(200).json({ message: 'Success', allGroups });
  } catch (error) {
    next(error);
  }
};

// Add other functions for creating, updating, deleting, or other operations as needed

module.exports = {
  getGroupInfo,
  getAllGroups,
  createGroup
};
