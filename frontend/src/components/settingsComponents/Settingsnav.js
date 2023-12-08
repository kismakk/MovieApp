import React from 'react'
import GeneralButton from './GeneralButton'
import UserButton from './UserButton'
import GroupButton from './GroupButton'
import LogoutButton from './LogoutButton'
import styled from 'styled-components';
import { useLogin } from '../contexts/LoginContext';

function Settingsnav() {
  const { isLoggedIn } = useLogin();

  return (
    <>
      <ButtonContainer>
        <GeneralButton />
        <UserButton />
        <GroupButton />
        {isLoggedIn && <LogoutButton />}
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

  @media (max-width: 900px) {
    display: none;
    flex-direction: row;
  }
`;

export default Settingsnav