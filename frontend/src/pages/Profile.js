import React from 'react';
import Header from '../components/global/Header';
import Global from '../components/global';
import NavBar from '../components/global/NavBar';
import Avatar from '../components/profileComponents/Avatar'
import Groups from '../components/profileComponents/Groups'
import Favourites from '../components/profileComponents/Favourites'
import Comments from '../components/profileComponents/Comments'
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';

function Profile() {

  /* const [isLoggedIn, setLoggedIn] = useState(false); */
  const username = 'NotAdmin';
  const theUser = true;
  
  //Login ehdot tänne
 /*  const handleLogin = () => {
    setLoggedIn(true);
  }; */

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
           {/*
           1.Fetchaa avatarin ja nimen
           2.Fetchaa groupit. Jos on user itte niin voi luoda groupin.
           3.Jos on user itse niin fetchaa myös favouritet
           4.Fetchaa reviewsit. Mahdollisuus lajitella suosion mukaan.
           */}
          <div className="avatarName">
            <Avatar title={'Profile'} name={username} user={theUser}/>
          </div>
          <div className="groups">
          <Groups />
          </div>
          {theUser === true &&
            <div className="favourites">
            <Favourites />
            </div>
          }
        </main>
        <div className="side-section">
            <Comments />
          </div>
      </div>
    </div>
  );
}

export default Profile