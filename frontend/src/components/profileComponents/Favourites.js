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
  padding-left: 2rem;
  padding-right: 2rem;
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
  flex-direction: row;
  align-content: center;
  justify-content: center;
`;

const Favourite = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FavouriteIconContainer = styled.div`
display: flex;
flex-direction: row;
align-content: center;
justify-content: center;
max-width: 600px;
  cursor: pointer;
`;

const FavouriteIcon = styled.img`
  width: 80%;
  border-radius: 8px;
  ${FavouriteIconContainer}:hover & {
    visibility: visible;
    opacity: 0.3;
  }
`;

const FavouriteName = styled.p`
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