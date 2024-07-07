import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PreferencesForm from "./PreferencesForm";
import { AuthContext } from "../../context/AuthContext";
import ImageCropper from "../../Component/ImageCropper";
import Loader from "../../Component/Loader/Loader";
import { formatDate } from "../../utils/dateFormat";
import { getCity } from "../../utils/weather";

const EditProfile = () => {
  const { userInfo, loading } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState("userInfo");
  const [profilePic, setProfilePic] = useState(
    userInfo?.profile_pic ||
      "https://www.clipartkey.com/mpngs/m/208-2089363_user-profile-image-png.png"
  );
  const [city, setCity] = useState("");
  useEffect(() => {
    getCity().then((city) => setCity(city));
  }, []);
  const formik = useFormik({
    initialValues: {
      fullName: userInfo?.name || "",
      DOB: userInfo?.DOB || "",
      email: userInfo?.email || "",
      bio: "",
      city: userInfo?.city || city,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      DOB: Yup.string().required("Required").nullable(),
      email: Yup.string().email("Invalid email address").required("Required"),
      bio: Yup.string(),
      city: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  if (loading) {
    console.log("loading");
    return <Loader />;
  }

  if (!userInfo) {
    return <div>Failed to load user info</div>; // Show error if userInfo is not available
  }

  return (
    <div
      className={`w-[60%] below-sm:w-[90%] flex flex-row below-sm:flex-col gap-4 below-sm:gap-2 m-auto`}
    >
      {/* Left side */}
      <div className="w-[40%] below-sm:w-[100%] below-sm:mt-2 mt-10">
        <div className="flex flex-col items-center p-4">
          <ImageCropper
            userInfo={userInfo}
            profilePic={profilePic}
            setProfilePic={setProfilePic}
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex w-[50%] below-sm:w-[100%] flex-col">
        <h1 className="text-2xl">Edit Profile</h1>

        <div className="flex flex-row w-full gap-16 mt-4 ml-8">
          <h2
            className={`${
              currentPage === "userInfo" ? "border-b-4 text-2xl" : ""
            } border-orange-300 cursor-pointer`}
            onClick={() => setCurrentPage("userInfo")}
          >
            Info
          </h2>
          <h2
            className={`${
              currentPage === "userPreferences" ? "border-b-4 text-2xl" : ""
            } border-orange-300 cursor-pointer`}
            onClick={() => setCurrentPage("userPreferences")}
          >
            Preferences
          </h2>
        </div>

        <div className="pl-4 mt-3">
          {/* User Info */}
          {currentPage === "userInfo" && (
            <form onSubmit={formik.handleSubmit} className="p-4">
              <div className="mb-4">
                <label className="block">Full Name</label>
                <input
                  type="text"
                  autoComplete="Name"
                  name="fullName"
                  {...formik.getFieldProps("fullName")}
                  className="w-full p-2 border rounded text-black"
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                  <div className="text-red-600">{formik.errors.fullName}</div>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="block">Email Address</label>
                <input
                  autoComplete="Email"
                  type="email"
                  name="email"
                  disabled
                  {...formik.getFieldProps("email")}
                  className="w-full p-2 border rounded text-black"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-600">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label>Birthday:</label>
                <br />
                <DatePicker
                  placeholderText="Select a date"
                  selected={formik.values.DOB}
                  onChange={(date) =>
                    formik.setFieldValue("DOB", formatDate(date))
                  }
                  dateFormat="yyyy/MM/dd"
                  className="w-full p-2 border rounded text-black"
                />
                {formik.touched.DOB && formik.errors.DOB ? (
                  <div className="text-red-600">{formik.errors.DOB}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="block">City</label>
                <input
                  autoComplete="City"
                  type="text"
                  name="city"
                  {...formik.getFieldProps("city")}
                  className="w-full p-2 border rounded text-black"
                />
                {formik.touched.city && formik.errors.city ? (
                  <div className="text-red-600">{formik.errors.city}</div>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="block">Add bio</label>
                <input
                  autoComplete="Bio"
                  type="text"
                  name="bio"
                  {...formik.getFieldProps("bio")}
                  className="w-full p-2 border rounded text-black"
                />
                {formik.touched.bio && formik.errors.bio ? (
                  <div className="text-red-600">{formik.errors.bio}</div>
                ) : null}
              </div>
              <button
                type="submit"
                className="block w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded"
              >
                Update Info
              </button>
            </form>
          )}
          {/* User Preferences */}
          {currentPage === "userPreferences" && <PreferencesForm />}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
