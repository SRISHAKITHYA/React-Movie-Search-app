import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  align-items: center;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  outline: none;
  margin-left: 15px;
  border: none;
`;
const SearchBoxComponent = ({ onSearch }) => {
  const [search, upadateSearch] = useState();
  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (SearchInput) => {
    const response =
      await axios.get(`https://react-movie-search-app-rmk4.onrender.com/api/search?searchTerm=${SearchInput}
      
    
`);
    console.log(response);
    onSearch(response.data, response.data.length === 0);
  };
  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    upadateSearch(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <SearchBox>
      <SearchIcon src="/search-icon.svg" />

      <SearchInput
        placeholder="Search Movie"
        value={search}
        onChange={onTextChange}
      />
    </SearchBox>
  );
};
export default SearchBoxComponent;
