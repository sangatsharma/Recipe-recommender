import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PreferencesForm from "./PreferencesForm";
import { formatDate } from "../../utils/dateFormat";

const EditProfile = ({ darkMode, user }) => {
  const [currentPage, setCurrentPage] = useState("userInfo");
  console.log(user);

  const formik = useFormik({
    initialValues: {
      fullName: user.name,
      username: user.name.split(" ")[0] + user.id,
      email: user.email,
      bio: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      username: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      bio: Yup.string(),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      z;
    },
  });

  return (
    <div
      className={`min-h-screen w-[60%] below-sm:w-[90%] p-6 flex flex-row below-sm:flex-col gap-4 ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/*left side*/}
      <div className="w-[40%] below-sm:w-[100%] mt-10">
        <div className="flex flex-col items-center  p-4 ">
          <div className="relative inline-block">
            <img
              src="https://scontent.fpkr1-1.fna.fbcdn.net/v/t1.6435-1/123108473_1042706159510253_7233714013747441365_n.jpg?stp=dst-jpg_s200x200&_nc_cat=101&ccb=1-7&_nc_sid=e4545e&_nc_ohc=GOlSoW344NAQ7kNvgG4LM0I&_nc_ht=scontent.fpkr1-1.fna&oh=00_AYC-bhW3uhMxbDO0iW6emfcaf-G8WxOzHxq1BwrCVB08Ew&oe=66A47335"
              alt="User Avatar"
              className="rounded-full size-32 mb-2 border-1 border-gray-400"
            />
            <div
              className="absolute top-1 right-3 w-6 h-6
              rounded-full border-2 border-white bg-blue-500 m-auto flex justify-center items-center p-2"
            >
              <i className={`fas fa-check text-white`}></i>
            </div>
          </div>
          <strong className="text-2xl">{user.name}</strong>
          <p className="mb-2 text-gray-400">
            @{user.name.split(" ")[0] + user.id}
          </p>

          <button className="py-2 px-4 bg-orange-500 text-white rounded">
            Upload New Photo
          </button>
          <p className="text-sm mt-4 text-center p-2 rounded-xl bg-[#dde0e296]">
            Upload a new avatar. Larger image will be resized automatically.
            <br />
            <br />
            Maximum upload size is <strong>1 MB.</strong>
          </p>
          <p className="text-sm mt-2 text-center">
            Member Since:{" "}
            <strong>
              {formatDate(
                new Date(user.joinedOn).toLocaleString().split(",")[0]
              )}
            </strong>
          </p>
        </div>
      </div>

      {/*right side*/}
      <div className="flex w-[50%] below-sm:w-[100%] flex-col">
        <h1 className="text-2xl">Edit Profile</h1>

        <div className="flex flex-row w-full gap-16 mt-4 ml-8">
          <h2
            className={` ${
              currentPage == "userInfo" ? "border-b-4 text-2xl" : ""
            } border-orange-300 cursor-pointer`}
            onClick={() => setCurrentPage("userInfo")}
          >
            Info
          </h2>
          <h2
            className={` ${
              currentPage == "userPreferences" ? "border-b-4 text-2xl" : ""
            } border-orange-300 cursor-pointer`}
            onClick={() => setCurrentPage("userPreferences")}
          >
            Preferences
          </h2>
        </div>

        <div className="pl-4 mt-3">
          {/* user Info*/}
          {currentPage === "userInfo" && (
            <form onSubmit={formik.handleSubmit} className="p-4">
              <div className="mb-4">
                <label className="block">Full Name</label>
                <input
                  type="text"
                  autoComplete="Name"
                  name="fullName"
                  {...formik.getFieldProps("fullName")}
                  className="w-full p-2 border rounded"
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                  <div className="text-red-600">{formik.errors.fullName}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="block">Username</label>
                <input
                  autoComplete="username"
                  type="text"
                  name="username"
                  {...formik.getFieldProps("username")}
                  className="w-full p-2 border rounded"
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-red-600">{formik.errors.username}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="block">Email Address</label>
                <input
                  autoComplete="Email"
                  type="email"
                  name="email"
                  {...formik.getFieldProps("email")}
                  className="w-full p-2 border rounded"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-600">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="block">Add bio</label>
                <input
                  autoComplete="Bio"
                  type="text"
                  name="bio"
                  {...formik.getFieldProps("bio")}
                  className="w-full p-2 border rounded"
                />
                {formik.touched.email && formik.errors.bio ? (
                  <div className="text-red-600">{formik.errors.bio}</div>
                ) : null}
              </div>
              {/* <div className="mb-4">
                <label className="block">Password</label>
                <input
                  autoComplete="new-password"
                  type="password"
                  name="password"
                  {...formik.getFieldProps("password")}
                  className="w-full p-2 border rounded"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-600">{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="block">Confirm Password</label>
                <input
                  autoComplete="new-password"
                  type="password"
                  name="confirmPassword"
                  {...formik.getFieldProps("confirmPassword")}
                  className="w-full p-2 border rounded"
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="text-red-600">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div> */}

              <button
                type="submit"
                className="block w-full py-2 px-4 bg-blue-500 text-white rounded"
              >
                Update Info
              </button>
            </form>
          )}
          {/* user Preferences*/}
          {currentPage === "userPreferences" && <PreferencesForm />}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
