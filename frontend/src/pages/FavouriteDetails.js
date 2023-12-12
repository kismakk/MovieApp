import React, { useState, useEffect } from 'react';
import Header from '../components/global/Header';
import Global from '../components/global';
import NavBar from '../components/global/NavBar';
import FavouriteAvatar from '../components/profileComponents/FavouriteAvatar';
import AllFavourites from '../components/profileComponents/AllFavourites';
import axios from 'axios';
import styled from 'styled-components';


function FavouriteDetails() {
  const [avatarName, setAvatarName] = useState('');
  const [favourites, setFavourites] = useState('');

  useEffect(() => {
    // Fetch Users Avatar and username
    axios.get('http://localhost:3001/users/profile', { withCredentials: true })
    .then((res) => {
      setAvatarName(res.data.userInfo);
    })
    .catch((error) => {
      console.log(error);
    }); 
     // Fetch Users favourites
     axios.get('http://localhost:3001/favourites/from', { withCredentials: true })
     .then((res) => {
       setFavourites(res.data);
     })
     .catch((error) => {
       console.log(error);
     });
  }, []);

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
        <div className='top'>
          <FavouriteAvatar userData={avatarName}/>
        </div>
        <div className='allfavourites'>
          <AllFavourites favouritesData={favourites}/>
        </div>
      </main>
    </div>
  </div>
  )
}

export default FavouriteDetails