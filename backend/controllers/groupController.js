const groupModel = require('../models/groupModel');

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
  getAllGroups
};
