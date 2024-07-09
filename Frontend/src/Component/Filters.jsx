



import React, { useState } from "react";

const Filters = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [filters, setFilters] = useState({
    dishes: "",
    ingredients: "",
    nutritional: "",
    cookingTime: "",
  });

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleFilterChange = (e, filterType) => {
    setFilters({ ...filters, [filterType]: e.target.value });
  };

  const filterOptions = {
    dishes: ["Breakfast", "Lunch", "Dinner"],
    ingredients: ["Chicken", "Beef", "Vegetarian"],
    nutritional: ["Low Calorie", "High Protein", "Low Carb"],
    cookingTime: ["< 30 mins", "30-60 mins", "> 60 mins"],
  };

  return (
    <div className="flex-col">
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="mb-4">Filters</h2>
        {Object.keys(filterOptions).map((filter) => (
          <div
            key={filter}
            className={`mb-2 p-2 cursor-pointer ${
              activeFilter === filter ? "bg-gray-700" : ""
            }`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </div>
        ))}
      </div>
      <div className="w-3/4 p-4">
        {activeFilter && (
          <div className="bg-gray-100 p-4">
            <h3 className="mb-4">
              {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}{" "}
              Options
            </h3>
            <select
              className="p-2 border border-gray-300"
              value={filters[activeFilter]}
              onChange={(e) => handleFilterChange(e, activeFilter)}
            >
              <option value="">Select {activeFilter}</option>
              {filterOptions[activeFilter].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;