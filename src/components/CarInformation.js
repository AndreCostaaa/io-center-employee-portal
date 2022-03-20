import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

export default function CarInformation(props) {
  let car = props.car;
  return (
    <tr
      className={
        "text-break" + (props.hovered ? " table-active" : " table-default")
      }
      style={{ wordWrap: "break-word" }}
      onClick={(e) => (props.hovered ? props.callback(0) : props.callback(car))}
    >
      <td>
        {car.brand} <br />
        {car.model}
      </td>
      <td>
        {car.license_plate} <br /> {car.release_date}
      </td>
      <td>{car.chassis_no}</td>
      <td>{car.reception_type}</td>
    </tr>
  );
}
