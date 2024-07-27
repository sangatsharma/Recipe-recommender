import { Helmet } from "react-helmet-async";
import React, { useState, useEffect } from "react";
import PeopleCard from "../Component/PeopleCard";
import RecipeForm from "../Component/RecipeForm";

const Recipes = (props) => {
  return (
    <div className="w-full flex flex-col items-center align-middle text-center">
      <Helmet>
        <title>Recipes - CIY </title>
      </Helmet>

      <h1>Add a Recipe</h1>
      <div className="w-full text-start">
        <RecipeForm />
      </div>

      <div className="p-4 w-full">Recipes</div>
      <PeopleCard
        userDetails={{
          name: "Sam Bahadur hjsdsjdj hskjdhsjh dkh hjsdsk sdsdsdsd j",
          id: 3,
          city: "Pokhara",
          email: "sangat202@gmail.com",
        }}
      />
      <PeopleCard
        userDetails={{
          name: "Hari Bahadur",
          id: 1,
          city: "Kathmandu",
          email: "sauravdhakal121@gmail.com",
        }}
      />
      <PeopleCard
        userDetails={{
          name: "Gyan Bahadur",
          id: 2,
          city: "Chitwan",
          email: "pikachu00824@gmail.com",
        }}
      />
    </div>
  );
};
export default Recipes;
