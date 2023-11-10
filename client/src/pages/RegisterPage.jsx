import React, { useState } from "react";
import { useFormDefaults } from "../hooks/useFormDefaults";
import RegisterForm from "../components/Forms/RegisterForm";
import fetchService from "../service/FetchService";
import { Container, Row } from "react-bootstrap";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import cacheService from "../service/CacheService";

/**
 * @author Niklas Nguyen
 * @description holds the register form and send the data to the server if it succes the user will be directed to login page
 */

function RegisterPage() {
  const { defaults, formData, setFormData } = useFormDefaults();
  const { setIsLoggedIn } = useOutletContext();
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
      const jwt = await res.json();
      cacheService.saveLocalValue("token", jwt);
      setMsg("Du är nu inloggad och kommer nu bli dirigerad till startsidan");
      setIsLoggedIn(true);
      setTimeout(() => navigate("/"), 2000);
    }
  };

  return (
    <Container className="form-wrapper">
      <Row>
        <h1 className="p-0 text-nowrap mt-5 mb-5 line pb-2 large-header">Bli medlem</h1>
        <RegisterForm {...{ defaults, formData, handleSubmit, setFormData }} />
        {msg !== "" && <p className="text-center">{msg}</p>}
        <p className="text-center my-4">
          Har du redan ett konto? <Link to={"/logga-in"}>Logga in här!</Link>
        </p>
      </Row>
    </Container>
  );
}

export default RegisterPage;
