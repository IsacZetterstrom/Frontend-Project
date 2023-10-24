import React from "react";
import { useState, useEffect } from "react";

function BookingPage() {
  const [json, setJson] = useState("");

  useEffect(() => {
    // koppla på routen
    const eventSource = new EventSource("http://localhost:3050/api/movies/screenings/1");

    // Ta emot data från server här
    eventSource.onmessage = (event) => {
      setJson(JSON.parse(event.data)); // Spara ny data i state
    };

    return () => eventSource.close();
  }, []);

  // console.log(json);

  return <>BookingPage</>;
}

export default BookingPage;
