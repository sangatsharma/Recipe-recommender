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
