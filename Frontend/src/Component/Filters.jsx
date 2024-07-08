import React, { useState } from "react";
import { useThemeContext } from "../context/ThemeContext";
import { BsPostcardFill } from "react-icons/bs";
import { FaUtensils } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";

const Filters = ({ activeFilter, setActiveFilter }) => {
  const { isDarkMode } = useThemeContext();
  const [toggleRecipeContent, setToggleRecipeContent] = useState(false);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleFilterChange = (e, filterType) => {
    const value = e.target.value;
    //if value is not selected ignore the filter
    if (value === "") {
      return;
    }
    setActiveFilter((prevFilters) => {
      // Find if filter already exists
      const existingFilterIndex = prevFilters.findIndex(
        (filter) => filter[filterType]
      );

      if (existingFilterIndex !== -1) {
        // Update existing filter
        const updatedFilters = [...prevFilters];
        updatedFilters[existingFilterIndex] = { [filterType]: value };
        return updatedFilters;
      } else {
        // Add new filter
        return [...prevFilters, { [filterType]: value }];
      }
    });
  };

  const filterOptions = {
    Dishes: ["Breakfast", "Lunch", "Dinner"],
    // ingredients: ["Chicken", "Beef", "Vegetarian"],
    Nutritional: ["Low Calorie", "High Protein", "Low Carb"],
    CookingTime: ["< 30 mins", "30-60 mins", "> 60 mins"],
  };

  return (
    <div
      className={`flex-col text-xl ${isDarkMode ? "bg-[#302f2f]" : "bg-white"} w-auto `}
    >
      <div className="p-2">
        <p className="mb-4 border-b-2 border-[#e5e7eb] pb-3 pl-1 text-[18px]">
          Filters
        </p>
        <div
          className={`p-2 mb-1 flex align-middle rounded cursor-pointer justify-between hover:${
            isDarkMode ? "bg-gray-700" : "bg-gray-300"
          } ${
            activeFilter.includes("Recipes")
              ? isDarkMode
                ? "bg-gray-700"
                : "bg-gray-300"
              : ""
          }`}
          onClick={() => {
            handleFilterClick(["Recipes"]);
            setToggleRecipeContent(!toggleRecipeContent);
          }}
        >
          <span className="flex gap-4">
            <FaUtensils size={25} /> Recipes
          </span>
          {toggleRecipeContent ? (
            activeFilter.includes("Recipes") && (
              <i className="fa-solid fa-angle-up pt-1"></i>
            )
          ) : (
            <i className="fa-solid fa-angle-down pt-1"></i>
          )}
        </div>
        {Object.keys(filterOptions).map((filter, index) => (
          <div
            className={`p-2 ${
              activeFilter.includes("Recipes") && toggleRecipeContent
                ? "visible"
                : "hidden"
            } `}
            key={index}
          >
            <select
              className="p-2 text-black w-full rounded border border-orange-300 outline-none"
              value={activeFilter[filter]}
              onChange={(e) => handleFilterChange(e, filter)}
            >
              <option value="">{filter}</option>
              {filterOptions[filter].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div
          className={` p-2 flex gap-4 rounded cursor-pointer hover:${
            isDarkMode ? "bg-gray-700" : "bg-gray-300"
          } ${
            activeFilter.includes("Post")
              ? isDarkMode
                ? "bg-gray-700"
                : "bg-gray-300"
              : ""
          }`}
          onClick={() => handleFilterClick(["Post"])}
        >
          <BsPostcardFill size={25} /> Post
        </div>

        <div
          className={` p-2 flex gap-4 rounded cursor-pointer hover:${
            isDarkMode ? "bg-gray-700" : "bg-gray-300"
          } ${
            activeFilter.includes("People")
              ? isDarkMode
                ? "bg-gray-700"
                : "bg-gray-300"
              : ""
          }`}
          onClick={() => handleFilterClick(["People"])}
        >
          <FaUserFriends size={25} /> People
        </div>
      </div>
    </div>
  );
};

export default Filters;
