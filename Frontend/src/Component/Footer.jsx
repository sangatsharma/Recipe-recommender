import React from "react";
import footerLogo from "../assets/Images/Logo_SVG.svg";
const Footer = () => {
  return (
    <footer className="bg-blue-100 text-gray-800 py-4 mx-auto">
      <div className="container mx-auto px-2"> 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          <div className="flex flex-col justify-center mx-auto items-center md:items-start">
            <img src={footerLogo} alt="Logo" className="w-24 h-24 mx-auto " />
            <p className="font-bold text-xl text-orange-400">Cook It Yourself</p>
          </div>

          {/* Website Links */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-4">Website</h3>
            <ul>
              <li>
                <a href="#about" className="hover:text-pink-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-pink-600">
                  Contact
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-pink-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-pink-600">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul>
              <li>
                <a href="#appetizers" className="hover:text-pink-600">
                  Appetizers
                </a>
              </li>
              <li>
                <a href="#main-course" className="hover:text-pink-600">
                  Main Course
                </a>
              </li>
              <li>
                <a href="#desserts" className="hover:text-pink-600">
                  Desserts
                </a>
              </li>
              <li>
                <a href="#vegetarian" className="hover:text-pink-600">
                  Vegetarian
                </a>
              </li>
              <li>
                <a href="#vegan" className="hover:text-pink-600">
                  Vegan
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <p>Amarsingh Chowk, Pokhara</p>
            <p>
              <a
                href="mailto:CookitYourself@gmail.com"
                className="hover:text-pink-600"
              >
                CookitYourself@gmail.com
              </a>
            </p>
            <p>+977 9800000000</p>
          </div>

          {/* Follow Us */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <ul>
              <li>
                <a href="#facebook" className="hover:text-pink-600">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#twitter" className="hover:text-pink-600">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#instagram" className="hover:text-pink-600">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#youtube" className="hover:text-pink-600">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-2 text-center">
          <hr className="border-gray-300" />
          <p className="mt-2 text-sm">&copy; 2024 Cook It Yourself</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
