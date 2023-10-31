import React, { useState, useEffect } from "react";
import "../styling/components/_priceSummary.scss";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";

function PriceSummary({ handleBookingClick, tickets, setSum, sum }) {
    
    

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
          <Col>
            <div className="d-flex justify-content-between text-nowrap">
              <h4 className="text-nowrap">Totalt att betala</h4>

              <span className="text-nowrap">
                <span>{sum}</span>
                <span> kr</span>
              </span>
            </div>

            <p className="text-nowrap">Betalning sker på plats</p>

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
