import React, { useEffect, useState } from "react";
import { GetContent, genreNameToId } from "./contentApi";
import MediaList from "../global/MediaList";
import styled from "styled-components";
import ButtonGroup from "./button";

const ImageGrid = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [allShows, setAllShows] = useState([]);
  const [selectedMediaType, setSelectedMediaType] = useState("All");
  const [selectedSortBy, setSelectedSortBy] = useState("Sort By");
  const [selectedGenre, setSelectedGenre] = useState("Genres");

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
          const movies = await GetContent("movie/popular?language=en-US&page=1", {
            api_key: apiKey,
          });
          const tvShows = await GetContent("tv/popular?language=en-US&page=1", {
            api_key: apiKey,
          });
          setAllMovies(movies);
          setAllShows(tvShows);
        } else if (selectedSortBy === "Now Playing") {
          const movies = await GetContent("movie/now_playing?language=en-US&page=1", {
            api_key: apiKey,            
          });
          const tvShows = await GetContent("tv/on_the_air?language=en-US&page=1", {
            api_key: apiKey,            
          });
          setAllMovies(movies);
          setAllShows(tvShows);
        }
        else if (selectedSortBy === "Top Rated") {
            const movies = await GetContent("movie/top_rated?language=en-US&page=1", {
            api_key: apiKey,            
          });
          
          const tvShows = await GetContent("tv/top_rated?language=en-US&page=1", {
            api_key: apiKey,            
          });
          setAllMovies(movies);
          setAllShows(tvShows);
        } if (selectedGenre === "Animation") {
          const genreId = genreNameToId("Animation");
          const movies = await GetContent("discover/movie?include_adult=true&include_video=false&language=en-US&page=1", {
            api_key: apiKey,
            with_genres: genreId,     
          });
          const tvShows = await GetContent("discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US&page=1", {
            api_key: apiKey,
            with_genres: genreId,     
          });
          setAllMovies(movies);
          setAllShows(tvShows);
        }  else if (selectedGenre === "Comedy") {
          const genreId = genreNameToId("Comedy");
          const movies = await GetContent("discover/movie?include_adult=true&include_video=false&language=en-US&page=1", {
            api_key: apiKey,
            with_genres: genreId,     
          });
          const tvShows = await GetContent("discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US&page=1", {
            api_key: apiKey,
            with_genres: genreId,     
          });
          setAllMovies(movies);
          setAllShows(tvShows);       
        } else if (selectedGenre === "Crime") {
          const genreId = genreNameToId("Crime");
          const movies = await GetContent("discover/movie?include_adult=true&include_video=false&language=en-US&page=1", {
            api_key: apiKey,
            with_genres: genreId,     
          });
          const tvShows = await GetContent("discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US&page=1", {
            api_key: apiKey,
            with_genres: genreId,     
          });
          setAllMovies(movies);
          setAllShows(tvShows);        
        }  else if (selectedGenre === "Drama") {
          const genreId = genreNameToId("Drama");
          const movies = await GetContent("discover/movie?include_adult=true&include_video=false&language=en-US&page=1", {
            api_key: apiKey,
            with_genres: genreId,     
          });
          const tvShows = await GetContent("discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US&page=1", {
            api_key: apiKey,
            with_genres: genreId,     
          });
          setAllMovies(movies);
          setAllShows(tvShows);      
        } else if (selectedGenre === "Family") {
          const genreId = genreNameToId("Family");
          const movies = await GetContent("discover/movie?include_adult=true&include_video=false&language=en-US&page=1", {
            api_key: apiKey,
            with_genres: genreId,     
          });
          const tvShows = await GetContent("discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US&page=1", {
            api_key: apiKey,
            with_genres: genreId,     
          });
          setAllMovies(movies);
          setAllShows(tvShows);       
        } 
      } catch (error) {
        console.error("Error fetching content", error);
      }
    };

    fetchData();
  }, [selectedMediaType, selectedSortBy, selectedGenre]);


  return (
    <div>
       <ButtonGroup onSelectMediaType={setSelectedMediaType} onSelectSortBy={setSelectedSortBy} onSelectGenre={setSelectedGenre} />
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
