import React, { createContext, useState, useEffect } from "react";
import { checkCookieStatus, getUserPreferences } from "../utils/auth";

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
          setUserInfo(data.body);
          userPref();
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
    const userPref = async () => {
      try {
        const data = await getUserPreferences();
        if (data && data.success) {
          setUserInfo((prevValues) => ({
            ...prevValues,
            preferences: data.body,
          }));
        }
      } catch (error) {
        console.error("Error fetching user preferences:", error);
      }
    };

    verifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userInfo,
        loading,
        setUserInfo,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
