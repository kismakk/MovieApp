import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ImageGrid = () => {
  const placeholders = Array.from({ length: 6 }, (_, index) => index);

  return (
    <ImageGridContainer>
      {placeholders.map((index) => (
        <Thumbnail key={index} to="/details">
          <Placeholder />
        </Thumbnail>
      ))}
    </ImageGridContainer>
  );
};

const ShowImageGrid = () => {
  return (
    <div className="grid">
      <ImageGrid />
    </div>
  );
};

const ImageGridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 50%;
  margin: 0 auto;
`;

const Thumbnail = styled(Link)`
  width: 15%;
  height: 200px;
  margin: 5px;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ddd;
  border-radius: 10px;
`;

export default ShowImageGrid;
