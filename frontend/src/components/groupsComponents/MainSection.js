// groupsComponents/MainSection.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const MainSectionContainer = styled.div`
  /* Add your styling for the main section container */
  flex: 1;
  padding: 10px; /* Adjust as needed */
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: 100px;
`;

const GroupDetailsContainer = styled.div`
  /* Updated styling for the group details container */
  display: flex;
  align-items: flex-start; /* Align items to the start of the container */
  margin-bottom: 10px;
`;

const Description = styled.p`
  /* Add your styling for the description */
  margin-top: 5px; /* Adjust margin as needed */
`;

const MembersContainer = styled.div`
  /* Add your styling for the members container */
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-right: 90px;
`;

const Member = styled.div`
  margin-right: -20px;
`;

const AvatarContainer = styled.div`
  text-align: left;
  display: flex;
  align-items: center;
  margin: 1rem ; /* Adjust margins as needed */
`;

const GroupPicture = styled.img`
  width: 188px; /* Set the desired width for the group picture */
  height: 188px; /* Set the desired height for the group picture */
  border-radius: 50%;
  margin-right: 400px; /* Adjust margin to move the picture to the left */
`;

const Picture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const GroupNameTitle = styled.h1`
  font-size: 1.5rem;
  text-align: center; /* Reset margin to ensure consistent spacing */
`;

const Section = styled.h2`
  margin-top: -7rem;
  margin-right: 80px;
`;

const Line = styled.div`
  width: 90%;
  border-bottom: 1px solid white;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const MainSection = () => {
  
  const [groupName, setGroupName] = useState('name');
  const [avatar, setAvatar] = useState('avatar');
  const [description, setDescription] = useState('description');
  const [members, setMembers] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/groups/testiryhmä', {withCredentials: true})
      .then((res) => {
        console.log(res.data)
        const group = res.data.groupInfo
        setGroupName(group.groups_name);
        setAvatar(group.groups_avatar);
        setDescription(group.groups_description);
        setId(group.id_groups);
      })
      .catch((error) => {
        console.error(error);
      })
    axios.get('http://localhost:3001/groups/members/54', {withCredentials: true})
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
      <GroupDetailsContainer>
        {/* Group Picture */}
        <GroupPicture src={avatar} />
        {/* Group Name Title */}
        <div>
          <GroupNameTitle>{groupName}</GroupNameTitle>
          <Description>{description}</Description>
        </div>
      </GroupDetailsContainer>
      {/* Members and Add Member Button */}
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
      {/* Line */}
      <Line />
    </MainSectionContainer>
  );
};

export default MainSection;