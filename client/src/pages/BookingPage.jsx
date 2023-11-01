import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SeatPicker from "../components/BookingPageComp/SeatPicker";
import TicketSelector from "../components/BookingPageComp/TicketSelector";
import { Col, Container, Row } from "react-bootstrap";
import '../styling/components/_bookingPage.scss'
import PriceSummary from "../components/BookingPageComp/PriceSummary";
import useEventSource from "../hooks/useEventSource";
import ConfirmPopUpModal from "../components/Modals/ConfirmPopUpModal";
import BookingForm from "../components/BookingPage/BookingForm";
import MovieInfo from "../components/BookingPage/MovieInfo";

/**
 * @author Oliver Andersson
 * @description Page for chosing tickets, selecting seats and booking a screening
 */

function BookingPage() {
  
  const { screeningId } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [sum,setSum] = useState(0)
  const [maxSeats, setMaxSeats] = useState(2);
  const { err, screeningData } = useEventSource("http://localhost:3050/api/movies/screenings/" + screeningId )

  // State variable to control the visibility of BookingForm
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({tickets: []})

  // Keys are the Ticket_Type_id and the values are how many tickets are chosen for that ticket type 
  const [tickets, setTickets] = useState({
    1: 0,
    2: 0,
    3: 2
  });


  function addOneSeat(seat) {
    if(selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((x) => x !== seat))
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

    if(action == "+") {
      newTickets = {...tickets, [type]: tickets[type] + 1}
    } else if (action === "-" && tickets[type] > 0) {
      newTickets = {...tickets, [type]: tickets[type] - 1}
    }

    for (const [key, value] of Object.entries(newTickets)) {
      ticketCount += value;
    }

    setTickets(newTickets)
    setMaxSeats(ticketCount)
    setSelectedSeats([])
  }

  // Runs when "book" button gets pressed
  function handleBookingClick() {

    // Put ticket and seat data into correct structure for post request
    for (const [key, value] of Object.entries(tickets)) {
      for (let i = 0; i < value; i++) {
        if (selectedSeats[i] === undefined) return
    
        bookingInfo.tickets.push({
          Screening_id: screeningId,
          Ticket_Type_id: key,
          Seat_id: selectedSeats[i].Seat_id
        })
      } 
    }
    setShowBookingForm(true);
  }



  
  const popUpData = {
    title: "Jack Reacher: Never Go Back",
    dateAndTime: "2024-04-10T15:00:00.000Z",
    priceSum: 120,
    bookingRef: "DBA45C",
    saloon: "Stora salongen",
    seats: "Rad 5 Stol 41",


    runtime: 118,
    email: "oliver.andersson101@gmail.com"
  } 



  return (
    <Container fluid className="mt-4 p-4 booking-page-wrapper">
      <Row>
        <Col sm={12} md={6}>
          <Row>
            {screeningData ? (err && <p>err</p>) || <MovieInfo {...{ screeningData }} />: <></>}
          </Row>
          {showBookingForm ? <></>
            : 
            <Row>
              <PriceSummary {...{ handleBookingClick, tickets, setSum, sum }}/>
            </Row>
            }
        </Col>
        {showBookingForm ? (
          <BookingForm bookingInfo={bookingInfo} sum={sum} />
        ) : (
        <Col sm={12} md={6}>
          <h5 className="line pb-1">Välj antal biljetter</h5>
          <TicketSelector {...{ tickets, handleTicketChange }} />
          <h5 className="line pb-1">Välj platser</h5>
          {(err && <p>err</p>) || <SeatPicker {...{ screeningData, addOneSeat, addSeveralSeats, selectedSeats, maxSeats }} />}
        </Col>
        )}
      </Row>
    </Container>
  )
}

export default BookingPage;