import React, { useState } from "react";
import { useFormDefaults } from "../hooks/useFormDefaults";
import RegisterForm from "../components/Forms/RegisterForm";
import fetchService from "../service/FetchService";
import { Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const { defaults, formData, setFormData } = useFormDefaults();
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email === "" || formData.password === "") return false;
    const res = await fetchService.fetchRes("auth/register", "POST", formData);
    if (res.status >= 400) {
      setMsg("Blev fel vid registreringen");
      return false;
    } else {
      setMsg("Du kommer nu bli dirigerad för att logga in");
      setTimeout(() => navigate("/logga-in"), 2000);
    }
  };

  return (
    <Container fluid className="form-wrapper">
      <Row>
        <h1>Bli medlem</h1>
        <RegisterForm {...{ defaults, formData, handleSubmit, setFormData }} />
        {msg !== null && <p>{msg}</p>}
        <p>
          Har du redan ett konto?<Link to={"/logga-in"}>Logga in här!</Link>
        </p>
      </Row>
    </Container>
  );
}

export default RegisterPage;
