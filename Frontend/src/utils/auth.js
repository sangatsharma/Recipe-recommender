import axios from "axios";
export const isAuthenticated = async (setIsLoggedIn) => {
  try {
    const response = await axios.get(
      "https://recipe-recommender-backend.vercel.app/user/validate",
      { withCredentials: true }
    );
    console.log(response.data);
    setIsLoggedIn(response.data.success);
  } catch (err) {
    console.error(err);
  }
};
export const handleLogout = async () => {
  try {
    const response = await axios.get(
      "https://recipe-recommender-backend.vercel.app/user/auth/logout",
      { withCredentials: true }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
