import React, { useState } from "react";
import styled from "styled-components";

const ReviewBoxContainer = styled.div`
margin-right: 10px;
margin-left: auto;
background: #21242795;
  height: 100%;
  width: 30em;
  margin-top: 50px;
  padding: 1px 35px 0px 20px;
  min-height: 200px;
  max-width: 450px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const ReviewList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ReviewItem = styled.li`
  margin-bottom: 25px;
`;

const ReviewForm = styled.form`
  margin-top: 200px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  color: #555;
  border-bottom: 1px solid #ddd;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 8px;
  border: none;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
  font-size: 14px;
  resize: none;
`;

const SubmitButton = styled.button`
  background-color: #45575C;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const ReviewBox = ({ reviews, onReviewSubmit }) => {
  const [userReview, setUserReview] = useState("");

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    onReviewSubmit(userReview);
    setUserReview("");
  };

  return (
    <ReviewBoxContainer>
      <h2>Reviews ({reviews.length})</h2>
      <ReviewList>
        {reviews.map((review, index) => (
          <ReviewItem key={index}>{review}</ReviewItem>
        ))}
      </ReviewList>
      <ReviewForm onSubmit={handleReviewSubmit}>
        <Label>
          <TextArea
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
            rows="4" /* Adjust the number of rows as needed */
            placeholder="Type your comment here..."
          />
        </Label>
        <SubmitButton type="submit" disabled={!userReview.trim()}>
          Add Review
        </SubmitButton>
      </ReviewForm>
    </ReviewBoxContainer>
  );
};

export default ReviewBox;