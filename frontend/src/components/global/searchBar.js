import React from 'react';
import styled from 'styled-components';
import { IoSearchSharp } from "react-icons/io5";

const SearchBar = ({ placeholder, onSearch }) => {
  return (
    <StyledSearchBar>
      <SearchInput
        type="text"
        placeholder={placeholder || 'Search...'}
        onChange={(e) => onSearch && onSearch(e.target.value)}
      />
      <SearchIcon />
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