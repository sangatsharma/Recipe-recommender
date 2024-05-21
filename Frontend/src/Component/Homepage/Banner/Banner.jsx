import "./Banner.css";
import React, { useState } from "react";
const Banner = (props) => {
  const [search, setSearch] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Function to handle the change in the search bar
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  //function to handle the search button
  const handleSearch = () => {
    // Disable the button to prevent rapid presses
    setIsButtonDisabled(true);

    // Re-enable the button after 5 second  to allow the user to search again
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 5000);
    //todo call api to search for the recipe
    console.log(search);
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
          <h1 id="Title">Welcome to Cooking Club</h1>
          <p id="SubTitle">
            A community of cooks, food lovers, and recipe enthusiasts.
          </p>
        </div>
        <div className="SearchBar">
          <input
            type="text"
            placeholder="Find recipes, ingredients, or dishes"
            aria-label="Find recipes, ingredients, or dishes"
            onChange={handleChange}
            value={search}
            onKeyDown={handleKeyDown}
          />
          <button type="button" onClick={handleSearch} disabled={isButtonDisabled}>
            Search
          </button>
        </div>
      </div>
      {props.content}
    </>
  );
};
export default Banner;
