import React from "react";
import styled from "styled-components";

const ReviewBoxContainer = styled.div`
  background: #fff;
  margin: 0;
  padding: 20px;
  min-height: 100px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ReviewList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ReviewItem = styled.li`
  margin-bottom: 10px;
`;

const ReviewBox = ({ reviews }) => {
  return (
    <ReviewBoxContainer>
      <h2>Reviews</h2>
      <ReviewList>
        {reviews.map((review, index) => (
          <ReviewItem key={index}>{review}</ReviewItem>
        ))}
      </ReviewList>
      {/* Additional components for creating new reviews can be added here */}
    </ReviewBoxContainer>
  );
};

export default ReviewBox;
