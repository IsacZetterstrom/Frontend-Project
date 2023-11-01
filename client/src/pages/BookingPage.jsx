import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SeatPicker from "../components/BookingPage/SeatPicker";
import TicketSelector from "../components/BookingPage/TicketSelector";
import { Col, Container, Row } from "react-bootstrap";
import PriceSummary from "../components/BookingPage/PriceSummary";
import useEventSource from "../hooks/useEventSource";
import MovieInfo from "../components/MovieInfo";
import ConfirmPopUpModal from "../components/Modals/ConfirmPopUpModal";

/**
 * @author Oliver Andersson
 * @description Page for chosing tickets, selecting seats and booking a screening
 */

function BookingPage() {
  const { screeningId } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [maxSeats, setMaxSeats] = useState(2);
  const { err, screeningData } = useEventSource("http://localhost:3050/api/movies/screenings/" + screeningId);
  const [toggle, setToggle] = useState(false);

  // Keys are the Ticket_Type_id and the values are how many tickets are chosen for that ticket type
  const [tickets, setTickets] = useState({
    1: 0,
    2: 0,
    3: 2,
  });

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
    const data = {
      tickets: [],
    };

    // Put ticket and seat data into correct structure for post request
    for (const [key, value] of Object.entries(tickets)) {
      for (let i = 0; i < value; i++) {
        if (selectedSeats[i] === undefined) return;

        data.tickets.push({
          Screening_id: screeningId,
          Ticket_Type_id: key,
          Seat_id: selectedSeats[i].Seat_id,
        });
      }
    }
    setToggle((val) => !val);
    console.log(data);
  }

  const popUpData = {
    title: "Jack Reacher: Never Go Back",
    dateAndTime: "2024-04-10T15:00:00.000Z",
    priceSum: 120,
    bookingRef: "DBA45C",
    saloon: "Stora salongen",
    seats: "Rad 5 Stol 41",

    runtime: 118,
    email: "oliver.andersson101@gmail.com",
  };

  return (
    <Container fluid className="booking-page-wrapper w-100 p-0 m-0">
      <Row className="p-4 m-0">
        <Col sm={6}>
          {(err && <p>err</p>) || <MovieInfo {...{ screeningData }} />}
          <PriceSummary {...{ handleBookingClick, tickets }} />
        </Col>

        <Col sm={6}>
          <h5 className="line pb-1">Välj antal biljetter</h5>

          <TicketSelector {...{ tickets, handleTicketChange }} />

          <h5 className="line pb-1">Välj platser</h5>

          {(err && <p>err</p>) || <SeatPicker {...{ screeningData, addOneSeat, addSeveralSeats, selectedSeats, maxSeats }} />}
        </Col>
      </Row>
      {toggle && <ConfirmPopUpModal {...{ popUpData, setToggle }} />}
    </Container>
  );
}

export default BookingPage;
