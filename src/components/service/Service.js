import React from "react";
import { Carousel, Table } from "react-bootstrap";

export default function Service({ props }) {
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
                  {props.machineName && props.machineName}
                </h5>
              </td>
              <td />
              <td>
                <h5>{props.mechanicName && props.mechanicName}</h5>
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

        {props.pictureList && props.pictureList.length > 0 ? (
          <>
            <h6>Photos</h6>
            <Carousel interval={null} wrap={false} variant="dark" pause="hover">
              {props.pictureList.map((source, idx) => {
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
