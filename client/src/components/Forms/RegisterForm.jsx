import React from "react";
import { Container } from "react-bootstrap";
import FormBtns from "./FormBtns";

export default function RegisterForm({ defaults, formData, handleSubmit, setFormData }) {
  return (
    <form className="p-0" onSubmit={handleSubmit}>
      <Container className="mt-3">
        <Container className="d-flex justify-content-center align-items-center p-0">
          <label className="p-0 text-nowrap">E-Post</label> <Container className="navline d-md-block" />
        </Container>
        <input {...defaults("email", "", { minLength: 8, type: "email" })} />
      </Container>
      <Container className="mt-3">
        <Container className="d-flex justify-content-center align-items-center p-0">
          <label className="p-0 text-nowrap">Lösenord</label> <Container className="navline d-md-block" />
        </Container>
        <input
          {...defaults(
            "password",
            "",
            { minLength: 8, type: "password" },
            (val) => /\d/.test(val) && /[A-Z]/.test(val) && /[a-z]/.test(val),
            "Lösenordet måste innehålla minst ett stort bokstav,ett litet och ett siffra!"
          )}
        />
      </Container>
      <Container className="mt-3">
        <Container className="d-flex justify-content-center align-items-center p-0">
          <label className="p-0 text-nowrap">Bekräfta lösenord</label> <Container className="navline d-md-block" />
        </Container>
        <input
          {...defaults(
            "confirmPassword",
            "",
            { minLength: 8, type: "password" },
            (val) => val === formData.password,
            "Du måste ha matchande lösenord!"
          )}
        />
      </Container>
      <FormBtns {...{ submitBtn: "Registrera", cancelBtn: "Avbryt", showCancelBtn: true, setFormData }} />
    </form>
  );
}
