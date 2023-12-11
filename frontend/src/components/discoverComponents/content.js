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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDisplayCount, setTotalDisplayCount] = useState(15);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.REACT_APP_TMDB_API_KEY;
        const params = { api_key: apiKey, page: currentPage };

        if (selectedSortBy === "Sort By") {
          const movies = await GetContent("discover/movie", params);
          const tvShows = await GetContent("discover/tv", params);

          setAllMovies((prevMovies) => [...prevMovies, ...movies]);
          setAllShows((prevShows) => [...prevShows, ...tvShows]);
        } else if (selectedSortBy === "Popular"){
          const movies = await GetContent("movie/popular?language=en-US", {
            api_key: apiKey,
          });
          const tvShows = await GetContent("tv/popular?language=en-US", {
            api_key: apiKey,
          });
          setAllMovies((prevMovies) => [...prevMovies, ...movies]);
          setAllShows((prevShows) => [...prevShows, ...tvShows]);
        } else if (selectedSortBy === "Now Playing") {
          const movies = await GetContent("movie/now_playing?language=en-US", {
            api_key: apiKey,            
          });
          const tvShows = await GetContent("tv/on_the_air?language=en-US", {
            api_key: apiKey,            
          });
          setAllMovies((prevMovies) => [...prevMovies, ...movies]);
          setAllShows((prevShows) => [...prevShows, ...tvShows]);
        }
        else if (selectedSortBy === "Top Rated") {
            const movies = await GetContent("movie/top_rated?language=en-US", {
            api_key: apiKey,            
          });
          
          const tvShows = await GetContent("tv/top_rated?language=en-US", {
            api_key: apiKey,            
          });
          setAllMovies((prevMovies) => [...prevMovies, ...movies]);
          setAllShows((prevShows) => [...prevShows, ...tvShows]);
        } if (selectedGenre === "Animation") {
          const genreId = genreNameToId("Animation");
          const movies = await GetContent("discover/movie?include_adult=true&include_video=false&language=en-US", {
            api_key: apiKey,
            with_genres: genreId,     
          });
          const tvShows = await GetContent("discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US", {
            api_key: apiKey,
            with_genres: genreId,     
          });
          setAllMovies((prevMovies) => [...prevMovies, ...movies]);
          setAllShows((prevShows) => [...prevShows, ...tvShows]);
        }  else if (selectedGenre === "Comedy") {
          const genreId = genreNameToId("Comedy");
          const movies = await GetContent("discover/movie?include_adult=true&include_video=false&language=en-US", {
            api_key: apiKey,
            with_genres: genreId,     
          });
          const tvShows = await GetContent("discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US", {
            api_key: apiKey,
            with_genres: genreId,     
          });
          setAllMovies((prevMovies) => [...prevMovies, ...movies]);
          setAllShows((prevShows) => [...prevShows, ...tvShows]);        
        } else if (selectedGenre === "Crime") {
          const genreId = genreNameToId("Crime");
          const movies = await GetContent("discover/movie?include_adult=true&include_video=false&language=en-US", {
            api_key: apiKey,
            with_genres: genreId,     
          });
          const tvShows = await GetContent("discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US", {
            api_key: apiKey,
            with_genres: genreId,     
          });
          setAllMovies((prevMovies) => [...prevMovies, ...movies]);
          setAllShows((prevShows) => [...prevShows, ...tvShows]);         
        }  else if (selectedGenre === "Drama") {
          const genreId = genreNameToId("Drama");
          const movies = await GetContent("discover/movie?include_adult=true&include_video=false&language=en-US", {
            api_key: apiKey,
            with_genres: genreId,     
          });
          const tvShows = await GetContent("discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US", {
            api_key: apiKey,
            with_genres: genreId,     
          });
          setAllMovies((prevMovies) => [...prevMovies, ...movies]);
          setAllShows((prevShows) => [...prevShows, ...tvShows]);        
        } else if (selectedGenre === "Family") {
          const genreId = genreNameToId("Family");
          const movies = await GetContent("discover/movie?include_adult=true&include_video=false&language=en-US", {
            api_key: apiKey,
            with_genres: genreId,     
          });
          const tvShows = await GetContent("discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US", {
            api_key: apiKey,
            with_genres: genreId,     
          });
          setAllMovies((prevMovies) => [...prevMovies, ...movies]);
          setAllShows((prevShows) => [...prevShows, ...tvShows]);         
        } 
      } catch (error) {
        console.error("Error fetching content", error);
      }
    };

    fetchData();
  }, [selectedMediaType, selectedSortBy, selectedGenre, currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setTotalDisplayCount((prevDisplayCount) => prevDisplayCount + 15);
  };

  return (
    <div>
       <ButtonGroup onSelectMediaType={setSelectedMediaType} onSelectSortBy={setSelectedSortBy} onSelectGenre={setSelectedGenre} />
      <Grid>
        {selectedMediaType === "All" && (
          <>
            <MediaList media={allMovies} mediaType="movies" displayCount={totalDisplayCount} />
            <MediaList media={allShows} mediaType="series" displayCount={totalDisplayCount} />
          </>
        )}
        {selectedMediaType === "Movies" && (
          <MediaList media={allMovies} mediaType="movies" displayCount={totalDisplayCount} />
        )}
        {selectedMediaType === "Shows" && (
          <MediaList media={allShows} mediaType="series" displayCount={totalDisplayCount} />
        )}
        <LoadMoreButton onClick={handleLoadMore}>Load More</LoadMoreButton>
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
const LoadMoreButton = styled.button`
  margin-top: 20px;
  background-color: #1F2626;
  border: none;
  border-radius: 8px;
  color: #F3F3E7;
  font-family: Montserrat;
  font-size: 18px;
  padding: 10px;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  align-self: center;
  margin-bottom: 20px;
  margin-left: 40%;
`;
export default ImageGrid;
