import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { StyledButton } from './StyledButton'
import InfoContainer from './InfoContainer'
import { useLogin } from '../contexts/LoginContext'

const LogOut = () => {
  const { logout } = useLogin();

  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate('/');
  }
  return (
    <>
      <StyledButton onClick={() => handleLogOut()}>Log Out</StyledButton>
    </>
  )
}


export default LogOut