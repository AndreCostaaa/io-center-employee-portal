import { useData } from "contexts/DataContext";
import React, { useState } from "react";
import { Button, Card, Form, FormGroup, Alert } from "react-bootstrap";

export default function UserForm({ setDataChanged, setCreating }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const { createUser } = useData();

  const [info, setInfo] = useState("");
  const [infoType, setInfoType] = useState("");

  function setError(message) {
    setInfoType("danger");
    setInfo(message);
  }

  function setSuccess(message) {
    setInfoType("success");
    setInfo(message);
  }
  function setInformation(message) {
    setInfoType("info");
    setInfo(message);
  }
  async function createBtnClicked() {
    if (
      !firstName ||
      !lastName ||
      !username ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      setError("Il faut remplir tous les champs");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passes ne sont pas les mêmes");
      return;
    }
    let fd = new FormData();
    fd.append("name", firstName + " " + lastName);
    fd.append("username", username);
    fd.append("password", password);
    fd.append("role", role);
    setInformation("Création en cours");
    await createUser(fd).then((res) => {
      if (res.status === 201) {
        setSuccess("Utilisateur créé");
        setCreating(false);
        setDataChanged(true);
      } else {
        setError(res.message);
      }
    });
  }
  return (
    <Card>
      <Card.Header>
        <h2 className="text-center">Créer Utilisateur</h2>
      </Card.Header>
      <Card.Body>
        {info && <Alert variant={infoType}>{info}</Alert>}
        <Form>
          <FormGroup>
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Confirmer Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Role</Form.Label>

            <Form.Select
              onChange={(e) => setRole(e.target.value.toLowerCase())}
            >
              <option>User</option>
              <option>Admin</option>
            </Form.Select>
          </FormGroup>
          <Button className="mt-2 w-100" onClick={createBtnClicked}>
            Create
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
