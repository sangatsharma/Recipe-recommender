import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // For CommonJS environment

export const getToken = () => {
  return Cookies.get("token");
};

export const removeToken = () => {
  Cookies.remove("token");
};

export const isAuthenticated = () => {
  const token = getToken();
  

  if (token) {
    try {
      console.log("token", token);
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < Date.now()) {
        removeToken();
        return false;
      }

      return true;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  }

  return false;
};

