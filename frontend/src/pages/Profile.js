import React from 'react';
import Header from '../components/global/Header';
import Global from '../components/global';
import NavBar from '../components/global/NavBar';
import Avatar from '../components/profileComponents/Avatar'
import Groups from '../components/profileComponents/Groups'
import Favourites from '../components/profileComponents/Favourites'
import Comments from '../components/profileComponents/Comments'
import { Link, Outlet } from 'react-router-dom';

function Profile() {
  const username = 'TestUser'
  return (
    <div className="container">
      <Global />
      <header>
        <Header />
      </header>
      <div className="content">
        <nav>
          <NavBar />
        </nav>
        <main>
          <div className="avatarName">
            <Avatar name={username}/>
          </div>
          <div className="groups">
          <Groups />
          </div>
          <div className="favourites">
            <Favourites />
          </div>
        </main>
        <div className="side-section">
            <Comments />
          </div>
      </div>
    </div>
  );
}

export default Profile