import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const backendurl = process.env.REACT_APP_BACKENDURL;

const MainSectionContainer = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin-top: 0px;

  @media (max-width: 1000px) {
    flex-direction: column;
    margin-right: 0px;
  }
`;

const GroupDetailsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const Description = styled.p`
  margin-bottom: 15px;

  @media (max-width: 1000px) {
    align-self: center;
  }
`;

const MembersContainer = styled.div`
margin-left: -20px;
display: flex;
flex-direction: row;
flex-wrap: wrap;
overflow-y: auto;
max-height: 100px;
width: 100%;
`;

const Member = styled.div`
`;

const AvatarContainer = styled.div`
  text-align: left;
  display: flex;
  align-items: center;
  margin: 1rem ;
  border-radius: 10px;
  padding: 5px;
`;

const GroupPicture = styled.img`
width: 188px;
height: 188px;
border-radius: 50%;
margin-right: 50px;
background-color: transparent;

@media (max-width: 1000px) {
  align-self: center;
  margin-right: 0px;
}
`;

const Picture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const GroupNameTitle = styled.h1`
margin-bottom: 0px;

@media (max-width: 1000px) {
  align-self: center;
`;

const Section = styled.h2`
margin-bottom: 5px;
margin-top: 40px;

@media (max-width: 1000px) {
  font-size: 22px;
}
`;

const MainSection = ({ groupId }) => {

  const [groupName, setGroupName] = useState('name');
  const [avatar, setAvatar] = useState('avatar');
  const [description, setDescription] = useState('description');
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get(`${backendurl}/groups/${groupId}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data)
        const group = res.data.groupInfo
        setGroupName(group.groups_name);
        setAvatar(group.groups_avatar);
        setDescription(group.groups_description);
      })
      .catch((error) => {
        console.error(error);
      })
    axios.get(`${backendurl}/groups/members/${groupId}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data)
        setMembers(res.data.groupMembers);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);


  return (
    <MainSectionContainer>
      <GroupPicture src={avatar} />
      <GroupDetailsContainer>
        <GroupNameTitle>{groupName}</GroupNameTitle>
        <Description>{description}</Description>
        <Section>Members</Section>
        <MembersContainer>
          {members.map((member) => (
            <Member key={member.id_users}>
              {/* Display member information */}
              <AvatarContainer>
                <Picture src={member.user_avatar} />
                <div>
                  <p>{member.uname}</p>
                  {/* Add more member information as needed */}
                </div>
              </AvatarContainer>
            </Member>
          ))}
        </MembersContainer>
      </GroupDetailsContainer>
    </MainSectionContainer>
  );
};

export default MainSection;