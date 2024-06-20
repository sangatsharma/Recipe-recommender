// src/components/PreferencesForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PreferencesForm = () => {
  // Define validation schema
  const validationSchema = Yup.object({
    dietaryRestrictions: Yup.string().required('Dietary restriction is required'),
    favoriteCuisines: Yup.array().min(1, 'Select at least one cuisine'),
    dislikedIngredients: Yup.string(),
    mealTypes: Yup.array().min(1, 'Select at least one meal type'),
    diseases: Yup.array().min(1, 'Select at least one disease if applicable'),
  });

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      dietaryRestrictions: '',
      favoriteCuisines: [],
      dislikedIngredients: '',
      mealTypes: [],
      diseases: [],
    },
    validationSchema,
    onSubmit: (values) => {
      // Simulate form submission
      console.log('Form Submitted', values);
      toast.success('Preferences saved successfully!');
    },
  });

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">User Preferences</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="dietaryRestrictions" className="block text-sm font-medium mb-2">Dietary Restrictions</label>
          <select
            id="dietaryRestrictions"
            name="dietaryRestrictions"
            onChange={formik.handleChange}
            value={formik.values.dietaryRestrictions}
            className="block w-full p-2 border rounded-md"
          >
            <option value="" label="Select" />
            <option value="none" label="None" />
            <option value="vegetarian" label="Vegetarian" />
            <option value="vegan" label="Vegan" />
            <option value="gluten-free" label="Gluten-Free" />
          </select>
          {formik.errors.dietaryRestrictions && formik.touched.dietaryRestrictions ? (
            <div className="text-red-500 text-sm mt-2">{formik.errors.dietaryRestrictions}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Favorite Cuisines</label>
          <div role="group" aria-labelledby="checkbox-group" className="space-y-2">
            {['Italian', 'Chinese', 'Indian', 'Mexican'].map((cuisine) => (
              <label key={cuisine} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="favoriteCuisines"
                  value={cuisine}
                  onChange={formik.handleChange}
                  className="form-checkbox text-blue-600"
                />
                <span className="ml-2">{cuisine}</span>
              </label>
            ))}
          </div>
          {formik.errors.favoriteCuisines && formik.touched.favoriteCuisines ? (
            <div className="text-red-500 text-sm mt-2">{formik.errors.favoriteCuisines}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="dislikedIngredients" className="block text-sm font-medium mb-2">Disliked Ingredients</label>
          <input
            id="dislikedIngredients"
            name="dislikedIngredients"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.dislikedIngredients}
            className="block w-full p-2 border rounded-md"
          />
          {formik.errors.dislikedIngredients && formik.touched.dislikedIngredients ? (
            <div className="text-red-500 text-sm mt-2">{formik.errors.dislikedIngredients}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Preferred Meal Types</label>
          <div role="group" aria-labelledby="checkbox-group" className="space-y-2">
            {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((meal) => (
              <label key={meal} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="mealTypes"
                  value={meal}
                  onChange={formik.handleChange}
                  className="form-checkbox text-blue-600"
                />
                <span className="ml-2">{meal}</span>
              </label>
            ))}
          </div>
          {formik.errors.mealTypes && formik.touched.mealTypes ? (
            <div className="text-red-500 text-sm mt-2">{formik.errors.mealTypes}</div>
          ) : null}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Food-Related Diseases</label>
          <div role="group" aria-labelledby="checkbox-group" className="space-y-2">
            {['Diabetes', 'Hypertension', 'Celiac Disease', 'Nut Allergy'].map((disease) => (
              <label key={disease} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="diseases"
                  value={disease}
                  onChange={formik.handleChange}
                  className="form-checkbox text-blue-600"
                />
                <span className="ml-2">{disease}</span>
              </label>
            ))}
          </div>
          {formik.errors.diseases && formik.touched.diseases ? (
            <div className="text-red-500 text-sm mt-2">{formik.errors.diseases}</div>
          ) : null}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Save Preferences</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PreferencesForm;
