import axios from "axios";

const baseUrl = 'https://api.themoviedb.org/3/discover/';

const GetContent = async (mediaType, params) => {
  try {
    const response = await axios.get(`${baseUrl}${mediaType}`, { params });
    return response.data.results;
  } catch (error) {
    throw new Error(`Error in GetContent: ${error.message}`);
  }
};

const getImageUrl = (posterPath) => {
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  return `${baseUrl}${posterPath}`;
};

export { GetContent, getImageUrl };
