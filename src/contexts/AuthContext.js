import React, { useContext, useState } from "react";

export const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}
export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  function login(username, password) {
    setCurrentUser({ username: username });
    return true;
  }
  const value = {
    currentUser,
    login,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
