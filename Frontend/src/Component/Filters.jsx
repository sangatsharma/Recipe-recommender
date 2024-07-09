import React, { useState } from "react";
import { useThemeContext } from "../context/ThemeContext";
import { BsPostcardFill } from "react-icons/bs";
import { FaUtensils } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { TbZoomReset } from "react-icons/tb";

const Filters = ({ activeFilter, setActiveFilter, setPrevSearch }) => {
  const { isDarkMode } = useThemeContext();
  const [toggleRecipeContent, setToggleRecipeContent] = useState(false);

  const handleFilterClick = (filter) => {
    if (activeFilter.includes(filter[0])) return;
    setActiveFilter(filter);
  };

  const handleFilterChange = (e, filterType) => {
    setPrevSearch("");
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
  const getSelectedValue = (filterType) => {
    const filter = activeFilter.find((filter) => filter[filterType]);
    return filter ? filter[filterType] : "";
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
          <button
            className={`p-2  flex align-middle rounded cursor-pointer justify-between ${
              isDarkMode ? "hover:bg-gray-700 " : "hover:bg-gray-300 "
            } ${
              activeFilter.includes("Recipes")
                ? isDarkMode
                  ? "bg-gray-700"
                  : "bg-gray-300"
                : ""
            }`}
            onClick={() => {
              if (!activeFilter.includes("Recipes")) {
                setPrevSearch("");
              }
              handleFilterClick(["Recipes"]);
              setToggleRecipeContent(!toggleRecipeContent);
            }}
          >
            <span className="flex gap-2 below-sm:gap-1">
              <FaUtensils className="below-sm:size-[20px] below-sm:pt-1 size-6" />
              Recipes
            </span>
            <span>
              {toggleRecipeContent
                ? activeFilter.includes("Recipes") && (
                    <i className="fa-solid fa-angle-up pt-1 pl-2"></i>
                  )
                : activeFilter.includes("Recipes") && (
                    <i className="fa-solid fa-angle-down pt-1 pl-2"></i>
                  )}
            </span>
          </button>

          <button
            className={`p-2 flex gap-2 below-sm:gap-1 rounded cursor-pointer ${
              isDarkMode ? "hover:bg-gray-700 " : "hover:bg-gray-300 "
            }  ${
              activeFilter.includes("Ingredients")
                ? isDarkMode
                  ? "bg-gray-700"
                  : "bg-gray-300"
                : ""
            }`}
            onClick={() => {
              if (!activeFilter.includes("Ingredients")) {
                setPrevSearch("");
              }
              handleFilterClick(["Ingredients"]);
            }}
          >
            <i className="fa-solid fa-seedling below-sm:text-[19px] below-sm:pt-1"></i>
            Ingredients
          </button>
          <button
            className={` p-2  flex gap-2 below-sm:gap-1 rounded cursor-pointer ${
              isDarkMode ? "hover:bg-gray-700 " : "hover:bg-gray-300 "
            } ${
              activeFilter.includes("Post")
                ? isDarkMode
                  ? "bg-gray-700"
                  : "bg-gray-300"
                : ""
            }`}
            onClick={() => {
              if (!activeFilter.includes("Ingredients")) {
                setPrevSearch("");
              }
              handleFilterClick(["Post"]);
            }}
          >
            <BsPostcardFill className="below-sm:size-[22px] below-sm:pt-1 size-6 pd-1" />{" "}
            Post
          </button>

          <button
            className={` p-2 flex gap-2 below-sm:gap-1 rounded cursor-pointer  ${
              isDarkMode ? "hover:bg-gray-700 " : "hover:bg-gray-300 "
            } ${
              activeFilter.includes("People")
                ? isDarkMode
                  ? "bg-gray-700"
                  : "bg-gray-300"
                : ""
            }`}
            onClick={() => {
              if (!activeFilter.includes("Recipes")) {
                setPrevSearch("");
              }
              handleFilterClick(["People"]);
            }}
          >
            <FaUserFriends className="below-sm:size-[20px] below-sm:pt-1 size-6" />{" "}
            People
          </button>
        </div>
      </div>
      <div
        className={` flex flex-row w-auto text-xl below-sm:text-[12px] gap-2  ${
          isDarkMode ? "bg-[#302f2f]" : "bg-[#dbeafe]"
        } w-auto rounded `}
      >
        {Object.keys(filterOptions).map((filter, index) => (
          <div
            className={`mt-1 ${
              activeFilter.includes("Recipes") && toggleRecipeContent
                ? "visible"
                : "hidden"
            } `}
            key={index}
          >
            <select
              className="p-1 text-black w-full rounded border border-orange-300 outline-none"
              value={getSelectedValue(filter)}
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
        <button
          className={`mt-1 bg-red-300 rounded-full p-2 ${
            activeFilter.includes("Recipes") && toggleRecipeContent
              ? "visible"
              : "hidden"
          } `}
          title="Reset Filters"
          onClick={() => setActiveFilter(["Recipes"])}
        >
          <TbZoomReset />
        </button>
      </div>
    </div>
  );
};

export default Filters;
