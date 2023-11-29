import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ImageGrid = () => {
  const placeholders = Array.from({ length: 60 }, (_, index) => index);

  return (
    <ImageGridContainer>
      {placeholders.map((index) => (
        <Thumbnail key={index} to="/details">
          <ThumbnailContainer>
            <Placeholder />
            <ThumbnailText>Title</ThumbnailText>
          </ThumbnailContainer>
        </Thumbnail>
      ))}
    </ImageGridContainer>
  );
};

const ImageGridContainer = styled.div`
  position: absolute;
  left: 10%;
  top: 20%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 80%;
  background-color: white;
`;

const Thumbnail = styled(Link)`
  width: 15%;
  height: 200px;
  margin: 5px;
  background-color: white;
  border-radius: 20%;
  cursor: pointer;
  text-decoration: none;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 70%;
  background-color: #ddd;
  border-radius: 10px;
`;

const ThumbnailText = styled.p`
  margin-top: 5px;
  text-align: center;
  color: black;
`;

export default ImageGrid;
