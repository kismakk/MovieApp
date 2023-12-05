// groupsComponents/MainSection.js
import React from "react";
import styled from "styled-components";
import Avatar from "../profileComponents/Avatar";

const MainSectionContainer = styled.div`
  /* Add your styling for the main section container */
  flex: 1;
  padding: 10px; /* Adjust as needed */
  display: flex;
  align-items: center;
`;

const MainContent = styled.div`
  /* Add your styling for the main content */
`;

const MainSection = () => {
  return (
    <MainSectionContainer>
      {/* Group Picture */}
      <Avatar title="Group Title" name="Group Name" />
      {/* Main Content */}
      <MainContent>
        {/* Additional content as needed */}
      </MainContent>
    </MainSectionContainer>
  );
};

export default MainSection;