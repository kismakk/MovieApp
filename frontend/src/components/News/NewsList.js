import React, { useState } from 'react';
import styled from 'styled-components';

const NewsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const NewsItem = styled.div`
  background-color: #45575C;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 200px;
  max-width: 100vh;
  width: 90%;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: cover;

  @media (min-width: 900px) {
    max-height: 50%;
    object-fit: cover;
    max-width: 40%;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const SeeMoreButton = styled.button`
  margin-top: 20px;
  background-color: #1F2626;
  border: none;
  border-radius: 8px;
  color: #F3F3E7;
  font-family: Montserrat;
  font-size: 18px;
  padding: 10px;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  align-self: center;
  margin-bottom: 20px;

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
