import React, {useState} from 'react'
import {Col, Container, Form, Row} from 'react-bootstrap'
import "../styling/components/_seatPicker.scss"

/**
 * @author Oliver Andersson
 * @description Renders seats based on provided screeningData and updates selectedSeats in bookingPage.
 */


function SeatPicker(props) {
    
    const rows = []
    const [hoveringSeats, setHoveringSeats] = useState([]);
    
    const [selectSeveralSeats, setSelectSeveralSeats] = useState(true);

    // Take seats and put them in an array for each row to make rendering them out easier
    props.screeningData.allSeats && props.screeningData.allSeats.forEach((seat) => {
        if(rows[seat.Number_row -1] === undefined) {
            rows[seat.Number_row - 1] = [seat]
        } else {
            rows[seat.Number_row - 1].push(seat)
        };
    })


    // Returns seats if they fit on the row and are not booked 
    function getSeatsInRow(seat, row) {
        const rowLength = row.length
        const seatIndex = row.indexOf(seat)
        const maxSeats = props.maxSeats
        
        // Check so all seats fit to the right on the row
        if(maxSeats + seatIndex > rowLength || seat.Booked === true) {
            return []
        } else {

            let newArr = [];

            for (let i = 0; i < maxSeats; i++) {
                // Check if any seat to the right is booked
                if(row[seatIndex + i].Booked) {
                    return []
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