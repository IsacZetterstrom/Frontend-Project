import React from "react";
import { Container } from "react-bootstrap";
import FormBtns from "./FormBtns";

export default function RegisterForm({ defaults, formData, handleSubmit, setFormData }) {
  return (
    <form onSubmit={handleSubmit}>
      <Container className="mt-3">
        <label>E-Post</label>
        <input {...defaults("email", "", { minLength: 8, type: "email" })} />
      </Container>
      <Container className="mt-3">
        <label>Välj ett lössenord</label>
        <input
          {...defaults(
            "password",
            "",
            { minLength: 8, type: "password" },
            (val) => /\d/.test(val) && /[A-Z]/.test(val) && /[a-z]/.test(val),
            "Lössenordet måste innehålla minst ett stort bokstav,ett litet och ett siffra!"
          )}
        />
      </Container>
      <Container className="mt-3">
        <label>Bekräfta lössenord</label>
        <input
          {...defaults(
            "confirmPassword",
            "",
            { minLength: 8, type: "password" },
            (val) => val === formData.password,
            "Du måste ha matchande lössenord!"
          )}
        />
      </Container>
      <FormBtns {...{ submitBtn: "Registrera", cancelBtn: "Avbryt", showCancelBtn: true, setFormData }} />
    </form>
  );
}
