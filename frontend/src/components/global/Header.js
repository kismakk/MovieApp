import React, { useState } from 'react';
import Global from './styles/global';
import SearchBar from './searchBar';
import SignModal from '../Sign/signModal';
import { RiMovie2Line } from 'react-icons/ri';
import { useLogin } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const movieIconStyle = {
    color: '#c4a747 ',
    fontSize: '50px',
  };

  const buttonStyle = {
    background: 'transparent',
    color: '#EEF1DC',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    alignSelf: 'right',
  };

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
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 15px' }}>
      <Global />
      <RiMovie2Line style={movieIconStyle} />
      <SearchBar style={{ flex: '1', marginLeft: '16px' }} />
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
