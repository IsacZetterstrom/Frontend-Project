import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BsInstagram, BsLinkedin, BsTwitter, BsTelephone } from "react-icons/bs";
import "../styling/components/_footer.scss";

/**
 * @author Sara Johansson
 * @Description Footer with address and social media links.
 */

function Footer() {
  return (
    <Container fluid className="custom-footer mt-5">
      <Row className="icon-row text-center mt-3">
        <Col xs={1} className="icon-col p-0">
          <a href="https://www.twitter.com/" className="icon fs-3 ">
            <BsTwitter />
          </a>
        </Col>
        <Col xs={1} className="icon-col p-0">
          <a href="https://www.linkedin.com/" className="icon fs-3">
            <BsLinkedin />
          </a>
        </Col>
        <Col xs={1} className="icon-col p-0">
          <a href="https://www.instagram.com/" className="icon fs-3">
            <BsInstagram />
          </a>
        </Col>
      </Row>
      <Row className="justify-content-center text-center mt-2">
        <Col md={12} className="phone-col">
          <a href="tel:+1234567891" className="icon">
            <BsTelephone /> 12-34 56 78 91
          </a>
        </Col>
        <Col md={12} className="footer-adress mt-2">
          <a>Springavägen 420, 133 37 Rymden</a>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col className="footer-text mt-2">
          <p className="mt-2">&copy; 2023 Filmvisarna</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
