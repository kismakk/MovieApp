import React, { useEffect, useState } from "react";
import styled from "styled-components";
import '@fontsource/montserrat';
import '@fontsource/oswald';
import { VscAccount } from "react-icons/vsc";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import axios from "axios";

const backendurl = process.env.REACT_APP_BACKENDURL;

const ReviewBoxContainer = styled.div`
  margin-right: 10px;
  background: #21242795;
  height: 100%;
  width: 100%;
  margin-top: 30px;
  padding: 0px 30px 0px 20px;
  max-width: 410px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ReviewList = styled.ul`
  margin-right: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  max-height: 400px;
`;

const ReviewItem = styled.li`
  border-radius: 5px;
  display: flex;
  font-size: 18px;
  font-family: Montserrat;
  color: #F3F3E7;
  margin-bottom: 20px;
  padding: 0 15px;
  max-width: 410px;
  overflow-wrap: break-word;
  background: #F6F6F620;
`;

const ReviewForm = styled.form`
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 0px 0px 0px;
  margin-top: 0px;
  border-top: 1px solid #F6F6F650;
`;

const Username = styled.p`
  font-size: 14px;
  color: #f6f6f680;
  &::before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #f6f6f680;
    margin-right: 10px;
  }
`;

const TextArea = styled.textarea`
  background: #12121290;
  border-radius: 8px;
  width: 410px;
  height: 100px;
  padding: 8px;
  border: none;
  margin-bottom: 10px;
  font-size: 15px;
  font-family: Montserrat;
  color: #F6F6F690;
  resize: none;
`;

const SubmitButton = styled.button`
  background-color: #45575C;
  color: #F6F6F6;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const ReviewTop = styled.div`
  display: flex;
  align-items: center;
`;

const CommentAmount = styled.span`
  color: #F6F6F6;
  font-family: Montserrat;
  background-color: #12121295;
  border-radius: 12px;
  margin-top: 13px;
  margin-left: 20px;
  padding: 5px 20px;
`;

const SortBy = styled.div`
display: flex;
  align-items: center;
  p {
    color: #F6F6F6;
    font-size: 16px;
    font-family: Montserrat;
    margin-right: 10px;
  }

  select {
    background-color: #12121200;
    color: #F6F6F6;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }

  select::-ms-expand {
    display: none;
  }
  select option {
    background-color: #45575C;
    color: #F6F6F6;
    border: none;
  }
`;

const ReviewBox = ({ movieId, seriesId }) => {
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState("");
  const [sortBy, setSortBy] = useState("new");

  useEffect(() => {
    fetchReviews();
  }, [sortBy, movieId, seriesId]);

  const fetchReviews = () => {
    let url = '';
    if (seriesId) {
      switch (sortBy) {
        case 'oldest':
          url = `${backendurl}/reviews/sortByTimeOld?seriesId=${seriesId}`;
          break;
        case 'top':
          url = `${backendurl}/reviews/sortByScore?seriesId=${seriesId}`;
          break;
        default:
          url = `${backendurl}/reviews/sortByTimeNew?seriesId=${seriesId}`;
          break;
      }
    } else {
      switch (sortBy) {
        case 'oldest':
          url = `${backendurl}/reviews/sortByTimeOld?movieId=${movieId}`;
          break;
        case 'top':
          url = `${backendurl}/reviews/sortByScore?movieId=${movieId}`;
          break;
        default:
          url = `${backendurl}/reviews/sortByTimeNew?movieId=${movieId}`;
          break;
      }
    }
    axios.get(url)
      .then((res) => {
        setReviews(res.data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const data = {
      movieId,
      seriesId,
      review: userReview,
    }

    axios.post(`${backendurl}/reviews`, data, { withCredentials: true })
      .then(() => {
        setUserReview('');
        fetchReviews();
      })
      .catch((err) => {
        console.error(err);
      }); 
  };

  const handleHeartClick = (reviewId, reviewRating) => {
    const data = {
      reviewId,
      rating: reviewRating + 1
    }

    axios.put(`${backendurl}/reviews/upvote`, data, { withCredentials: true })
      .then(() => {
        fetchReviews()
      })
      .catch((err) => {
        console.error(err);
      }); 
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <ReviewBoxContainer>
      <ReviewTop>
        <h2>Reviews</h2>
        <CommentAmount>{reviews.length}</CommentAmount>
      </ReviewTop>
      <SortBy>
        <p>Sort By:</p>
        <select value={sortBy} onChange={handleSortByChange}>
          <option value="new">New</option>
          <option value="oldest">Old</option>
          <option value="top">Top</option>
        </select>
      </SortBy>
      <ReviewList>
        {reviews.map((review) => (
          <ReviewItem key={review.id_users}>
            <div className="comment">
              <Username>{review.username}</Username>
              <p>{review.reviews}</p>
              <LikeContainer>
                <FavButton onClick={() => handleHeartClick(review.id_reviews, review.ratings)} >
                  <IoMdHeart />
                </FavButton>
                <p>{review.ratings}</p>
              </LikeContainer>
            </div>
          </ReviewItem>
        ))}
      </ReviewList>
      <ReviewForm onSubmit={handleReviewSubmit}>
        <TextArea
          value={userReview}
          onChange={(e) => setUserReview(e.target.value)}
          rows="4"
          placeholder="Write Your Review..."
        />
        <SubmitButton type="submit" disabled={!userReview.trim()}>
          Add Review
        </SubmitButton>
      </ReviewForm>
    </ReviewBoxContainer>
  );
};

const FavButton = styled.button`
  background-color: #12121200;
  border: none;
  color: #F3F3E7;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.4s ease;

  &:hover {
    transform: scale(1.4);
  }
`;

const LikeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export default ReviewBox;
