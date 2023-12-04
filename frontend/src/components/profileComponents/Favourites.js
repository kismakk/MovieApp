import React from 'react'
import styled from "styled-components";

const Favourites = () => {
    const favourites = [
        { id: 1, name: 'Name 1', icon: 'https://via.placeholder.com/154' },
        { id: 2, name: 'Name 2', icon: 'https://via.placeholder.com/154' },
        { id: 3, name: 'Karvinen 2', icon: 'https://via.placeholder.com/154' },
      ];
    return (
        <>
        <Section>Favourites</Section>
        <FavouritesContainer>
            {favourites.map((favourite) => (
            <Favourite key={favourite.id}>
              <FavouriteIconContainer>
              <FavouriteIcon src={favourite.icon} alt={favourite.name} />
              <FavouriteName>{favourite.name}</FavouriteName>
            </FavouriteIconContainer>
            </Favourite>
          ))}
        </FavouritesContainer>
      </>
    );
  };
  
const Section = styled.h2`
  margin-left: 4rem;
`;

const FavouritesContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 4rem;
  margin-left: 3rem;
  margin-right: 4rem;
`;

const Favourite = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1rem;
`;

const FavouriteIcon = styled.img`
  width: 154px;
  height: 227px;
  borderRadius: '12px',
`;

const FavouriteIconContainer = styled.div`
  position: relative;
`;

const FavouriteName = styled.h3`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    transition: opacity 0.5s ease;
    ${FavouriteIconContainer}:hover & {
        visibility: visible;
        opacity: 1;
    }
`;

export default Favourites