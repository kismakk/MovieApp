import React from 'react';
import GlobalStyle from '../styles/global';

// Tämä komponentti voi olla tyhjä, koska GlobalStyle ei tarvitse lapsielementtejä.
function Global() {
  return <GlobalStyle />;
}

export default Global;