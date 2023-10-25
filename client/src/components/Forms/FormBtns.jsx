import React from "react";
import { Button, Container } from "react-bootstrap";

function FormBtns({ submitBtn, cancelBtn, showCancelBtn, setFormData }) {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <Button className=" mt-3 submit-btn" type="submit">
        {submitBtn}
      </Button>
      {showCancelBtn && (
        <Button onClick={() => setFormData({})} className=" mt-3 cancel-btn" type="reset">
          {cancelBtn}
        </Button>
      )}
    </Container>
  );
}

export default FormBtns;
