import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios';
import styled from 'styled-components';

const GroupModal = ({ isOpen, onClose, groupName, groupId, avatar, setEdited }) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const [isEditing, setIsEditing] = useState(false); 
  const [editedGroupName, setEditedGroupName] = useState(groupName);
  const [editedAvatar, setEditedAvatar] = useState(avatar);
  const [buttonText, setButtonText] = useState('Edit');
  const [isMembersLoading, setMembersLoading] = useState(false);
  const [isEditLoading, setEditLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const modalRef = useRef();

  useEffect(() => {
    setMembersLoading(true);
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
    axios.get(`http://localhost:3001/groups/members/${groupId}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setMembers(res.data.groupMembers);
        setMembersLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isModalOpen, groupId]);

  const handleButtonChange = () => {
    if (isEditing) {
      setButtonText('Edit');
    }
    else {
      setButtonText('Save');
    }
    setIsEditing(!isEditing);
  };

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  const handleGroupNameChange = (e) => {
    setEditedGroupName(e.target.value);
  };

  const handleSaveChanges = () => {
    setEditLoading(true);

    const group = {
      groupName: editedGroupName,
      groupAvatar: editedAvatar,
    };

    axios.put(`http://localhost:3001/groups/edit/${groupId}`, group, { withCredentials: true })
      .then((res) => {
        setEditLoading(false);
        setEdited(true);
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      handleCloseModal();
    }, 2000);
  };

  return (
    <Modal ref={modalRef}>
      <ModalContainer>
        <AvatarContainer>
          <Avatar src={editedAvatar} />
          <NameContainer>
            {isEditing ? (
              <Input
                type="text"
                value={editedGroupName}
                onChange={handleGroupNameChange}
              />
            ) : (
              <GroupName>{editedGroupName}</GroupName>
            )}
            <EditButton onClick={handleButtonChange}>{buttonText}</EditButton>
          </NameContainer>
        </AvatarContainer>
        <MembersHeaderContainer>
          <Members>Members</Members>
          <AddMemberButton>+ Add</AddMemberButton>
        </MembersHeaderContainer>
        <MembersContainer> {isMembersLoading ? <h2>Loading...</h2> :
          <>
            {members.map(member => {
              return (
                <SingleMemberContainer>
                  <MemberAvatar src={member.user_avatar} />
                  <Members>{member.uname}</Members>
                </SingleMemberContainer>
              )
            })
            }
          </>}
        </MembersContainer>
        <ButtonContainer>
          <Button onClick={handleSaveChanges}>{isEditLoading ? 'Saving...' : 'Save'}</Button>
          <Button onClick={handleCloseModal}>Close</Button>
          <DeleteButton>Delete Group</DeleteButton>
        </ButtonContainer>
      </ModalContainer >
    </Modal>
  );
};

export default GroupModal

const Modal = styled.dialog`
  background-color: #2F3F41;
  opacity: 100%;
  size: 100%;
  border: none;
  border-radius: 20px;
  padding: 1rem;
  color: #F3F3E7;
  font-family: Montserrat;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 2rem;
`;

const MemberAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: left;
  justify-content: left;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const GroupName = styled.h4`
  font-size: 1.5rem;
  text-align: left;
  padding: 1rem;
  margin: 0;
  font-family: Montserrat;
  color: #F3F3E7;
`;

const ModalContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 2rem;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Members = styled.h4`
  font-size: 1.25rem;
  padding: 1rem;
  margin: 0;
  font-family: Montserrat;
  color: #F3F3E7;
`;

const MembersHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MembersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SingleMemberContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Input = styled.input`
  text-align: left;
  padding: 1rem;
  width: auto;
  height: 1rem;
  border: none;
  font-size: 1.5rem;
  border-bottom: 1px solid #F3F3E760;
  background-color: #2F3F41;
  color: #F3F3E7;
  font-family: Montserrat;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const AddMemberButton = styled.button`
  background-color: #45575C;
  font-size: 0.8rem;
  width: 4rem;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin: 1rem 0;
`;

const Button = styled.button`
  background-color: #45575C;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  cursor: pointer;
`;

const EditButton = styled.button`
  background-color: #45575C;
  color: white;
  height: 1.5rem;
  width: 5rem;
  margin-left: 1rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: #DF9595;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  cursor: pointer;
`;