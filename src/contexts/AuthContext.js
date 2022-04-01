import React, { useContext } from "react";
import { api_post, api_patch } from "../api/api.js";
export const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}
export default function AuthProvider({ children }) {
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
        localStorage.setItem("user", JSON.stringify(res.data));

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
    const user = getCurrentUser();

    return `Bearer ${user ? user.access_token : ""}`;
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
  async function changeUser(data) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: getToken(),
      },
    };
    const res = await api_patch(
      process.env.REACT_APP_API_USER_END_POINT,
      data,
      config
    );
    let message;
    switch (res.status) {
      case 200:
        message = res.data;
        break;
      default:
        message = "Error occurred. Try again";
        break;
    }
    return { status: res.status, message: message };
  }
  function logout() {
    localStorage.clear();
  }
  function getCurrentUser() {
    let storedUser = localStorage.getItem("user");
    if (!storedUser) {
      return null;
    }
    return JSON.parse(storedUser);
  }

  const value = {
    login,
    logout,
    verifyStoredToken,
    getToken,
    getCurrentUser,
    changeUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
