import React, { useState, useEffect } from 'react';
import Header from '../components/global/Header';
import Global from '../components/global';
import NavBar from '../components/global/NavBar';
import Avatar from '../components/profileComponents/Avatar'
import Groups from '../components/profileComponents/Groups'
import Favourites from '../components/profileComponents/Favourites'
import Comments from '../components/profileComponents/Comments'
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';

function Profile() {

  const [avatarName, setAvatarName] = useState();
  const [groups, setGroups] = useState();
  const [favourites, setFavourites] = useState();
  const [comments, setComments] = useState();
  const [error, setError] = useState(null);

useEffect(() => {
      // Fetch Avatar and username
        /* axios.get('http://localhost:3001/users/profile', { withCredentials: true })
        .then((res) => {
          setAvatarName(res.data.userInfo);
          //console.log(res.data.userInfo);
        })
        .catch((error) => {
          console.log(error);
        }); */
      // Fetch user's groups
      /* const groupsResponse = await fetch();
      const groupsData = await groupsResponse.json();
      setGroups(groupsData.results); */

      // Fetch Users favourites
      axios.get('http://localhost:3001/favourites', { withCredentials: true })
        .then((res) => {
          setFavourites(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });

      // Fetch Users favourites
      /* const commentsResponse = await fetch();
      const commentsDara = await commentsResponse.json();
      setComments(commentsDara.results); */ 
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
          {avatarName !== undefined &&
              <div className="avatarName">
              <Avatar userData={avatarName}/>
            </div>
          }
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

{/*
  1.Fetchaa avatarin ja nimen
  2.Fetchaa groupit. Jos on user itte niin voi luoda groupin.
  3.Jos on user itse niin fetchaa myös favouritet
  4.Fetchaa reviewsit. Mahdollisuus lajitella suosion mukaan.
*/}
export default Profile