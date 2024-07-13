import RecipeForm from "../Component/RecipeForm";
import { Helmet } from "react-helmet-async";

const AddRecipe = () => {
  return (
    <div className="w-full flex flex-col items-center align-middle text-center">
      <Helmet>
        <title>Upload Recipe - CIY </title>
      </Helmet>

      <div className="p-6 w-full text-center ">
        <h1 className="text-4xl font-extrabold  mb-4">Add New Recipe</h1>
        <p className="text-lg ">Share your delicious creation with the world!</p>
    </div>
      <div className="w-full text-start">
        <RecipeForm />
      </div>
    </div>
  );
};

export default AddRecipe;
