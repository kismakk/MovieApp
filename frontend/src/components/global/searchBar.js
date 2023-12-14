import React from 'react';
import styled from 'styled-components';
import { IoSearchSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ placeholder }) => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.elements.searchInput.value.trim();

    if (value !== '') {
      navigate(`/search/query=${encodeURIComponent(value)}`);
    }
  };

  return (
    <StyledSearchBar>
      <form onSubmit={handleSearch}>
        <SearchInput
          type="text"
          name="searchInput"
          placeholder={placeholder || 'Search...'}
        />
        <SearchIcon />
      </form>
    </StyledSearchBar>
  );
};

const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50px;
  background-color: #45575C;
  padding: 8px;
  width: 280px;
  height: 30px;

  form {
    display: flex;
    width: 100%;
  }
`;

const SearchIcon = styled(IoSearchSharp)`
  color: #B3BAAE;
  margin-right: 8px;
`;

const SearchInput = styled.input`
  background-color: #45575C00;
  border: none;
  outline: none;
  flex: 1;
  font-size: 16px;
  color: #B3BAAE;
  &::placeholder {
    color: #B3BAAE;
  }
`;

export default SearchBar;
