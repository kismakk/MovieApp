import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;

        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbApiKey}`
        );

        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <div>Test...</div>;
  }

  const {
    title,
    backdrop_path,
    poster_path,
    runtime,
    release_date,
    vote_average,
    genres,
    overview,
    credits,
  } = movieDetails;

  return (
    <div>
      <h1>{title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${backdrop_path || poster_path}`} alt={title} />
      <p>Length: {runtime} minutes</p>
      <p>Year of Production: {release_date.slice(0, 4)}</p>
      <p>IMDb Rating: {vote_average}</p>
      <p>Genres: {genres.map((genre) => genre.name).join(', ')}</p>
      <p>Description: {overview}</p>
    </div>
  );
};

export default MovieDetails;