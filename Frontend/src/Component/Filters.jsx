import React from "react";

const Filters = ({ onFilterChange, filters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="flex flex-col space-y-4 mb-4">
      <select
        name="cuisine"
        value={filters.cuisine}
        onChange={handleChange}
        className="px-4 py-2 border rounded-md"
      >
        <option value="">Cuisine</option>
        <option value="American">American</option>
        <option value="Italian">Italian</option>
        {/* Add more cuisines */}
      </select>
      <select
        name="dishType"
        value={filters.dishType}
        onChange={handleChange}
        className="px-4 py-2 border rounded-md"
      >
        <option value="">Dish Type</option>
        <option value="Main">Main</option>
        <option value="Dessert">Dessert</option>
        {/* Add more dish types */}
      </select>
      {/* Add more filters similarly */}
      <input
        type="range"
        name="prepTime"
        min="0"
        max="120"
        value={filters.prepTime}
        onChange={handleChange}
        className="px-4 py-2 border rounded-md"
      />
      <label>Preparation time: {filters.prepTime} minutes</label>
    </div>
  );
};

export default Filters;
