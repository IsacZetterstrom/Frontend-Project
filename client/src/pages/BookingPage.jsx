import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SeatPicker from "../components/SeatPicker";
import TicketSelector from "../components/TicketSelector";
import MovieInfo from "../components/BookingPage/MovieInfo";
import { Container, Col, Row } from "react-bootstrap";
import '../styling/components/_bookingPage.scss';
import'../styling/components/_movieInfo.scss';

/**
 * @author Oliver Andersson
 * @description Page for chosing tickets, selecting seats and booking a screening
 */

function BookingPage() {
  
  const { screeningId } = useParams();

  const [screeningData, setScreeningData] = useState({});
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [maxSeats, setMaxSeats] = useState(2);


  // Keys are the Ticket_Type_id and the values are how many tickets are chosen for that ticket type 
  const [tickets, setTickets] = useState({
    1: 0,
    2: 0,
    3: 2
  });



  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3050/api/movies/screenings/" + screeningId);

    eventSource.onmessage = (event) => {
      setScreeningData(JSON.parse(event.data));
    };

    return () => eventSource.close();
  }, []);



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

  function handleTicketChange(action, type) {
    let newTickets;
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
  }


  return (
    <Container fluid className="booking-page-wrapper p-4">
      <Row>
       <Col sm={6} className="lala"> <Row>
       <MovieInfo screeningData={screeningData}/>
       </Row>
       </Col>
     
       <Col sm={6}>
      <h5>Välj antal biljetter</h5>

      <TicketSelector
        tickets={tickets}
        handleTicketChange={handleTicketChange}
      />

      <h5>Välj platser</h5>

      <SeatPicker
        screeningData={screeningData}
        addOneSeat={addOneSeat}
        addSeveralSeats={addSeveralSeats}
        selectedSeats={selectedSeats}
        maxSeats={maxSeats}
      />
      </Col>
      </Row>
    </Container>
    





  )
}

export default BookingPage;
