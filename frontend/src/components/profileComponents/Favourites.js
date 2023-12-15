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
          <Link to="favouritedetails" target="_blank">
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

const FavouriteName = styled.h3`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.5s ease;
    ${FavouriteIconContainer}:hover & {
        visibility: visible;
        opacity: 1;
    }
`;

export default Favourites