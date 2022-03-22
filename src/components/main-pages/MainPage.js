import { useData } from "contexts/DataContext";
import React, { useEffect } from "react";
import SelectCar from "../car/SelectCar";
import SelectClient from "../client/SelectClient";
import DetailCar from "../car/DetailCar";
import DetailClient from "../client/DetailClient";
import ServiceList from "../service/ServiceList";

export default function MainPage() {
  const { clientSelected, carSelected, updateClientAndCarFromLocalStorage } =
    useData();
  useEffect(() => {
    updateClientAndCarFromLocalStorage();
  }, []);
  return (
    <>
      <div className="mt-4">
        {clientSelected ? <DetailClient /> : <SelectClient />}
      </div>
      <div className="mt-4">
        {clientSelected ? carSelected ? <DetailCar /> : <SelectCar /> : ""}
      </div>
      <div className="mt-4">{carSelected ? <ServiceList /> : ""}</div>
    </>
  );
}
