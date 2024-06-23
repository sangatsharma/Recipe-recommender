import React from "react";
import ContactForm from "../Component/ContactForm";
import { useThemeContext } from "../context/ThemeContext";
import Weather from "./Weather";

const Contact = () => {
  const { isDarkMode } = useThemeContext();
const handleReportProblem=(e)=>{
  const recipientEmail = 'reciperecommenderapp@gmail.com';

  // Example email content
  const subject = 'Report a Problem.';
  const body = 'I found a bug in the app. Here are the details: \n\n\n-';
  const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
  window.location.href = mailtoUrl;
}



  return (
    <div className="w-auto p-4 flex flex-row  justify-center mt-2 gap-4  below-sm:flex-col-reverse">
      <div
        className={`w-1/2  below-sm:w-[100%] ${
          isDarkMode ? "bg-gray-800" : "bg-gray-50"
        } p-8 rounded-lg shadow-lg`}
      >
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="mb-4">
          We're here to help. Let us know how we can assist you.
        </p>
        <button className="w-full cursor-pointer hover:bg-gray-300 bg-gray-200 text-black p-2 rounded mb-4" onClick={handleReportProblem}>
          Report a Problem
        </button>
        <h3 className="text-xl font-semibold mb-2">Connect with us</h3>
        <ul>
          <li className="mb-2 flex items-center">
            <i className="fab fa-facebook fa-lg mr-2"></i>
            <span>Facebook</span>
          </li>
          <li className="mb-2 flex items-center">
            <i className="fab fa-whatsapp fa-lg mr-2"></i>
            <span>WhatsApp</span>
          </li>
          <li className="mb-2 flex items-center">
            <i className="fab fa-instagram fa-lg mr-2"></i>
            <span>Instagram</span>
          </li>
          <li className="mb-2 flex items-center">
            <i className="fas fa-phone fa-lg mr-2"></i>
            <span>+977-9812345670</span>
          </li>
        </ul>
        <Weather />
      </div>
      <div className="w-1/2  below-sm:w-[100%]">
        <ContactForm isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Contact;
