import React from "react";
import { Container, Button } from "react-bootstrap";

function FormBtns({ submitBtn, cancelBtn, showCancelBtn, setFormData }) {
  return (
    <Container>
      <Button className="form-control mt-3" type="submit">
        {submitBtn}
      </Button>
      {showCancelBtn && (
        <Button onClick={() => setFormData({})} className="form-control mt-3" type="reset">
          {cancelBtn}
        </Button>
      )}
    </Container>
  );
}

export default FormBtns;
