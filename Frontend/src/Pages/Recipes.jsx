import { Helmet } from "react-helmet-async";
import React, { useState, useEffect } from "react";
import SearchBar from "../Component/SearchBar";
import Filters from "../Component/Filters";


const Recipes = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filters, setFilters] = useState({
    query: "",
    cuisine: "",
    dishType: "",
    cookingMethod: "",
    nutrition: "",
    diet: "",
    prepTime: 60,
  });

  useEffect(() => {
    // Fetch recipes from an API or data source
    const fetchRecipes = async () => {
      // const response = await fetch('API_URL');
      // const data = await response.json();
      const data = []; // Replace with fetched data
      setRecipes(data);
      setFilteredRecipes(data);
    };

    fetchRecipes();
  }, []);

  const handleSearchChange = (query) => {
    setFilters({ ...filters, query });
    applyFilters({ ...filters, query });
  };

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filters) => {
    let filtered = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(filters.query.toLowerCase()) &&
        (filters.cuisine ? recipe.cuisine === filters.cuisine : true) &&
        (filters.dishType ? recipe.dishType === filters.dishType : true) &&
        (filters.cookingMethod
          ? recipe.cookingMethod === filters.cookingMethod
          : true) &&
        (filters.nutrition ? recipe.nutrition === filters.nutrition : true) &&
        (filters.diet ? recipe.diet.includes(filters.diet) : true) &&
        recipe.prepTime <= filters.prepTime
    );
    setFilteredRecipes(filtered);
  };

  return (
    <div>
      {" "}
      <Helmet>
        <title>Recipes - CIY </title>
      </Helmet>
      <div className="p-4">
        <SearchBar onSearchChange={handleSearchChange} />
        <Filters onFilterChange={handleFilterChange} filters={filters} />
        {/* <RecipeList recipes={filteredRecipes} /> */}
      </div>
    </div>
  );
};
export default Recipes;
