import { useData } from "contexts/DataContext";
import React, { useContext, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import CreateCar from "./CreateCar";
import CreateClient from "./CreateClient";
import DetailCar from "./DetailCar";
import DetailClient from "./DetailClient";
import ServiceList from "./ServiceList";

export default function Details() {
  const { id, clientSelected, carSelected } = useData();
  const [data, setData] = useState();

  function handleCarRendered() {
    if (!clientSelected) {
      return "";
    }
    if (!carSelected) {
      console.log("hello");
      return <CreateCar />;
    }
    return <DetailCar />;
  }
  return (
    <>
      <div className="mt-4">
        {clientSelected ? <DetailClient /> : <CreateClient />}
      </div>
      <div className="mt-4">
        {clientSelected ? carSelected ? <DetailCar /> : <CreateCar /> : ""}
      </div>
      <div className="mt-4">{carSelected ? <ServiceList /> : ""}</div>
    </>
  );
}
