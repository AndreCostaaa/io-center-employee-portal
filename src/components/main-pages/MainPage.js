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
import { Carousel, Button, Row, Col } from "react-bootstrap";

export default function MainPage() {
  const [modifyingClient, setModifyingClient] = useState(false);
  const [modifyingCar, setModifyingCar] = useState(false);
  const [index, setIndex] = useState(0);
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
    let idx = 0;
    if (clientSelected) {
      idx = 1;
    }
    if (carSelected) {
      idx = 2;
    }
    setIndex(idx);
  }, [clientSelected, carSelected]);
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
      <Row className="gx1">
        <Button
          as={Col}
          variant={index == 0 ? "dark" : "black"}
          className="w-50 border"
          disabled={index == 0}
          onClick={() => setIndex(0)}
        >
          Client
        </Button>
        <Button
          as={Col}
          variant={index == 1 ? "dark" : "black"}
          className="w-50 border"
          disabled={index == 1}
          onClick={() => setIndex(1)}
        >
          Voiture
        </Button>
        {carSelected && (
          <Button
            as={Col}
            variant={index == 2 ? "dark" : "black"}
            className="w-50 border"
            disabled={index == 2}
            onClick={() => carSelected && setIndex(2)}
          >
            Service
          </Button>
        )}

        <Carousel
          activeIndex={index}
          interval={null}
          controls={false}
          wrap={false}
          variant="dark"
          onSelect={(index, e) => setIndex(index)}
          pause="hover"
        >
          <Carousel.Item className="mt-4" style={{ minHeight: "100vh" }}>
            {clientSelected ? (
              modifyingClient ? (
                <PatchClient setModifyingClient={setModifyingClient} />
              ) : (
                <DetailClient setModifyingClient={setModifyingClient} />
              )
            ) : (
              <SelectClient />
            )}
          </Carousel.Item>
          <Carousel.Item className="mt-4" style={{ minHeight: "100vh" }}>
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
          </Carousel.Item>
          {carSelected && (
            <Carousel.Item className="mt-4" style={{ minHeight: "100vh" }}>
              {<ServiceList />}
            </Carousel.Item>
          )}
        </Carousel>
      </Row>
    </>
  );
}
