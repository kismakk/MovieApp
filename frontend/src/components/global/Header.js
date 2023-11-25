import React from 'react';
import Global from './styles/global';
import SearchBar from './searchBar';
import { RiMovie2Line } from 'react-icons/ri';

const Header = () => {
  const movieIconStyle = {
    color: '#c4a747 ', // Change the color to your desired color
    fontSize: '50px', // Change the font size to your desired size
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 15px' }}>
      <Global />
      {/* Logo */}
      <RiMovie2Line style={movieIconStyle} />
      {/* Search bar */}
      <SearchBar style={{ flex: '1', marginLeft: '16px' }} />
      {/* User icon or SignIn */}
      <p>Sign In</p>
    </div>
  );
};

export default Header;
