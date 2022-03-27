import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";

import { useData } from "../../contexts/DataContext";
export default function Service({ props }) {
  const [mechanicName, setMechanicName] = useState();
  const [machineName, setMachineName] = useState();
  const { getMechanicNameById, getToolNameById } = useData();
  useEffect(() => {
    async function fetchData() {
      await getMechanicNameById(props.mechanic_id).then((res) => {
        if (res.status === 200) {
          setMechanicName(res.message.name);
        }
      });
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      await getToolNameById(props.machine_id).then((res) => {
        if (res.status === 200) {
          console.log(res.message.name);
          setMachineName(res.message.name);
        }
      });
    }
    if (props.machine_id != null) {
      fetchData();
    }
  }, []);
  return (
    <div className="text-center">
      <Table>
        <tbody>
          <tr>
            <td>
              <h5>
                {props.type}
                <br />
                {machineName}
              </h5>
            </td>
            <td />
            <td>
              <h5>{mechanicName}</h5>
            </td>
          </tr>
          <tr>
            <td>
              <h6>
                {"Date:"}
                <br /> {props.date && props.date.split(" ")[0]}
              </h6>
            </td>
            <td>
              <h6>
                {"Km:"}
                <br /> {props.km}
              </h6>
            </td>{" "}
            <td>
              <h6>
                {"ID Gestan:"}
                <br /> {props.gestan_id}
              </h6>
            </td>
          </tr>
        </tbody>
      </Table>
      <h6>
        Descriptif:
        <br />
        {props.description}
      </h6>

      <Button className="w-100 mt-2">Détails</Button>
    </div>
  );
}
