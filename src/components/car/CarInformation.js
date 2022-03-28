import React from "react";

export default function CarInformation(props) {
  let car = props.car;

  return (
    <tr
      className={
        "text-break" + (props.hovered ? " table-active" : " table-default")
      }
      style={{ wordWrap: "break-word" }}
      onClick={(e) =>
        props.hovered ? props.callback(null) : props.callback(car)
      }
    >
      <td>
        {car.brand.toUpperCase()} <br />
        {car.model.toUpperCase()}
      </td>
      <td>
        {car.license_plate.toUpperCase()} <br />{" "}
        {car.release_date && car.release_date.split(" ")[0].split("-")[0]}
      </td>
      <td>{car.chassis_no.toUpperCase()}</td>
      <td>{car.reception_type.toUpperCase()}</td>
    </tr>
  );
}
