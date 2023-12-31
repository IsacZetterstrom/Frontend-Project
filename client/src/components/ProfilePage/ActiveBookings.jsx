import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { getMovieEndTime } from "../../utils/dateUtils.js";
import getDateWithDay from "../../utils/dateUtils.js";
import Cancelbooking from "./CancelBooking.js";

/**
 * @author Isac Zetterström
 * @description Renders card for active bookings
 */

function ActiveBookings({ activeBookings, setUpDate }) {
  return (
    <>
      <h6 className="offset-1 offset-sm-2 offset-md-3 offset-lg-0 small-header">Mina nuvarande bokningar</h6>
      {activeBookings === undefined ? (
        <p className="d-flex flex-column align-items-center flex-lg-row flex-lg-wrap gap-3 m-0">
          Du har inga bokningar för tillfället
        </p>
      ) : (
        <Row>
          <Container col={12} className="d-flex flex-column align-items-center flex-lg-row flex-lg-wrap gap-3 m-0">
            {activeBookings?.map((booking, i) => (
              <Col
                className="booking-card d-flex flex-shrink-0 mb-2 align-items-center"
                key={booking.referenceNumber + i}
              >
                <Col xs={3} sm={3} lg={3}>
                  <Image src={booking.poster} fluid className="profile-poster" />
                </Col>
                <Col className="booking-info-container">
                  <h6 className="my-1 mx-2 booking-title">{booking.movieTitle}</h6>
                  <p className="mb-0 mx-2">
                    {`${getDateWithDay(booking.screeningStartTime)}, Kl: ${getMovieEndTime(
                      booking.screeningStartTime,
                      booking.runTime
                    )} `}
                  </p>
                  <p className="card-seats mb-0">{`${booking.theaterName}, Rad-Stol: ${booking.seats}`}</p>
                  <p className="mb-1 mx-2">{`Pris: ${booking.priceSum.toLocaleString()} Kr`}</p>
                  <Col className="d-flex justify-content-between">
                    <span className="ref-number mx-2">Bokningsnummer: {booking.referenceNumber}</span>
                    <Button
                      size="md"
                      className="mx-2 mb-1 card-btn"
                      onClick={() => {
                        Cancelbooking(booking.bookingId, setUpDate);
                      }}
                    >
                      Avboka
                    </Button>
                  </Col>
                </Col>
              </Col>
            ))}
          </Container>
        </Row>
      )}
    </>
  );
}

export default ActiveBookings;
