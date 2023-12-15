import React from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";

const Favourites = (props) => {
    const favourites = props.favouritesData || []
    const latestFavorites = favourites.slice(0, 5);
        
    return (
        <>
        <FavouritesText>
          <Section>Favourites</Section>
          <Link to="favouritedetails">
              <SeeAll>See all</SeeAll>
          </Link>
        </FavouritesText>
        <FavouritesContainer>
            {latestFavorites.map((favourite) => (
            <Favourite key={favourite.id_favourites} 
              to={`/${favourite.movie_id ? 'movies' : 'series'}/${favourite.movie_id || favourite.series_id}`}>
              <FavouriteIconContainer>
              <FavouriteIcon src={favourite.avatar} alt={favourite.name} />
              <FavouriteName>{favourite.name}</FavouriteName>
            </FavouriteIconContainer>
            </Favourite>
          ))}
        </FavouritesContainer>
      </>
    );
  };

const FavouritesText = styled.h2`
  display: flex;
  align-items: center;
  margin-left: 4rem;
  margin-top: -4rem;
  justify-content: space-between;
`;
const SeeAll = styled.h2`
  margin-left: auto;
`;
const Section = styled.h2`
`;

const FavouritesContainer = styled.div`
  display: flex;
  flex-direction: wrap;
  justify-content: space-between;
  margin-bottom: 4rem;
  margin-left: 3rem;
  margin-right: 4rem;
`;

const Favourite = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1rem;
`;

const FavouriteIconContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const FavouriteIcon = styled.img`
  width: 200px;
  height: 300px;
  border-radius: 12px;
  opacity: 1;
  ${FavouriteIconContainer}:hover & {
    visibility: visible;
    opacity: 0.3;
  }
`;

const FavouriteName = styled.p`
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

export default Favourites