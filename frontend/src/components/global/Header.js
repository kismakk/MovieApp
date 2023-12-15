import React, { useState } from 'react';
import Global from './styles/global';
import SearchBar from './searchBar';
import SignModal from '../Sign/signModal';
import { RiMovie2Line } from 'react-icons/ri';
import { useLogin } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {

  const movieIconStyle = {
    color: '#c4a747 ',
    fontSize: '70px',

  };

  const buttonStyle = {
    background: '#14333D',
    borderRadius: '8px',
    padding: '5px 15px',
    color: '#EEF1DC',
    fontSize: '18px',
    border: 'none',
    cursor: 'pointer',
    alignSelf: 'right',
  };

  const Left = styled.div`
    display: flex;
    align-items: center;
  `;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn, logout } = useLogin();
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 15px' }}>
      <Global />
      <Left>
        <RiMovie2Line style={movieIconStyle} />
        <SearchBar style={{ flex: '1', marginLeft: '16px' }} />
      </Left>
      {isLoggedIn ?
        <>
          <button style={buttonStyle} onClick={() => {
            logout()
            navigate('/')
          }}>Sign Out</button>
        </> :
        <>
          <button style={buttonStyle} onClick={openModal}>Sign In</button>
          <SignModal isOpen={isModalOpen} onClose={closeModal} />
        </>}
    </div>
  );
};

export default Header;
