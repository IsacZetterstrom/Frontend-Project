import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

import svg from "../../assets/screen.svg";
import { getRecommendedSeats, getSeatsInRow } from "../../utils/bookingPageUtils";

/**
 * @author Oliver Andersson
 * @param screeningData data about the select screening, comes from bookingPage
 * @param addOneSeat function for adding a single seat
 * @param addSeveralSeats function for adding several seats
 * @param selectedSeats state containing the select seats, comes from bookingPage
 * @param maxSeats state containing the amount of tickets chosen, comes from bookingPage
 * @description Renders seats based on provided screeningData and updates selectedSeats in bookingPage.
 */

function SeatPicker(props) {
  const rows = [];
  const [hoveringSeats, setHoveringSeats] = useState([]);
  const [selectSeveralSeats, setSelectSeveralSeats] = useState(true);

  // Take seats and put them in an array for each row to make rendering them out easier
  props.screeningData &&
    props.screeningData.allSeats.forEach((seat) => {
      if (rows[seat.Number_row - 1] === undefined) {
        rows[seat.Number_row - 1] = [seat];
      } else {
        rows[seat.Number_row - 1].push(seat);
      }
    });

  useEffect(() => {
    if (props.screeningData) {
      props.addSeveralSeats(getRecommendedSeats(rows, props.maxSeats))
    }
  }, [props.screeningData, props.maxSeats])


  function handleSeatClick(seat, row) {
    if (selectSeveralSeats) {
      const seats = getSeatsInRow(seat, row, props.maxSeats);
      props.addSeveralSeats(seats);
    } else {
      props.addOneSeat(seat);
    }
  }

  function handleHover(seat, row) {
    if (selectSeveralSeats) {
      const seats = getSeatsInRow(seat, row, props.maxSeats);
      setHoveringSeats(seats);
    } else {
      setHoveringSeats([seat]);
    }
  }

  return (
    <div className="seat-wrapper">
      <img src={svg} className="screen-svg" />
      {rows.map((row, i) => {
        return (
          <div className="seat-row" key={i}>
            {row.map((seat, i) => (
              <div
                key={i}
                className={`
                            seat
                            ${seat.Booked ? "booked" : ""}
                            ${props.selectedSeats.includes(seat) ? "selected" : ""}
                            ${hoveringSeats.includes(seat) ? "hover" : ""}
                        `}
                onClick={!seat.Booked ? () => handleSeatClick(seat, row) : undefined}
                onMouseEnter={!seat.Booked ? () => handleHover(seat, row) : undefined}
                onMouseLeave={() => setHoveringSeats([])}
              ></div>
            ))}
          </div>
        );
      })}

      <Form.Check
        className="pt-2"
        label="Välj enskilda platser"
        checked={!selectSeveralSeats}
        onChange={() => setSelectSeveralSeats(!selectSeveralSeats)}
      />
    </div>
  );
}

export default SeatPicker;
