import { api_get, api_post } from "../api/api";
import React, { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    sessionStorage.setItem("client-selected", JSON.stringify(clientSelected));
  }, [clientSelected]);
  function getBearerAuthConfig() {
    return {
      headers: {
        Authorization: `Bearer ${currentUser ? currentUser.token : ""}`,
      },
    };
  }
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
    const config = getBearerAuthConfig();
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

  async function getAllClients() {
    const config = getBearerAuthConfig();
    const res = await api_get(
      process.env.REACT_APP_API_CLIENT_END_POINT,
      config
    );

    switch (res.status) {
      case 200:
        return { status: true, message: res.data };
      case 401:
        return { status: false, message: "Session expired. Log in" };
      case 500:
        return { status: false, message: "Server Error. Try again" };
      default:
        return { status: false, message: "Unknown Error. Try again" };
    }
  }
  async function getCarsFromClient(owner_id) {
    const auth = getBearerAuthConfig();
    const config = {
      auth,
      params: {
        owner_id: owner_id,
      },
    };
    console.log(config);
    const res = await api_get(
      process.env.REACT_APP_API_VEHICLE_END_POINT,
      config
    );
    switch (res.status) {
      case 200:
        return { status: true, message: res.data };
      case 401:
        return { status: false, message: "Session expired. Log in" };
      case 500:
        return { status: false, message: "Server Error. Try again" };
      case 404:
        return { status: false, message: "No car found" };
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
    setClientSelected,
    getAllClients,
    getCarsFromClient,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
