const groupModel = require('../models/groupModel');

const getGroupInfo = async (req, res) => {
  const groupName = req.params.groupName;

  try {
    const groupInfo = await groupModel.getGroupInfo(groupName);

    if (!groupInfo) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.status(200).json({ message: 'Success', groupInfo });
  } catch (error) {
    console.error('Error in getGroupInfo', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add other functions for creating, updating, deleting, or other operations as needed

module.exports = {
  getGroupInfo
};
