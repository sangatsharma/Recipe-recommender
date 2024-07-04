import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";

const LoginPage = () => {
  const { setIsAuthenticated, isAuthenticated } = useContext(AuthContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    window.location.reload();
    toast.success("Login successful!");
  };
  const googleOauth = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/user/auth/oauth`;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("* Enter your email."),
      password: Yup.string().required("* Enter your password."),
    }),
    onSubmit: async (values) => {
      setIsButtonDisabled(true);
      // Re-enable the button after 4 second  to allow the user to search again
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 4000);
      // Req to backend
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/auth/login`,
        values,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // If error
      if (!res.data.success) {
        toast.error(`${res.data.body.message}`);
      }
      // Successfully signed in then
      else {
        handleLogin();
      }
    },
  });
  return (
    <div className="bg-white shadow-lg rounded-lg flex flex-row flex-wrap overflow-hidden mt-[20px] below-sm:flex-col below-sm:w-[95%] w-[400px]">
      <Helmet>
        <title>Login - CIY </title>
      </Helmet>
      <div className="below-sm:w-[100%] p-10 bg-slate-200 w-[100%]">
        {/* <img className="h-12 " src={logo} /> */}
        <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg py-4 ">
          Login
        </p>

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
            <div className="flex flex-row justify-between">
              <span className="text-red-500 text-sm">
                {formik.errors.password}
              </span>
              <p className="text-right text-sm cursor-pointer text-blue-600 pt-1 hover:underline">
                {/* //todo handle forget password */}
                <Link to="/"> Forgot password?</Link>
              </p>
            </div>
          ) : (
            <div className="flex flex-row justify-between">
              <span className="text-slate-200 text-[2px]">*</span>
              <p className="text-right text-sm cursor-pointer text-blue-600 pt-1 hover:underline ">
                {/* //todo handle forget password */}
                <Link to="/"> Forgot password?</Link>
              </p>
            </div>
          )}
          <div className="my-1 ">
            <button
              className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-[8px] w-full"
              type="submit"
              disabled={isButtonDisabled}
            >
              Login
            </button>
          </div>
        </form>
        <hr className="border-t-1 border-orange-500 my-1" />
        <div className="flex flex-col gap-1 justify-center text-center pt-2">
          {/* <Link to="/"> */}
          <button
            className="flex flex-row gap-2 m-auto justify-center w-full bg-slate-300  text-gray-700 border-gray-400 hover:bg-slate-400 hover:text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
          {/* </Link> */}
          <p className="text-gray-600 text-xm">
            Don't have an account?
            <span className="text-blue-600 cursor-pointer hover:underline">
              <Link to="/signup"> Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
