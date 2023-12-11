import React from 'react'
import styled from 'styled-components'
import { useLogin } from '../contexts/LoginContext'
import axios from 'axios'

const GroupListItem = ({ setMessage, setError, groupId, groupName, avatar, description }) => {
  const { isLoggedIn } = useLogin();

  const handleGroupNameClick = (groupId) => {
    console.log(`Group ${groupId} clicked`);
    // redirect to group page, if not group member show only group info and join button
  }

  const handleJoinButtonClick = (groupId) => {
    console.log(`Join button for group ${groupId} clicked`);
    axios.post(`http://localhost:3001/groups/join`,
      {
        groupId: groupId,
      },

      { withCredentials: true })
      .then((res) => {
        console.log(res);
        setMessage({ message: res.data.message });
      })
      .catch((error) => {
        setError({ message: error.response?.data?.error || error.message })
      });
  }

  return (
    <>
      <ItemContainer key={groupId}>
        <GroupAvatar
          src={avatar}
        >
        </GroupAvatar>
        <TextContainer>
          <GroupName onClick={() => handleGroupNameClick(groupId)}>{groupName}</GroupName>
          <GroupDescription>{description}</GroupDescription>
        </TextContainer>
        {isLoggedIn && <JoinButton onClick={() => handleJoinButtonClick(groupId)}>Join</JoinButton>}
      </ItemContainer>
    </>
  )
}

export default GroupListItem

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`;

const GroupAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 1rem;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const GroupName = styled.a`
  color: #EEF1DC;
  font-family: Montserrat;
  font-size: inherit;
  margin: 0 1rem 0.5rem 0;
  cursor: pointer;
`;

const GroupDescription = styled.p`
  color: #EEF1DC95;
  font-family: Montserrat;
  font-size: 0.8rem;
  margin: 0;
`;

const JoinButton = styled.button`
  background-color: #45575C;
  box-sizing: border-box;
  border: none;
  border-radius: 50px;
  margin: 1.75rem 1rem;
  color: #F3F3E7;
  text-align: center;
  font-size: 0.8rem;
  cursor: pointer;
  &:hover {
    background-color: #F3F3E7;
    color: #45575C;
  }
`;