import { useData } from "contexts/DataContext";
import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import CarInformation from "./CarInformation";

export default function DisplayCars({ cars }) {
  const [carHovered, setCarHovered] = useState();

  const { setCarSelected } = useData();

  return (
    <>
      {cars && cars.length > 0 ? (
        <Table className="text-center">
          <thead>
            <tr>
              <th>
                Marque
                <br /> Modèle
              </th>
              <th>Plaque</th>
              <th>
                No de <br /> chassis
              </th>
              <th>
                Reception par <br />
                type
              </th>
            </tr>
          </thead>
          <tbody>
            {cars &&
              cars.map((car, idx) => (
                <CarInformation
                  key={idx}
                  car={car}
                  callback={setCarHovered}
                  hovered={carHovered && carHovered.id === car.id}
                />
              ))}
          </tbody>
        </Table>
      ) : (
        <h4 className="text-center">Aucune voiture trouvée</h4>
      )}
      {carHovered && carHovered.id > 0 ? (
        <Button className="w-100" onClick={() => setCarSelected(carHovered)}>
          Selectionner
        </Button>
      ) : (
        ""
      )}
    </>
  );
}
