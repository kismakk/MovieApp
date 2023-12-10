import React, { useEffect, useState } from "react";
import { GetContent } from "./contentApi";
import MediaList from "../global/MediaList";
import styled from "styled-components";
import ButtonGroup from "./button";

const ImageGrid = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [allShows, setAllShows] = useState([]);
  const [selectedMediaType, setSelectedMediaType] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.REACT_APP_TMDB_API_KEY;
        const params = { api_key: apiKey };

        const movies = await GetContent("movie", params);
        const tvShows = await GetContent("tv", params);

        setAllMovies(movies);
        setAllShows(tvShows);
        console.log("rendering imagegrid");
      } catch (error) {
        console.error("Error fetching content", error);
      }
    };

    fetchData();
  }, [selectedMediaType]);

  return (
    <div>
      <ButtonGroup onSelectMediaType={setSelectedMediaType} />
      <Grid>
        {selectedMediaType === "All" && (
          <>
            <MediaList media={allMovies} mediaType="movies" displayCount={15} />
            <MediaList media={allShows} mediaType="series" displayCount={15} />
          </>
        )}
        {selectedMediaType === "Movies" && (
          <MediaList media={allMovies} mediaType="movies" displayCount={30} />
        )}
        {selectedMediaType === "Shows" && (
          <MediaList media={allShows} mediaType="series" displayCount={30} />
        )}
      </Grid>
    </div>
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
