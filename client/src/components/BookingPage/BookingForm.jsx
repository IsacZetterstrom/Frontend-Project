import React, { useState } from "react";
import { useFormDefaults } from '../../hooks/useFormDefaults';
import { useOutletContext } from 'react-router-dom';
import { Container, Row } from "react-bootstrap";
import LoginForm from "../Forms/LoginForm";

function BookingForm() {
    const { defaults, formData, setFormData } = useFormDefaults();
    const [isLoggedIn, setIsLoggedIn] = useOutletContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
      };

  return (
    <Container className="form-wrapper">
    <Row>
      <h1 className="p-0 text-nowrap mt-5 mb-5 pb-2 line">Logga in</h1>
      <Form className="p-0" onSubmit={handleSubmit}>
      <Col className="mt-3">
        <label className="p-0 text-nowrap line d-block">E-Post</label>
        <input {...defaults("email", "", { minLength: 8, type: "email" })} />
      </Col>
      <Col className="mt-3">
        <label className="p-0 text-nowrap d-block line">Lösenord</label>
        <input {...defaults("password", "", { type: "password" })} />
      </Col>
      <FormBtns {...{ submitBtn: "Logga in", cancelBtn: "Avbryt", showCancelBtn: false, setFormData }} />
    </Form>
    </Row>
  </Container>
  )
}

export default BookingForm