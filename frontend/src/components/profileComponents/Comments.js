import React from 'react';
import styled from 'styled-components';

const Comments = () => {
  const comments = [
    { id: 1, movie: 'Movie 1', text: 'Comment 1' },
    { id: 2, movie: 'Movie 2', text: 'Comment 2' },
    { id: 3, movie: 'Movie 3', text: 'Comment 3' },
    // Add more comments with associated movies
  ];
  const amountOfComments = comments.length

  return (
    <>
    <CommentAmount>
        <Section>Comments</Section>
        <Number>{amountOfComments}</Number>
    </CommentAmount>
    <CommentsContainer>
      {comments.map((comment) => (
        <Comment key={comment.id}>
          <MovieName>{comment.movie}</MovieName>
          <CommentText>{comment.text}</CommentText>
        </Comment>
      ))}
    </CommentsContainer>
    </>
  );
};

const CommentsContainer = styled.div`
    
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
    padding: 0.5rem; /* Adjust as needed for padding around the number */
    border: 1px solid grey; /* Border styling */
    background: grey;
    border-radius: 20px;
    display: inline-block; /* Prevents block behavior, allowing it to be o
    `;
export default Comments;
