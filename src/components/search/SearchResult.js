import React from "react";

export default function SearchResult({ props }) {
  return (
    <>
      <td>{props.id}</td>
      <td>
        {props.name + " " + props.lastName}
        <br />
        {props.mobile}
      </td>
      <td>
        {props.address}
        <br />
        {props.npa}
      </td>
      <td>
        {props.brand}
        <br />
        {props.model}
      </td>
      <td>{props.licensePlate}</td>
    </>
  );
}
