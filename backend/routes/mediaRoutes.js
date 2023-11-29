const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// TMDb API Key
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Popular movies
router.get('/popular-movies', async (req, res) => {
  try {
    const tmdbResponse = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&sort_by=popularity.desc`);
    const tmdbData = await tmdbResponse.json();
    res.json(tmdbData);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Popular TV series
router.get('/popular-series', async (req, res) => {
  try {
    const tmdbResponse = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_API_KEY}&sort_by=popularity.desc`);
    const tmdbData = await tmdbResponse.json();
    res.json(tmdbData);
  } catch (error) {
    console.error('Error fetching popular TV series:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
