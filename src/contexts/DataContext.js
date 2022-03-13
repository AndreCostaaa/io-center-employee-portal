import React, { useContext, useState } from "react";

export const DataContext = React.createContext(null);

export function useData() {
  return useContext(DataContext);
}
export default function DataProvider({ children }) {
  const [carSelected, setCarSelected] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [data, setData] = useState(null);

  function getAllData() {
    return [
      {
        id: 1,
        name: "André Costa\n0786308274",
        //lastName: "Costa",
        address: "Pra Derrey 5A 1745",
        //npa: "1745",
        //mobile: "0786308274",
        brand: "Abarth Punto",
        licensePlate: "FR 365490",

        //model: "Punto",
      },
      {
        id: 2,
        name: "Antonio Albuquerque\n0786308274",
        //lastName: "Costa",
        address: "Pra Derrey 5A 1745",
        //npa: "1745",
        //mobile: "0786308274",
        brand: "Abarth Punto",
        licensePlate: "FR 365490",

        //model: "Punto",
      },
      {
        id: 3,
        name: "Matus Lissy",
        //lastName: "Costa",
        address: "Espace de L'Europe 1-3 2000",
        //npa: "1745",
        //mobile: "0786308274",
        brand: "Giruno",
        licensePlate: "NE 123456",

        //model: "Punto",
      },
    ];
  }
  const value = {
    carSelected,
    setCarSelected,
    searchResults,
    setSearchResults,
    getAllData,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
