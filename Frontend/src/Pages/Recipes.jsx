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
        userInfo={{
          name: "Sam Bahadur adhikari",
          id: 1,
          city: "Pokhara",
          email: "sangat202@gmail.com",
        }}
      />
      <PeopleCard
        userInfo={{
          name: "Hari Bahadur",
          id: 2,
          city: "Kathmandu",
          email: "sangatsharma2@gmail.com",
        }}
      />
      <PeopleCard
        userInfo={{
          name: "Gyan Bahadur",
          id: 3,
          city: "Chitwan",
          email: "test@test.com",
        }}
      />
    </div>
  );
};
export default Recipes;
