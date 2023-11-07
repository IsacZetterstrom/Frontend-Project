import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";

function PriceSummary({ handleBookingClick, tickets, sum, setSum, selectedSeats, maxSeats }) {
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
              <h3 className="small-header">Totalt att betala</h3>
              <span className="text-nowrap">
                <span>{sum}</span>
                <span> kr</span>
              </span>
            </div>

            <p className="text-nowrap">Betalning sker på plats</p>

            <Button
              disabled={selectedSeats.length < maxSeats || maxSeats === 0}
              variant="custom"
              onClick={() => handleBookingClick()}
            >
              Boka
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PriceSummary;
