import React, { useState, useRef } from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useThemeContext } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { loadModel, loadImage } from "../utils/filterNsfw";
import { createFileFromBlobUrl } from "../utils/CropImage";
import Spinner from "./Loader/Spinner";
import axios from "axios";

const RecipeForm = () => {
  const { isDarkMode } = useThemeContext();

  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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
          setLoading(true);
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
        } finally {
          setLoading(false);
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
          Name: "",
          Description: "",
          RecipeCategory: "Dessert",
          PrepTime: "",
          CookTime: "",
          serves: "",
          yield: "",
          RecipeIngredientParts: [""],
          RecipeInstructions: [""],
        }}
        validationSchema={Yup.object({
          Name: Yup.string().required("Required"),
          Description: Yup.string().required("Required"),
          PrepTime: Yup.number()
            .required("Required")
            .positive("Must be positive")
            .integer("Must be an integer"),
          CookTime: Yup.number()
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
          RecipeIngredientParts: Yup.array().of(
            Yup.string().required("Required")
          ),
          RecipeInstructions: Yup.array().of(Yup.string().required("Required")),
        })}
        onSubmit={async (values) => {
          setSubmitting(true);
          // Handle form submission
          let Images = [];
          if (selectedImages.length > 0) {
            let i = 1;
            for (const image of selectedImages) {
              const imageFile = await createFileFromBlobUrl(
                image,
                `${values.Name.split(" ").join("") + i++}.jpg`,
                "image/jpeg"
              );
              Images.push(imageFile);
            }
          }

          const formData = new FormData();

          // Loop through all form values and append to FormData
          for (const key in values) {
            if (Array.isArray(values[key])) {
              // If the field is an array, stringify it before appending
              formData.append(key, JSON.stringify(values[key]));
            } else {
              formData.append(key, values[key]);
            }
          }

          // Append images to FormData
          Images.forEach((image, index) => {
            formData.append("file", image);
          });
          formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
          });
          try {
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_URL}/recipe`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
              }
            );
            console.log(response.data);
          } catch (error) {
            console.error("Error uploading recipe:", error);
            toast.error("Failed to upload recipe.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="Name" className="block ">
                Title
              </label>
              <Field
                name="Name"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
              />
              {touched.Name && errors.Name ? (
                <div className="text-red-500 text-sm">{errors.Name}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="Description" className="block ">
                Description
              </label>
              <Field
                name="Description"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
              />
              {touched.Description && errors.Description ? (
                <div className="text-red-500 text-sm">{errors.Description}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="RecipeCategory" className="block ">
                Category
              </label>
              <Field
                name="RecipeCategory"
                as="select"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
              >
                <option value="Dessert">Dessert</option>
                {/* Add more options as needed */}
              </Field>
            </div>

            <div>
              <label htmlFor="PrepTime" className="block ">
                Prep Time (minutes)
              </label>
              <Field
                name="PrepTime"
                type="number"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
              />
              {touched.PrepTime && errors.PrepTime ? (
                <div className="text-red-500 text-sm">{errors.PrepTime}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="CookTime" className="block ">
                Cook Time (minutes)
              </label>
              <Field
                name="CookTime"
                type="number"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
              />
              {touched.CookTime && errors.CookTime ? (
                <div className="text-red-500 text-sm">{errors.CookTime}</div>
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
                Add Recipe Images
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
                  {loading ? (
                    <span className="flex flex-row gap-2 items-center">
                      {" "}
                      Uploading images <Spinner />
                    </span>
                  ) : (
                    <span>Upload images</span>
                  )}
                </button>
                {selectedImages.length > 0 && (
                  <p className="mt-4">
                    {selectedImages.length == 1
                      ? "1 image selected "
                      : selectedImages.length + " images selected"}
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

            <FieldArray name="RecipeIngredientParts">
              {({ insert, remove, push }) => (
                <div>
                  <label className="block ">Ingredients</label>
                  {values.RecipeIngredientParts.length > 0 &&
                    values.RecipeIngredientParts.map((ingredient, index) => (
                      <div key={index} className="flex items-center mt-2">
                        <Field
                          name={`RecipeIngredientParts.${index}`}
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
                        {touched.RecipeIngredientParts &&
                        touched.RecipeIngredientParts[index] &&
                        errors.RecipeIngredientParts &&
                        errors.RecipeIngredientParts[index] ? (
                          <div className="text-red-500 text-sm">
                            {errors.RecipeIngredientParts[index]}
                          </div>
                        ) : null}
                      </div>
                    ))}
                </div>
              )}
            </FieldArray>

            <FieldArray name="RecipeInstructions">
              {({ insert, remove, push }) => (
                <div>
                  <label className="block ">Directions</label>
                  {values.RecipeInstructions.length > 0 &&
                    values.RecipeInstructions.map((direction, index) => (
                      <div key={index} className="flex items-center mt-2">
                        <Field
                          name={`RecipeInstructions.${index}`}
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
                        {touched.RecipeInstructions &&
                        touched.RecipeInstructions[index] &&
                        errors.RecipeInstructions &&
                        errors.RecipeInstructions[index] ? (
                          <div className="text-red-500 text-sm">
                            {errors.RecipeInstructions[index]}
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
              {submitting ? (
                <span className="flex flex-row gap-3 justify-center items-center">
                  <span>Uploading recipe</span>
                  <Spinner />
                </span>
              ) : (
                "Upload Recipe"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RecipeForm;
