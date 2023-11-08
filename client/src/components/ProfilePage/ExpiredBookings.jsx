import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import getDateWithDay, { getMovieEndTime } from "../../utils/dateUtils.js";

/**
 * @author Isac Zetterström
 * @description renders cards for expired bookings
 */

function expiredBookings({ expiredBookings }) {
  return (
    <>
      <h6 className="offset-1 offset-sm-2 offset-md-3 offset-lg-0 small-header booking-history-header">
        Bokningshistorik
      </h6>
      {expiredBookings === undefined ? (
        <p className="d-flex flex-column align-items-center flex-lg-row flex-lg-wrap gap-3 m-0">
          Du har inga bokningar i historiken
        </p>
      ) : (
        <Row>
          <Container
            col={12}
            className="d-flex flex-column align-items-center flex-lg-row flex-lg-wrap gap-3 m-0">
            {expiredBookings?.map((booking, i) => (
              <Col
                className="booking-card d-flex flex-shrink-0 mb-2 align-items-center"
                key={booking.referenceNumber + i}>
                <Col xs={3} sm={3} lg={3}>
                  <Image
                    src={booking.poster}
                    fluid
                    className="profile-poster"
                  />
                </Col>
                <Col className="booking-info-container">
                  <h6 className="my-1 mx-2 booking-title">
                    {booking.movieTitle}
                  </h6>
                  <p className="mb-0 mx-2">
                    {`${getDateWithDay(
                      booking.screeningStartTime
                    )}, Kl: ${getMovieEndTime(
                      booking.screeningStartTime,
                      booking.runTime
                    )} `}
                  </p>
                  <p className="card-seats mb-0">{`${booking.theaterName}, Rad-Stol: ${booking.seats}`}</p>
                  <p className="mb-1 mx-2">{`Pris: ${booking.priceSum} Kr`}</p>
                  <Col className="d-flex justify-content-between">
                    <span className="ref-number mx-2">
                      Bokningsnummer: {booking.referenceNumber}
                    </span>
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

export default expiredBookings;
