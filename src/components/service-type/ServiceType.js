import React from "react";

export default function ServiceType(props) {
  const serviceType = props.serviceType;
  return (
    <tr
      className={
        "text-break" + (props.hovered ? " table-active" : " table-default")
      }
      style={{ wordWrap: "break-word" }}
      onClick={(e) =>
        props.hovered ? props.callback(null) : props.callback(serviceType)
      }
    >
      <td>{serviceType.name}</td>
    </tr>
  );
}
