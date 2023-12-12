import React from 'react'
import styled from "styled-components";

const Groups = (props) => {
     const groups = props.groupsData
     const defaultGroup = {
      id_groups: 0,
      groups_name: 'Create new',
      groups_avatar: 'https://via.placeholder.com/99',
    };
    return (
        <>
        <Section>Groups</Section>
        <GroupContainer>
        {[defaultGroup, ...groups].map((group) => (
          <Group key={group.id_groups}>
            <GroupIcon src={group.groups_avatar} alt={group.groups_name} />
            <GroupName>{group.groups_name}</GroupName>
          </Group>
        ))}
        </GroupContainer>
      </>
    );
  };
  
const Section = styled.h2`
  margin-left: 4rem;
  margin-top: -2rem;
`;

const GroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 4rem; /* Adjust the margin-bottom as needed */
  margin-left: 4rem;
  margin-right: auto;
  border-bottom: 1px solid white;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1rem;
`;

const GroupIcon = styled.img`
  width: 99px;
  height: 99px;
  border-radius: 50%;
  cursor: pointer;
`;

const GroupName = styled.h3`
  margin-top: 1rem;
`;


export default Groups