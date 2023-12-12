// groupsComponents/ListSection.js
import React, { useState } from "react";
import styled from "styled-components";

const ListSectionContainer = styled.div`
  flex: 1;
  padding: 10px;
`;

const MediaListContainer = styled.div`
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

let movies = [
  { id: 1, title: "Movie 1", imageUrl: "https://via.placeholder.com/100x150" },
  { id: 2, title: "Movie 2", imageUrl: "https://via.placeholder.com/100x150" },
  { id: 3, title: "Movie 3", imageUrl: "https://via.placeholder.com/100x150" },
  { id: 4, title: "Movie 4", imageUrl: "https://via.placeholder.com/100x150" },
  { id: 5, title: "Movie 5", imageUrl: "https://via.placeholder.com/100x150" },
  { id: 6, title: "Movie 6", imageUrl: "https://via.placeholder.com/100x150" },
  { id: 7, title: "Movie 7", imageUrl: "https://via.placeholder.com/100x150" },
  // Add more movies as needed
];


const ListSection = ({ media }) => {
  // Use slice to display only the first three items
 const favoriteMovies = movies.slice(0, 5);

  return (
    <ListSectionContainer>
      <h2>List Section</h2>
      {/* Display favorite movies as a list with max three movie pictures on each line */}
      <MediaListContainer>
        {favoriteMovies.map((movie) => (
          <MediaItem key={movie.id}>
            <Image src={movie.imageUrl} alt={movie.title} />
            <MediaTitle>{movie.title}</MediaTitle>
          </MediaItem>
        ))}
      </MediaListContainer>
    </ListSectionContainer>
  );
};

export default ListSection;