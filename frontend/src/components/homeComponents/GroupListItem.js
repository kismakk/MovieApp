import React from 'react'
import styled from 'styled-components'
import { useLogin } from '../contexts/LoginContext'
import axios from 'axios'

const GroupListItem = ({ setMessage, setError, groupId, groupName, avatar, description }) => {
  const { isLoggedIn } = useLogin();

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
        <OutsideIcon>
          <GroupInfo>
            <GroupName>{groupName}</GroupName>
            <GroupDescription>{description}</GroupDescription>
          </GroupInfo>
          <LogButton>
            {isLoggedIn && <JoinButton onClick={() => handleJoinButtonClick(groupId)}>Join</JoinButton>}
          </LogButton>
        </OutsideIcon>
      </ItemContainer>
    </>
  )
}

export default GroupListItem

const ItemContainer = styled.div`
background-color: #45575C40;
padding: 0rem 1rem 0rem 1rem;
margin-right: 1rem;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`;

const GroupAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  align-self: center;
  margin-right: 1rem;
`;

const OutsideIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;

const LogButton = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GroupInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 0rem 1rem 0rem;
`;

const GroupName = styled.div`
  color: #EEF1DC;
  font-family: Montserrat;
  font-size: inherit;
  margin-right: 1rem;
  font-weight: bold;
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
  margin: 1.75rem 0 1.75rem auto;
  color: #F3F3E7;
  text-align: center;
  font-size: 0.8rem;
  cursor: pointer;
  &:hover {
    background-color: #c4a747;
    color: #14333D;
  }
`;