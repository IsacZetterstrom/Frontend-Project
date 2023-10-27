import React from "react";
import { Col, Container, Form } from "react-bootstrap";
import FormBtns from "./FormBtns";

/**
 * @author Niklas Nguyen
 * @param defaults is the object with attributes for inputs
 * @param handleSubmit is the submit funktion when a user presses the submit btn
 * @param setFormData is for to in this case reset the useState from the customhook
 * @param formData is the data i get from the custom hook
 * @description this is a finnished form for register
 */

export default function RegisterForm({ defaults, formData, handleSubmit, setFormData }) {
  return (
    <Form className="p-0" onSubmit={handleSubmit}>
      <Col className="mt-3">
        <label className="p-0 text-nowrap d-block line">E-Post</label>
        <input {...defaults("email", "", { minLength: 8, type: "email" })} />
      </Col>
      <Col className="mt-3">
        <label className="p-0 text-nowrap d-block line">Lösenord</label>
        <input
          {...defaults(
            "password",
            "",
            { minLength: 8, type: "password" },
            (val) => /\d/.test(val) && /[A-Z]/.test(val) && /[a-z]/.test(val),
            "Lösenordet måste innehålla minst ett stort bokstav,ett litet och ett siffra!"
          )}
        />
      </Col>
      <Col className="mt-3">
        <label className="p-0 text-nowrap d-block line">Bekräfta lösenord</label>
        <input
          {...defaults(
            "confirmPassword",
            "",
            { minLength: 8, type: "password" },
            (val) => val === formData.password,
            "Du måste ha matchande lösenord!"
          )}
        />
      </Col>
      <FormBtns {...{ submitBtn: "Registrera", cancelBtn: "Avbryt", showCancelBtn: true, setFormData }} />
    </Form>
  );
}
