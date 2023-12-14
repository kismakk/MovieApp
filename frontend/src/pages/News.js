import Global from '../components/global/styles/global';
import React, { useEffect, useState } from 'react';
import NewsList from '../components/News/NewsList';
import XMLParser from 'react-xml-parser';
import Header from '../components/global/Header';
import NavBar from '../components/global/NavBar';
import styled from "styled-components";
import axios from 'axios';

function News() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://www.finnkino.fi/xml/News/?area=1018');
        const xmlText = await response.text();
        const xml = new XMLParser().parseFromString(xmlText);

        const newsArray = xml.getElementsByTagName('NewsArticle').map((article) => ({
          title: article.getElementsByTagName('Title')[0].value,
          htmlLead: article.getElementsByTagName('HTMLLead')[0].value,
          imageURL: article.getElementsByTagName('ImageURL')[0].value,
          articleURL: article.getElementsByTagName('ArticleURL')[0].value,
        }));

        setNewsList(newsArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching News:', error);
        setError('An error occurred while fetching News.');
        setLoading(false);
      }
    };

    const fetchUserGroups = async () => {
      try {
        // Fetch User Groups data
        const response = await axios.get('http://localhost:3001/groups/mygroups', { withCredentials: true });
        setUserGroups(response.data.Groups);
      } catch (error) {
        console.error('Error fetching user groups:', error);
        // Handle error as needed
      }
    };

    fetchNews();
    fetchUserGroups();
  }, []);


  return (
    <div className="Container">
      <Global />
      <Header />
      <div className="content">
        <nav>
          <NavBar />
        </nav>
        <main>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <NewsList newsList={newsList} userGroups={userGroups} />)}
        </main>
      </div>
    </div>
  );
}

export default News;
