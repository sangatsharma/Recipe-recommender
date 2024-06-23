import "./SearchBanner.css";
import React, { useState } from "react";
import axios from "axios";
import { rankFoodItems } from "../../utils/filterItems";

const SearchBanner = ({
  setFoodItems,
  setSearchPerformed,
  search,
  setSearch,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Function to fetch the items from the backend
  const fetchAndProcessItems = async (search) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/recipe`,
        { withCredentials: true }
      );
      const items = response.data;
      const rankedItems = rankFoodItems(items, search);
      setFoodItems(rankedItems);
    } catch (error) {
      console.error("Error fetching or processing items:", error);
    }
  };

  // Function to handle the change in the search bar
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  //function to handle the search button
  const handleSearch = () => {
    if (search.trim() === "") {
      alert("Please enter a search term.");
      return;
    }
    // Disable the button to prevent rapid presses
    setFoodItems([]);
    setIsButtonDisabled(true);
    // Re-enable the button after 5 second  to allow the user to search again
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 5000);
    console.log(search);
    setSearchPerformed(true);
    fetchAndProcessItems(search);
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
      {/* {props.content} */}
    </>
  );
};
export default SearchBanner;
