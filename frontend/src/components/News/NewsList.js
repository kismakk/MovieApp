// Components/NewsList.js
import React, { useState } from 'react';
import styled from 'styled-components';

const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const NewsItem = styled.div`
  background-color: #f5f5f540;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 200px;
  width: 90%;

  @media (min-width: 850px) {
    flex-direction: row;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: cover;

  @media (min-width: 850px) {
    max-width: 50%;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px; /* Add padding for better readability */
`;

const SeeMoreButton = styled.button`
  margin-top: 20px;
`;

const NewsList = ({ newsList }) => {
  const itemsPerPage = 10;
  const [visibleNewsCount, setVisibleNewsCount] = useState(itemsPerPage);

  const showMore = () => {
    setVisibleNewsCount((prevCount) => prevCount + itemsPerPage);
  };

  return (
    <main>
      <NewsContainer>
        {newsList &&
          newsList.slice(0, visibleNewsCount).map((news, index) => (
            <NewsItem key={index}>
              <Image src={news.imageURL} alt={`News Thumbnail ${index}`} />
              <Content>
                <a href={news.articleURL} target="_blank" rel="noopener noreferrer">
                  <h2>{news.title}</h2>
                </a>
                <p>{news.htmlLead}</p>
              </Content>
            </NewsItem>
          ))}
        {visibleNewsCount < newsList.length && (
          <SeeMoreButton onClick={showMore}>See More</SeeMoreButton>
        )}
      </NewsContainer>
    </main>
  );
};

export default NewsList;
