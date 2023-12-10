import React, { useState, useEffect } from 'react';
import { useLogin } from '../contexts/LoginContext';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ErrorHandler from '../settingsComponents/ErrorHandler'

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #2E414695;
  padding: 20px;
  border-radius: 8px;
  height: 500px;
  width: 400px;
`;

const FillContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 30%
`;

const CloseButton = styled.button`
  background: transparent;
  color: #EEF1DC;
  font-size: 20px;
  border: none;
  cursor: pointer;
  align-self: right;
`;

const ToggleButtonContainer = styled.div`
padding: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  margin: auto;
`;

const ToggleButton = styled.button`
  background: transparent;
  font-family: Montserrat;
  color: #EEF1DC;
  border: none;
  padding: 5px;
  margin: 0 20px 10px;
  cursor: pointer;
  font-size: inherit;
  font-weight: ${(props) => (props.active === 'true' ? 'bolder' : 'normal')};
  border-bottom: ${(props) => (props.active === 'true' ? '1px solid #EEF1DC;' : 'none')}
`;

const Label = styled.label`
  color: #EEF1DC;
  font-family: Montserrat;
  font-size: 16px;
  margin-bottom: 5px;
`;

const InputField = styled.input`
  width: 100%;
  background: transparent;
  padding: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #F3F3E760;
  color: #F3F3E7;
`;

const SubmitButton = styled.button`
  width: 50%;
  background: #45575C;
  color: #EEF1DC;
  border: none;
  box-sizing: border-box;
  border-radius: 50px;
  padding: 0.5rem;
  cursor: pointer;
  margin-top: 10px; 
`;

const SubmitButtonContainer = styled.div`
  display: grid;
  place-items: center;
`;

const SignInSignUpModal = ({ isOpen, onClose }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [err, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    // Reset the input fields when the modal is opened
    if (isOpen) {
      setUsername('');
      setPassword('');
      setEmail('');
      setIsSignIn(true); // Set the default view to Sign In
    }
  }, [isOpen]);

  const handleSignIn = () => {
    setIsLoading(true);
    axios.post('http://localhost:3001/users/signin', { uname: username, pw: password }, { withCredentials: true })
      .then(() => {
        login();
        onClose();
        navigate('/');
      })
      .catch((error) => {
        setError({ message: error.response.data.error })
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const handleSignUp = () => {
    setIsLoading(true);
    axios.post('http://localhost:3001/users/signup',
      {
        uname: username,
        pw: password,
        email: email
      },
      { withCredentials: true })
      .then(() => {
        login();
        onClose();
        navigate('/');
      })
      .catch((error) => {
        setError({ message: error.response.data.error })
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  if (err) {
    const ERRORTIMEOUT = 3000;
    const timerId = setTimeout(() => {
      setError(null);
      clearTimeout(timerId);
    }, ERRORTIMEOUT);
  }


  return (
    <>
      {isOpen && (
        <ModalWrapper>
          <ModalContent>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <ToggleButtonContainer>
                <ToggleButton active={isSignIn ? 'true' : 'false'} onClick={() => setIsSignIn(true)}>
                  Sign In
                </ToggleButton>
                <ToggleButton active={isSignIn ? 'false' : 'true'} onClick={() => setIsSignIn(false)}>
                  Sign Up
                </ToggleButton>
              </ToggleButtonContainer>
              <CloseButton onClick={onClose}>X</CloseButton>
            </div>
            <FillContainer>
              {isSignIn ? (
                <>
                  {/* Sign In Fields */}
                  <Label htmlFor="username">Username:</Label>
                  <InputField
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Label htmlFor="password">Password:</Label>
                  <InputField
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <SubmitButtonContainer>
                    <SubmitButton onClick={handleSignIn}>{isLoading ? 'Signing in...' : 'Sign in'}</SubmitButton>
                  </SubmitButtonContainer>
                </>
              ) : (
                <>
                  {/* Sign Up Fields */}
                  <Label htmlFor="username">Username:</Label>
                  <InputField
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                    <Label htmlFor="password">Password:</Label>
                    <InputField
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  <Label htmlFor="email">Email:</Label>
                  <InputField
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <SubmitButtonContainer>
                      <SubmitButton onClick={handleSignUp}>{isLoading ? 'Creating account...' : 'Sign up'}</SubmitButton>
                    </SubmitButtonContainer>
                </>
              )}
              {err && <ErrorHandler message={err.message} />}
            </FillContainer>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default SignInSignUpModal;
