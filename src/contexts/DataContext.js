import axios from "axios";
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
      headers: { Authorization: `Bearer ${currentUser.access_token}` },
    };
    await axios
      .post(process.env.REACT_APP_API_CLIENT_END_POINT, fd, config)
      .then((res) => {
        let data = res.data;
        console.log(data);
        return true;
      })
      .catch((err) => {
        console.log(err.response.data);
        return false;
      });
  }
  function getAllData() {
    return [
      {
        id: 1,
        name: "André",
        lastName: "Costa",
        address: "Pra Derrey 5A",
        npa: "1745",
        mobile: "0786308274",
        brand: "Abarth",
        licensePlate: "FR 365490",
        model: "Punto",
        city: "Lentigny",
        email: "email@gmail.com",
        releaseDate: "15/03/2022",
        chassisNo: "ZF A35 000 000 134 240",
        color: "black",
        receptionType: "1FB2 54",
        servicesList: [
          {
            date: "14/03/2022",
            user: "mario",
            km: "35750",
            descriptif: "changement de filtres",
            type: "Service",
          },
          {
            date: "16/03/2022",
            user: "diogo",
            km: "35900",
            descriptif: "changement de pare-chocs",
            type: "Réparation",
          },
        ],
      },
      {
        id: 2,
        name: "Antonio",
        lastName: "Albuquerque",
        address: "Faubourg du Lac 43",
        npa: "2000",
        mobile: "0786308274",
        brand: "Honda",
        licensePlate: "FR 365490",
        model: "CSV",
      },
      {
        id: 3,
        name: "Mario",
        lastName: "Matthey",
        address: "Rte des Chavannes 31",
        npa: "1680",
        mobile: "0786308274",
        brand: "Audi",
        licensePlate: "FR 365490",
        model: "RS6",
      },
    ];
  }

  const value = {
    carSelected,
    setCarSelected,
    searchResults,
    setSearchResults,
    getAllData,
    id,
    setId,
    createClient,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
