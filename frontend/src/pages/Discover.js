import React from 'react';
import Global from '../components/global/styles/global';
import Header from '../components/global/Header';
import NavBar from '../components/global/NavBar';
import ButtonGroup from '../components/discoverComponents/button';
import ImageGrid from '../components/discoverComponents/content';

function Discover() {
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
          <div>
            <ButtonGroup />
            <ImageGrid />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discover;
