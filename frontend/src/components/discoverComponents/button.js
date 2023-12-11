import React, { useState } from "react";
import styled from "styled-components";

const GenreButton = ({ options, label, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleList = () => {
    console.log('Toggle List function called');
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.log('Option Clicked:', option);
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
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

const ButtonGroup = ({ onSelectMediaType, onSelectSortBy, onSelectGenre }) => {
  
  const [selectedMediaType, setSelectedMediaType] = useState("All");
  const [selectedSortBy, setSelectedSortBy] = useState("Sort By");
  const [selectedGenre, setSelectedGenre] = useState("Genres");
  const mediaTypeOptions = ["All", "Movies", "Shows"];
  const sortByOptions = ["Sort By", "Now Playing", "Popular", "Top Rated"];
  const genreOptions = ["Genres", "Adventure", "Fantasy", "Romance", "Horror", "Mystery"];

  const handleMediaTypeSelect = (option) => {
    setSelectedMediaType(option);
    onSelectMediaType(option);
  };

  const handleSortBySelect = (option) => {
    setSelectedSortBy(option);
    onSelectSortBy(option);
  };

  const handleGenreSelect = (option) => {
    setSelectedGenre(option);
  };

  return (
    <ButtonsWrapper>
      <GenreButton
        options={mediaTypeOptions}
        label={selectedMediaType}
        onSelect={handleMediaTypeSelect}
      />
        <GenreButton
        options={sortByOptions}
        label={selectedSortBy}
        onSelect={handleSortBySelect}
      />
      <GenreButton
        options={genreOptions}
        label={selectedGenre}
        onSelect={handleGenreSelect}
      />
    </ButtonsWrapper>
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
  z-index: 2;
  width: 55%;
  @media (max-width: 769px) {
    justify-items: center;
    position: absolute;
    left: 10%;
    top: 10%;
    width: 50%;
  }
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

export default ButtonGroup;
