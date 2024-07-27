import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const ContactForm = ({ isDarkMode }) => {
  const formik = useFormik({
    initialValues: {
      feedback: "",
      message: "",
      name: "",
      email: "",
      subscribe: false,
    },
    validationSchema: Yup.object({
      feedback: Yup.string().required("Feedback is required"),
      message: Yup.string().required("Message is required"),
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(JSON.stringify(values, null, 2));
      toast.success("Feedback submitted successfully!");
      resetForm();
    },
  });

  // Define base styles for input and textarea fields
  const baseInputStyles = `w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${
    isDarkMode
      ? "bg-gray-700 border-gray-600 text-white focus:ring-gray-400"
      : "bg-gray-100 border-gray-300 text-gray-800 focus:ring-orange-500"
  }`;

  // Define base styles for error messages
  const errorStyles = "text-red-500 mt-1 text-sm";

  return (
    <div
      className={`p-8 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-800"
      } shadow-lg rounded-lg`}
    >
      {/* Form title */}
      <h2 className="text-2xl font-bold mb-4">Send us feedback</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          {/* Feedback textarea */}
          <textarea
            id="feedback"
            name="feedback"
            placeholder="How can we help?"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.feedback}
            className={`${baseInputStyles} h-24 resize-none`}
            aria-label="Enter your feedback"
          />
          {/* Error message for feedback */}
          {formik.touched.feedback && formik.errors.feedback ? (
            <div className={errorStyles}>{formik.errors.feedback}</div>
          ) : null}
        </div>
        <div>
          {/* Message textarea */}
          <textarea
            id="message"
            name="message"
            placeholder="Your message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            className={`${baseInputStyles} h-24 resize-none`}
            aria-label="Enter your message"
          />
          {/* Error message for message */}
          {formik.touched.message && formik.errors.message ? (
            <div className={errorStyles}>{formik.errors.message}</div>
          ) : null}
        </div>
        <div>
          {/* Name input */}
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={baseInputStyles}
            aria-label="Enter your name"
          />
          {/* Error message for name */}
          {formik.touched.name && formik.errors.name ? (
            <div className={errorStyles}>{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          {/* Email input */}
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={baseInputStyles}
            aria-label="Enter your email address"
          />
          {/* Error message for email */}
          {formik.touched.email && formik.errors.email ? (
            <div className={errorStyles}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="flex place-items-baseline text-[14px]">
          {/* Subscribe checkbox */}
          <input
            id="subscribe"
            name="subscribe"
            type="checkbox"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.subscribe}
            className={`mr-2 h-4 w-4 cursor-pointer ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-gray-800"
            } rounded focus:ring-0`}
            aria-label="Subscribe to community updates"
          />
          <label htmlFor="subscribe">
            {/* Subscription label */}
            I would like to get community updates that highlight new discoveries
            and sharing opportunities on CIY.
          </label>
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
