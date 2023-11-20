import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SeatPicker from "../components/BookingPage/SeatPicker";
import TicketSelector from "../components/BookingPage/TicketSelector";
import { Col, Container, Row } from "react-bootstrap";
import PriceSummary from "../components/BookingPage/PriceSummary";
import useEventSource from "../hooks/useEventSource";
import ConfirmPopUpModal from "../components/Modals/ConfirmPopUpModal";
import BookingForm from "../components/BookingPage/BookingForm";
import MovieInfo from "../components/BookingPage/MovieInfo";
import { createTicketStructure } from "../utils/bookingPageUtils";

/**
 * @author Oliver Andersson
 * @description Page for chosing tickets, selecting seats and booking a screening
 */

function BookingPage() {
  
  const { screeningId } = useParams();
  const { err, screeningData } = useEventSource("https://filmvisarna-team2.nodehill.se/api/movies/screenings/" + screeningId);
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [sum, setSum] = useState(0);
  const [maxSeats, setMaxSeats] = useState(2);
  const [confirmationData, setConfirmationData] = useState(null);

  // State variable to control the visibility of BookingForm
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({ tickets: [] });

  const [toggle, setToggle] = useState(false);

  // Keys are the Ticket_Type_id and the values are how many tickets are chosen for that ticket type
  const [tickets, setTickets] = useState({
    1: 0,
    2: 0,
    3: 2,
  });

  // Add one seat
  function addOneSeat(seat) {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((x) => x !== seat));
    } else {
      if (selectedSeats.length >= maxSeats) {
        const updatedSeats = selectedSeats.slice(1);
        setSelectedSeats([...updatedSeats, seat]);
      } else {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  }

  // Add several seats
  function addSeveralSeats(seats) {
    setSelectedSeats(seats);
  }

  // Runs when + or - in ticketSelector gets pressed
  function handleTicketChange(action, type) {
    let newTickets = tickets;
    let ticketCount = 0;

    if (action == "+") {
      newTickets = { ...tickets, [type]: tickets[type] + 1 };
    } else if (action === "-" && tickets[type] > 0) {
      newTickets = { ...tickets, [type]: tickets[type] - 1 };
    }

    for (const [key, value] of Object.entries(newTickets)) {
      ticketCount += value;
    }

    setTickets(newTickets);
    setMaxSeats(ticketCount);
    setSelectedSeats([]);
  }

  // Runs when "book" button gets pressed
  function handleBookingClick() {
    const data = createTicketStructure(tickets, selectedSeats, screeningId);

    setBookingInfo(data);
    setShowBookingForm(true);
  }

  return (
    <Container fluid className="mt-4 p-4 booking-page-wrapper">
      <Row>
        <Col sm={12} md={6}>
          <Row>{screeningData ? (err && <p>err</p>) || <MovieInfo {...{ screeningData }} /> : <></>}</Row>
          {showBookingForm ? (
            <></>
          ) : (
            <Row>
              <PriceSummary {...{ handleBookingClick, tickets, setSum, sum, selectedSeats, maxSeats }} />
            </Row>
          )}
        </Col>
        {showBookingForm ? (
          <BookingForm {...{ bookingInfo, sum, setToggle, setConfirmationData, setShowBookingForm }} />
        ) : (
          <Col sm={12} md={6}>
            <h3 className="line pb-1 small-header">Välj antal biljetter</h3>
            <TicketSelector {...{ tickets, handleTicketChange }} />
            <h3 className="line pb-1 small-header">Välj platser</h3>
            {(err && <p>err</p>) || (
              <SeatPicker {...{ screeningData, addOneSeat, addSeveralSeats, selectedSeats, maxSeats }} />
            )}
          </Col>
        )}
      </Row>
      {toggle && <ConfirmPopUpModal {...{ confirmationData, setToggle }} />}
    </Container>
  );
}

export default BookingPage;
