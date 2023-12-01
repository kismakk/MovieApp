import React from 'react'
import InfoContainer from './InfoContainer'
import styled from 'styled-components'

const GroupInfo = () => {
  return (
    <InfoContainer>
      <h2 style={{ textAlign: 'center' }}>Groups</h2>
      <GroupContainer>
        <Group>
          <GroupAvatar src="https://via.placeholder.com/100" />
          <GroupTitle>Group 1</GroupTitle>
          <MemberBadge>member</MemberBadge>
        </Group>
        <Group>
          <GroupAvatar src="https://via.placeholder.com/100" />
          <GroupTitle>Group 2</GroupTitle>
          <AdminBadge>admin</AdminBadge>
          <GroupButton>Edit</GroupButton>
        </Group>
        <Group>
          <GroupAvatar src="https://via.placeholder.com/100" />
          <GroupTitle>Group 3</GroupTitle>
        </Group>
        <Group>
          <GroupAvatar src="https://via.placeholder.com/100" />
          <GroupTitle>Group 4</GroupTitle>
        </Group>
      </GroupContainer>
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

const MemberBadge = styled.div`
  padding: 0.5rem;
  border-radius: 50px;
  border: 1px solid #B70A0A;
  text-align: center;
  font-size: 14px;
  margin: 7px 0;
  font-family: Montserrat;
  color: #B70A0A;
`;

const AdminBadge = styled.div`
  padding: 0.5rem;
  border-radius: 50px;
  border: 1px solid #B7A50A;
  text-align: center;
  font-size: 14px;
  margin: 7px 0;
  font-family: Montserrat;
  color: #B7A50A;
`;

const GroupButton = styled.button`
  background-color: #45575C;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.5rem 2rem;
  margin-left: auto;
  margin-right: 1rem;
  font-family: Montserrat;
`;

export default GroupInfo