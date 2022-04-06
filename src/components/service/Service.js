import React, { useEffect, useState } from "react";
import { Carousel, Table } from "react-bootstrap";
import { useData } from "../../contexts/DataContext";

export default function Service({ props }) {
  const [mechanicName, setMechanicName] = useState();
  const [machineName, setMachineName] = useState();
  const [mediaList, setMediaList] = useState([]);
  const { getServicePictureById, getMechanicNameById, getToolNameById } =
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
      let i = 0;
      let fetch = true;
      let pictures = [];
      while (fetch) {
        await getServicePictureById(props.id, i).then((res) => {
          if (res.status === 200 || res.status === 304) {
            pictures.push(res.message);
          } else if (res.status !== 502) {
            fetch = false;
          }
        });
        i++;
      }
      setMediaList(pictures);
    }
    fetchData();
  }, [getServicePictureById, props.id]);
  return (
    <>
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
              </td>
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
        <hr />

        {mediaList.length > 0 ? (
          <>
            <h6>Photos</h6>
            <Carousel interval={null} wrap={false} variant="dark" pause="hover">
              {mediaList.map((source, idx) => {
                return (
                  <Carousel.Item key={idx}>
                    <img
                      className="d-block w-100 text-center"
                      max-width="700"
                      max-height="200"
                      src={source}
                    ></img>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
