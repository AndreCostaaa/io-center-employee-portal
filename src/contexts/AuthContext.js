import React, { useContext, useState } from "react";
import axios from "axios";

export const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}
export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  async function login(username, password) {
    const config = { auth: { username: username, password: password } };
    const res = await axios
      .post(process.env.REACT_APP_API_LOGIN_END_POINT, {}, config)
      .then((res) => {
        let data = res.data;
        setCurrentUser({
          id: data.id,
          name: data.name,
          role: data.role,
          token: data.access_token,
        });
        localStorage.setItem("user", JSON.stringify(currentUser));
        return true;
      })
      .catch((err) => {
        //console.log(err.response.data);
        return false;
      });
    return res;
  }
  async function verifyStoredToken() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      //no user stored
      return false;
    }

    const config = {
      headers: { Authorization: `Bearer ${storedUser.token}` },
    };
    const res = await axios
      .post(process.env.REACT_APP_API_TOKEN_VERIFICATION_END_POINT, {}, config)
      .then((res) => {
        setCurrentUser(storedUser);
        return true;
      })
      .catch((err) => {
        return false;
      });
    return res;
  }
  const value = {
    currentUser,
    login,
    verifyStoredToken,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
