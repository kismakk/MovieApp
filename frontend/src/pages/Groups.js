import React, { useEffect, useState } from "react"
import axios from "axios";
import Header from '../components/global/Header';
import Global from '../components/global/styles/global';
import NavBar from '../components/global/NavBar';
import MainSection from '../components/groupsComponents/MainSection.js';
import ListSection from '../components/groupsComponents/ListSection';
import MessageSection from "../components/groupsComponents/Messages";
import { useParams, Link } from "react-router-dom";
import styled from 'styled-components';

const backendurl = process.env.REACT_APP_BACKENDURL;

function Groups() {
  const [favorites, setFavorites] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { groupId } = useParams();

  useEffect(() => {
    axios.get(`${backendurl}/favourites/from?id_groups=${groupId}`, { withCredentials: true })
      .then((res) => {
        setFavorites(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      })
  }, [])


  if (isLoading) {
    return (

      <h2>Loading</h2>
    )
  }

  return (
    <div className="container"> {/*Whole page*/}
      <Global />
      <header>
        <Header />
      </header>
      <div className="content"> {/*Content for the spesific page*/}
        <nav>
          <NavBar />
        </nav>
        <main> {/*Margin to raise content above navbar, can be edited*/}
          <h2>Groups</h2>
          <GroupBox> {/*Flexes avatar and info horizontally*/}
            <MainSection groupId={groupId} />
          </GroupBox>
          <List> {/*List of movies/series*/}
            <div className="list-header">
              <h2>Favourites</h2>
              <Link to="favouritedetails">
                <SeeAll>See All →</SeeAll>
              </Link>
            </div>
            <div className="mediaList">
              <ListSection groupId={groupId} favoritesData={favorites} />
            </div>
          </List>
        </main>
        <div className="side-section">
          <MessageSection groupId={groupId} />
        </div>
      </div>
    </div>
  );
}



const GroupBox = styled.div`
  align-items: center;
  display: flex; /*Flexes avatar and info horizontally*/
  align-items: center; /*Aligns avatar and info vertically*/
  border-bottom: 2px solid #F6F6F690; /*Adds a pretty line :) */
  max-width: 900px;
  `;

const SeeAll = styled.p`
  margin-left: auto;
`;

const Avatar = styled.div`
  font-size: 200px;
  color: #F5F5F595;
  `;

const GroupInfo = styled.div`
  display: flex; /*Flexes group info evenly*/
  flex-direction: column; /*Stacks group info vertically*/
  align-items: left;
  max-width: 900px;
`;

const List = styled.div`
  display: column;
  padding-left: 15px;
  max-width: 900px;
  padding-bottom: 20px;

  .list-header {
    display: flex;
    justify-content: space-between; 
    align-items: center;
    width: 100%;

  }
  .mediaList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }
`;

export default Groups;