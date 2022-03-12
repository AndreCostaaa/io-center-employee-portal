import React, { useState } from "react";
import {
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";

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
      name: "André",
      lastName: "Costa",
      address: "a",
      npa: "123",
      mobile: "127",
      licensePlate: "asd",
    },
  ]);
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
    let dataToDisplay = null;
    if (isAllDefaultValues() === -1) {
      console.log("Default values");
      return null;
    }
    dataToDisplay = data.filter((obj) => {
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
        console.log("matched");
        return obj;
      }
      return null;
    });
    return dataToDisplay;
  }
  return (
    <Card>
      <Card.Body>
        <Form>
          {SearchTextBoxes.map((arr, key) => (
            <Form.Group className={arr[4]} as={Col} key={key}>
              <Form.Label>{arr[0]}</Form.Label>
              <Form.Control
                type={arr[3]}
                onChange={(e) => arr[2](e.target.value)}
              />
            </Form.Group>
          ))}
          <DropdownButton drop="end" className="text-center" title="Marque">
            {brandList.map((brand, i) => (
              <Dropdown.Item key={i} onClick={() => setBrand(brand)}>
                {brand}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <DropdownButton drop="end" className="text-center" title="Modèle">
            {modelList.map((brand, i) => (
              <Dropdown.Item key={i} onClick={() => setBrand(brand)}>
                {brand}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Form>
        <h1>{dataDisplayHandler() && dataDisplayHandler().toString()}</h1>
      </Card.Body>
    </Card>
  );
}
