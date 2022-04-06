import React, { useState } from "react";
import { Button, Card, Form, FormGroup } from "react-bootstrap";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";
export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const { getCurrentUser, logout, changeUser } = useAuth();
  const navigate = useNavigate();

  async function modifyBtnClicked() {
    if (!oldPassword || !password || !confirmPassword) {
      return;
    }

    let fd = new FormData();
    fd.append("id", getCurrentUser().id);
    fd.append("old_password", oldPassword);
    fd.append("new_password", password);
    await changeUser(fd).then((res) => {
      if (res.status === 200) {
        logout();
        navigate("/login");
      }
    });
  }
  return (
    <Card className="bg-transparent">
      <Card.Header className="text-center">
        <h2>Modifier Mot de Passe </h2>
      </Card.Header>
      <Card.Body>
        <Form>
          <FormGroup>
            <Form.Label>Ancien Mot de Passe</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setOldPassword(e.target.value)}
              value={oldPassword}
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
          <Button
            variant="dark"
            className="mt-2 w-100"
            onClick={modifyBtnClicked}
          >
            Modifier
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
