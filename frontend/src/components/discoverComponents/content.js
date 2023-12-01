import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getImageUrl, GetContent } from "./contentApi";


const ImageGrid = () => {
  const [contentData, setContentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.REACT_APP_TMDB_API_KEY;
        const totalPages = 5;
        let allContent = [];

        for (let page = 1; page <= totalPages; page++) {
          const params = {
            api_key: apiKey,
            page: page,
          };

          const movies = await GetContent('movie', params);
          allContent = [...allContent, ...movies];
        }
        for (let page = 1; page <= totalPages; page++) {
          const tvParams = {
            api_key: apiKey,
            page: page,
          };

          const tvShows = await GetContent('tv', tvParams);
          allContent = [...allContent, ...tvShows];
        }

        setContentData(allContent);
      } catch (error) {
        console.error('Error fetching content', error);
      }
    };
    fetchData();
  }, []);

  return (
    <ImageGridContainer>
      {contentData.map((item) => (
        <Thumbnail key={item.id} to={`/details/${item.id}`}>
          <ThumbnailContainer>
          <ThumbnailImage src={getImageUrl(item.poster_path)} alt={item.title} />
            <ThumbnailText>{item.title}</ThumbnailText>
          </ThumbnailContainer>
        </Thumbnail>
      ))}
    </ImageGridContainer>
  );
};

const ImageGridContainer = styled.div`
  position: absolute;
  left: 10%;
  top: 30%;
  width: 80%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 80px 20px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const Thumbnail = styled(Link)`
  width: 100%;
  height: 300px;
  margin: 5px;
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

const ThumbnailText = styled.p`
  text-align: center;
  color: black;
`;

export default ImageGrid;
