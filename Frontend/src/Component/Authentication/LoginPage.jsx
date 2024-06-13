import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("* Enter your email."),
      password: Yup.string().required('* Enter your password."'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="bg-white shadow-lg rounded-lg flex overflow-hidden w-3/4 mt-[20px]">
      {/* Right Side with Information */}
      <div className="w-2/3 p-10 flex flex-col justify-end text-center bg-login-bg bg-cover">
        <h2 className="text-5xl text-sky-500  font-bold mb-2">Welcome Back!</h2>
        <br />
        <p className="text-2xl text-black mb-4 pl-4">
          Explore and share more delicious recipes today!
        </p>
      </div>

      {/* Left Side with Form */}
      <div className="w-1/2 p-10 bg-slate-200">
        <div className="flex flex-row justify-center mb-4">
          {/* <img src="path/to/logo.png" alt="ads" className="h-12" /> */}
          <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg">
            Cook It Yourself
          </span>
        </div>
        <form onSubmit={formik.handleSubmit}>
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

          <div className="mb-1">
            <button
              className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-[8px]"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <hr className="border-t-1 border-orange-500 my-1" />
        <p className="text-gray-600 text-xm">
          Don't have an account?
          <span className="text-blue-600 cursor-pointer"> Sign up</span>
        </p>
        {/* { //todo navigate to signup page } */}
      </div>
    </div>
  );
};

export default LoginPage;