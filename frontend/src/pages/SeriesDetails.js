import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SeriesDetails = () => {
  const { seriesId } = useParams();
  const [seriesDetails, setSeriesDetails] = useState(null);

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;

        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${tmdbApiKey}`
        );

        setSeriesDetails(response.data);
      } catch (error) {
        console.error('Error fetching series details:', error);
      }
    };

    fetchSeriesDetails();
  }, [seriesId]);

  if (!seriesDetails) {
    return <div>Loading...</div>;
  }

  const {
    name,
    backdrop_path,
    poster_path,
    episode_run_time,
    first_air_date,
    vote_average,
    genres,
    overview,
    credits,
  } = seriesDetails;

  return (
    <div>
      <h1>{name}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${backdrop_path || poster_path}`} alt={name} />
      <p>{episode_run_time[0]} min</p>
      <p>First Air Date: {first_air_date}</p>
      <p>IMDb Rating: {vote_average}</p>
      <p>Genres: {genres.map((genre) => genre.name).join(', ')}</p>
      <p>Description: {overview}</p>
    </div>
  );
};

export default SeriesDetails;
