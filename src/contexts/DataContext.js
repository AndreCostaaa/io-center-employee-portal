import React, { useContext, useState } from "react";

export const DataContext = React.createContext(null);

export function useData() {
  return useContext(DataContext);
}
export default function DataProvider({ children }) {
  const [carSelected, setCarSelected] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [data, setData] = useState(null);
  const [id, setId] = useState(0);
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
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
