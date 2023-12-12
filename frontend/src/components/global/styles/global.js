import { createGlobalStyle } from 'styled-components';
import '@fontsource/montserrat';
import '@fontsource/oswald';

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(to right, #14333D, #1F2626);
    margin: 0;
    padding: 0;
  }
  .sectionHeader {
    display: flex;
    justify-content: space-between;
  }
  
  h1 {
    font-size: 75px;
    font-family: Oswald;
    text-align: left;
    color: #F3F3E7;
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
    color: #F3F3E7;
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
    margin: 0 1rem;
    flex: 2;
  }
  .container {
    display: flex;
    flex-direction: column;
  }

  .content {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  nav {
    height: auto;
    z-index: 2;
  }

  .side-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 1rem;
    flex: 1;
  }

  @media (min-width: 901px) {
    .content {
      flex-direction: row;
    }
  }
  @media (max-width: 900px) {
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
