import React, { useState } from "react";
import styled from "styled-components";
import ImageGrid from "./content";


const GenreButton = ({ options, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    // Your function here
  };

  return (
    <GenreButtonWrapper>
      <Button onClick={toggleList}>
        {selectedOption ? selectedOption : label}
        {isOpen && (
          <List isOpen={isOpen}>
            <ListItem onClick={() => handleOptionClick(label)}>{label}</ListItem>
            {options.map((option, index) => (
              <ListItem key={index} onClick={() => handleOptionClick(option)}>
                {option}
              </ListItem>
            ))}
          </List>
        )}
      </Button>
    </GenreButtonWrapper>
  );
};

const ButtonGroup = () => {
  const movieOptions = ["Movies", "Shows"];
  const sortByOptions = ["Newest", "Popular", "Top Rated"];
  const genreOptions = ["Adventure", "Fantasy", "Romance", "Horror", "Mystery"];

  return (
    <GridContainer>
      <ImageGrid />
      <ButtonsWrapper>
        <GenreButton options={movieOptions} label="All" />
        <GenreButton options={sortByOptions} label="Sort By" />
        <GenreButton options={genreOptions} label="Genres" />
      </ButtonsWrapper>
    </GridContainer>
  );
};

const Button = styled.button`
  padding: 1vw;
  width: 100%;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  font-size: 2vw;
  overflow: hidden;
  @media (min-width: 769px) {
    grid-column: span 3;
    justify-items: center;
  }
  &::after {
    content: "↓";
    margin-left: 10px;
  }

  &:focus {
    outline: none;
  }
`;
const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  position: absolute;
  top: 10%;
  left: 10%;
`;

const List = styled.ul`
position: relative;
top: calc(100%);
left: 50%;
transform: translateX(-50%);
width: 100%;
z-index: 1;
padding: 1vw;
display: ${(props) => (props.isOpen ? "block" : "none")};
list-style: none;
`;

const ListItem = styled.li`
  cursor: pointer;
  font-size: 2vw;
  text-align: center; /* Center the text in each list item
`;

const GenreButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin: 1vw;
`;

const GridContainer = styled.div`
display: grid;
grid-template-columns: repeat(6, 1fr);
gap: 10px;

@media (max-width: 768px) {
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
}
`;

export default ButtonGroup;
