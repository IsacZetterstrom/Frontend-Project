import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SeatPicker from "../components/SeatPicker";

function BookingPage() {
  
  const { screeningId } = useParams();

  const [screeningData, setScreeningData] = useState({});
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [maxSeats, setMaxSeats] = useState(3);



  // Flytta ut denna useEffect?
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3050/api/movies/screenings/" + screeningId);

    eventSource.onmessage = (event) => {
      setScreeningData(JSON.parse(event.data));
    };

    return () => eventSource.close();
  }, []);



  function handleSeatClick(seat) {
    if(selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((x) => x !== seat))
    } else {

      if (selectedSeats.length >= maxSeats) {
        // Remove the first item from selectedSeats before adding a new one
        const updatedSeats = selectedSeats.slice(1);
        setSelectedSeats([...updatedSeats, seat]);
      } else {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  }

  console.log(selectedSeats)

  return <>
    <SeatPicker
      screeningData={screeningData}
      handleSeatClick={handleSeatClick}
      selectedSeats={selectedSeats}
    />
  </>;
}

export default BookingPage;
