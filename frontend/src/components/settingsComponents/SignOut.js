import React from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledButton } from './StyledButton'
import { useLogin } from '../contexts/LoginContext'

const SignOut = () => {
  const { logout } = useLogin();

  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/');
  }
  return (
    <>
      <StyledButton onClick={() => handleSignOut()}>Sign Out</StyledButton>
    </>
  )
}


export default SignOut