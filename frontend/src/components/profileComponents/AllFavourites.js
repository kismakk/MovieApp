import React from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";

const AllFavourites = (props) => {
    const allFavourites = props.favouritesData || []
        
    return (
    <MediaListContainer>
    {allFavourites.map((item) => (
        <MediaItem key={item.id}>
        <Link to={`/${item.movie_id ? 'movies' : 'series'}/${item.movie_id || item.series_id}`} target="_blank">
            <Image src={item.avatar} alt={item.name}/>
            <MediaTitle>{item.name}</MediaTitle>
        </Link>
        </MediaItem>
    ))}
    </MediaListContainer>
    );
  };

  const MediaListContainer = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const MediaItem = styled.div`
  width: 18%;
  margin-bottom: 5px;
  box-sizing: border-box;
  position: relative;
`;

const MediaTitle = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5em;
  margin: 0;
  text-align: center;
  max-width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
`;
export default AllFavourites
