import styled from 'styled-components';
import '@fontsource/montserrat';
import '@fontsource/oswald';

const DetailsContainer = styled.div`
  body {
    margin: 0;
    padding: 0;
  }
  .side-section {
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 1rem;
    flex: 1;
  }
  h1 {
    font-size: 75px;
    font-family: Oswald;
    text-align: left;
    color: #f3f3e7;
    text-shadow: 2px 2px #212427;
  }
  h2 {
    font-size: 32px;
    font-family: Oswald;
    text-align: left;
    color: #f3f3e7;
    text-shadow: 1px 1px #21242750;
  }
  h3 {
    font-size: 24px;
    font-family: Oswald;
    text-align: left;
    color: #f3f3e7;
  }
  p {
    font-size: 18px;
    font-family: Montserrat;
    text-align: left;
    color: #f3f3e7;
  }
  button {
    font-family: Montserrat;
  }

  .mediaTitle {
    font-size: 18px;
    text-align: center;
    color: #f3f3e7;
    margin: 0;
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
  }

  .backdrop {
    background-image: url(${(props) => props.backdropPath});
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
  }
  .numbers {
    max-width: 300px;
    display: flex;
    justify-content: space-between;
  }
  .genres {
    max-width: 500px;
    display: flex;
    justify-content: flex-start;
  }
  .genre {
    color: #fff;
    backdrop-filter: blur(20px);
    background-color: #21242770;
    border-radius: 12px;
    margin-bottom: 5px;
    margin-right: 20px;
    padding: 5px 10px;
  }
  .overview-container {
    border-radius: 12px;
    padding: 0px 0px 3px 20px;
    max-width: 50rem;
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

export default DetailsContainer;
