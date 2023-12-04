import React, { useState, useEffect } from 'react';
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
        const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;

        // Fetch popular movies
        const moviesResponse = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&sort_by=popularity.desc`);
        const moviesData = await moviesResponse.json();
        setPopularMovies(moviesData.results);

        // Fetch popular series
        const seriesResponse = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${tmdbApiKey}&sort_by=popularity.desc`);
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
        </main>
        <div className="side-section">
          <h1>News</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
