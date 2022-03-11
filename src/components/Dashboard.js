import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
export default function Dashboard() {
  const { currentUser } = useContext(AuthContext);
  return <h1>Hello {currentUser.username}</h1>;
}
