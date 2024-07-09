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
    <div className="flex flex-col">
      <div
        className={` text-xl below-sm:text-[12px]  ${
          isDarkMode ? "bg-[#302f2f]" : "bg-[#dbeafe]"
        } w-auto rounded `}
      >
        <div className="flex flex-row justify-center items-center gap-2 below-sm:gap-0  m-auto">
          <div
            className={`p-2 below-sm:y-1  flex align-middle rounded cursor-pointer justify-between ${
              isDarkMode ? "hover:bg-gray-700 " : "hover:bg-gray-300 "
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
            <span className="flex gap-2 below-sm:gap-1">
              <FaUtensils className="below-sm:size-[20px] below-sm:pt-1 size-6" />{" "}
              Recipes
            </span>
            {toggleRecipeContent ? (
              activeFilter.includes("Recipes") && (
                <i className="fa-solid fa-angle-up pt-1 pl-2"></i>
              )
            ) : (
              <i className="fa-solid fa-angle-down pt-1 pl-2"></i>
            )}
          </div>

          <div
            className={` p-2  below-sm:py-1  flex gap-2 below-sm:gap-1 rounded cursor-pointer ${
              isDarkMode ? "hover:bg-gray-700 " : "hover:bg-gray-300 "
            }  ${
              activeFilter.includes("Ingredients")
                ? isDarkMode
                  ? "bg-gray-700"
                  : "bg-gray-300"
                : ""
            }`}
            onClick={() => handleFilterClick(["Ingredients"])}
          >
            <i className="fa-solid fa-seedling below-sm:text-[18px] text-2xl"></i>
            Ingredients
          </div>
          <div
            className={` p-2 below-sm:py-1 flex gap-2 below-sm:gap-1 rounded cursor-pointer ${
              isDarkMode ? "hover:bg-gray-700 " : "hover:bg-gray-300 "
            } ${
              activeFilter.includes("Post")
                ? isDarkMode
                  ? "bg-gray-700"
                  : "bg-gray-300"
                : ""
            }`}
            onClick={() => handleFilterClick(["Post"])}
          >
            <BsPostcardFill className="below-sm:size-[22px] below-sm:pt-1 size-6 pd-1" />{" "}
            Post
          </div>

          <div
            className={` p-2 below-sm:py-1 flex gap-2 below-sm:gap-1 rounded cursor-pointer  ${
              isDarkMode ? "hover:bg-gray-700 " : "hover:bg-gray-300 "
            } ${
              activeFilter.includes("People")
                ? isDarkMode
                  ? "bg-gray-700"
                  : "bg-gray-300"
                : ""
            }`}
            onClick={() => handleFilterClick(["People"])}
          >
            <FaUserFriends className="below-sm:size-[20px] below-sm:pt-1 size-6" />{" "}
            People
          </div>
        </div>
      </div>
      <div
        className={` flex flex-row w-auto text-xl below-sm:text-[12px] gap-2  ${
          isDarkMode ? "bg-[#302f2f]" : "bg-[#dbeafe]"
        } w-auto rounded `}
      >
        {Object.keys(filterOptions).map((filter, index) => (
          <div
            className={`${
              activeFilter.includes("Recipes") && toggleRecipeContent
                ? "visible"
                : "hidden"
            } `}
            key={index}
          >
            <select
              className="p-1 text-black w-full rounded border border-orange-300 outline-none"
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
      </div>
    </div>
  );
};

export default Filters;
