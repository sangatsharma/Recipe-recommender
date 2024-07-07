import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";

const PreferencesForm = ({ userInfo, setUserInfo }) => {
  // Define validation schema
  const validationSchema = Yup.object({
    dietaryRestrictions: Yup.string().required(
      "Dietary restriction is required"
    ),
    favoriteCuisines: Yup.array().min(1, "Select at least one cuisine"),
    dislikedIngredients: Yup.string(),
    mealTypes: Yup.array().min(1, "Select at least one meal type"),
    diseases: Yup.array(),
  });

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      dietaryRestrictions: userInfo?.preferences?.dietaryRestrictions || "",
      favoriteCuisines: userInfo?.preferences?.favCuisines || [],
      dislikedIngredients: userInfo?.preferences?.disliked || "",
      mealTypes: userInfo?.preferences?.preferredMeal || [],
      diseases: userInfo?.preferences?.diseases?.split(",") || [],
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      //send data to server
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/user/pref`,
          values,
          { withCredentials: true }
        );
        console.log(response.data);
        if (response.status === 200) {
          setUserInfo((prevValues) => ({
            ...prevValues,
            preferences: values,
          }));
          toast.success(response.data.body.message);
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div className="pl-3 pr-1 mt-3">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="dietaryRestrictions"> Dietary Restrictions</label>
          <select
            id="dietaryRestrictions"
            name="dietaryRestrictions"
            onChange={formik.handleChange}
            value={formik.values.dietaryRestrictions}
            className={` w-full p-2 border rounded-md text-black`}
          >
            <option value="" label="Select" />
            <option value="none" label="None" />
            <option value="vegetarian" label="Vegetarian" />
            <option value="vegan" label="Vegan" />
            <option value="gluten-free" label="Gluten-Free" />
          </select>
          {formik.errors.dietaryRestrictions &&
          formik.touched.dietaryRestrictions ? (
            <div className="text-red-500 text-sm mt-2">
              {formik.errors.dietaryRestrictions}
            </div>
          ) : null}
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium">
            Favorite Cuisines <span className="text-red-500">*</span>
          </label>
          <div
            role="group"
            aria-labelledby="checkbox-group"
            className="space-y-1"
          >
            {["Italian", "Chinese", "Indian", "Mexican"].map((cuisine) => (
              <label key={cuisine} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="favoriteCuisines"
                  value={cuisine}
                  onChange={formik.handleChange}
                  checked={formik.values.favoriteCuisines.includes(cuisine)}
                  className="form-checkbox text-blue-600 ml-2"
                />
                <span className="ml-1">{cuisine}</span>
              </label>
            ))}
          </div>
          {formik.errors.favoriteCuisines && formik.touched.favoriteCuisines ? (
            <div className="text-red-500 text-sm mt-2">
              {formik.errors.favoriteCuisines}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="dislikedIngredients"
            className="block text-sm font-medium mb-2"
          >
            Disliked Ingredients
          </label>
          <input
            id="dislikedIngredients"
            name="dislikedIngredients"
            type="text"
            placeholder="Enter disliked ingredients separated by commas"
            onChange={formik.handleChange}
            value={formik.values.dislikedIngredients}
            className={`block w-full p-2 border rounded-md text-black  placeholder:text-[12px]`}
          />
          {formik.errors.dislikedIngredients &&
          formik.touched.dislikedIngredients ? (
            <div className="text-red-500 text-sm mt-2">
              {formik.errors.dislikedIngredients}
            </div>
          ) : null}
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium">
            Preferred Meal Types <span className="text-red-500">*</span>
          </label>
          <div role="group" aria-labelledby="checkbox-group">
            {["Breakfast", "Lunch", "Dinner", "Snack"].map((meal) => (
              <label key={meal} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="mealTypes"
                  value={meal}
                  onChange={formik.handleChange}
                  checked={formik.values.mealTypes.includes(meal)}
                  className="form-checkbox text-blue-600 ml-2"
                />
                <span className="ml-1">{meal}</span>
              </label>
            ))}
          </div>
          {formik.errors.mealTypes && formik.touched.mealTypes ? (
            <div className="text-red-500 text-sm ">
              {formik.errors.mealTypes}
            </div>
          ) : null}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium ">
            Food-Related Diseases
          </label>

          <div role="group" aria-labelledby="checkbox-group">
            {["Diabetes", "Hypertension", "Celiac Disease", "Nut Allergy"].map(
              (disease) => (
                <label key={disease} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="diseases"
                    value={disease}
                    onChange={formik.handleChange}
                    checked={formik.values.diseases.includes(disease)}
                    className="form-checkbox text-blue-600 ml-2"
                  />
                  <span className="ml-1">{disease}</span>
                </label>
              )
            )}
          </div>
          {formik.errors.diseases && formik.touched.diseases ? (
            <div className="text-red-500 text-sm mt-2">
              {formik.errors.diseases}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
};

export default PreferencesForm;
