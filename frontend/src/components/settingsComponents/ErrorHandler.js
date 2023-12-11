import React from 'react'
import styled from 'styled-components';

const ErrorHandler = ({ statusCode, message }) => {
  return (
    <>
      {statusCode ? <ErrorText>{statusCode} - {message}</ErrorText> : <ErrorText>{message}</ErrorText>}
    </>
  )
}

const ErrorText = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  font-family: Montserrat;
  color: #FF6666
`;

export default ErrorHandler