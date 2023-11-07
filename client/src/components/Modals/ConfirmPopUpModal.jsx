import React from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { formatDateOrTime, formatDateStringToSwedish, getMovieEndTime } from "../../utils/dateUtils";
import { useNavigate } from "react-router-dom";

function ConfirmPopUpPage({ confirmationData, setToggle }) {
  const navigate = useNavigate();
  const handleClick = () => {
    setToggle(false);
    navigate("/");
  };

  return (
    <div className="confirm-wrapper-bg w-100">
      <div className="confirm-wrapper d-flex flex-column  p-4">
        <h1 className="mb-4 line-center header-bold">Tack för din bokning</h1>

        <Row>
          <Col xs={4}>
            <Image src={confirmationData.poster} alt="" fluid rounded className="max-200 max-300"></Image>
          </Col>
          <Col xs={8} className="d-flex flex-column justify-content-between">
            <Row>
              <h2>{confirmationData.title}</h2>
              <p>{formatDateStringToSwedish(confirmationData.dateAndTime)}</p>
              <p>{getMovieEndTime(confirmationData.dateAndTime, confirmationData.runtime)}</p>
              <p>
                {confirmationData.saloon}, {confirmationData.seats}
              </p>
              <p>
                <span className="bold">Pris: </span>
                {confirmationData.priceSum}kr
              </p>
            </Row>
            <Row>
              <p>{confirmationData.email}</p>
              <p>
                <span className="bold">Bokningsnummer: </span>
                {confirmationData.bookingRef}
              </p>
            </Row>
          </Col>
        </Row>

        <h3 className="my-3">Bokningsdetaljer har skickats till din mail</h3>
        <Row className="align-items-center justify-content-center">
          <Button variant="custom" onClick={() => handleClick()}>
            Stäng
          </Button>
        </Row>
      </div>
    </div>
  );
}

export default ConfirmPopUpPage;
