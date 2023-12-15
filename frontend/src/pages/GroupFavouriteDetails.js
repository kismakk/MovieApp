import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Import your components here
import Header from '../components/global/Header';
import Global from '../components/global';
import NavBar from '../components/global/NavBar';
import GroupFavouriteAvatar from '../components/groupsComponents/GroupFavouriteAvatar';
import GroupAllFavourites from '../components/groupsComponents/GroupAllFavourites';
import { useParams } from 'react-router-dom';

function GroupFavouriteDetails() {
  const [groupData, setGroupData] = useState('');
  const [favourites, setFavourites] = useState([]);

  const groupId = useParams().groupId;

  const getGroupInfo = () => {
    axios.get(`http://localhost:3001/groups/${groupId}`, { withCredentials: true })
      .then((res) => {
        setGroupData(res.data.groupInfo);
      })
      .catch((error) => {
        console.error('Error fetching group info:', error);
      });
  }

  const getFavourites = () => {
    axios.get(`http://localhost:3001/favourites/from?id_groups=${groupId}`, { withCredentials: true })
      .then((res) => {
        setFavourites(res.data);
      })
      .catch((error) => {
        console.error('Error fetching favorites:', error);
      });
  }

  useEffect(() => {
    getGroupInfo();
    getFavourites();
  }, [groupId]);

  console.log('favourites', favourites);

  return (
    <div className='container'>
      <Global />
      <header>
        <Header />
      </header>
      <Content>
        <div className='content'>
          <nav>
            <NavBar />
          </nav>
          <main>
            <div className='top'>
              <GroupFavouriteAvatar groupData={groupData} />
            </div>
            <div className='allfavourites'>
              <GroupAllFavourites favouritesData={favourites} />
            </div>
          </main>
        </div>
      </Content>
    </div>
  );
}

export default GroupFavouriteDetails;

const Content = styled.div`
  margin-bottom: 120px;
`;
