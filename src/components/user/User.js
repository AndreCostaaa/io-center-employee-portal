import React from "react";

export default function User({ user, callback, hovered }) {
  return (
    <tr
      className={"text-break" + (hovered ? " table-active" : " table-default")}
      style={{ wordWrap: "break-word" }}
      onClick={(e) => (hovered ? callback(null) : callback(user))}
    >
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{user.role}</td>
    </tr>
  );
}
