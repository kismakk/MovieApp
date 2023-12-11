import React from 'react'
import styled from "styled-components";

const Avatar = (props) => {
    if (!props.userData) {
        return null; 
      }
    return (
    <>  
    <Section>{'Favourites'}</Section>
        <AvatarContainer>
            <Picture src={props.userData.user_avatar} />
            <Username>{props.userData.uname}'s Favourites</Username> 
        </AvatarContainer>
    </>
  )
}
const AvatarContainer = styled.div`
    text-align: center;
    align-items: center;
    display: flex;  
    flex-direction: column;
    border-bottom: 1px solid white;
`;
const Picture = styled.img`
    width: 188px;
    height: 188px;
    border-radius: 50%;
`;

const Username = styled.h1`
`;

const Section = styled.h2`
margin-left: 1rem;
`;


export default Avatar