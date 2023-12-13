import React from "react"
import Header from '../components/global/Header';
import Global from '../components/global/styles/global';
import NavBar from '../components/global/NavBar';
import MainSection from '../components/groupsComponents/MainSection.js';
import ListSection from '../components/groupsComponents/ListSection';
import MessageSection from "../components/groupsComponents/Messages";
import { useParams } from "react-router-dom";

function Groups() {

  const {groupId} = useParams();
  console.log('groupIdFromGroupPage', groupId)

  return (
    <div className="container">
      <Global />
      <div className="header">
        <header>
          <Header />
        </header>
      </div>
      <div className="content">
        <nav>
          <NavBar />
        </nav>
        <main>
          <div className="main-content">
            {/* Left Side: Main Section and List Section */}
            <div className="left-side">
              <MainSection
                groupId={groupId}
              />
              <ListSection
                groupId={groupId}
              />
            </div>
          </div>
        </main>
        {/* Right Side: Message Section */}
        <div className="right-side">
          <MessageSection
            groupId={groupId}
          />
        </div>
      </div>
    </div>
  );
}


export default Groups;