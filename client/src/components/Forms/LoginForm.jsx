import React from "react";
import { Col, Container } from "react-bootstrap";
import FormBtns from "./FormBtns";

/**
 * @author Niklas Nguyen
 * @param defaults is the object with attributes for inputs
 * @param handleSubmit is the submit funktion when a user presses the submit btn
 * @param setFormData is for to in this case reset the useState from the customhook
 * @description this is a finnished form for login
 */

function LoginForm({ defaults, handleSubmit, setFormData }) {
  return (
    <form className="p-0" onSubmit={handleSubmit}>
      <Col className="mt-3">
        <div className="d-flex justify-content-center align-items-center p-0">
          <label className="p-0 text-nowrap">E-Post</label> <Container className="navline d-md-block" />
        </div>
        <input {...defaults("email", "", { minLength: 8, type: "email" })} />
      </Col>
      <Col className="mt-3">
        <div className="d-flex justify-content-center align-items-center p-0">
          <label className="p-0 text-nowrap">Lösenord</label> <Container className="navline d-md-block" />
        </div>
        <input {...defaults("password", "", { type: "password" })} />
      </Col>
      <FormBtns {...{ submitBtn: "Logga in", cancelBtn: "Avbryt", showCancelBtn: false, setFormData }} />
    </form>
  );
}

export default LoginForm;
