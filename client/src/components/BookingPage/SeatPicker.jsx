import React, {useState} from 'react'
import {Col, Container, Form, Row} from 'react-bootstrap'

import svg from "../../assets/screen.svg"

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
    
    const rows = []
    const [hoveringSeats, setHoveringSeats] = useState([]);
    const [selectSeveralSeats, setSelectSeveralSeats] = useState(true);

    // Take seats and put them in an array for each row to make rendering them out easier
    props.screeningData && props.screeningData.allSeats.forEach((seat) => {
        if(rows[seat.Number_row -1] === undefined) {
            rows[seat.Number_row - 1] = [seat]
        } else {
            rows[seat.Number_row - 1].push(seat)
        };
    })


    // Returns seats if they fit on the row and are not booked 
    function getSeatsInRow(seat, row, atFarRight) {
        const rowLength = row.length
        let seatIndex = row.indexOf(seat)
        const maxSeats = props.maxSeats
        
        // Check so all seats fit to the right on the row
        if(maxSeats + seatIndex > rowLength || seat.Booked === true) {
            // if not, go left one step
            return seatIndex === 0 ? [] : getSeatsInRow(row[seatIndex-1], row, true)
        } else {

            let newArr = [];

            // Check if any seat to the right is booked
            for (let i = 0; i < maxSeats; i++) {
                
                // If seat to right is booked
                if(row[seatIndex + i].Booked) {
                    // Only go left if not at the far left already, or if we are at the far right 
                    return seatIndex === 0 || atFarRight ? [] : getSeatsInRow(row[seatIndex-1], row)
                }
                
                newArr.push(row[seatIndex + i])
            }
            
            return newArr   
        }
    }


    function handleSeatClick(seat, row) {
        if (selectSeveralSeats) {
            const seats = getSeatsInRow(seat, row);
            props.addSeveralSeats(seats)
        } else {
            props.addOneSeat(seat)
        }
    }

    function handleHover(seat, row) {

        if(selectSeveralSeats) {
            const seats = getSeatsInRow(seat, row);
            setHoveringSeats(seats)
        } else {
            setHoveringSeats([seat])
        } 

    }


    return (
        
    <div className='seat-wrapper'>
        <img src={svg} className='screen-svg'/>
        {rows.map((row,i) => {
            return (
                <div className='seat-row' key={i}>
                    {row.map((seat,i) => (
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
            )
        })}
        

        <Form.Check
        className='pt-2'
        label="Välj enskilda platser"
        checked={!selectSeveralSeats}
        onChange={() => setSelectSeveralSeats(!selectSeveralSeats)}
        />

    </div>
  )
}

export default SeatPicker