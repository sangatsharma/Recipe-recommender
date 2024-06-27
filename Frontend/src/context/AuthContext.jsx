import React, { createContext, useState, useEffect } from "react";
import { checkCookieStatus } from "../utils/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const data = await checkCookieStatus();
      if (data && typeof data.success !== "undefined") {
        setIsAuthenticated(data.success);
        setUserInfo(data.body);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userInfo }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
