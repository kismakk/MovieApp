import React, { useState, useEffect } from 'react';
import Header from '../components/global/Header';
import Global from '../components/global/styles/global';
import NavBar from '../components/global/NavBar';
import MediaList from '../components/global/MediaList';
import XMLParser from 'react-xml-parser';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const NewsItem = styled.div`
  background-color: #f5f5f540;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 200px;
  width: 90%;
`;

const Image = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 1;
  const [visibleNewsCount, setVisibleNewsCount] = useState(itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;

        // Fetch popular movies
        const moviesResponse = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&sort_by=popularity.desc`);
        const moviesData = await moviesResponse.json();
        setPopularMovies(moviesData.results);

        // Fetch popular series
        const seriesResponse = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${tmdbApiKey}&sort_by=popularity.desc`);
        const seriesData = await seriesResponse.json();
        setPopularSeries(seriesData.results);

        // Fetch news
        const newsResponse = await fetch('https://www.finnkino.fi/xml/News/?area=1018');
        const newsXmlText = await newsResponse.text();
        const newsXml = new XMLParser().parseFromString(newsXmlText);

        const newsArray = newsXml.getElementsByTagName('NewsArticle').map((article) => {
          return {
            title: article.getElementsByTagName('Title')[0].value,
            htmlLead: article.getElementsByTagName('HTMLLead')[0].value,
            imageURL: article.getElementsByTagName('ImageURL')[0].value,
            articleURL: article.getElementsByTagName('ArticleURL')[0].value,
          };
        });

        setNewsList(newsArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <Global />
      <div className="header">
        <Header />
      </div>
      <div className="content">
        <nav>
          <NavBar />
        </nav>
        <main>
          <div className='sectionHeader'>
            <h2>Popular Movies</h2>
            <Link to="/movies">See All</Link>
          </div>
          <MediaList media={popularMovies} mediaType="movies" displayCount={5} />
          <h2>Popular Series</h2>
          <MediaList media={popularSeries} mediaType="series" displayCount={5} />
        </main>
        <div className="side-section">
          <h2>News</h2>
          <NewsContainer>
            {newsList &&
              newsList.slice(0, visibleNewsCount).map((news, index) => (
                <NewsItem key={index}>
                  <Image src={news.imageURL} alt={`News Thumbnail ${index}`} />
                  <Content>
                    <a href={news.articleURL} target="_blank" rel="noopener noreferrer">
                      <h2>{news.title}</h2>
                    </a>
                    <p>{news.htmlLead}</p>
                  </Content>
                </NewsItem>
              ))}
          </NewsContainer>
        </div>
      </div>
    </div>
  );
}

export default Home;