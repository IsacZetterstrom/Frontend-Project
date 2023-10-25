import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/Forms/LoginForm";
import { useFormDefaults } from "../hooks/useFormDefaults";
import fetchService from "../service/FetchService";
import cacheService from "../service/CacheService";

function LoginPage() {
  const { defaults, formData, setFormData } = useFormDefaults();
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email === "" || formData.password === "") return false;
    const res = await fetchService.fetchRes("auth/login", "POST", formData);
    if (res.status >= 400) {
      setMsg("Fel uppgifter");
      return false;
    } else {
      const jwt = await res.json();
      cacheService.saveLocalValue("token", jwt);
      setMsg("Du är nu inloggad och kommer nu bli dirigerad till start sidan");
      setTimeout(() => navigate("/"), 2000);
    }
  };

  return (
    <Container className="form-wrapper">
      <Row>
        <Container className="d-flex justify-content-center align-items-center">
          <h1 className="p-0 text-nowrap fs-1 mt-5 mb-5">Logga in</h1> <Container className="navline d-md-block" />
        </Container>
        <LoginForm {...{ defaults, handleSubmit, setFormData }} />
        {msg !== "" && <p className="text-center">{msg}</p>}
        <p className="text-center">
          Har du inte ett konto?<Link to={"/registrera"}>Registrera dig här!</Link>
        </p>
      </Row>
    </Container>
  );
}

export default LoginPage;
