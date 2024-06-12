import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignupPage = () => {

  // setup schema and formik
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("* Please enter your name."),
      email: Yup.string()
        .email("Invalid email address")
        .required("* Please provide your email."),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("* Please enter a password."),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("* Please enter a password."),
    }),
    onSubmit: (values) => {
      {/* //todo handle submit*/ }
      alert(JSON.stringify(values, null, 2));
    },
  });


  return (
    <div className="bg-white shadow-lg rounded-lg flex overflow-hidden w-3/4">
      {/* Left Side with Form */}
      <div className="w-1/2 p-10 bg-slate-200">
        <div className="flex flex-row mb-4">
          {/* <img src="path/to/logo.png" alt="ads" className="h-12" /> */}
          <span className="text-3xl md:text-3xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg">
            Cook it Yourself
          </span>
        </div>
        <form onSubmit={formik.handleSubmit}>
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

          {/* //todo check if username exist */}

          {/* / Display error message/*/}
          
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
            Enter Email Address
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
              className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
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
        <p className="text-gray-600 text-xm">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer">Log in</span>
        </p>
        {/* { //todo navigate to login page } */}
      </div>

      {/* Right Side with Information */}
      <div className="w-2/3 p-10 flex flex-col justify-center bg-signup-bg bg-cover">
        <h2 className="text-4xl text-orange-50 font-bold mb-2">
          Sign Up Today
        </h2>
        <p className="text-2xl text-teal-50 mb-4">Here's What You'll Get:</p>
        <ul className="text-teal-100 list-disc list-inside space-y-1 text-[20px]">
          <li>Organize recipes.</li>
          <li>Share with friends.</li>
          <li>Discover personalized recipes.</li>
          <li>Tag and share.</li>
          <li>Invite friends.</li>
          <li>Rate others' recipes.</li>
          <li>Many more features.</li>
        </ul>
      </div>
    </div>
  );
};

export default SignupPage;
