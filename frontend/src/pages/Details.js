import React from 'react'
import Global from '../components/global/styles/global';
import Header from '../components/global/Header';
import NavBar from '../components/global/NavBar';
import InfoBoard from '../components/detailsComponents/details';

function Details() {
  return (
    <div className='container'>
      <Global />
      <div className='header'>
        <header>
          <Header />
        </header>
        <div className='content'>
          <nav>
            <NavBar />
          </nav>
          <div className='info'>
            <InfoBoard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details