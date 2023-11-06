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
      <h6 className="offset-sm-2 offset-md-3 offset-lg-0 small-header">Bokningshistorik</h6>
      {expiredBookings === undefined ? (
        <p>Du har inga bokningar i historiken</p>
      ) : (
        <Row>
          <Container className="d-flex flex-column align-items-center flex-lg-row flex-lg-wrap">
            {expiredBookings?.map((booking) => {
              return (
                <Col lg={12} className="active-booking-card d-flex flex-shrink-0 mb-2 " key={booking.referenceNumber}>
                  <Col xs={3} sm={3} lg={3}>
                    <Image src={booking.poster} fluid className="profile-poster" />
                  </Col>
                  <Col>
                    <h6 className="my-1 mx-2 booking-title">{booking.movieTitle}</h6>
                    <p className="mb-0 mx-2">{getDateWithDay(booking.screeningStartTime)}</p>
                    <p className="mb-0 mx-2">{getMovieEndTime(booking.screeningStartTime, booking.runTime)}</p>
                    <p className="mb-0 mx-2">{`${booking.theaterName}, Rad-Stol: ${booking.seats}`}</p>
                    <p className="mb-1 mx-2">{`Pris: ${booking.priceSum} Kr`}</p>
                    <Col className="d-flex justify-content-between">
                      <span className="ref-number mx-2">Bokningsnummer: {booking.referenceNumber}</span>
                    </Col>
                  </Col>
                </Col>
              );
            })}
          </Container>
        </Row>
      )}
    </>
  );
}

export default expiredBookings;
