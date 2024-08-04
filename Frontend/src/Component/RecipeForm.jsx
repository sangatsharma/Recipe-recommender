import React, { useState, useRef } from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useThemeContext } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { loadModel, loadImage } from "../utils/filterNsfw";
import { createFileFromBlobUrl } from "../utils/CropImage";

const RecipeForm = () => {
  const { isDarkMode } = useThemeContext();

  const [selectedImages, setSelectedImages] = useState([]);
  const imageInputRef = useRef(null);

  const validImageTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/bmp",
  ];

  // Handle image selection
  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files);

    // Filter out files that have already been selected
    const newFiles = files.filter((file) => {
      const fileExists = selectedImages.some(
        (image) => image.name === file.name && image.size === file.size
      );
      return !fileExists;
    });

    let imageUrls = [];

    // Use for...of to handle async operations
    for (const file of newFiles) {
      if (file && validImageTypes.includes(file.type)) {
        try {
          const image = await loadImage(file);
          const isNsfw = await loadModel(image);
          if (isNsfw) {
            toast.error(`${file.name} is not appropriate.`);
          } else {
            console.log("Check complete", file.name);
            imageUrls.push({
              url: URL.createObjectURL(file),
              name: file.name,
              size: file.size,
            });
          }
        } catch (error) {
          console.error("Error loading image or model:", error);
          toast.error("Failed to load image or model.");
        }
      } else {
        toast.error(
          `${file.name} is an invalid file type. Only images are allowed.`
        );
      }
    }
    setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  // Handle image removal
  const removeImage = (imageUrl) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((image) => image !== imageUrl)
    );
  };

  const handleUploadClick = () => {
    imageInputRef.current.click();
  };

  return (
    <div
      className={`max-w-2xl mx-auto p-6 ${
        isDarkMode ? "bg-[#302f2f] text-white" : "bg-white "
      } rounded-lg shadow-lg`}
    >
      <Formik
        initialValues={{
          title: "",
          description: "",
          category: "Dessert",
          prepTime: "",
          cookTime: "",
          serves: "",
          yield: "",
          ingredients: [""],
          directions: [""],
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Required"),
          description: Yup.string().required("Required"),
          prepTime: Yup.number()
            .required("Required")
            .positive("Must be positive")
            .integer("Must be an integer"),
          cookTime: Yup.number()
            .required("Required")
            .positive("Must be positive")
            .integer("Must be an integer"),
          serves: Yup.number()
            .required("Required")
            .positive("Must be positive")
            .integer("Must be an integer"),
          yield: Yup.number()
            .required("Required")
            .positive("Must be positive")
            .integer("Must be an integer"),
          ingredients: Yup.array().of(Yup.string().required("Required")),
          directions: Yup.array().of(Yup.string().required("Required")),
        })}
        onSubmit={async (values) => {
          // Handle form submission
          let imageFiles = [];
          if (selectedImages.length > 0) {
            let i = 1;
            for (const image of selectedImages) {
              const imageFile = await createFileFromBlobUrl(
                image,
                `${values.title.split(" ").join("") + i++}.jpg`,
                "image/jpeg"
              );
              imageFiles.push(imageFile);
            }
          }
          console.log(values, imageFiles);
        }}
      >
        {({ values, errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="title" className="block ">
                Title
              </label>
              <Field
                name="title"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
              />
              {touched.title && errors.title ? (
                <div className="text-red-500 text-sm">{errors.title}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="description" className="block ">
                Description
              </label>
              <Field
                name="description"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
              />
              {touched.description && errors.description ? (
                <div className="text-red-500 text-sm">{errors.description}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="category" className="block ">
                Category
              </label>
              <Field
                name="category"
                as="select"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
              >
                <option value="Dessert">Dessert</option>
                {/* Add more options as needed */}
              </Field>
            </div>

            <div>
              <label htmlFor="prepTime" className="block ">
                Prep Time (minutes)
              </label>
              <Field
                name="prepTime"
                type="number"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
              />
              {touched.prepTime && errors.prepTime ? (
                <div className="text-red-500 text-sm">{errors.prepTime}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="cookTime" className="block ">
                Cook Time (minutes)
              </label>
              <Field
                name="cookTime"
                type="number"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
              />
              {touched.cookTime && errors.cookTime ? (
                <div className="text-red-500 text-sm">{errors.cookTime}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="serves" className="block ">
                Serves
              </label>
              <Field
                name="serves"
                type="number"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
              />
              {touched.serves && errors.serves ? (
                <div className="text-red-500 text-sm">{errors.serves}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="yield" className="block ">
                Yield
              </label>
              <Field
                name="yield"
                type="number"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
              />
              {touched.yield && errors.yield ? (
                <div className="text-red-500 text-sm">{errors.yield}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="image" className="block ">
                Add Your Photos
              </label>
              <input
                type="file"
                ref={imageInputRef}
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="flex flex-wrap gap-2 ">
                <button
                  className="py-2 px-4 mt-2 bg-orange-500 text-white rounded hover:bg-orange-400"
                  onClick={handleUploadClick}
                  type="button"
                >
                  Upload Recipe Photos
                </button>
                {selectedImages.length > 0 && (
                  <p className="mt-4">
                    {selectedImages.length} images selected
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-4 mt-2">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.url}
                      alt={`Selected ${index}`}
                      className="w-48 h-48 object-cover rounded shadow"
                    />
                    <button
                      onClick={() => {
                        removeImage(image);
                      }}
                      type="button"
                      className="absolute top-1 right-0 text-white bg-red-600 rounded-full px-2 scale-90 text-xl hover:bg-red-700"
                    >
                      <p className="scale-125">&times;</p>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <FieldArray name="ingredients">
              {({ insert, remove, push }) => (
                <div>
                  <label className="block ">Ingredients</label>
                  {values.ingredients.length > 0 &&
                    values.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center mt-2">
                        <Field
                          name={`ingredients.${index}`}
                          className="w-full p-2 border border-gray-300 rounded-md text-black"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            if (index != 0) remove(index);
                          }}
                          className="ml-2 text-red-500"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => push("")}
                          className="ml-2 text-green-500"
                        >
                          +
                        </button>
                        {touched.ingredients &&
                        touched.ingredients[index] &&
                        errors.ingredients &&
                        errors.ingredients[index] ? (
                          <div className="text-red-500 text-sm">
                            {errors.ingredients[index]}
                          </div>
                        ) : null}
                      </div>
                    ))}
                </div>
              )}
            </FieldArray>

            <FieldArray name="directions">
              {({ insert, remove, push }) => (
                <div>
                  <label className="block ">Directions</label>
                  {values.directions.length > 0 &&
                    values.directions.map((direction, index) => (
                      <div key={index} className="flex items-center mt-2">
                        <Field
                          name={`directions.${index}`}
                          className="w-full p-2 border border-gray-300 rounded-md text-black"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            if (index != 0) remove(index);
                          }}
                          className="ml-2 text-red-500"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => push("")}
                          className="ml-2 text-green-500"
                        >
                          +
                        </button>
                        {touched.directions &&
                        touched.directions[index] &&
                        errors.directions &&
                        errors.directions[index] ? (
                          <div className="text-red-500 text-sm">
                            {errors.directions[index]}
                          </div>
                        ) : null}
                      </div>
                    ))}
                </div>
              )}
            </FieldArray>

            <button
              type="submit"
              className="mt-4 w-full p-2 bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Upload Recipe
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RecipeForm;
