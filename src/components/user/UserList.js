import { useAuth } from "contexts/AuthContext";
import { useData } from "contexts/DataContext";
import React, { useEffect, useState } from "react";
import { Button, Card, Table, Alert } from "react-bootstrap";
import User from "./User";

export default function UserList({ users }) {
  const [userHovered, setUserHovered] = useState();
  const [error, setError] = useState();
  const { deleteUser } = useData();
  const { getCurrentUser } = useAuth();

  async function btnDeletePressed() {
    if (!userHovered) {
      return;
    }
    if (getCurrentUser().id === userHovered.id) {
      setUserHovered(null);
      setError("Can't delete yourself");
      return;
    }
    await deleteUser(userHovered.id);
  }
  useEffect(() => {
    if (userHovered) {
      setError("");
    }
  }, [userHovered]);
  return (
    <Card>
      <Card.Header>
        <h2 className="text-center">Utilisateurs Existants</h2>
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {users && users.length > 0 ? (
          <Table className="text-center">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Username</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => {
                return (
                  <User
                    key={idx}
                    user={user}
                    callback={setUserHovered}
                    hovered={userHovered && userHovered.id === user.id}
                  />
                );
              })}
            </tbody>
          </Table>
        ) : (
          <h4 className="text-center">No Users</h4>
        )}
        {userHovered && (
          <div className="gx 1">
            <Button className="border w-50" onClick={btnDeletePressed}>
              Supprimer
            </Button>
            <Button className="border w-50" onClick={btnDeletePressed}>
              Modifier
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
