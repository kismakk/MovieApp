import React from "react";
import styled from "styled-components";

const InfoBoard = () => {
  return (
    <InfoBox>
      <h2>Tämmönen leffa tänään</h2>
    </InfoBox>
  );
};

const InfoBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 50%;
  margin: 0 auto;
`;


export default InfoBoard;