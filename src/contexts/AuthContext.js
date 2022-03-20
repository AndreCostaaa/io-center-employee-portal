import React, { useContext, useState } from "react";
import { api_post } from "../api/api.js";
export const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}
export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  async function login(username, password) {
    const config = {
      auth: { username: username, password: password },
    };
    const res = await api_post(
      process.env.REACT_APP_API_LOGIN_END_POINT,
      config,
      {}
    );
    switch (res.status) {
      case 200:
        let data = res.data;
        setCurrentUser({
          id: data.id,
          name: data.name,
          role: data.role,
          token: data.access_token,
        });
        localStorage.setItem("user", JSON.stringify(currentUser));

        return { status: true, message: "Login successful" };
      case 401:
        return { status: false, message: "Wrong username or password" };
      case 500:
        return { status: false, message: "Server problem. Try again" };
      default:
        return { status: false, message: "Unknown Error" };
    }
  }
  async function verifyStoredToken() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser && !currentUser) {
      //no user stored
      return { status: false, message: "No user" };
    }

    const config = {
      headers: {
        Authorization: `Bearer ${
          storedUser ? storedUser.token : currentUser.token
        }`,
      },
    };
    const res = await api_post(
      process.env.REACT_APP_API_TOKEN_VERIFICATION_END_POINT,
      config,
      {}
    );
    switch (res.status) {
      case 200:
        if (storedUser && !currentUser) {
          setCurrentUser(storedUser);
        }

        return { status: true, message: "Token is valid" };
      case 401:
        logout();
        return { status: false, message: "Token is invalid. Log in" };
      default:
        logout();
        return { status: false, message: "Unknown Error" };
    }
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
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
