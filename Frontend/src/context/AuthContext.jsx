import React, { createContext, useState, useEffect } from "react";
import { checkCookieStatus } from "../utils/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const data = await checkCookieStatus();
        if (data && data.success) {
          setIsAuthenticated(true);
          console.log(data);
          setUserInfo(data.body);
        } else {
          setIsAuthenticated(false);
          setUserInfo(null);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsAuthenticated(false);
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated,setIsAuthenticated, userInfo, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

