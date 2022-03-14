import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import DisplaySearchResults from "./SearchResults";
import { useData } from "contexts/DataContext";
import SearchResults from "./SearchResults";

export default function Search() {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [npa, setNpa] = useState("");
  const [mobile, setMobile] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [brandList, setBrandList] = useState(["bmw"]);
  const [brand, setBrand] = useState("");
  const [modelList, setModelList] = useState(["m3"]);
  const [model, setModel] = useState("");

  const kFormValuesSet = [
    setName,
    setLastName,
    setAddress,
    setNpa,
    setMobile,
    setLicensePlate,
    setBrand,
    setModel,
  ];
  const kSessionStorageValues = [
    "search_name",
    "search_lastName",
    "search_address",
    "search_npa",
    "search_mobile",
    "search_licensePlate",
    "search_brand",
    "search_model",
  ];
  const navigate = useNavigate();

  const [dataToDisplay, setDataToDisplay] = useState([]);
  const { setSearchResults, getAllData } = useData();
  function isAllDefault() {
    return (
      name === "" &&
      lastName === "" &&
      address === "" &&
      npa === "" &&
      mobile === "" &&
      brand === "" &&
      model === "" &&
      licensePlate === ""
    );
  }
  /*function filterData() {
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
  }*/
  useEffect(() => {
    for (let i in kFormValuesSet) {
      let data = sessionStorage.getItem(kSessionStorageValues[i]);

      if (data) {
        kFormValuesSet[i](data);
      }
    }
  }, []);

  function clearData() {
    for (let i in kFormValuesSet) {
      kFormValuesSet[i]("");
    }
  }
  function searchButtonPressed() {
    const data = [
      name,
      lastName,
      address,
      npa,
      mobile,
      licensePlate,
      brand,
      model,
    ];

    for (let i in data) {
      sessionStorage.setItem(kSessionStorageValues[i], data[i]);
    }
    setSearchResults(getAllData());
    navigate("/search-results");
  }
  function clearButtonPressed() {
    sessionStorage.clear();
    clearData();
    document.getElementById("form").reset();
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Form id="form">
            <Row>
              <Form.Group className="w-50">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={name}
                />
              </Form.Group>
              <Form.Group className="w-50">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  defaultValue={lastName}
                />
              </Form.Group>
            </Row>
            <Row>
              <div className="w-75">
                <Form.Group as={Col}>
                  <Form.Label>Adresse</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    defaultValue={address}
                  />
                </Form.Group>
              </div>
              <Form.Group className="w-25" as={Col}>
                <Form.Label>NPA</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) =>
                    isNan(e.target.value) ? setNpa(e.target.value) : ""
                  }
                  defaultValue={npa}
                  pattern="[0-9]+"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="w-50" as={Col}>
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setMobile(e.target.value)}
                  defaultValue={mobile}
                />
              </Form.Group>

              <Form.Group className="w-50" as={Col}>
                <Form.Label>Plaque</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setLicensePlate(e.target.value)}
                  defaultValue={licensePlate}
                />
              </Form.Group>
            </Row>
            <Row className="mt-2">
              <div className="w-25">
                <DropdownButton
                  as={Col}
                  drop="down"
                  className="text-center"
                  title="Marque"
                >
                  {brandList.map((value, i) => (
                    <Dropdown.Item
                      key={i}
                      onClick={() => {
                        brand == value ? setBrand("") : setBrand(value);
                      }}
                    >
                      {value}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>
              <div className="w-25 ">
                <h5>{brand ? brand : ""}</h5>
              </div>
              <div className="w-25">
                <DropdownButton
                  as={Col}
                  drop="down"
                  className="text-center"
                  title="Modèle"
                >
                  {modelList.map((value, i) => (
                    <Dropdown.Item
                      key={i}
                      onClick={() => {
                        model == value ? setModel("") : setModel(value);
                      }}
                    >
                      {value}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>
              <div className="w-25">
                <h5>{model ? model : ""}</h5>
              </div>
            </Row>

            <Row className="gx-1 mt-4">
              <Button onClick={clearButtonPressed} className="w-50 border ">
                Clear
              </Button>

              <Button onClick={searchButtonPressed} className="w-50 border ">
                {isAllDefault() ? "Tout" : "Rechercher"}
              </Button>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
