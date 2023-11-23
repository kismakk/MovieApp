import React from 'react';
import headerStyles from './styles/header.js';

function Header() {
  return (
    <header style={headerStyles.header}>
      <nav>
        <h1>This and the list below is from '.components/header'</h1>
        <ul>
          <li>Home</li>
          <li>News</li>
          <li>Settings</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
