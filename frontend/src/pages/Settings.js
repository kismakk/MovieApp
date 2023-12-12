import React from 'react'
import styled from 'styled-components'
import Header from '../components/global/Header'
import Global from '../components/global/styles/global'
import Settingsnav from '../components/settingsComponents/Settingsnav'
import NavBar from '../components/global/NavBar'
import GeneralInfo from '../components/settingsComponents/GeneralInfo'
import UserInfo from '../components/settingsComponents/UserInfo'
import GroupInfo from '../components/settingsComponents/GroupInfo'
import SignOut from '../components/settingsComponents/SignOut'
import { useLogin } from '../components/contexts/LoginContext'

function Settings() {
  const { isLoggedIn } = useLogin();

  return (
    <>
      <div className='container'>
        <Global />
        <div className='header'>
          <header>
            <Header />
          </header>
        </div>
        <div className='content'>
          <nav>
            <NavBar />
          </nav>
          <div className='side-section'>
            <div style={{ display: 'flex', position: 'fixed' }}>
              <Settingsnav />
            </div>
          </div>
          <MainContent>
            <div style={InfoContainer}>
              <GeneralInfo />
              <UserInfo />
              <GroupInfo />
              {isLoggedIn && <SignOut />}
            </div>
          </MainContent>
        </div>
      </div>
    </>
  )
}

const MainContent = styled.main`
  margin: 0 1rem;
  flex: 2;

  @media (max-width: 900px) {
    padding-bottom: 6rem;
  }
`;

const InfoContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 2rem',
}

export default Settings