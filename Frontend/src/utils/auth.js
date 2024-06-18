import axios from "axios";
export const isAuthenticated = async () => {
  const response = await axios.get(
    "https://recipe-recommender-backend.vercel.app/user/validate"
  );
  return response.data;
};
export const fetchValue = async (setIsLoggedIn) => {
  try {
    const check = await isAuthenticated();
    console.log(check);
    setIsLoggedIn(check.success);
  } catch (err) {
    console.error(err);
  }
};
