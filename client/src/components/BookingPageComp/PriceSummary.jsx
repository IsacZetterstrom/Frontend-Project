import React, { useState, useEffect } from "react";
import "../styling/components/_priceSummary.scss";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";

function PriceSummary({ handleBookingClick, tickets }) {
  const [sum, setSum] = useState(0);

  useEffect(() => {
    let total = 0;

    for (const [type, amount] of Object.entries(tickets)) {
      if (type === "1") total += 120 * amount;
      if (type === "2") total += 80 * amount;
      if (type === "3") total += 140 * amount;
    }

    setSum(total);
  }, [tickets]);

  return (
    <div className="price-summary-wrapper">
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs="12" md="6" xl="4" xxl="12">
            <div className="d-flex justify-content-between">
              <h4>Totalt att betala</h4>

              <span>
                <span>{sum}</span>
                <span> kr</span>
              </span>
            </div>

            <p>Betalning sker på plats</p>

            <Button variant="custom" onClick={handleBookingClick}>
              Boka
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PriceSummary;
