import "./SearchBanner.css";
import React, { useState } from "react";

import Filters from "../Filters";

const SearchBanner = ({
  search,
  setSearch,
  activeFilter,
  setActiveFilter,
  isButtonDisabled,
  handleSearch,
  setPrevSearch,
}) => {
 

  // Function to handle the change in the search bar
  const handleChange = (e) => {
    setSearch(e.target.value);
  };



  //function to execute the search if the user presses enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="Banner">
        <div className="BannerTitleWrapper">
          <p id="Title">Explore Recipes from Our Community</p>
          <p id="SubTitle">
            Discover, cook, and enjoy meals shared by fellow food enthusiasts.
          </p>
        </div>
        <div className="SearchBar">
          <input
            type="text"
            placeholder="Search tasty recipes"
            aria-label="Find recipes, ingredients, or dishes"
            onChange={handleChange}
            value={search}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            onClick={handleSearch}
            disabled={isButtonDisabled}
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex flex-row w-full justify-center ">
        <Filters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          setPrevSearch={setPrevSearch}
        />
      </div>
    </>
  );
};
export default SearchBanner;
