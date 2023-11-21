import React from "react";
import { Link } from "react-router-dom";
import Logotype from "../assets/Logotype.svg";
import { Col, Image, Row } from "react-bootstrap";

function ErrorPage() {
  return (
    <Row className="p-0 m-5">
      <Col className="d-flex flex-column justify-content-center align-items-center p-0 m-0 ">
        <Link to={"/"} className="p-0 m-2">
          <Image src={Logotype} alt="Logo" />
        </Link>

        <h1 className="header-bold m-2">SIDAN HITTAS INTE</h1>
        <p className="m-1">
          Klicka <Link to={"/"}>Här</Link> för att bli navigerad till startsidan
        </p>
      </Col>
    </Row>
  );
}

export default ErrorPage;
