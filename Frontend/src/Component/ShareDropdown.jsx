import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { FaFacebookF, FaTwitter, FaWhatsapp, FaShareAlt } from "react-icons/fa";

const ShareDropdown = ({ url, title, text, image, hashtags }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  const encodedHashtags = encodeURIComponent(hashtags.join(","));
  console.log("url---->",image)

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title,
          text,
          url,
        })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  return (
    <>
      <Helmet>
        {/* Open Graph tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={text} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={text} />
        <meta name="twitter:image" content={image} />
      </Helmet>

      <div className="relative inline-block" ref={dropdownRef}>
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded-md focus:outline-none flex  items-center hover:bg-blue-800"
          onClick={toggleDropdown}
        >
          Share
          <FaShareAlt className="pl-2" />
        </button>
        {isOpen && (
          <div className="relative">
            {/* Arrow */}
            <div className="absolute top-0.5 right-4 w-4 h-4 z-0 bg-white border border-gray-200 transform rotate-45"></div>

            {/* Dropdown content */}
            <div className="absolute right-0 mt-2 w-48 bg-white text-black flex flex-col gap-2 border border-gray-200 rounded-md shadow-lg z-10">
              {/* Native Share */}
              <button
                onClick={handleNativeShare}
                className="flex items-center px-4 py-2 hover:bg-gray-100 focus:outline-none"
                aria-label="Share via Native Share"
              >
                Share
                <FaShareAlt className="pl-2" />
              </button>
              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 hover:bg-gray-100"
                aria-label="Share on Facebook"
              >
                Facebook
                <FaFacebookF className="pl-2" />
              </a>
              {/* Twitter */}
              <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}&hashtags=${encodedHashtags}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 hover:bg-gray-100"
                aria-label="Share on Twitter"
              >
                Twitter
                <FaTwitter className="pl-2" />
              </a>
              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 hover:bg-gray-100"
                aria-label="Share on WhatsApp"
              >
                WhatsApp
                <FaWhatsapp className="pl-2" />
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShareDropdown;
