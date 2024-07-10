import React, { useState } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';

const RecipeForm = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setImages((prevImages) => prevImages.concat(filesArray));
      // Free memory when unmounted
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Formik
        initialValues={{
          title: '',
          description: '',
          category: 'Dessert',
          prepTime: '',
          cookTime: '',
          serves: '',
          yield: '',
          ingredients: [''],
          directions: [''],
        }}
        validationSchema={Yup.object({
          title: Yup.string().required('Required'),
          description: Yup.string().required('Required'),
          prepTime: Yup.number().required('Required').positive('Must be positive').integer('Must be an integer'),
          cookTime: Yup.number().required('Required').positive('Must be positive').integer('Must be an integer'),
          serves: Yup.number().required('Required').positive('Must be positive').integer('Must be an integer'),
          yield: Yup.number().required('Required').positive('Must be positive').integer('Must be an integer'),
          ingredients: Yup.array().of(Yup.string().required('Required')),
          directions: Yup.array().of(Yup.string().required('Required')),
        })}
        onSubmit={(values) => {
          // Handle form submission
          console.log(values);
        }}
      >
        {({ values, errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-gray-700">Title</label>
              <Field name="title" type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              {touched.title && errors.title ? <div className="text-red-500 text-sm">{errors.title}</div> : null}
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700">Description</label>
              <Field name="description" type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              {touched.description && errors.description ? <div className="text-red-500 text-sm">{errors.description}</div> : null}
            </div>

            <div>
              <label htmlFor="category" className="block text-gray-700">Category</label>
              <Field name="category" as="select" className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                <option value="Dessert">Dessert</option>
                {/* Add more options as needed */}
              </Field>
            </div>

            <div>
              <label htmlFor="prepTime" className="block text-gray-700">Prep Time (minutes)</label>
              <Field name="prepTime" type="number" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              {touched.prepTime && errors.prepTime ? <div className="text-red-500 text-sm">{errors.prepTime}</div> : null}
            </div>

            <div>
              <label htmlFor="cookTime" className="block text-gray-700">Cook Time (minutes)</label>
              <Field name="cookTime" type="number" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              {touched.cookTime && errors.cookTime ? <div className="text-red-500 text-sm">{errors.cookTime}</div> : null}
            </div>

            <div>
              <label htmlFor="serves" className="block text-gray-700">Serves</label>
              <Field name="serves" type="number" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              {touched.serves && errors.serves ? <div className="text-red-500 text-sm">{errors.serves}</div> : null}
            </div>

            <div>
              <label htmlFor="yield" className="block text-gray-700">Yield</label>
              <Field name="yield" type="number" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              {touched.yield && errors.yield ? <div className="text-red-500 text-sm">{errors.yield}</div> : null}
            </div>

            <div>
              <label htmlFor="image" className="block text-gray-700">Add Your Photos</label>
              <input type="file" multiple onChange={handleImageChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              <div className="mt-2 flex flex-wrap">
                {images.map((img, index) => (
                  <img key={index} src={img} alt={`Selected ${index}`} className="w-32 h-32 object-cover rounded-md mr-2 mb-2" />
                ))}
              </div>
            </div>

            <FieldArray name="ingredients">
              {({ insert, remove, push }) => (
                <div>
                  <label className="block text-gray-700">Ingredients</label>
                  {values.ingredients.length > 0 &&
                    values.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center mt-2">
                        <Field name={`ingredients.${index}`} className="w-full p-2 border border-gray-300 rounded-md" />
                        {touched.ingredients && touched.ingredients[index] && errors.ingredients && errors.ingredients[index] ? (
                          <div className="text-red-500 text-sm">{errors.ingredients[index]}</div>
                        ) : null}
                        <button type="button" onClick={() => remove(index)} className="ml-2 text-red-500">-</button>
                        <button type="button" onClick={() => push('')} className="ml-2 text-green-500">+</button>
                      </div>
                    ))}
                </div>
              )}
            </FieldArray>

            <FieldArray name="directions">
              {({ insert, remove, push }) => (
                <div>
                  <label className="block text-gray-700">Directions</label>
                  {values.directions.length > 0 &&
                    values.directions.map((direction, index) => (
                      <div key={index} className="flex items-center mt-2">
                        <Field name={`directions.${index}`} className="w-full p-2 border border-gray-300 rounded-md" />
                        {touched.directions && touched.directions[index] && errors.directions && errors.directions[index] ? (
                          <div className="text-red-500 text-sm">{errors.directions[index]}</div>
                        ) : null}
                        <button type="button" onClick={() => remove(index)} className="ml-2 text-red-500">-</button>
                        <button type="button" onClick={() => push('')} className="ml-2 text-green-500">+</button>
                      </div>
                    ))}
                </div>
              )}
            </FieldArray>

            <button type="submit" className="mt-4 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RecipeForm;
