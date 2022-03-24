import React, { useContext, useEffect, useState } from "react";
import { api_post } from "../api/api.js";
export const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}
export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  async function login(username, password) {
    const config = {
      auth: { username: username, password: password },
    };
    const res = await api_post(
      process.env.REACT_APP_API_LOGIN_END_POINT,
      {},
      config
    );
    let message = "";

    switch (res.status) {
      case 200:
        setCurrentUser(res.data);

        message = "Login successful";
        break;
      case 401:
        message = "Wrong username or password";
        break;
      case 500:
        message = "Server problem. Try again";
        break;
      default:
        message = "Unknown Error";
        break;
    }
    return { status: res.status, message: message };
  }
  function getToken() {
    let storedUser = localStorage.getItem("user");
    if (storedUser !== "") {
      storedUser = JSON.parse(storedUser);
    } else {
      return null;
    }
    if (!storedUser && !currentUser) {
      return null;
    }
    if (!currentUser) {
      setCurrentUser(storedUser);
    }
    return `Bearer ${
      currentUser ? currentUser.access_token : storedUser.access_token
    }`;
  }

  async function verifyStoredToken() {
    const token = getToken();
    if (!token) {
      return { status: 404, message: "No Current User" };
    }
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await api_post(
      process.env.REACT_APP_API_TOKEN_VERIFICATION_END_POINT,
      {},
      config
    );
    let message = "";
    switch (res.status) {
      case 200:
        message = "Token is valid";
        break;
      case 401:
        message = "Token is Invalid. Log in";

        break;
      case 500:
        message = "Server Error. Try again";
        break;
      default:
        message = "Unknown Error";
        break;
    }
    return { status: res.status, message: message };
  }
  function logout() {
    localStorage.clear();
    setCurrentUser(null);
  }
  const value = {
    currentUser,
    login,
    logout,
    verifyStoredToken,
    getToken,
    setCurrentUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
