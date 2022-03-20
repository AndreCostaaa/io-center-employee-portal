import { useData } from "contexts/DataContext";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import SelectCar from "./SelectCar";
import SelectClient from "./SelectClient";
import DetailCar from "./DetailCar";
import DetailClient from "./DetailClient";
import ServiceList from "./ServiceList";

export default function Details() {
  const { clientSelected, carSelected } = useData();

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
