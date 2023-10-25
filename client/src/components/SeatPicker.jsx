import React from 'react'
import "../styling/components/_seatPicker.scss"

function SeatPicker(props) {
    
    const rows = []

    // Take seats and put them in an array for each row to make rendering them out easier
    props.screeningData.allSeats && props.screeningData.allSeats.forEach((seat) => {
        if(rows[seat.Number_row] === undefined) {
            rows[seat.Number_row] = []
        } else {
            rows[seat.Number_row].push(seat)
        };
    })


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
                        `}
                        onClick={!seat.Booked ? () => props.handleSeatClick(seat) : undefined}
                        ></div>
                    ))}
                </div>
            )
        })}
    </div>
  )
}

export default SeatPicker