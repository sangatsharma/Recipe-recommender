import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import bullet from "../assets/Images/list.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";

const SignupPage = () => {
  const { setIsAuthenticated, isAuthenticated } = useContext(AuthContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
      toast.success("Signup successful!");
    }
  }, [isAuthenticated]);

  const googleOauth = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/user/auth/oauth`;
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    window.location.reload();
  };

  // Setup schema and formik
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .matches(
          /^[a-zA-Z](?!.*\s{2})[a-zA-Z0-9]*(?: [a-zA-Z0-9]*)*$/,
          "Only letters, numbers and space are allowed."
        )
        .min(3, "Name must be at least 3 characters long")
        .max(40, "Name must be at most 40 characters long")
        .required("* Please enter your name."),
      email: Yup.string()
        .email("Invalid email address")
        .required("* Please provide your email."),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .matches(
          /^(?=.*[A-Z])(?=.*[\W_])(?=.*[0-9])[a-zA-Z0-9\W_ ]+$/,
          "Password must contain at least an uppercase, a symbol & a number,"
        )
        .required("* Please enter a password."),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("* Please confirm your password."),
    }),
    onSubmit: async (values) => {
      setIsButtonDisabled(true);
      // Re-enable the button after 4 seconds to allow the user to search again
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 4000);

      values["name"] = values["userName"];

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/user/auth/register`,
          values,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (!res.data.success) {
          toast.error(`${res.data.body.message}`);
        } else {
          handleSignup();
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    },
  });

  return (
    <div className="bg-white shadow-lg rounded-lg flex flex-row below-sm:flex-col overflow-hidden w-3/4 below-sm:w-[400px]">
      <Helmet>
        <title>Sign Up - CIY</title>
        <meta
          name="description"
          content="Create a new account on CIY and enjoy personalized recipes, organizing recipes, and many more features."
        />
      </Helmet>

      {/* Left Side with Form */}
      <div className="w-1/2 below-sm:w-[100%] px-10 pt-2 pb-1 bg-slate-200">
        <div className="flex flex-row justify-center mb-4">
          <p className="text-2xl below-sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg pb-4">
            Sign Up
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} noValidate>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="userName"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="userName"
            type="text"
            placeholder="User name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
          />
          {formik.touched.userName && formik.errors.userName ? (
            <span className="text-red-500 text-sm">
              {formik.errors.userName}
            </span>
          ) : (
            <span className="text-slate-200 text-[2px]">*</span>
          )}

          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="user@example.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <span className="text-red-500 text-sm">{formik.errors.email}</span>
          ) : (
            <span className="text-slate-200 text-[2px]">*</span>
          )}

          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <span className="text-red-500 text-sm">
              {formik.errors.password}
            </span>
          ) : (
            <span className="text-slate-200 text-[2px]">*</span>
          )}

          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <span className="text-red-500 text-sm">
              {formik.errors.confirmPassword}
            </span>
          ) : (
            <span className="text-slate-200 text-[2px]">*</span>
          )}

          <div className="mb-1">
            <button
              className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline below-sm:w-[100%]"
              type="submit"
              disabled={isButtonDisabled}
            >
              Sign Up
            </button>
          </div>

          <p className="text-gray-600 text-xs">
            By clicking on 'Sign Up' you are agreeing to the Terms of Service
            and the Privacy Policy.
          </p>
        </form>

        <hr className="border-t-1 border-orange-500 my-1" />
        <div className="flex flex-col gap-1 justify-center text-center pt-2">
          <button
            className="flex flex-row gap-2 m-auto justify-center bg-slate-300 text-gray-700 border-gray-400 hover:bg-slate-400 hover:text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline below-sm:w-[100%]"
            onClick={googleOauth}
          >
            Continue with
            <img
              className="w-7 h-7 rounded-full"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
          </button>
          <p className="text-gray-600 text-xm">
            Already have an account?
            <span className="text-blue-600 cursor-pointer hover:underline">
              <Link to="/login"> Log in</Link>
            </span>
          </p>
        </div>
      </div>

      {/* Right Side with Information */}
      <div className="perks w-2/3 p-10 below-sm:p-5 flex flex-col justify-center bg-signup-bg bg-cover below-sm:w-[100%]">
        <h2 className="text-5xl text-orange-50 font-bold">
          Create your account
        </h2>
        <br />
        <p className="text-2xl text-teal-50 mb-4">Here's What You'll Get:</p>
        <ul className="text-teal-100 list-disc list-inside space-y-1 text-[20px] below-sm:text-white">
          <li className="flex items-center">
            <img
              src={bullet}
              alt="Recipe Bullet"
              className="inline-block mr-2 align-middle w-5 h-5"
            />
            Organize recipes.
          </li>
          <li className="flex items-center">
            <img
              src={bullet}
              alt="Recipe Bullet"
              className="inline-block mr-2 align-middle w-5 h-5"
            />
            Discover personalized recipes.
          </li>
          <li className="flex items-center">
            <img
              src={bullet}
              alt="Recipe Bullet"
              className="inline-block mr-2 align-middle w-5 h-5"
            />
            Tag and share with friends.
          </li>
          <li className="flex items-center">
            <img
              src={bullet}
              alt="Recipe Bullet"
              className="inline-block mr-2 align-middle w-5 h-5"
            />
            Rate others' recipes.
          </li>
          <li className="flex items-center">
            <img
              src={bullet}
              alt="Recipe Bullet"
              className="inline-block mr-2 align-middle w-5 h-5"
            />
            Many more features.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SignupPage;
