import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FiPlus, FiMinus } from "react-icons/fi";

/**
 * @author Oliver Andersson
 * @param tickets is the object containing the ticket types
 * @param handleTicketChange is the function for handling a ticket change
 * @description component for selecting tickets
 */

function TicketSelector({ tickets, handleTicketChange }) {
  return (
    <Container className="ticket-selector-wrapper">
      <Row>
        <Col xs={8} className="ps-0">
          <p>Ordinarie (140 kr)</p>
        </Col>
        <Col xs={4}>
          <div className="btn-wrapper d-flex justify-content-end align-items-center">
            <Button variant="custom" onClick={() => handleTicketChange("-", 3)}>
              <FiMinus></FiMinus>
            </Button>
            <span>{tickets["3"]}</span>
            <Button variant="custom" onClick={() => handleTicketChange("+", 3)}>
              <FiPlus></FiPlus>
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={8} className="ps-0">
          <p>Pensionär (120 kr)</p>
        </Col>
        <Col xs={4}>
          <div className="btn-wrapper d-flex justify-content-end align-items-center">
            <Button variant="custom" onClick={() => handleTicketChange("-", 1)}>
              <FiMinus></FiMinus>
            </Button>
            <span>{tickets["1"]}</span>
            <Button variant="custom" onClick={() => handleTicketChange("+", 1)}>
              <FiPlus></FiPlus>
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={8} className="ps-0">
          <p>Barn t.o.m 11 år (80 kr)</p>
        </Col>
        <Col xs={4}>
          <div className="btn-wrapper d-flex justify-content-end align-items-center">
            <Button variant="custom" onClick={() => handleTicketChange("-", 2)}>
              <FiMinus></FiMinus>
            </Button>
            <span>{tickets["2"]}</span>
            <Button variant="custom" onClick={() => handleTicketChange("+", 2)}>
              <FiPlus></FiPlus>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default TicketSelector;
