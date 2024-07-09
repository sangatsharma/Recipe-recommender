import { Helmet } from "react-helmet-async";
import React, { useState, useEffect } from "react";
import PeopleCard from "../Component/PeopleCard";

const Recipes = (props) => {
  return (
    <div className="w-full flex flex-col items-center">
      <Helmet>
        <title>Recipes - CIY </title>
      </Helmet>
      <div className="p-4 w-full">Recipes</div>
      <PeopleCard userInfo={{name:"Sam Bahadur adhikari",id:20,city:"Pokhara"}} />
      <PeopleCard userInfo={{name:"Hari Bahadur",id:20,city:"Kathmandu"}} />
      <PeopleCard userInfo={{name:"Gyan Bahadur",id:20,city:"Chitwan"}} />
      
    </div>
  );
};
export default Recipes;
