import "./SearchBanner.css";
import React from "react";

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
  // Function to handle changes in the search bar input
  const handleChange = (e) => {
    setSearch(e.target.value); // Update the search state as the user types
  };

  // Function to execute the search if the user presses Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(); // Trigger search when Enter key is pressed
    }
  };

  return (
    <>
      {/* Search banner section */}
      <div className="Banner">
        <div className="BannerTitleWrapper">
          <p id="Title">Explore Recipes from Our Community</p>
          <p id="SubTitle">
            Discover, cook, and enjoy meals shared by fellow food enthusiasts.
          </p>
        </div>
        {/* Search bar section */}
        <div className="SearchBar">
          {/* Label for screen readers */}
          <label htmlFor="searchInput" className="sr-only">
            Search recipes
          </label>
          {/* Input for searching recipes */}
          <input
            type="text"
            id="searchInput"
            placeholder="Search tasty recipes"
            aria-label="Find recipes, ingredients, or dishes"
            value={search}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {/* Button to trigger the search */}
          <button
            type="button"
            onClick={handleSearch}
            disabled={isButtonDisabled}
            aria-label="Search"
          >
            Search
          </button>
        </div>
      </div>
      {/* Filters section */}
      <div className="flex flex-row w-full justify-center">
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
