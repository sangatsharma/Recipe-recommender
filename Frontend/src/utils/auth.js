import axios from "axios";
//export to AuthContext.jsx
export const checkCookieStatus = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/user/validate`,
      { withCredentials: true }
    );
    return response.data.success;
  } catch (err) {
    console.error(err);
  }
};


//todo add the following function to the logout section
export const handleLogout = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/auth/logout`,
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
export const getCookie = (name) => {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; "); // Split into individual cookies
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName == name) {
      return cookieValue; // Return the value if name matches
    }
  }
  return null; // Return null if not found
};
