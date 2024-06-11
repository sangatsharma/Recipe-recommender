import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col w-[300px] mx-auto"
    >
      <label className="mt-2.5" htmlFor="email">
        Email Address
      </label>
      <input
        className="mb-2.5 p-2 text-base"
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="text-red-500 text-sm">{formik.errors.email}</div>
      ) : null}

      <label className="mt-2.5" htmlFor="password">
        Password
      </label>
      <input
        className="mb-2.5 p-2 text-base"
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="text-red-500 text-sm">{formik.errors.password}</div>
      ) : null}

      <label className="mt-2.5" htmlFor="confirmPassword">
        Confirm Password
      </label>
      <input
        className="mb-2.5 p-2 text-base"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.confirmPassword}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <div className="text-red-500 text-sm">
          {formik.errors.confirmPassword}
        </div>
      ) : null}

      <button
        className="p-2.5 bg-blue-500 text-white border-none rounded cursor-pointer hover:bg-blue-700"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
