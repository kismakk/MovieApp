import React from 'react'
import GeneralButton from './GeneralButton'
import UserButton from './UserButton'
import GroupButton from './GroupButton'
import LogoutButton from './LogoutButton'
import styled from 'styled-components';

function Settingsnav() {
  return (
    <>
      <ButtonContainer>
        <GeneralButton />
        <UserButton />
        <GroupButton />
        <LogoutButton />
      </ButtonContainer>
    </>
  )
}

const ButtonContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: none;
    flex-direction: row;
  }
`;

export default Settingsnav