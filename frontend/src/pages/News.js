import React from 'react';
import Header from '../components/header';
import Global from '../components/global';
import NavBar from '../components/styles/NavBar';

function News() {
  return (
    <div>
      <NavBar />
      <Global />
      <h1>News from '.pages/news'</h1>
      <Header />
    </div>
  )
}

export default News