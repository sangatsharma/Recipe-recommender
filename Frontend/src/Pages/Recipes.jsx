import { Helmet } from "react-helmet-async";
import React, { useState, useEffect } from "react";
import SearchBar from "../Component/SearchBar";
import Filters from "../Component/Filters";

const Recipes = (props) => {
  return (
    <div>
      <Helmet>
        <title>Recipes - CIY </title>
      </Helmet>
      <div className="p-4">Recipes</div>
    </div>
  );
};
export default Recipes;
