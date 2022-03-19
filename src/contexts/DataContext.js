import { api_get, api_post } from "../api/api";
import React, { useContext, useState } from "react";
import { useAuth } from "./AuthContext";
export const DataContext = React.createContext(null);

export function useData() {
  return useContext(DataContext);
}
export default function DataProvider({ children }) {
  const { currentUser } = useAuth();
  const [carSelected, setCarSelected] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [data, setData] = useState(null);
  const [id, setId] = useState(0);
  const [clientSelected, setClientSelected] = useState(null);
  async function createClient(
    name,
    lastName,
    address,
    city,
    npa,
    phoneNumber,
    email
  ) {
    let fd = new FormData();

    fd.append("name", name);
    fd.append("last_name", lastName);
    fd.append("address", address);
    fd.append("city", city);
    fd.append("npa", npa);
    fd.append("phone_number", phoneNumber);
    fd.append("email_address", email);

    const config = {
      headers: {
        Authorization: `Bearer ${currentUser ? currentUser.token : ""}`,
      },
    };
    const res = await api_post(
      process.env.REACT_APP_API_CLIENT_END_POINT,
      config,
      fd
    );

    switch (res.status) {
      case 201:
        if (!res.data.id) {
          return {
            status: false,
            message: "Server Error. Contact Server Administrator",
          };
        }
        console.log(res.data);
        setClientSelected(res.data);
        return { status: true, message: "Created!" };
      case 401:
        return { status: false, message: "Session expired. Log in" };
      case 500:
        return { status: false, message: "Server Error. Try again" };
      default:
        return { status: false, message: "Unknown Error. Try again" };
    }
  }
  const value = {
    carSelected,
    setCarSelected,
    searchResults,
    setSearchResults,
    id,
    setId,
    createClient,
    clientSelected,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
