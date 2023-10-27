import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import dateUtils from "../../utils/dateUtils.js";

function ActiveBookings({ activeBookings }) {
  console.log(activeBookings);

  return (
    <>
      <h6 className="mb-2">Mina nuvarande bokningar</h6>
      <Row>
        <Container className=" d-flex flex-column align-items-center">
          {activeBookings.map((booking) => {
            return (
              <Col
                className="active-booking-card d-flex flex-shrink-0 mb-2"
                key={booking.referenceNumber}>
                <Col xs={3} sm={3} lg={3}>
                  <Image
                    src={booking.poster}
                    fluid
                    className="profile-poster"
                  />
                </Col>
                <Col>
                  <h6 className="my-2 mx-2 booking-title">
                    {booking.movieTitle}
                  </h6>
                  <p className="mb-0 mx-2">
                    {dateUtils.getDateWithDay(booking.screeningStartTime)}
                  </p>
                  <p className="mb-0 mx-2">{booking.screeningStartTime}</p>
                  <p className="mb-0 mx-2">{`${booking.theaterName}, Plats-Stol: ${booking.seats}`}</p>
                  <p className="mb-1 mx-2">{`Pris: ${booking.priceSum} Kr`}</p>
                  <Col className="d-flex justify-content-between">
                    <span className="ref-number mx-2">
                      Bokningsnummer: {booking.referenceNumber}
                    </span>
                    <Button size="sm" className="cancel-booking mx-2 mb-1">
                      Avboka
                    </Button>
                  </Col>
                </Col>
              </Col>
            );
          })}
        </Container>
      </Row>
    </>
  );
}

export default ActiveBookings;
