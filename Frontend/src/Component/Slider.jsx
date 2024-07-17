import React, { useState, useEffect } from "react";

const Slider = ({ images, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Determine the type of images array
  const isArray = Array.isArray(images);
  const isObjectArray = isArray && typeof images[0] === "object";
  const isImageArray = isArray && typeof images[0] === "string";

  // Effect to handle the automatic sliding
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(slideInterval);
  }, [images.length, interval]);

  // Return null if images array is empty
  if (images.length === 0) return null;

  // Slider for an array of image URLs
  if (isImageArray)
    return (
      <div className="relative w-full h-96 overflow-hidden rounded-md">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== currentIndex}
          >
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );

  // Slider for an array of objects with image URLs and titles
  return (
    <div className="relative w-full h-96 overflow-hidden rounded-md">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== currentIndex}
        >
          <img
            src={image.src}
            alt={image.alt || `Slide ${index}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex text-center">
        {images.map(
          (image, index) =>
            index === currentIndex && (
              <div
                className="bg-opacity-40 bg-slate-400 p-2 max-w-fit rounded-lg"
                key={index}
              >
                <h2 className="text-white md:text-4xl lg:text-5xl font-bold">
                  {image.title}
                </h2>
              </div>
            )
        )}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
