import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
  margin-right: 10px;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
`;

const Label = styled.label`
  color: #EEF1DC;
  font-family: Montserrat;
  font-size: 16px;
  margin-bottom: 5px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
`;

const SignInSignUpModal = ({ isOpen, onClose }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

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
    // Handle Sign In logic
    console.log('Sign In:', { username, password });
  };

  const handleSignUp = () => {
    // Handle Sign Up logic
    console.log('Sign Up:', { username, email, password });
  };

  return (
    <>
      {isOpen && (
        <ModalWrapper>
          <ModalContent>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <ToggleButtonContainer>
                <ToggleButton active={isSignIn} onClick={() => setIsSignIn(true)}>
                  Sign In
                </ToggleButton>
                <ToggleButton active={!isSignIn} onClick={() => setIsSignIn(false)}>
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
                  <button onClick={handleSignIn}>Sign In</button>
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
                  <Label htmlFor="email">Email:</Label>
                  <InputField
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Label htmlFor="password">Password:</Label>
                  <InputField
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button onClick={handleSignUp}>Sign Up</button>
                </>
              )}
            </FillContainer>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default SignInSignUpModal;
