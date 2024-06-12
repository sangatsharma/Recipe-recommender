import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='flex flex-col w-[300px] mx-auto'>
      <label htmlFor="email" className='mt-2.5'>Email Address</label>
      <input
      className='mb-2.5 p-2 text-base'
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className='text-red-500 text-sm'>{formik.errors.email}</div>
      ) : null}
      <label className="mt-2.5" htmlFor="password">Password</label>
      <input
      className='mb-2.5 p-2 text-base'
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div className='text-red-500 text-sm'>{formik.errors.password}</div>
      ) : null}

      <button className='p-2.5 bg-blue-500 text-white border-none rounded cursor-pointer hover:bg-blue-700' type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

// Welcome Back!

// Dive back into your culinary adventure—explore, share, and discover even more delicious recipes today!

// Welcome Back!

// Access your favorite recipes.
// Connect with friends over delicious discoveries.
// Continue exploring personalized recipe recommendations.
// Keep tagging and sharing your culinary creations.
// Engage with and rate recipes from the community.
// Discover new and exciting features.
