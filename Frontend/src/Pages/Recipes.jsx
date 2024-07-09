import { Helmet } from "react-helmet-async";
import React, { useState, useEffect } from "react";
import SearchBar from "../Component/SearchBar";
import Filters from "../Component/Filters";
import PeopleCard from "../Component/PeopleCard";

const Recipes = (props) => {
  return (
    <div className="w-[80%]">
      <Helmet>
        <title>Recipes - CIY </title>
      </Helmet>
      <div className="p-4 w-full">Recipes</div>
      <PeopleCard userInfo={{name:"Sam Bahadur",id:20,city:"Pokhara"}} />
      <PeopleCard userInfo={{name:"Hari Bahadur",id:20,city:"Kathmandu"}} />
      <PeopleCard userInfo={{name:"Gyan Bahadur",id:20,city:"Chitwan"}} />
      
    </div>
  );
};
export default Recipes;
