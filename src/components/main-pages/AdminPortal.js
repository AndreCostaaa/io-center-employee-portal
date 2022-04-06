import { useAuth } from "contexts/AuthContext";
import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AdminPortal() {
  const { getCurrentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (getCurrentUser().role !== "admin") {
      navigate("/login");
    }
  }, [getCurrentUser, navigate]);

  return (
    <Card className="bg-transparent">
      <Card.Header>
        <h2 className="text-center">Portal Admin</h2>
      </Card.Header>
      <Card.Body>
        <Button
          variant="dark"
          onClick={() => navigate("/tool")}
          className="w-100 mt-2 border"
        >
          Gèrer outils
        </Button>
        <Button
          variant="dark"
          onClick={() => navigate("/user")}
          className="w-100 mt-2 border"
        >
          Gèrer utilisateurs
        </Button>
      </Card.Body>
    </Card>
  );
}
