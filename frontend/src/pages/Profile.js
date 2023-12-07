import React, { useState, useEffect } from 'react';
import Header from '../components/global/Header';
import Global from '../components/global';
import NavBar from '../components/global/NavBar';
import Avatar from '../components/profileComponents/Avatar'
import Groups from '../components/profileComponents/Groups'
import Favourites from '../components/profileComponents/Favourites'
import Comments from '../components/profileComponents/Comments'
import { Link, Outlet } from 'react-router-dom';

function Profile() {

  const username = 'NotAdmin';
  const theUser = true;

  const [avatarName, setAvatarName] = useState();
  const [groups, setGroups] = useState();
  const [favourites, setFavourites] = useState();
  const [comments, setComments] = useState();
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const ApiKey = process.env.REACT_APP_TMDB_API_KEY;
      
      // Fetch Avatar and username
      const avatarNameResponse = await fetch('http://localhost:3001/users/profile?uname=profiletest');
      const avatarNameData = await avatarNameResponse.json();
      console.log('Avatar is' + JSON.stringify(avatarNameData))
      //setAvatarName(avatarNameData.results);

      // Fetch user's groups
      /* const groupsResponse = await fetch();
      const groupsData = await groupsResponse.json();
      setGroups(groupsData.results);

      // Fetch Users favourites
      const favouritesResponse = await fetch();
      const favouritesData = await favouritesResponse.json();
      setFavourites(favouritesData.results);

      // Fetch Users favourites
      const commentsResponse = await fetch();
      const commentsDara = await commentsResponse.json();
      setComments(commentsDara.results); */
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data.');
    }
  };

  fetchData();
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
{/*
  1.Fetchaa avatarin ja nimen
  2.Fetchaa groupit. Jos on user itte niin voi luoda groupin.
  3.Jos on user itse niin fetchaa myös favouritet
  4.Fetchaa reviewsit. Mahdollisuus lajitella suosion mukaan.
*/}
export default Profile