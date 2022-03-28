import { useData } from "contexts/DataContext";
import React, { useEffect, useState } from "react";
import SelectCar from "../car/SelectCar";
import SelectClient from "../client/SelectClient";
import DetailCar from "../car/DetailCar";
import DetailClient from "../client/DetailClient";
import ServiceList from "../service/ServiceList";
import PatchClient from "components/client/PatchClient";
import PatchCar from "components/car/PatchCar";
import SearchCar from "components/car/SearchCar";

export default function MainPage() {
  const [modifyingClient, setModifyingClient] = useState(false);
  const [modifyingCar, setModifyingCar] = useState(false);
  const {
    clientSelected,
    carSelected,
    updateClientAndCarFromLocalStorage,
    setClientSelected,
    getClientById,
  } = useData();
  useEffect(() => {
    updateClientAndCarFromLocalStorage();
  }, []);

  useEffect(() => {
    const fetchClientData = async () => {
      await getClientById(carSelected.owner_id).then((res) => {
        if (res.status === 200) {
          setClientSelected(res.message);
        }
      });
    };
    if (carSelected && !clientSelected) {
      fetchClientData();
    }
  }, [carSelected]);
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
          <SearchCar />
        )}
      </div>
      <div className="mt-4">{carSelected ? <ServiceList /> : ""}</div>
    </>
  );
}
