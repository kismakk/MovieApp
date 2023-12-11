import React, { useEffect, useState } from "react";
import { GetContent } from "./contentApi";
import MediaList from "../global/MediaList";
import styled from "styled-components";
import ButtonGroup from "./button";

const ImageGrid = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [allShows, setAllShows] = useState([]);
  const [selectedMediaType, setSelectedMediaType] = useState("All");
  const [selectedSortBy, setSelectedSortBy] = useState("Sort By");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.REACT_APP_TMDB_API_KEY;
        const params = { api_key: apiKey };

        if (selectedSortBy === "Sort By") {
          const movies = await GetContent("discover/movie", params);
          const tvShows = await GetContent("discover/tv", params);

          setAllMovies(movies);
          setAllShows(tvShows);
        } else if (selectedSortBy === "Popular"){
          const movies = await GetContent("discover/movie", {
            api_key: apiKey,
            sort_by: selectedSortBy === "Popular" ? "popularity.desc" : selectedSortBy,
          });
          const tvShows = await GetContent("discover/tv", {
            api_key: apiKey,
            sort_by: selectedSortBy === "Popular" ? "popularity.desc" : selectedSortBy,
          });
          setAllMovies(movies);
          setAllShows(tvShows);
        } else if (selectedSortBy === "Now Playing") {
          const movies = await GetContent("movie/now_playing?language=en-US", {
            api_key: apiKey,            
          });
          const tvShows = await GetContent("tv/on_the_air?language=en-US", {
            api_key: apiKey,
            sort_by: selectedSortBy === "Popular" ? "popularity.desc" : selectedSortBy,
          });
          console.log(movies);
          setAllMovies(movies);
          setAllShows(tvShows);
        }
      } catch (error) {
        console.error("Error fetching content", error);
      }
    };

    fetchData();
  }, [selectedMediaType, selectedSortBy]);

  return (
    <div>
       <ButtonGroup onSelectMediaType={setSelectedMediaType} onSelectSortBy={setSelectedSortBy} />
      <Grid>
        {selectedMediaType === "All" && (
          <>
            <MediaList media={allMovies} mediaType="movies" displayCount={15} />
            <MediaList media={allShows} mediaType="series" displayCount={15} />
          </>
        )}
        {selectedMediaType === "Movies" && (
          <MediaList media={allMovies} mediaType="movies" displayCount={20} />
        )}
        {selectedMediaType === "Shows" && (
          <MediaList media={allShows} mediaType="series" displayCount={20} />
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
