import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import "../styling/components/_ticketSelector.scss"


function TicketSelector() {
  return (
    <Container>
      <Row>
        <Col xs={8}>
          <p>Ordinarie (140 sek)</p>
        </Col>
        <Col xs={4}>
          <div className="btn-wrapper d-flex justify-content-end align-items-center">
            <Button>-</Button>
            <span>2</span>
            <Button>+</Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={8}>
          <p>Pensionär (120 sek)</p>
        </Col>
        <Col xs={4}>
          <div className="btn-wrapper d-flex justify-content-end align-items-center">
            <Button>-</Button>
            <span>2</span>
            <Button>+</Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={8}>
          <p>Barn t.o.m 11 år (80 sek)</p>
        </Col>
        <Col xs={4}>
          <div className="btn-wrapper d-flex justify-content-end align-items-center">
            <Button>-</Button>
            <span>2</span>
            <Button>+</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default TicketSelector