import React from 'react'
import styled from 'styled-components';

const ErrorHandler = ({ statusCode, message }) => {
  return (
    <>
      <ErrorContainer>
        {statusCode ? <p>{statusCode} - {message}</p> : <p>{message}</p>}
      </ErrorContainer>
    </>
  )
}

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  padding: 1rem;
  border-radius: 50px;
  background-color: #DF9595;
  color: #F3F3E7;
  font-size: 1.25rem;
  font-weight: bold;
  font-family: inherit;
`;

export default ErrorHandler