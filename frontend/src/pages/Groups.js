import React from "react"
import Header from '../components/global/Header';
import Global from '../components/global/styles/global';
import NavBar from '../components/global/NavBar';
import MainSection from '../components/groupsComponents/MainSection.js';
import ListSection from '../components/groupsComponents/ListSection';
import MessageSection from "../components/groupsComponents/Messages";

function Groups() {
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
              <MainSection />
              <ListSection />
            </div>
          </div>
        </main>
        {/* Right Side: Message Section */}
        <div className="right-side">
              <MessageSection />
            </div>
      </div>
    </div>
  );
}


export default Groups;