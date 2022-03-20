import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [info, setInfo] = useState("");
  const [infoType, setInfoType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, verifyStoredToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await verifyStoredToken().then((res) => {
        if (res.status) {
          navigate("/dashboard");
        }
      });
    };

    fetchData();
  }, []);

  async function onClick(e) {
    e.preventDefault();
    if (!username) {
      setInfo("Username required");
      setInfoType("danger");
      return;
    }
    if (!password) {
      setInfo("Password required");
      setInfoType("danger");
      return;
    }
    setInfo("Logging in...");
    setInfoType("info");
    let response = await login(username, password);
    if (response.status) {
      setInfo("Login successful. Redirecting...");
      setInfoType("info");
      navigate("/dashboard");
    } else {
      setInfo(response.message);
      setInfoType("danger");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {info && <Alert variant={infoType}>{info}</Alert>}
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Button onClick={onClick} className="w-100 mt-2" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
