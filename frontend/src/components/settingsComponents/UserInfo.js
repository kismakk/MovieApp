import React from 'react'
import styled from 'styled-components'
import InfoContainer from './InfoContainer'

const UserInfo = () => {

  return (
    <InfoContainer>
      <AvatarContainer>
        <Avatar src="https://via.placeholder.com/100" />
        <Username>Username</Username>
      </AvatarContainer>
      <DetailsContainer>
        <DetailHeader>First Name</DetailHeader>
        <Detail>John</Detail>
        <DetailHeader>Last Name</DetailHeader>
        <Detail>Doe</Detail>
        <DetailHeader>Email</DetailHeader>
        <Detail>johndoe@email.com</Detail>
      </DetailsContainer>
      <ButtonContainer>
        <EditButton>Edit Account</EditButton>
        <DeleteButton>Delete Account</DeleteButton>
      </ButtonContainer>
    </InfoContainer>
  )
}

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const DetailHeader = styled.h4`
  font-size: 14px;
  padding: 1rem;
  margin: 0;
  font-family: Montserrat;
  color: #F3F3E7;
`;

const Detail = styled.h4`
  background-color: #45575C;
  padding: 1rem;
  border-radius: 50px;
  text-align: center;
  font-size: 14px;
  margin: 0;
  font-family: Montserrat;
  color: #F3F3E7;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 2rem;
`;

const Username = styled.h3`
  font-size: 24px;
  margin: 0;
  font-family: Montserrat;
  color: #F3F3E7;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const DeleteButton = styled.button`
  background-color: #DF9595;
  color: white;
  border: none;
  border-radius: 50px;
        padding: 1rem 2rem;
  cursor: pointer;
`;

const EditButton = styled.button`
  background-color: #45575C;
  color: white;
  border: none;
  border-radius: 50px;
        padding: 1rem 2rem;
  cursor: pointer;
`;

export default UserInfo

