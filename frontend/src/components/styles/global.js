import { createGlobalStyle } from 'styled-components';
import '@fontsource/montserrat';
import '@fontsource/oswald';

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(to right, #14333D, #1F2626);
  }
  h1 {
    font-size: 75px;
    font-family: Oswald;
    text-align: center;
    color:#F3F3E7;

    h2 {
      font-size: 32px;
      text-align: center;
      color:#F3F3E7;
    }
    p {
      font-size: 25px;
      text-align: center;
      color:#F3F3E7;
    }
    a {
      color: #CBCCAF;
    }
`;

export default GlobalStyle;