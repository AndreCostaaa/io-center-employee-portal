import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useData } from "contexts/DataContext";

export default function DetailCar({ setModifyingCar }) {
  const {
    carSelected,
    setCarSelected,
    getCarRegistrationImageById,
    getCarFilesById,
  } = useData();
  const [visible, setVisible] = useState(true);
  const [showingRegistrationImage, setShowingRegistrationImage] =
    useState(false);

  const [carRegistrationImage, setCarRegistrationImage] = useState();
  const [fileLinkData, setFileLinkData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      await getCarRegistrationImageById(carSelected.id).then((res) => {
        if (res.status === 200) {
          setCarRegistrationImage(res.message);
        }
      });
    };
    fetchData();
  }, [getCarRegistrationImageById, carSelected.id]);

  useEffect(() => {
    async function fetchData() {
      await getCarFilesById(carSelected.id).then((res) => {
        if (res.status === 200) {
          let obj = {};
          obj.href = res.message;
          obj.download = "files_" + carSelected.id.toString() + ".zip";
          setFileLinkData(obj);
        }
      });
    }
    fetchData();
  }, [getCarFilesById, carSelected.id]);
  return (
    <Card>
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
                <td>
                  <h6>
                    {"No Chassis:"} <br />
                    {carSelected.chassis_no.toUpperCase()}
                  </h6>
                </td>
                <td>
                  <h6>
                    {"Recéption par type:"} <br />
                    {carSelected.reception_type.toUpperCase()}
                  </h6>
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="gx-1 text-center">
            <div>
              {fileLinkData && (
                <a
                  className="text-center"
                  href={fileLinkData.href}
                  download={fileLinkData.download}
                >
                  <Button>Télécharger Fichiers</Button>
                </a>
              )}
            </div>
            {showingRegistrationImage ? (
              <img
                src={carRegistrationImage}
                max-width="700"
                height="200"
                alt="Carte grise non trouvée"
                className="align-center"
              ></img>
            ) : (
              ""
            )}
            <Button
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
              className="w-100 mt-1 border"
              onClick={() => setModifyingCar(true)}
            >
              Modifier cette voiture
            </Button>
            <Button
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
