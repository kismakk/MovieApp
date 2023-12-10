import React from 'react'
import Header from '../components/global/Header'
import Global from '../components/global/styles/global'
import Settingsnav from '../components/settingsComponents/Settingsnav'
import NavBar from '../components/global/NavBar'
import GeneralInfo from '../components/settingsComponents/GeneralInfo'
import UserInfo from '../components/settingsComponents/UserInfo'
import GroupInfo from '../components/settingsComponents/GroupInfo'
import LogOut from '../components/settingsComponents/LogOut'
import { useLogin } from '../components/contexts/LoginContext'

function Settings() {
  const { isLoggedIn, login } = useLogin();

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
          <main>
            <div style={InfoContainer}>
              <GeneralInfo />
              <UserInfo />
              <GroupInfo />
              {isLoggedIn && <LogOut />}
              {!isLoggedIn && <button style={{ cursor: 'pointer' }} onClick={login}>Log in</button>}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

const InfoContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 2rem',
}

export default Settings