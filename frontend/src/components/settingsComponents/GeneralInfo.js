import React from 'react'
import InfoContainer from './InfoContainer'
import styled from 'styled-components'

const GeneralInfo = () => {
  return (
    <InfoContainer >
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>General</h2>
      <GeneralContainer>
        <GeneralHeader>Version</GeneralHeader>
        <GeneralDetail>1.0.0</GeneralDetail>
        <GeneralHeader>License</GeneralHeader>
        <GeneralDetail>MIT</GeneralDetail>
        <GeneralHeader>Author</GeneralHeader>
        <GeneralDetail>John Doe</GeneralDetail>
      </GeneralContainer>
    </InfoContainer>
  )
}

const GeneralContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const GeneralHeader = styled.h4`
  font-size: 14px;
  padding: 1rem;
  margin: 0;
  font-family: Montserrat;
  color: #F3F3E7;
`;

const GeneralDetail = styled.h4`
  background-color: #45575C;
  padding: 1rem;
  border-radius: 50px;
  text-align: center;
  font-size: 14px;
  margin: 0;
  font-family: Montserrat;
  color: #F3F3E7;
`;
export default GeneralInfo