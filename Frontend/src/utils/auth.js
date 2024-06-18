import axios from "axios";
export const isAuthenticated = async (setIsLoggedIn) => {
  try {
    const response = await axios.get(
      "https://recipe-recommender-backend.vercel.app/user/validate"
    );
    console.log(response.data);
    setIsLoggedIn(response.data.success);
  } catch (err) {
    console.error(err);
  }
};
// export const fetchValue = async () => {
//   try {
//     const check = await isAuthenticated();
//     // const check = { success: true };
//     setIsLoggedIn(check.success);
//   } catch (err) {
//     console.error(err);
//   }
// };
