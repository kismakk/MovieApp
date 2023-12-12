import styled from 'styled-components';
import '@fontsource/montserrat';
import '@fontsource/oswald';

const DetailsContainer = styled.div`
.description {
    color: #fff;
    backdrop-filter: blur(5px);
    background-color: #21242770;
    border-radius: 12px;
    padding: 0px 20px 20px 20px;
    margin-bottom: 20px;
    max-width: 50rem;
  }
  button {
    font-family: Montserrat;
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
    color: #F6F6F6;
    backdrop-filter: blur(20px);
    background-color: #21242770;
    border-radius: 12px;
    margin-bottom: 5px;
    margin-right: 20px;
    padding: 5px 10px;
  }
  
  .overview-container {
    border-radius: 12px;
    padding: 0px 0px 3px 0px;
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
