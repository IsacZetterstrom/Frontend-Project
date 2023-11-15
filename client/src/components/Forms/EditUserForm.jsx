import React from "react";
import { Col, Form } from "react-bootstrap";
import FormBtns from "./FormBtns";

/**
 * @author Niklas Nguyen
 * @param defaults is the object with attributes for inputs
 * @param handleSubmit is the submit funktion when a user presses the submit btn
 * @param setFormData is for to in this case reset the useState from the customhook
 * @param userData is the data the user has, if the name is null nothing shows in the place holder else it shows the email exc
 * @description this is a finnished form for login
 */

function EditUserForm({ defaults, handleSubmit, setFormData, userData, runFunction }) {
  return (
    <Form className="p-0" onSubmit={handleSubmit}>
      <Col className="mt-3">
        <label className="p-0 text-nowrap line d-block">E-Post</label>
        <input
          {...defaults("email", userData !== undefined && userData.email, {
            required: false,
            minLength: 8,
            type: "email",
          })}
        />
      </Col>
      <Col className="mt-3">
        <label className="p-0 text-nowrap d-block line">Förnamn</label>
        <input {...defaults("firstname", userData !== undefined && userData.firstName, { required: false })} />
      </Col>
      <Col className="mt-3">
        <label className="p-0 text-nowrap d-block line">Efternamn</label>
        <input {...defaults("lastname", userData !== undefined && userData.lastName, { required: false })} />
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
      <FormBtns
        {...{
          submitBtn: "Spara",
          cancelBtn: "Avbryt",
          showCancelBtn: true,
          setFormData,
          runFunction,
        }}
      />
    </Form>
  );
}

export default EditUserForm;
