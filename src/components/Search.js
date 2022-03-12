import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import DisplaySearchResults from "./DisplaySearchResults";

export default function Search() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAdress] = useState("");
  const [npa, setNpa] = useState("");
  const [mobile, setMobile] = useState("");
  const [brandList, setBrandList] = useState([]);
  const [brand, setBrand] = useState("");
  const [modelList, setModelList] = useState([]);
  const [model, setModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");

  const [data, setData] = useState([
    {
      id: 1,
      name: "André Costa",
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
      name: "Antonio Albuquerque",
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
      name: "Matus Lissy",
      //lastName: "Costa",
      address: "Espace de L'Europe 1-3 2000",
      //npa: "1745",
      //mobile: "0786308274",
      brand: "Giruno",
      licensePlate: "NE 123456",

      //model: "Punto",
    },
  ]);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const SearchTextBoxes = [
    ["Prénom", name, setName, "text", "w-50"],
    ["Nom", lastName, setLastName, "text", "w-50"],
    ["Adresse", address, setAdress, "text", "w-75"],
    ["NPA", npa, setNpa, "number", "w-25"],
    ["Mobile", mobile, setMobile, "text", "w-50"],
    ["Plaque", licensePlate, setLicensePlate, "text", "w-50"],
  ];
  function isAllDefaultValues() {
    let index = -1;
    SearchTextBoxes.forEach(
      (value, idx) => (index = value[1] !== "" ? idx : index)
    );

    return index;
  }

  function dataDisplayHandler() {
    if (isAllDefaultValues() === -1) {
      return data;
    }
    return data.filter((obj) => {
      if (
        (name && obj.name.toLowerCase().includes(name.toLowerCase())) ||
        (lastName &&
          obj.lastName.toLowerCase().includes(lastName.toLowerCase())) ||
        (address &&
          obj.address.toLowerCase().includes(address.toLowerCase())) ||
        (npa && obj.npa.toLowerCase().includes(npa.toLowerCase())) ||
        (mobile && obj.mobile.toLowerCase().includes(mobile.toLowerCase())) ||
        (licensePlate &&
          obj.licensePlate
            .toLowerCase()
            .includes(licensePlate.toLowerCase())) ||
        (brand && obj.brand === brand) ||
        (model && obj.model === model)
      ) {
        return obj;
      }
      return null;
    });
  }
  return (
    <>
      <Card>
        <Card.Body>
          <Form>
            <Row>
              <Form.Group className="w-50">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="w-50">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="w-50" as={Col}>
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setAdress(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="w-50" as={Col}>
                <Form.Label>NPA</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setNpa(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row>
              <DropdownButton
                as={Col}
                drop="down"
                className="text-center mt-2"
                title="Marque"
              >
                {brandList.map((brand, i) => (
                  <Dropdown.Item key={i} onClick={() => setBrand(brand)}>
                    {brand}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <DropdownButton
                as={Col}
                drop="down"
                className="text-center mt-2"
                title="Modèle"
              >
                {modelList.map((brand, i) => (
                  <Dropdown.Item key={i} onClick={() => setBrand(brand)}>
                    {brand}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <DisplaySearchResults props={dataDisplayHandler()} />{" "}
    </>
  );
}
