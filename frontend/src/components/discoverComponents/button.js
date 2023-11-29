import React, { useState } from "react";
import styled from "styled-components";


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
  const movieOptions = ["Movies", "Action", "Drama", "Comedy", "Sci-Fi", "Thriller"];
  const sortByOptions = ["Sort By", "Newest", "Popular", "Top Rated"];
  const genreOptions = ["Genres", "Adventure", "Fantasy", "Romance", "Horror", "Mystery"];

  return (
    <ButtonGroupWrapper>
      <GenreButton options={movieOptions} label="Movies" />
      <GenreButton options={sortByOptions} label="Sort By" />
      <GenreButton options={genreOptions} label="Genres" />
    </ButtonGroupWrapper>
  );
};


const Button = styled.button`
  padding: 15px;
  width: 150px;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  font-size: 20px;

  &:focus {
    outline: none;
  }
`;

const List = styled.ul`
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1;
  padding: 8px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  background-color: white;
  list-style: none;
`;

const ListItem = styled.li`
  cursor: pointer;
  font-size: 20px;
`;

const GenreButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin: 10px;
`;
const ButtonGroupWrapper = styled.div`
  position: absolute;
  left: 10%;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

export default ButtonGroup;
