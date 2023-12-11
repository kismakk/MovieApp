// groupsComponents/MainSection.js
import React from 'react';
import styled from 'styled-components';

const MainSectionContainer = styled.div`
  /* Add your styling for the main section container */
  flex: 1;
  padding: 10px; /* Adjust as needed */
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: 100px;
`;

const AddMemberButton = styled.button`
  /* Add your styling for the "Add Member" button */
  margin-top: 10px;
  margin-left: -50px; /* Adjust margin as needed */
  padding: 8px 12px; /* Adjust padding as needed */
  background-color: #3498db; /* Set the desired background color */
  color: #fff; /* Set the text color to white */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9; /* Set the desired hover background color */
  }
`;

const GroupDetailsContainer = styled.div`
  /* Add your styling for the group details container */
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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
  margin: 1rem 0; /* Adjust margins as needed */
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
  margin: 0; /* Reset margin to ensure consistent spacing */
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

const MainSection = ({ groupName }) => {
  const groupMembers = [
    { id: 1, name: 'Member 1', avatarUrl: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Member 2', avatarUrl: 'https://via.placeholder.com/50' },
    // Add more members as needed
  ];

  return (
    <MainSectionContainer>
      <GroupDetailsContainer>
        {/* Group Picture */}
        <AvatarContainer>
          <GroupPicture src="https://via.placeholder.com/188" />
          {/* Group Name Title */}
          <div>
            <GroupNameTitle>{groupName}</GroupNameTitle>
          </div>
        </AvatarContainer>
        {/* Additional content as needed */}
      </GroupDetailsContainer>
      {/* Members and Add Member Button */}
      <Section>Members</Section>
      <MembersContainer>
        {groupMembers.map((member) => (
          <Member key={member.id}>
            <Picture src={member.avatarUrl} />
          </Member>
        ))}
      </MembersContainer>
      {/* "Add Member" button */}
      <AddMemberButton>Add Member</AddMemberButton>
      {/* Line */}
      <Line />
    </MainSectionContainer>
  );
};

export default MainSection;