import React from 'react'
import Global from '../components/global/styles/global';
import Header from '../components/global/Header';
import NavBar from '../components/global/NavBar';
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
          <main>
            <h2>Heissulivei</h2>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Discover