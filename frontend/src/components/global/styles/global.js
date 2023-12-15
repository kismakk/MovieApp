import { createGlobalStyle } from 'styled-components';
import '@fontsource/montserrat';
import '@fontsource/oswald';

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(to right, #14333D, #1F2626);
    margin: 0;
    padding: 0;
    margin-bottom: 100px;
  }
  .sectionHeader {
    display: flex;
    justify-content: space-between;
  }
  
  h1 {
    font-size: 75px;
    font-family: Oswald;
    text-align: left;
    color: #EEF1DC;
    text-shadow: 2px 2px #212427;
  }
  h2 {
    font-size: 32px;
    font-family: Oswald;
    text-align: left;
    color: #F3F3E7;
    text-shadow: 1px 1px #21242750;
  }
  h3 {
    font-size: 24px;
    font-family: Oswald;
    text-align: left;
    color: #EEF1DC;
  }
  p {
    font-size: 18px;
    font-family: Montserrat;
    text-align: left;
    color: #F3F3E7;
  }
  button {
    font-family: Montserrat;
  }
  
  .mediaTitle {
    font-size: 18px;
    text-align: center;
    color: #F3F3E7;
    margin: 0;
  }
  a {
    color: #CBCCAF;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  main {
    flex: 2;
    max-width: 100%;
  }
  .container {
    display: flex;
    flex-direction: column;
  }

  .content {
    display: flex;
    flex-direction: column;
    height: 100%;

    @media (min-width: 500px) {
      flex-direction: column;
    }
  }

  nav {
    height: auto;
    z-index: 2;
  }

  .side-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    max-width: 100%;
  }

  @media (min-width: 951px) {
    .content {
      flex-direction: row;
    }
  }
  @media (max-width: 950px) {
    /* Media query for smaller screens */
    h1 {
      font-size: 48px; 
    }
    h2 {
      font-size: 24px;
    }
    p {
      font-size: 18px;
    }
  }
`;

export default GlobalStyle;
