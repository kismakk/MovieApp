import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DetailsContainer from '../components/Detail/Detail';
import ReviewBox from '../components/Detail/ReviewBox';
import GlobalStyle from '../components/global/styles/global';
import styled from 'styled-components';
import {
  IoIosArrowBack,
  IoIosHeartEmpty,
  IoMdHeart
} from "react-icons/io";

const SeriesDetails = () => {
  const { seriesId } = useParams();
  const [seriesDetails, setSeriesDetails] = useState(null);
  const navigate = useNavigate();
  const [isHeartFilled, setHeartFilled] = useState(false);


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

  const handleHeartClick = (seriesId, name, avatar) => {
    setHeartFilled(!isHeartFilled);
    const data = {
      seriesId,
      avatar: `https://image.tmdb.org/t/p/w500${avatar}`,
      name
    };
    console.log(data);
    axios.post('http://localhost:3001/favourites/add', data, { withCredentials: true })
      .catch((err) => {
        console.error(err);
      });
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

  const FavButton = styled.button`
background-color: #12121200;
border: none;
color: #F3F3E7;
font-size: 25px;
cursor: pointer;
width: 50px;
height: 50px;
display: flex;
justify-content: center;
align-items: center;
transition: transform 0.4s ease;

&:hover {
  transform: scale(1.4);
  text-align: left;
}

&:hover::after {
  content: "${(props) => (props.isHeartFilled ? 'Remove' : 'Add')} Favorites";
  align-text: left;
  color: #F6F6F6;
  font-size: 10px;
  position: absolute;
  bottom: 30px;
  left: 45px;
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
              <Title>
                <h1>{name}</h1>
                <FavButton isHeartFilled={isHeartFilled} onClick={() => handleHeartClick(seriesId, name, poster_path)}>
                  {isHeartFilled ? <IoMdHeart /> : <IoIosHeartEmpty />}
                </FavButton>
              </Title>
              <div className="numbers">
                <p>{episode_run_time[0]} min</p>
                <p>Since: {first_air_date.slice(0, 4)}</p>
                <p>{vote_average.toFixed(2)} IMDb</p>
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
            <ReviewBox seriesId={seriesId} />
          </div>
        </div>
      </div>
    </div>
  );
};
const Title = styled.div`
margin: 30px 50px 0px 0px;
  display: flex;
  align-items: center;
`;

export default SeriesDetails;
