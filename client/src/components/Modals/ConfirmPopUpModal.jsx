import React from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { formatDateOrTime, formatDateStringToSwedish, getMovieEndTime } from "../../utils/dateUtils";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";

function ConfirmPopUpPage({ popUpData, setToggle }) {
  const { movieId } = useParams();
  const { loading, err, data } = useFetchData(`/api/movies/${movieId}`);
  const navigate = useNavigate();
  const handleClick = () => {
    setToggle(false);
    navigate("/");
  };
  return (
    <div className="confirm-wrapper-bg w-100">
      <div className="confirm-wrapper d-flex flex-column align-items-center p-4">
        <h1 className="mb-4">Tack för din bokning</h1>

        <Row>
          <Col xs={4}>
            <Image src={data?.movie.Poster} alt="" fluid rounded className="max-200 max-300"></Image>
          </Col>
          <Col xs={8} className="d-flex flex-column justify-content-between">
            <Row>
              <h2>{popUpData.title}</h2>
              <p>{formatDateStringToSwedish(popUpData.dateAndTime)}</p>
              <p>{getMovieEndTime(popUpData.dateAndTime, popUpData.runtime)}</p>
              <p>
                {popUpData.saloon}, {popUpData.seats}
              </p>
              <p>
                <span className="bold">Pris: </span>
                {popUpData.priceSum}kr
              </p>
            </Row>
            <Row>
              <p>{popUpData.email}</p>
              <p>
                <span className="bold">Bokningsnummer: </span>
                {popUpData.bookingRef}
              </p>
            </Row>
          </Col>
        </Row>

        <h3 className="my-3">Bokningsdetaljer har skickats till din mail</h3>

        <Button variant="custom" onClick={() => handleClick()}>
          Stäng
        </Button>
      </div>
    </div>
  );
}

export default ConfirmPopUpPage;
