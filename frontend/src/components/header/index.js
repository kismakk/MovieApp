import React from 'react';
import headerStyles from '../styles/header.js';

function Header() {
  return (
    <header style={headerStyles.header}>
      <nav>
        <h2>This and the list below is from '.components/header'</h2>
        <ul>
          <li>Home</li>
          <li>News</li>
          <li>Settings</li>
        </ul>
        <p>p test</p>
      </nav>
    </header>
  );
}

export default Header;