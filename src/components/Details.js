import { useData } from "contexts/DataContext";
import React, { useContext, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import DetailCar from "./DetailCar";
import DetailClient from "./DetailClient";
import ServiceList from "./ServiceList";

export default function Details() {
  const { getAllData, id } = useData();
  const [data, setData] = useState(getAllData()[id - 1]);
  return (
    <>
      <div className="mt-4">
        <DetailClient />
      </div>
      <div className="mt-4">
        <DetailCar />
      </div>
      <div className="mt-4">
        <ServiceList />
      </div>
    </>
  );
}
