import React, { useState } from "react";

const GenreButton = ({ options, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    //Tähä sit funktio joka näyttää sivun valintojen mukaan
  };

  const listStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    zIndex: 1,
    border: "1px solid #ccc",
    padding: "8px",
    display: isOpen ? "block" : "none",
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button onClick={toggleList} style={buttonStyle}>
        {selectedOption ? selectedOption : label}
        {isOpen && (
          <ul style={listStyle}>
            {options.map((option, index) => (
              <li key={index} onClick={() => handleOptionClick(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </button>
    </div>
  );
};

const ButtonGroup = () => {
  const movieOptions = ["Movies","Action", "Drama", "Comedy", "Sci-Fi", "Thriller"];
  const sortByOptions = ["Sort By","Newest", "Popular", "Top Rated"];
  const genreOptions = ["Genres","Adventure", "Fantasy", "Romance", "Horror", "Mystery"];

  return (
    <div>
      <GenreButton options={movieOptions} label="Movies" />
      <GenreButton options={sortByOptions} label="Sort By" />
      <GenreButton options={genreOptions} label="Genres" />
    </div>
  );
};

const buttonStyle = {
  padding: "10px",
  borderRadius: "20px",
  position: "relative",
};

export default ButtonGroup;
