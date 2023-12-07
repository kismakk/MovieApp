import React, { useEffect, useState } from "react";
import { GetContent } from "./contentApi";
import MediaList from "../global/MediaList";
import styled from "styled-components";


const ImageGrid = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [allShows, setAllShows] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.REACT_APP_TMDB_API_KEY;
        const params = {api_key: apiKey}

          const movies = await GetContent('movie', params);
          const tvShows = await GetContent('tv', params);
          const allMovies = [...movies];
          const allShows = [...tvShows];
          setAllMovies(allMovies)
          setAllShows(allShows)
      } catch (error) {
        console.error('Error fetching content', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Grid>
        <MediaList media={allMovies} mediaType="movies" displayCount={15} />
        <MediaList media={allShows} mediaType="series" displayCount={15} />
    </Grid>
  );
};

const Grid = styled.div`
  position: absolute;
  left: 10%;
  top: 30%;
  width: 80%;
  @media (max-width: 769px) {
    top: 20%;
  }
`;


export default ImageGrid;
