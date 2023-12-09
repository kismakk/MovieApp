import React, { useState } from 'react';
import Global from './styles/global';
import SearchBar from './searchBar';
import SignModal from '../Sign/signModal';
import { RiMovie2Line } from 'react-icons/ri';

const Header = () => {
  const movieIconStyle = {
    color: '#c4a747 ',
    fontSize: '50px',
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <button onClick={openModal}>Sign In</button>
      <SignModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Header;
