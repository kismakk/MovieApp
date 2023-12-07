import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GetContent } from "./contentApi";
import MediaList from "../global/MediaList";


const ImageGrid = () => {
  const [allContent, setContentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.REACT_APP_TMDB_API_KEY;
        const params = {api_key: apiKey}

          const movies = await GetContent('movie', params);
          const tvShows = await GetContent('tv', params);

          const allContent = [...movies, ...tvShows];
          setContentData(allContent)
        console.log(allContent);
      } catch (error) {
        console.error('Error fetching content', error);
      }
    };
    fetchData();
  }, []);

  return (
      <MediaList media={allContent} displayCount={30} />
  );
};


export default ImageGrid;
