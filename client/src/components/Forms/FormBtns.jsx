import React from "react";
import { Button, Col } from "react-bootstrap";

/**
 * @author Niklas Nguyen
 * @description these form buttons changes names through and if cancel btn should be showing
 */

function FormBtns({ submitBtn, cancelBtn, showCancelBtn, setFormData }) {
  return (
    <Col className="d-flex flex-column justify-content-center align-items-center">
      <Button className=" mt-3 submit-btn" type="submit">
        {submitBtn}
      </Button>
      {showCancelBtn && (
        <Button onClick={() => setFormData({})} className=" mt-3 cancel-btn" type="reset">
          {cancelBtn}
        </Button>
      )}
    </Col>
  );
}

export default FormBtns;
