import React from 'react';
import Global from '../components/global/styles/global';
import Header from '../components/global/Header';
import NavBar from '../components/global/NavBar';
import ContentSearch from '../components/searchComponents/searchcomps';

function Search() {
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
            <ContentSearch />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
