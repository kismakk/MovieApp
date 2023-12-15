import React, { useState} from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";

const backendurl = process.env.REACT_APP_BACKENDURL;

const Avatar = (props) => {  
    const [copiedText, setCopiedText] = useState('');
  
    const copyClick = () => {
      const shareLink = `${backendurl}/profile/${props.userData.uname}`;
      navigator.clipboard.writeText(shareLink).then(
        function () {
          setCopiedText('Copied');
          setTimeout(() => {
            setCopiedText('');
          }, 2500);
        },
        function (err) {
          console.error('Unable to copy link to clipboard', err);
        }
      );
    };
  
    return (
      <>
        <SectionContainer>
          <Section>{'Profile'}</Section>
          <ShareLink onClick={copyClick}>
            <Share>{copiedText || 'Share'}</Share>
          </ShareLink>
        </SectionContainer>
        <AvatarContainer>
          <Picture src={props.userData.user_avatar} />
          <Username>{props.userData.uname}</Username>
        </AvatarContainer>
      </>
    );
  };

const SectionContainer = styled.div`
    display: flex;  
    flex-direction: row;
    margin-left: 3rem;
`;
const AvatarContainer = styled.div`
    text-align: left;
    display: flex;  
    margin: 4rem;
    margin-right: auto;
    border-bottom: 1px solid white;
`;
const Picture = styled.img`
    width: 188px;
    height: 188px;
    border-radius: 50%;

    &:hover {
        cursor: pointer;
    }
`;

const Username = styled.h1`
    margin-top: 5.8rem; 
    margin-left: 2rem;
    margin-right: 1rem;
`;

const Section = styled.h2`
    border-right: 1px solid white;
    padding-left: 1rem;
    padding-right: 0.5rem;
`;

const ShareLink = styled(Link)`
    text-decoration: none;
`;

const Share = styled.h2`
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-bottom: 0.2rem;
    border-radius: 10px;
    display: inline-block;
    margin-left: 0.5rem;
    background-color: grey;
    opacity: 1;
    &:hover{
        cursor: pointer;
        opacity: 0.5;
    }
    
`;


export default Avatar