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
        if(rows[seat.Number_row] === undefined) {
            rows[seat.Number_row] = []
        } else {
            rows[seat.Number_row].push(seat)
        };
    })


    function onHover(seat, row) {
        const rowLength = row.length
        const seatIndex = row.indexOf(seat)
        const maxSeats = props.maxSeats
        
        // Check so all seats fit to the right on the row
        if(maxSeats + seatIndex > rowLength || seat.Booked === true) {
            setHoveringSeats([])
        } else {

            let newArr = [];

            for (let i = 0; i < maxSeats; i++) {
                // Check if any seat to the right is booked
                if(row[seatIndex + i].Booked) {
                    setHoveringSeats([])
                    return
                }
                
                newArr.push(row[seatIndex + i])
            }
            
            setHoveringSeats(newArr)
            
        }
    }


    function handleSeatClick(seat) {
        if (selectSeveralSeats) {
            props.addSeveralSeats(hoveringSeats)
        } else {
            props.addOneSeat(seat)
        }
    }


    return (
        
    <Container className='seat-wrapper d-flex justify-content-center align-items-center'>
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
                        onClick={!seat.Booked ? () => handleSeatClick(seat) : undefined}
                        onMouseEnter={selectSeveralSeats ? () => onHover(seat, row) : () => setHoveringSeats([seat])}
                        onMouseLeave={() => setHoveringSeats([])}
                        ></div>
                    ))}
                </div>
            )
        })}
        

        <Form.Check
        label="Välj enskilda platser"
        name="group1"
        checked={!selectSeveralSeats}
        onChange={() => setSelectSeveralSeats(!selectSeveralSeats)}
        id={`reverse-checkbox-1`}
        />

    </Container>
  )
}

export default SeatPicker