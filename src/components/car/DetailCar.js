import React, { useEffect, useState } from "react";
import { Button, Card, Row, Table } from "react-bootstrap";
import { useData } from "contexts/DataContext";

export default function DetailCar({ setModifyingCar }) {
  const {
    carSelected,
    setCarSelected,
    getCarRegistrationImageById,
    getCarFilesById,
    getCarMediaById,
    setCarRegistrationImage,
  } = useData();
  const [visible, setVisible] = useState(true);
  const [showingRegistrationImage, setShowingRegistrationImage] =
    useState(false);
  useEffect(() => {
    const fetchData = async () => {
      await getCarRegistrationImageById(carSelected.id).then((res) => {
        if (res.status === 200) {
          setCarRegistrationImage(res.message);
        }
      });
    };
    if (!carSelected.registrationImage) {
      fetchData();
    }
  }, [getCarRegistrationImageById, carSelected.id]);

  async function downloadCarFiles() {
    await getCarFilesById(carSelected.id).then((res) => {
      if (res.status === 200) {
        const link = document.createElement("a");
        link.href = res.message;
        link.download = "files_" + carSelected.id.toString() + ".zip"; //or any other extension
        document.body.appendChild(link);
        link.click();
      } else {
        console.log("error");
      }
    });
  }
  async function downloadCarMedia() {
    await getCarMediaById(carSelected.id).then((res) => {
      if (res.status === 200) {
        const link = document.createElement("a");
        link.href = res.message;
        link.download = "media_" + carSelected.id.toString() + ".zip"; //or any other extension
        document.body.appendChild(link);
        link.click();
      } else {
        console.log("error");
      }
    });
  }

  return (
    <Card className="bg-transparent">
      <Card.Header className="text-center" onClick={() => setVisible(!visible)}>
        <h2>Voiture</h2>
      </Card.Header>
      {visible ? (
        <Card.Body>
          <Table className="text-center">
            <tbody>
              <tr>
                <td>
                  <h5>
                    {carSelected.brand.toUpperCase() +
                      " " +
                      carSelected.model.toUpperCase()}
                  </h5>
                  <h6>{carSelected.license_plate.toUpperCase()}</h6>
                </td>
                <td>
                  <h6 className="mt-2">
                    {carSelected.release_date &&
                      carSelected.release_date.split(" ")[0]}
                  </h6>
                </td>
              </tr>
              <tr>
                <th>No Chassis</th>
                <th>Recéption par type:</th>
              </tr>
              <tr>
                <td>{carSelected.chassis_no.toUpperCase()}</td>
                <td>{carSelected.reception_type.toUpperCase()}</td>
              </tr>

              <tr>
                <th>Arrivé au Garage</th>
                <th>Dernier Service Effectué</th>
              </tr>
              <tr>
                <td>
                  {carSelected.date_created.split(" ")[0] +
                    " | " +
                    carSelected.km_at_arrival +
                    " Km"}
                </td>
                <td>
                  {carSelected.lastServiceDate
                    ? carSelected.lastServiceDate.split(" ")[0] +
                      " | " +
                      carSelected.kmAtLastService +
                      " Km"
                    : "Aucun Service Effectué"}
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="gx-2">
            <Row>
              <div>
                <Button
                  className="border w-50"
                  variant="dark"
                  onClick={downloadCarFiles}
                >
                  Télécharger Fichiers
                </Button>
                <Button
                  className="border w-50"
                  variant="dark"
                  onClick={downloadCarMedia}
                >
                  Télécharger Images
                </Button>
              </div>
            </Row>
            <div className="text-center">
              {showingRegistrationImage ? (
                <img
                  src={carSelected.registrationImage}
                  max-width="700"
                  height="200"
                  alt="Carte grise non trouvée"
                  className="align-center"
                ></img>
              ) : (
                ""
              )}
            </div>
            <Button
              variant="dark"
              className="w-100 border mt-2"
              onClick={() =>
                setShowingRegistrationImage(!showingRegistrationImage)
              }
            >
              {showingRegistrationImage
                ? "Cacher Carte Grise"
                : "Afficher Carte Grise"}
            </Button>
            <Button
              variant="dark"
              className="w-100 mt-1 border"
              onClick={() => setModifyingCar(true)}
            >
              Modifier cette voiture
            </Button>
            <Button
              variant="dark"
              className="w-100 mt-1 border"
              onClick={() => {
                setCarSelected(null);
              }}
            >
              Selectionner une autre Voiture
            </Button>
          </div>
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
}
