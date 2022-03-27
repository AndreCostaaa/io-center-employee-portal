import { useData } from "contexts/DataContext";
import React, { useEffect, useState } from "react";
import SelectCar from "../car/SelectCar";
import SelectClient from "../client/SelectClient";
import DetailCar from "../car/DetailCar";
import DetailClient from "../client/DetailClient";
import ServiceList from "../service/ServiceList";
import PatchClient from "components/client/PatchClient";
import PatchCar from "components/car/PatchCar";

export default function MainPage() {
  const [modifyingClient, setModifyingClient] = useState(false);
  const [modifyingCar, setModifyingCar] = useState(false);
  const { clientSelected, carSelected, updateClientAndCarFromLocalStorage } =
    useData();
  useEffect(() => {
    updateClientAndCarFromLocalStorage();
  }, []);
  return (
    <>
      <div className="mt-4">
        {clientSelected ? (
          modifyingClient ? (
            <PatchClient setModifyingClient={setModifyingClient} />
          ) : (
            <DetailClient setModifyingClient={setModifyingClient} />
          )
        ) : (
          <SelectClient />
        )}
      </div>
      <div className="mt-4">
        {clientSelected ? (
          carSelected ? (
            modifyingCar ? (
              <PatchCar setModifyingCar={setModifyingCar} />
            ) : (
              <DetailCar setModifyingCar={setModifyingCar} />
            )
          ) : (
            <SelectCar />
          )
        ) : (
          ""
        )}
      </div>
      <div className="mt-4">{carSelected ? <ServiceList /> : ""}</div>
    </>
  );
}
