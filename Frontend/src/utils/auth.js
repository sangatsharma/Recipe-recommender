import axios from "axios";
//export to AuthContext.jsx
export const checkCookieStatus = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/user`,
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

//function to fetch user preferences from database,export to Profile Page
export const getUserPreferences = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/user/pref`,
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

//  function to fetch item by ID from a database,export to RecipeDetails Page
export const fetchItemById = async (RecipeId, RecipeName) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/recipe/filter`,
      {
        name: RecipeName,
        id: RecipeId,
      },
      { withCredentials: true }
    );
    if (response.data.success == false) return response.data;
    return response.data.body[0];
  } catch (error) {
    console.error("Error fetching item:", error);
    throw error;
  }
};
//  function to fetch userDetails using ID from a database,export to RecipeDetails Page and profile page
export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/user/profile/${userId}`,
      { withCredentials: true }
    );
    if (response.data.success == false) return response.data;
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const handleLogout = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    if (err.response) {
      // Handle response errors
      console.error("Logout failed with status:", err.response.status);
      console.error("Response data:", err.response.data);
    } else if (err.request) {
      // Handle request errors
      console.error("No response received:", err.request);
    } else {
      // Handle other errors
      console.error("Error in request setup:", err.message);
    }
    throw err; // Optionally rethrow the error
  }
};
