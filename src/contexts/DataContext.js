import { api_get, api_post, api_patch, api_delete } from "../api/api";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
export const DataContext = React.createContext(null);

export function useData() {
  return useContext(DataContext);
}
export default function DataProvider({ children }) {
  const { getToken } = useAuth();
  const [carSelected, setCarSelected] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [clientSelected, setClientSelected] = useState(null);
  useEffect(() => {
    localStorage.setItem("client-selected", JSON.stringify(clientSelected));
    localStorage.setItem("car-selected", JSON.stringify(carSelected));
  }, [clientSelected, carSelected]);

  function updateClientAndCarFromLocalStorage() {
    if (localStorage.getItem("client-selected")) {
      setClientSelected(JSON.parse(localStorage.getItem("client-selected")));
    }

    if (localStorage.getItem("car-selected")) {
      setCarSelected(JSON.parse(localStorage.getItem("car-selected")));
    }
  }
  function getBearerAuthConfig() {
    return { headers: { Authorization: getToken() } };
  }
  function getPostHeaders() {
    return {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: getToken(),
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

    let message;
    switch (res.status) {
      case 201:
        if (!res.data.id) {
          return {
            status: false,
            message: "Server Error. Contact Server Administrator",
          };
        }
        setClientSelected(res.data);
        message = res.data;
        break;
      case 401:
        message = "Session expired. Log in";
        break;
      case 500:
        message = "Server Error. Try again";
        break;
      default:
        message = "Unknown Error. Try again";
        break;
    }
    return { status: res.status, message: message };
  }
  async function getAllClients() {
    const config = getBearerAuthConfig();
    const res = await api_get(
      process.env.REACT_APP_API_CLIENT_END_POINT,
      config
    );
    let message = "";
    switch (res.status) {
      case 200:
        message = res.data;
        break;
      case 401:
        message = "Session expired. Log in";
        break;
      case 500:
        message = "Server Error. Try again";
        break;
      default:
        message = "Unknown Error. Try again";
        break;
    }
    return { status: res.status, message: message };
  }
  async function getCarsFromClient(owner_id) {
    const auth = getBearerAuthConfig();
    const config = {
      headers: auth.headers,
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
    const config = getPostHeaders();
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
  async function createTool(data) {
    const config = getPostHeaders();
    const res = await api_post(
      process.env.REACT_APP_API_TOOL_END_POINT,
      data,
      config
    );
    let message;
    switch (res.status) {
      case 201:
        message = res.data;
        break;
      default:
        message = "Error occured. Try again";
        break;
    }
    return { status: res.status, message: message };
  }
  async function createService(data) {
    const config = getPostHeaders();
    const res = await api_post(
      process.env.REACT_APP_API_SERVICE_END_POINT,
      data,
      config
    );
    let message;
    switch (res.status) {
      case 201:
        message = res.data;
        break;
      default:
        message = "Error occurred. Try again";
        break;
    }
    return { status: res.status, message: message };
  }
  async function getServicesDone(car_id) {
    const headers = getBearerAuthConfig();
    const config = {
      headers: headers.headers,
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
  async function getCarRegistrationImageById(id) {
    const headers = getBearerAuthConfig();
    const config = {
      headers: headers.headers,
      params: {
        id: id,
        media: "registration",
      },
      responseType: "blob",
    };

    const res = await api_get(
      process.env.REACT_APP_API_VEHICLE_MEDIA_END_POINT,
      config
    );

    let message;
    switch (res.status) {
      case 200:
        message = URL.createObjectURL(res.data);
        break;
      case 404:
        message = "No Data";
        break;
      case 500:
        message = "Server Error";
        break;
      default:
        message = "Unknown Error";
        break;
    }

    return { status: res.status, message: message };
  }
  async function getMechanicNameById(id) {
    const headers = getBearerAuthConfig();
    const config = {
      headers: headers.headers,
      params: {
        id: id,
      },
    };
    const res = await api_get(process.env.REACT_APP_API_USER_END_POINT, config);
    let message = "";
    switch (res.status) {
      case 200:
        message = res.data;
        break;
      case 401:
        message = "Session expired. Log in";
        break;
      case 500:
        message = "Server Error. Try again";
        break;
      default:
        message = "Unknown Error. Try again";
        break;
    }
    return { status: res.status, message: message };
  }
  async function getMachineList() {
    const config = getBearerAuthConfig();
    const res = await api_get(process.env.REACT_APP_API_TOOL_END_POINT, config);
    let message = "";
    switch (res.status) {
      case 200:
        message = res.data;
        break;
      case 401:
        message = "Session expired. Log in";
        break;
      case 500:
        message = "Server Error. Try again";
        break;
      default:
        message = "Unknown Error. Try again";
        break;
    }
    return { status: res.status, message: message };
  }
  async function patchClient(data) {
    const config = getPostHeaders();
    const res = await api_patch(
      process.env.REACT_APP_API_CLIENT_END_POINT,
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
  async function patchCar(data) {
    const config = getPostHeaders();
    const res = await api_patch(
      process.env.REACT_APP_API_VEHICLE_END_POINT,
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
  async function getToolNameById(id) {
    const headers = getBearerAuthConfig();
    const config = {
      headers: headers.headers,
      params: {
        id: id,
      },
    };
    const res = await api_get(process.env.REACT_APP_API_TOOL_END_POINT, config);
    let message = "";
    switch (res.status) {
      case 200:
        message = res.data;
        break;
      case 401:
        message = "Session expired. Log in";
        break;
      case 500:
        message = "Server Error. Try again";
        break;
      default:
        message = "Unknown Error. Try again";
        break;
    }
    return { status: res.status, message: message };
  }
  async function getServicePicturesById(id) {
    const headers = getBearerAuthConfig();
    const config = {
      headers: headers.headers,
      params: { id: id },
      responseType: "blob",
    };

    const res = await api_get(
      process.env.REACT_APP_API_SERVICE_MEDIA_END_POINT,
      config
    );

    let message;
    switch (res.status) {
      case 200:
        message = window.URL.createObjectURL(res.data);
        break;
      case 404:
        message = "No Data";
        break;
      case 500:
        message = "Server Error";
        break;
      default:
        message = "Unknown Error";
        break;
    }

    return { status: res.status, message: message };
  }
  async function getCarFilesById(id) {
    const headers = getBearerAuthConfig();
    const config = {
      headers: headers.headers,
      params: { id: id, media: "file" },
      responseType: "blob",
    };

    const res = await api_get(
      process.env.REACT_APP_API_VEHICLE_MEDIA_END_POINT,
      config
    );

    let message;
    switch (res.status) {
      case 200:
        message = window.URL.createObjectURL(res.data);
        break;
      case 404:
        message = "No Data";
        break;
      case 500:
        message = "Server Error";
        break;
      default:
        message = "Unknown Error";
        break;
    }

    return { status: res.status, message: message };
  }
  async function getAllTools() {
    const headers = getBearerAuthConfig();
    const config = {
      headers: headers.headers,
    };
    const res = await api_get(process.env.REACT_APP_API_TOOL_END_POINT, config);
    let message = "";
    switch (res.status) {
      case 200:
        message = res.data;
        break;
      case 401:
        message = "Session expired. Log in";
        break;
      case 500:
        message = "Server Error. Try again";
        break;
      default:
        message = "Unknown Error. Try again";
        break;
    }
    return { status: res.status, message: message };
  }
  async function deleteTool(id) {
    const headers = getBearerAuthConfig();
    const config = {
      headers: headers.headers,
      params: {
        id: id,
      },
    };

    const res = await api_delete(
      process.env.REACT_APP_API_TOOL_END_POINT,
      config
    );

    let message;
    switch (res.status) {
      case 200:
        message = "Deleted";
        break;
      case 404:
        message = "No Data";
        break;
      case 500:
        message = "Server Error";
        break;
      default:
        message = "Unknown Error";
        break;
    }

    return { status: res.status, message: message };
  }
  async function getAllCars() {
    const config = getBearerAuthConfig();
    const res = await api_get(
      process.env.REACT_APP_API_VEHICLE_END_POINT,
      config
    );
    let message = "";
    switch (res.status) {
      case 200:
        message = res.data;
        break;
      case 401:
        message = "Session expired. Log in";
        break;
      case 500:
        message = "Server Error. Try again";
        break;
      default:
        message = "Unknown Error. Try again";
        break;
    }
    return { status: res.status, message: message };
  }
  async function getClientById(id) {
    const auth = getBearerAuthConfig();
    const config = {
      headers: auth.headers,
      params: {
        id: id,
      },
    };

    const res = await api_get(
      process.env.REACT_APP_API_CLIENT_END_POINT,
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
  async function getCarMediaById(id) {
    const headers = getBearerAuthConfig();
    const config = {
      headers: headers.headers,
      params: { id: id, media: "media" },
      responseType: "blob",
    };

    const res = await api_get(
      process.env.REACT_APP_API_VEHICLE_MEDIA_END_POINT,
      config
    );

    let message;
    switch (res.status) {
      case 200:
        message = window.URL.createObjectURL(res.data);
        break;
      case 404:
        message = "No Data";
        break;
      case 500:
        message = "Server Error";
        break;
      default:
        message = "Unknown Error";
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
    getCarRegistrationImageById,
    createService,
    getMechanicNameById,
    getMachineList,
    patchClient,
    patchCar,
    getToolNameById,
    getServicePicturesById,
    getCarFilesById,
    getAllTools,
    createTool,
    deleteTool,
    getAllCars,
    getClientById,
    getCarMediaById,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
