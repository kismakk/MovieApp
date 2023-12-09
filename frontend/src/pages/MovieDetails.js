import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DetailsContainer from '../components/Detail/Detail';
import ReviewBox from '../components/Detail/ReviewBox';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [userReview, setUserReview] = useState("");
  const [reviews, setReviews] = useState([]);

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
    setReviews(["Excellent movie!", "Could be better."]);
  }, [movieId]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviews((prevReviews) => [...prevReviews, userReview]);
    setUserReview("");
  };

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
  } = movieDetails;

  const backgroundImageStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w500${backdrop_path || poster_path})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '100vh',
    opacity: '0.7',
    overflow: 'hidden',
    filter: 'blur(7px)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: '-5',
  };

  return (
    <div className="container">
      <div style={backgroundImageStyle} />
      <div className="content">
        <main style={{ background: '#21242770', height: '100vh' }}>
          <DetailsContainer>
            <h1>{title}</h1>
            <div className="numbers">
              <p>{runtime} min</p>
              <p>{release_date.slice(0, 4)}</p>
              <p>{vote_average} IMDb</p>
            </div>
            <h2>Genres</h2>
            <div className="genres">
              {genres.map((genre) => (
                <p key={genre.id} className="genre">
                  {genre.name}
                </p>
              ))}
            </div>
            <div className="overview-container">
              <h2>Overview</h2>
              <p>{overview}</p>
            </div>
          </DetailsContainer>
        </main>
        <div className="side-section">
          <h2>Reviews</h2>
          <ReviewBox reviews={reviews} />
          <form onSubmit={handleReviewSubmit}>
            <label>
              Your Review:
              <textarea
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
              />
            </label>
            <button type="submit">Submit Review</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;