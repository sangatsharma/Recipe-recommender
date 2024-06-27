import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const EditProfile = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const formik = useFormik({
    initialValues: {
      fullName: 'James Allan',
      username: 'Allan',
      email: 'demo@mail.com',
      facebook: '',
      twitter: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Required'),
      username: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-900 rounded shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl">Edit Profile</h1>
          <button onClick={toggleDarkMode} className="px-3 py-1 bg-blue-500 text-white rounded">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <div className="flex">
          {/* Left Column */}
          <div className="w-1/3">
            <div className="flex flex-col items-center p-4">
              <img src="https://via.placeholder.com/150" alt="User Avatar" className="rounded-full mb-4" />
              <button className="py-2 px-4 bg-orange-500 text-white rounded">
                Upload New Photo
              </button>
              <p className="text-sm mt-4 text-center">
                Upload a new avatar. Larger image will be resized automatically. Maximum upload size is 1 MB.
              </p>
              <p className="text-sm mt-2 text-center">Member Since: <strong>29 September 2019</strong></p>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="w-2/3 pl-4">
            <form onSubmit={formik.handleSubmit} className="p-4">
              <div className="mb-4">
                <label className="block">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  {...formik.getFieldProps('fullName')}
                  className="w-full p-2 border rounded"
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                  <div className="text-red-600">{formik.errors.fullName}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="block">Username</label>
                <input
                  type="text"
                  name="username"
                  {...formik.getFieldProps('username')}
                  className="w-full p-2 border rounded"
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-red-600">{formik.errors.username}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="block">Email Address</label>
                <input
                  type="email"
                  name="email"
                  {...formik.getFieldProps('email')}
                  className="w-full p-2 border rounded"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-600">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  name="password"
                  {...formik.getFieldProps('password')}
                  className="w-full p-2 border rounded"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-600">{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="block">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  {...formik.getFieldProps('confirmPassword')}
                  className="w-full p-2 border rounded"
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <div className="text-red-600">{formik.errors.confirmPassword}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="block">Social Profiles</label>
                <input
                  type="text"
                  name="facebook"
                  {...formik.getFieldProps('facebook')}
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Facebook Username"
                />
                <input
                  type="text"
                  name="twitter"
                  {...formik.getFieldProps('twitter')}
                  className="w-full p-2 border rounded"
                  placeholder="Twitter Username"
                />
              </div>
              <button type="submit" className="block w-full py-2 px-4 bg-blue-500 text-white rounded">
                Update Info
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
