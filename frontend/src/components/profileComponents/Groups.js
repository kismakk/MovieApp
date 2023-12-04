import React from 'react'
import styled from "styled-components";

const Groups = () => {
    const groups = [
        { id: 1, name: 'Group 1', icon: 'https://via.placeholder.com/99' },
        { id: 2, name: 'Group 2', icon: 'https://via.placeholder.com/99' },
        { id: 3, name: 'Group 3', icon: 'https://via.placeholder.com/99' },
        { id: 4, name: '+ new group', icon: 'https://via.placeholder.com/99' },
      ];
    return (
        <>
        <Section>Groups</Section>
        <GroupContainer>
            {groups.map((group) => (
            <Group key={group.id}>
              <GroupIcon src={group.icon} alt={group.name} />
              <GroupName>{group.name}</GroupName>
            </Group>
          ))}
        </GroupContainer>
      </>
    );
  };
  
const Section = styled.h2`
  margin-left: 4rem;
`;

const GroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 4rem;
  margin-left: 3rem;
  margin-right: 4rem;
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
`;

const GroupName = styled.h3`
  margin-top: 1rem;
`;


export default Groups