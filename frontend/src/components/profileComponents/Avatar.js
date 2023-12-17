import React, { useState } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";

const frontendurl = process.env.REACT_APP_FRONTENDURL;

const Avatar = (props) => {
  const [copiedText, setCopiedText] = useState('');

  const copyClick = () => {
    const shareLink = `${frontendurl}/profile/${props.userData.uname}`;
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
    margin-bottom: 4rem;
    border-bottom: 1px solid #EEF1DC;

    @media (max-width: 950px) {
      flex-direction: column;
      align-items: center;
`;
const Picture = styled.img`
    width: 188px;
    height: 188px;
    border-radius: 50%;

    @media (max-width: 950px) {
      align-self: center;
`;

const Username = styled.h1`
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
    font-size: 20px;
    color: #EEF1DC;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-bottom: 0.2rem;
    border-radius: 10px;
    display: inline-block;
    margin-left: 0.5rem;
    margin-top: 35px;
    background-color: #131C1E80;
    opacity: 1;
    &:hover{
        cursor: pointer;
        background-color: #EEF1DC50;
    }
    
    @media (max-width: 950px) {
      margin-top: 25px;
      font-size: 18x;
`;


export default Avatar