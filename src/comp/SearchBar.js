import React from "react";
import "../style/Header.css";

const SearchBar = ({ handleSearch, searchBeer }) => {
  return (
    <div className='search-bar'>
      <i className="fas fa-search"></i>
      <input type="text" value={searchBeer} onChange={handleSearch} />
    </div>
  );
};
export default SearchBar;
