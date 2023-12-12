import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DetailsContainer from '../components/Detail/Detail';
import ReviewBox from '../components/Detail/ReviewBox';
import GlobalStyle from '../components/global/styles/global';
import styled from 'styled-components';
import { IoIosArrowBack } from "react-icons/io";

const SeriesDetails = () => {
  const { seriesId } = useParams();
  const [seriesDetails, setSeriesDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

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

    // Fetch reviews for the series
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/reviews/sortByTimeNew'/${seriesId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [seriesId]);

  const handleReviewSubmit = (userReview) => {
    setReviews((prevReviews) => [...prevReviews, userReview]);
  };


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
  } = seriesDetails;

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

  const BackButton = styled.button`
  margin: 25px 10px 0px 15px;
  background-color: #12121295;
  border: none;
  color: white;
  font-size: 25px;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`;

  return (
    <div className="container">
      <GlobalStyle />
      <DetailsContainer />
      <div style={backgroundImageStyle} />
      <div className="content">
        <div className="back-button">
          <BackButton onClick={() => navigate(-1)}>
            <IoIosArrowBack />
          </BackButton>
        </div>
        <main>
          <DetailsContainer>
            <div className="description">
              <h1>{name}</h1>
              <div className="numbers">
                <p>{episode_run_time[0]} min</p>
                <p>Since:</p>
                <p>{first_air_date}</p>
                <p>{vote_average}IMDb</p>
              </div>
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
            </div>
          </DetailsContainer>
        </main>
        <div className="side-section">
          <div className='review'>
            <ReviewBox reviews={reviews} onReviewSubmit={handleReviewSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetails;
