import { useData } from "contexts/DataContext";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ServiceTypeForm from "./ServiceTypeForm";
import ServiceTypeList from "./ServiceTypeList";

export default function ServiceTypeDashboard() {
  const [serviceTypeList, setServiceTypeList] = useState();
  const [fetchData, setFetchData] = useState(true);
  const { getAllServiceTypes } = useData();
  async function fetchServiceTypes() {
    await getAllServiceTypes().then((res) => {
      if (res.status === 200) {
        setServiceTypeList(res.message);
      }
    });
  }
  useEffect(() => {
    if (fetchData) {
      fetchServiceTypes();
      setFetchData(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData]);

  return (
    <Card className="bg-transparent">
      <ServiceTypeForm setFetchData={setFetchData} />
      <ServiceTypeList
        serviceTypeList={serviceTypeList}
        setFetchData={setFetchData}
      />
    </Card>
  );
}
