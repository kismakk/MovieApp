import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/global/Header';
import Global from '../components/global/styles/global';
import NavBar from '../components/global/NavBar';
import MediaList from '../components/global/MediaList';

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesResponse = await fetch('http://localhost:3001/media/popular-movies');
        const moviesData = await moviesResponse.json();
        setPopularMovies(moviesData.results);

        // Fetch popular series
        const seriesResponse = await fetch('http://localhost:3001/media/popular-series');
        const seriesData = await seriesResponse.json();
        setPopularSeries(seriesData.results);

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
          {/* Side navigation */}
          <NavBar />
        </nav>
        <main>
          <div className='sectionHeader'>
            <h2>Popular Movies</h2>
            <p>See All</p>
          </div>
          <MediaList media={popularMovies} />
          <h2>Popular Series</h2>
          <MediaList media={popularSeries} />
          {/* Additional main content if needed */}
        </main>
        <div className="side-section">
          {/* Article content */}
          <h1>Article</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
