import React from "react";
import { Col, Form } from "react-bootstrap";
import FormBtns from "./FormBtns";

function EditUserForm({ defaults, handleSubmit, setFormData, userData }) {
  return (
    <Form className="p-0" onSubmit={handleSubmit}>
      <Col className="mt-3">
        <label className="p-0 text-nowrap line d-block">E-Post</label>
        <input {...defaults("email", userData !== undefined && userData.email, { required: false, minLength: 8, type: "email" })} />
      </Col>
      <Col className="mt-3">
        <label className="p-0 text-nowrap d-block line">Förnamn</label>
        <input {...defaults("firstname", userData !== undefined && userData.firstName, { required: false, type: "text" })} />
      </Col>
      <Col className="mt-3">
        <label className="p-0 text-nowrap d-block line">Efternamn</label>
        <input {...defaults("lastname", userData !== undefined && userData.lastName, { required: false, type: "text" })} />
      </Col>
      <Col className="mt-3">
        <label className="p-0 text-nowrap d-block line">Telefon</label>
        <input
          {...defaults(
            "phone",
            userData !== undefined && userData.phone,
            { required: false, minLength: 8, type: "tel" },
            (val) => /^\d*$/.test(val),
            "Använd bara nummer"
          )}
        />
      </Col>
      <FormBtns {...{ submitBtn: "Spara", cancelBtn: "Avbryt", showCancelBtn: true, setFormData }} />
    </Form>
  );
}

export default EditUserForm;
