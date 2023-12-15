import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
let url = ''
const Comments = (props) => {
  let idBy
  if(props === null) {
    let idBy = ''
  }
  const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;
  const [comments, setComments] = useState([]);
  const [sortingOption, setSortingOption] = useState('newest');
  const amountOfComments = comments.length;
  const {username}  = useParams();
  const handleSortingChange = (event) => {
    setSortingOption(event.target.value);
  }
  useEffect(() =>  {
    const dataBaseLink = 'http://localhost:3001/'
    switch (sortingOption) {
      case 'oldest':
        url = dataBaseLink+'reviews/sortByTimeOldUser/'+props.userId || idBy
        break;
      case 'mostRated':
        url = dataBaseLink+'reviews/sortByScoreUser/'+props.userId || idBy
        break;
      case 'leastRated':
        url = dataBaseLink+'reviews/sortByScoreLeastUser/'+props.userId || idBy
        break;
      default: 
        url = dataBaseLink+'reviews/sortByTimeNewUser/'+props.userId || idBy
        break;
    }
    axios.get(url, { withCredentials: true })
      .then((res) => {
        const commentPromises = res.data.review.map(comment => {
          const id = comment.id_movies || comment.id_series;
          const mediaType = comment.id_movies ? 'movie' : 'tv';
          return axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${tmdbApiKey}`);
        });
        return Promise.all(commentPromises)
          .then(commentDetails => {
            const updatedComments = res.data.review.map((comment, index) => {
              return {
                ...comment,
                mediaType: comment.id_movies ? 'movies' : 'series',
                mediaDetails: commentDetails[index].data
              };
            });
            setComments(updatedComments);
          });
      })
      .catch((error) => {
        console.log(error);
      });
      
},[sortingOption, props.userId]);

const handleDelete = async (commentId) => {
  try {
    await axios.delete(`http://localhost:3001/reviews/`, { data: { reviewId: commentId }, withCredentials: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
  try {
    axios.get(url, { withCredentials: true })
      .then((res) => {
        const commentPromises = res.data.review.map(comment => {
          const id = comment.id_movies || comment.id_series;
          const mediaType = comment.id_movies ? 'movie' : 'tv';
          return axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${tmdbApiKey}`);
        });
        return Promise.all(commentPromises)
          .then(commentDetails => {
            const updatedComments = res.data.review.map((comment, index) => {
              return {
                ...comment,
                mediaType: comment.id_movies ? 'movies' : 'series',
                mediaDetails: commentDetails[index].data
              };
            });
            setComments(updatedComments);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
};

  return (
    <>
    <SideSectionContainer className="side-section">
      <CommentContainer>
        <CommentAmount>
          <Section>Reviews</Section>
          <Number>{amountOfComments}</Number>
          <SortingSelect value={sortingOption} onChange={handleSortingChange}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="mostRated">Most Rated</option>
            <option value="leastRated">Least Rated</option>
          </SortingSelect>
        </CommentAmount>
        <CommentHistory>
          {comments.map((comment) => (
            <Comment key={comment.id} to={`/${comment.mediaType}/${comment.id_series || comment.id_movies}`}>
                {!username && (<DeleteButton onClick={(e) => { e.preventDefault(); handleDelete(comment.id_reviews); }}>Delete</DeleteButton> )}
              {comment.mediaDetails && comment.mediaDetails.poster_path && (
                <Image src={`https://image.tmdb.org/t/p/w500${comment.mediaDetails.poster_path}`}
                  alt={comment.mediaDetails.name}
                />
              )}
               <MovieName>{comment.mediaDetails ? comment.mediaDetails.title || comment.mediaDetails.name : ''}
                  <CommentText>{comment.reviews}</CommentText>
                  <RatingsContainer>
                    <Ratings><span role="img" aria-label="Review">👍</span>{comment.ratings}
                    </Ratings>
                  </RatingsContainer>
                </MovieName>
              </Comment>
            ))}
            <CommentText>{comments.length === 0 && 'No reviews, yet!'}</CommentText>
          </CommentHistory>
        </CommentContainer>
      </SideSectionContainer>
    </>
  );
};
const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  display: none;
  pointer-events: auto;
`;

const SideSectionContainer = styled.div`
  width: 100%;
  max-width: 800px; 
  margin-left: auto;

`;

const Ratings = styled.h3`
  
`;
const RatingsContainer = styled.div`
  margin-left: auto;
  box-sizing: border-box;
`;
const SortingSelect = styled.select`
  margin-left: auto; 
  margin-right: 0;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 1.5rem;
  border: none; 
  outline: none;
  background: #1F2626;
  color: #F3F3E7;
  border-radius: 12px; 
  height: 70px;
`;

const CommentContainer = styled.div`
  padding: 1rem;
  margin-top: 5rem;
  text-align: left;
  display: flex;
  flex-direction: column;

  @media (max-width: 901px) {
    align-items: center;
  }
`;

const CommentHistory = styled.div`
  max-height: 800px;
  overflow-y: auto;
`;

const Section = styled.h2``;

const Comment = styled(Link)`
  position: relative;
  display: flex;
  margin-bottom: 1rem;
  opacity: 1;

  &:hover {
    background-color: #45575C10;
    opacity: 0.5;
    cursor: pointer;
    text-decoration: none;
  }

  &:hover ${DeleteButton} {
    display: block;
  }
 
`;

const MovieName = styled.h3`
  margin-left: 1rem;
`;

const CommentText = styled.p`
  font-weight: 100;
  width: 100%;
`;

const CommentAmount = styled.div`
  display: flex;
  align-items: left;
`;

const Number = styled.h3`
  margin-left: 1rem;
  padding: 0.5rem;
  border: 1px solid grey;
  border-radius: 20px;
  display: inline-block;
`;

const Image = styled.img`
  width: 100%;
  width: 154px;
  height: 227px;
  border-radius: 12px; 
`;

export default Comments;
