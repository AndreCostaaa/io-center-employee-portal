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
  const [clientSelected, setClientSelected] = useState(null);

  useEffect(() => {
    localStorage.setItem("client-selected", JSON.stringify(clientSelected));
    localStorage.setItem("car-selected", JSON.stringify(carSelected));
  }, [clientSelected, carSelected]);

  function updateClientAndCarFromLocalStorage() {
    setClientSelected(JSON.parse(localStorage.getItem("client-selected")));
    setCarSelected(JSON.parse(localStorage.getItem("car-selected")));
  }
  function getBearerAuthConfig() {
    return {
      headers: {
        Authorization: `Bearer ${currentUser ? currentUser.token : ""}`,
      },
    };
  }
  async function createClient(data) {
    const config = getBearerAuthConfig();
    const res = await api_post(
      process.env.REACT_APP_API_CLIENT_END_POINT,
      data,
      config
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
    const res = await api_get(
      process.env.REACT_APP_API_VEHICLE_END_POINT,
      config
    );
    let message;
    switch (res.status) {
      case 200:
        message = res.data;
        break;
      case 401:
        message = "Session Expired. Log in";
        break;
      case 500:
        message = "Server Error. Try again";
        break;
      case 404:
        message = "No Car Found";
        break;
      default:
        message = "Unknown Error. Try again";
        break;
    }
    return { status: res.status, message: message };
  }
  async function createCar(data) {
    const auth = getBearerAuthConfig();
    auth.headers["Content-Type"] = "multipart/form-data";

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const res = await api_post(
      process.env.REACT_APP_API_VEHICLE_END_POINT,
      data,
      config
    );
    let message;
    switch (res.status) {
      case 201:
        message = res.data;
        setCarSelected(res.data);
        break;
      default:
        message = "Error occured. Try again";
        break;
    }
    return { status: res.status, message: message };
  }
  async function getServicesDone(car_id) {
    const auth = getBearerAuthConfig();
    const config = {
      auth,
      params: {
        vehicle_id: car_id,
      },
    };
    const res = await api_get(
      process.env.REACT_APP_API_SERVICE_END_POINT,
      config
    );
    let message;
    switch (res.status) {
      case 200:
        message = res.data;
        break;
      case 401:
        message = "Session Expired. Log in";
        break;
      case 500:
        message = "Server Error. Try again";
        break;
      case 404:
        message = "No Car Found";
        break;
      default:
        message = "Unknown Error. Try again";
        break;
    }
    return { status: res.status, message: message };
  }
  const value = {
    setCarSelected,
    searchResults,
    setSearchResults,
    createClient,
    clientSelected,
    carSelected,
    setClientSelected,
    getAllClients,
    getCarsFromClient,
    getServicesDone,
    updateClientAndCarFromLocalStorage,
    createCar,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
