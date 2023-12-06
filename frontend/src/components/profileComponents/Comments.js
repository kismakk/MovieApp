import React from 'react';
import styled from 'styled-components';

const Comments = () => {
  const comments = [
    { id: 1, movie: 'Movie 1', text: 'THIS MOVIE WAS BUSSIN:DD asdasdasdasdadsadsadasdsa' },
    { id: 2, movie: 'Movie 2', text: 'YOOOOO PLEASE SUBSCRIBE' },
    { id: 3, movie: 'Movie 3', text: 'Actually the movie was a bit boring. I would not recommend this to anyone lmao' },
    { id: 4, movie: 'Movie 4', text: 'Actually the movie was a bit boring. I would not recommend this to anyone lmao' },
    { id: 5, movie: 'Movie 5', text: 'Actually the movie was a bit boring. I would not recommend this to anyone lmao hahahahaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
    { id: 6, movie: 'Movie 6', text: 'Actually the movie was a bit boring. I would not recommend this to anyone lmao' },
    { id: 7, movie: 'Movie 7', text: 'Actually the movie was a bit boring. I would not recommend this to anyone lmao test 123123213213123123112321' },
  ];
  const amountOfComments = comments.length

  return (
    <>
    <CommentContainer>
      <CommentAmount>
            <Section>Comments</Section>
            <Number>{amountOfComments}</Number>
        </CommentAmount>
        <CommentHistory>
          {comments.map((comment) => (
            <Comment key={comment.id}>
              <MovieName>{comment.movie}</MovieName>
              <CommentText>{comment.text}</CommentText>
            </Comment>
          ))}
        </CommentHistory>
    </CommentContainer>
      
    </>
  );
};
const CommentContainer = styled.div`
    && {
      padding: 1rem;
      margin-right: 10rem;
      margin-top: 5rem; 
      text-align: left;
      align-items: left;
      display: flex;
      flex-direction: column;

      @media (max-width: 901px) {
        align-items: center;
      }
    }

`;

const CommentHistory = styled.div`
  max-height: 500px;
  overflow-y: auto
`;

const Section = styled.h2`

`;

const Comment = styled.div`

`;

const MovieName = styled.h3`

`;

const CommentText = styled.p`

`;

const CommentAmount = styled.h3`
    display: flex;
    align-items: center;
`;
const Number = styled.h3`
    margin-left: 1rem;
    padding: 0.5rem;
    border: 1px solid grey; 
    border-radius: 20px;
    display: inline-block; 
    `;
export default Comments;
