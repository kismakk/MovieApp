import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InfoContainer from './InfoContainer'
import styled from 'styled-components'
import GroupModal from './GroupModal'

const GroupInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupId, setGroupId] = useState(0);
  const [avatar, setAvatar] = useState('');
  const [admin, setAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:3001/groups/mygroups/', { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setGroups(res.data.Groups);
        setIsLoading(false);
        setEdited(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setEdited(false);
      });
  }, [edited]);

  const handleEditGroup = (groupName, groupId) => {
    setGroupName(groupName);
    setGroupId(groupId);
    setIsModalOpen(true); // Open the modal when the "Edit Account" button is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleGroupNameChange = (newGroupName) => {
    setGroupName(newGroupName);
  };

  const handleGroupAvatarChange = (newAvatar) => {
    setAvatar(newAvatar);
  };

  return (
    <InfoContainer>
      {isLoading ? <h2>Loading...</h2> :
        <>
          {isModalOpen && (
            <Backdrop>
              <GroupModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                groupId={groupId}
                groupName={groupName}
                avatar="https://via.placeholder.com/100"
                handleNameChange={handleGroupNameChange}
                handleAvatarChange={handleGroupAvatarChange}
                setEdited={setEdited}
              />
            </Backdrop>
          )}
          <h2 style={{ textAlign: 'left', padding: '0 1rem' }}>Groups</h2>
          {groups.length === 0 ? <h3>You are not in any groups</h3> :
            <>
              <GroupContainer>
                {groups.map(group => {
                  return (
                    <Group>
                      <GroupAvatar src={group.groups_avatar} />
                      <GroupTitle>{group.groups_name}</GroupTitle>
                      {group.is_admin ?
                        <>
                          <Badge $admin>admin</Badge>
                          <GroupButton onClick={() => handleEditGroup(group.groups_name, group.id_groups)}>Edit</GroupButton>
                        </> :
                        <>
                          <Badge>member</Badge>
                          <GroupButton $leave>Leave</GroupButton>
                        </>}
                    </Group>
                  )
                })}
              </GroupContainer>
            </>}
        </>}
    </InfoContainer>
  )
}

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  border-radius: 50px;
  margin-bottom: 1rem;
`;

const GroupAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
`;

const GroupTitle = styled.h4`
  font-size: 14px;
  padding: 1rem;
  margin: 0;
  font-family: Montserrat;
  color: #F3F3E7;
`;

const Badge = styled.div`
  padding: 0.5rem;
  border-radius: 50px;
  border: ${props => props.$admin ? '1px solid #B7A50A;' : '1px solid #B70A0A;'}
  text-align: center;
  font-size: 14px;
  margin: 7px 0;
  font-family: Montserrat;
  color: ${props => props.$admin ? '#B7A50A' : '#B70A0A;'}
`;

const GroupButton = styled.button`
  background-color: ${props => props.$leave ? '#DF9595' : '#45575C'};
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  margin-left: auto;
  margin-right: 1rem;
  font-family: Montserrat;
  cursor: pointer;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Adjust the opacity as needed */
  backdrop-filter: blur(5px); /* Apply the blur effect */
  z-index: 999; /* Make sure it's above other elements */
`;

export default GroupInfo