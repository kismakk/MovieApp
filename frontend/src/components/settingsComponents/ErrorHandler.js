import React from 'react'
import styled from 'styled-components';

const ErrorHandler = ({ statusCode, message }) => {
  return (
    <>
      <ErrorContainer>
        {statusCode ? <ErrorText>{statusCode} - {message}</ErrorText> : <ErrorText>{message}</ErrorText>}
      </ErrorContainer>
    </>
  )
}

const ErrorText = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  font-family: inherit;
  color: #FF6666
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ErrorHandler