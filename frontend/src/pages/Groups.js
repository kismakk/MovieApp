import React from "react"
import Header from '../components/global/Header';
import Global from '../components/global/styles/global';
import NavBar from '../components/global/NavBar';
import MainSection from '../components/groupsComponents/MainSection.js';
import ListSection from '../components/groupsComponents/ListSection';
import MessageSection from "../components/groupsComponents/Messages";
import { useParams } from "react-router-dom";
import { CiCircleAlert } from "react-icons/ci";
import styled from 'styled-components';


function Groups() {

  const {groupId} = useParams();
  console.log('groupIdFromGroupPage', groupId)

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
        <main> {/*Global styling for vertical flexing*/}
          <h2>Groups</h2>
          <GroupBox> {/*Flexes avatar and info horizontally*/}
            <Avatar> {/*Avatar*/}
              <CiCircleAlert />
            </Avatar>
            <GroupInfo> {/*Info*/}
              <p>Group Name</p>
              <p>Group Description</p>
              <p>Group Members</p>
            </GroupInfo>
          </GroupBox>
          <List> {/*List of movies/series*/}
            <div className="list-header">
              <h2>List</h2>
              <p>See All →</p>
            </div>
            <div className="mediaList">
              {/* <ListSection />*/}
              <p>Images here</p>
              <p>Images here</p>
              <p>Images here</p>
            </div>
          </List>
          <News>
            <h2>News</h2>
            <p>News here</p>
            <p>News here</p>
            <p>News here</p>
          </News>
        </main>
        <div className="side-section">
          <MessageSection />
        </div>
      </div>
    </div>
  );
}



const GroupBox = styled.div`
align-items: center;
  margin-left: 15px;
  display: flex; /*Flexes avatar and info horizontally*/
  align-items: center; /*Aligns avatar and info vertically*/
  border-bottom: 2px solid #F6F6F690; /*Adds a pretty line :) */
  max-width: 900px;
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
  margin-left: 15px;
  max-width: 900px;
  border-bottom: 2px solid #F6F6F690;
  padding-bottom: 20px;

  .list-header {
    display: flex;
    justify-content: space-between; 
    align-items: center;
    width: 100%;

  }
  .mediaList { /*Add your List-component here*/
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }
`;
const News = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  max-width: 900px;
  max-height: 450px;
`;

export default Groups;