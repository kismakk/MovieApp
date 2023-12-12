import React, { useState, useEffect } from 'react';
import Header from '../components/global/Header';
import Global from '../components/global';
import NavBar from '../components/global/NavBar';
import Avatar from '../components/profileComponents/Avatar'
import Groups from '../components/profileComponents/Groups'
import Favourites from '../components/profileComponents/Favourites'
import Comments from '../components/profileComponents/Comments'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Profile() {

  const [avatarName, setAvatarName] = useState('');
  const [groups, setGroups] = useState('');
  const [favourites, setFavourites] = useState('');
  const [byId, setId] = useState('');
  const {username}  = useParams();
  const dataBaseLink = 'http://localhost:3001/'

useEffect(() => {
  if (!username) {
    // Fetch Users Avatar and username
    axios.get(dataBaseLink + 'users/profile', { withCredentials: true })
      .then((res) => {
        setAvatarName(res.data.userInfo);
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch Users groups
    axios.get(dataBaseLink + 'groups/mygroups', { withCredentials: true })
      .then((res) => {
        setGroups(res.data.Groups);
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch Users favourites
    axios.get(dataBaseLink + 'favourites/from', { withCredentials: true })
      .then((res) => {
        setFavourites(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    // Fetch Users Avatar and username with params
    axios.get(dataBaseLink + 'users/profile/' + username, { withCredentials: true })
      .then((res) => {
        setAvatarName(res.data.userInfo);
        setId(res.data.userInfo.id_users);
        // Fetch Users groups with params
        return axios.get(dataBaseLink + 'groups/mygroups/' + res.data.userInfo.id_users, { withCredentials: true });
      })
      .then((res) => {
        setGroups(res.data.Groups);
        setId(res.data.userInfo.id_users)
      })
      .catch((error) => {
        console.log(error);
      }); 
  }
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
            <Avatar userData={avatarName}/>
          </div>
          <div className="groups">
            <Groups groupsData={groups}/>
          </div>
          {!username && (
            <div className="favourites">
              <Favourites favouritesData={favourites}/>
            </div>
          )}
        </main>
        <div className="side-section">
          <Comments userId={byId} />
        </div>
      </div>
    </div>
  );
}

export default Profile