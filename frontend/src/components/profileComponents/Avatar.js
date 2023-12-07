import React from 'react'
import styled from "styled-components";


const Avatar = (props) => {
    console.log(props)
    return (
    <>  
    <Section>{'Profile'}</Section>
        <AvatarContainer>
            <Picture src={props.userData.user_avatar} />
            <Username>{props.userData.uname}</Username> 
        </AvatarContainer>
    </>
  )
}
const AvatarContainer = styled.div`
    text-align: left;
    display: flex;  
    margin: 4rem;
    border-bottom: 1px solid white;
`;
const Picture = styled.img`
    width: 188px;
    height: 188px;
    border-radius: 50%;

    &:hover{
        cursor: pointer;
    }
`;

const Username = styled.h1`
    margin-top: 5.8rem; 
    margin-left: 2rem;
    margin-right: 1rem;
`;

const Section = styled.h2`
margin-left: 4rem;
`;


export default Avatar