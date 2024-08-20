import React, { useState,useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const AddToFav = ({ id, position = "", isFavorite, toggleTick }) => {
  const [isScaling, setIsScaling] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <button
      className={`${position} top-4 right-4 text-1xl pt-1 px-2 rounded-[50%] transition-ease-in-out 
                          ${
                            isFavorite
                              ? "text-red-500 bg-gray-200 opacity-100"
                              : "text-gray-500 bg-gray-200 opacity-100"
                          }
                           group-hover:opacity-100 hover:shadow-lg hover:scale-110 focus:outline-none`}
      onClick={() => {
        if (!isAuthenticated) {
          toast.error("Please login to add to favorites");
          return;
        }
        setIsScaling(true);
        setTimeout(() => {
          setIsScaling(false);
        }, 200);
        toggleTick(id);
        isFavorite = !isFavorite;
      }}
    >
      {isFavorite ? (
        <i
          className={`fas fa-heart ${
            isScaling
              ? "transform scale-150 transition-transform duration-200"
              : "transition-transform duration-200"
          }`}
        ></i>
      ) : (
        <i
          className={` ${
            isScaling
              ? "transform scale-0 transition-transform duration-100"
              : "transition-transform duration-200"
          } far fa-heart`}
        ></i>
      )}
    </button>
  );
};
export default AddToFav;
