import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useData } from "../../contexts/DataContext";

export default function Service({ props }) {
  const [mechanicName, setMechanicName] = useState();
  const [machineName, setMachineName] = useState();
  const [mediaLinkData, setMediaLinkData] = useState();
  const { getServicePicturesById, getMechanicNameById, getToolNameById } =
    useData();
  useEffect(() => {
    async function fetchData() {
      await getMechanicNameById(props.mechanic_id).then((res) => {
        if (res.status === 200) {
          setMechanicName(res.message.name);
        }
      });
    }
    fetchData();
  }, [props.mechanic_id]);
  useEffect(() => {
    async function fetchData() {
      await getToolNameById(props.machine_id).then((res) => {
        if (res.status === 200) {
          setMachineName(res.message.name);
        }
      });
    }
    if (props.machine_id !== "null") {
      fetchData();
    }
  }, [getToolNameById, props.machine_id]);

  useEffect(() => {
    async function fetchData() {
      await getServicePicturesById(props.id).then((res) => {
        if (res.status === 200) {
          let obj = {};
          obj.href = res.message;
          obj.download = "media_" + props.id.toString() + ".zip";
          setMediaLinkData(obj);
        }
      });
    }
    fetchData();
  }, [getServicePicturesById, props.id]);
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

      {mediaLinkData && (
        <a href={mediaLinkData.href} download={mediaLinkData.download}>
          <Button>Télécharger Images</Button>
        </a>
      )}
    </div>
  );
}
