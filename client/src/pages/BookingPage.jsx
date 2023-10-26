import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SeatPicker from "../components/SeatPicker";
import TicketSelector from "../components/TicketSelector";
import { Container } from "react-bootstrap";

import '../styling/components/_bookingPage.scss'

/**
 * @author Oliver Andersson
 * @description Page for chosing tickets, selecting seats and booking a screening
 */

function BookingPage() {
  
  const { screeningId } = useParams();

  const [screeningData, setScreeningData] = useState({});
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [maxSeats, setMaxSeats] = useState(3);



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


  return <Container className="booking-page-wrapper pt-3">
  
    <h2>Välj antal biljetter</h2>

    <TicketSelector

    />

    <h2>Välj platser</h2>

    <SeatPicker
      screeningData={screeningData}
      addOneSeat={addOneSeat}
      addSeveralSeats={addSeveralSeats}
      selectedSeats={selectedSeats}
      maxSeats={maxSeats}
    />
  </Container>;
}

export default BookingPage;
