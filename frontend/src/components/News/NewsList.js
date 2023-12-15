import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '@fontsource/montserrat';
import { useLogin } from '../contexts/LoginContext'

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

const Article = styled.div`
display: flex;
flex: 1;`;

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

const SortBy = styled.div`
margin-top: 15px;
margin-right: 15px;
p {
  color: #F6F6F6;
  font-size: 16px;
  font-family: Montserrat;
}

select {
  background-color: #12121200;
  color: #F6F6F6;
  border: none;
  border-radius: 2px;
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

const NewsList = ({ newsList, userGroups }) => {
  const itemsPerPage = 10;
  const [visibleNewsCount, setVisibleNewsCount] = useState(itemsPerPage);
  const [sortBy, setSortBy] = useState("Group");
  const { isLoggedIn } = useLogin();
  const [selectedGroups, setSelectedGroups] = useState({});

  const showMore = () => {
    setVisibleNewsCount((prevCount) => prevCount + itemsPerPage);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleGroupChange = (e, index) => {
    setSelectedGroups((prevSelectedGroups) => ({
      ...prevSelectedGroups,
      [index]: e.target.value,
    }));
  };

  if (!userGroups) {
    return (
      <main>
        <NewsContainer>
          {newsList &&
            newsList.slice(0, visibleNewsCount).map((news, index) => (
              <NewsItem key={index}>
                <Image src={news.imageURL} alt={`News Thumbnail ${index}`} />
                <Article>
                  <Content>
                    <a href={news.articleURL} target="_blank" rel="noopener noreferrer">
                      <h2>{news.title}</h2>
                    </a>
                    <p>{news.htmlLead}</p>
                  </Content>
                </Article>
              </NewsItem>
            ))}
          {visibleNewsCount < newsList.length && (
            <SeeMoreButton onClick={showMore}>See More</SeeMoreButton>
          )}
        </NewsContainer>
      </main>
    );
  }

  return (
    <main>
      <NewsContainer>
        {newsList &&
          newsList.slice(0, visibleNewsCount).map((news, index) => (
            <NewsItem key={index}>
              <Image src={news.imageURL} alt={`News Thumbnail ${index}`} />
              <Article>
                <Content>
                  <a href={news.articleURL} target="_blank" rel="noopener noreferrer">
                    <h2>{news.title}</h2>
                  </a>
                  <p>{news.htmlLead}</p>
                </Content>
                {isLoggedIn && ( /*Only visible if user is logged in */
                  <>
                    <SortBy>
                      <select
                        value={selectedGroups[index] || ''}
                        onChange={(e) => handleGroupChange(e, index)}
                      >
                        {isLoggedIn && (
                          <option value="Share">Share</option>
                        )}
                        {userGroups.length !== 0 && userGroups.map((group) => (
                          <option key={group.id_groups} value={group.groups_name}>
                            {group.groups_name}
                          </option>
                        ))}
                      </select>
                    </SortBy>
                  </>
                )}
              </Article>
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