/**
 * @author Oliver Andersson
 * @description Utility files with Helper functions for bookingPage
 */

// Takes in tickets, selectedSeats and screeningId and returns a object with correct structure
export function createTicketStructure(tickets, selectedSeats, screeningId) {
  const data = {
    tickets: [],
  };

  for (const [key, value] of Object.entries(tickets)) {
    for (let i = 0; i < value; i++) {
      if (selectedSeats[i] === undefined) return;

      data.tickets.push({
        Screening_id: screeningId,
        Ticket_Type_id: key,
        Seat_id: selectedSeats[i].Seat_id,
      });
    }
  }

  return data;
}


// Returns seats if they fit on the row and are not booked
export function getSeatsInRow(seat, row, maxSeats, atFarRight) {
  const rowLength = row.length;
  let seatIndex = row.indexOf(seat);

  // Check so all seats fit to the right on the row
  if (maxSeats + seatIndex > rowLength || seat.Booked === true) {
    // if not, go left one step
    return seatIndex === 0 ? [] : getSeatsInRow(row[seatIndex - 1], row, maxSeats, true);
  } else {
    let newArr = [];

    // Check if any seat to the right is booked
    for (let i = 0; i < maxSeats; i++) {
      // If seat to right is booked
      if (row[seatIndex + i].Booked) {
        // Only go left if not at the far left already, or if we are at the far right
        return seatIndex === 0 || atFarRight ? [] : getSeatsInRow(row[seatIndex - 1], row, maxSeats);
      }

      newArr.push(row[seatIndex + i]);
    }

    return newArr;
  }
}


// Get recommended seats
export function getRecommendedSeats(rows, maxSeats) {
  let middleRowIndex = rows.length / 2
  let middleSeatIndex = Math.floor(rows[middleRowIndex].length / 2 - maxSeats / 2)
  
  // Check if no seats are selected
  if (maxSeats === 0) return []

  let selectedSeats = rows[middleRowIndex].slice(middleSeatIndex, middleSeatIndex + maxSeats)

  // Try to find seat in middle
  while (selectedSeats.filter(e => e.Booked === true).length > 0 || maxSeats > rows[middleRowIndex].length) {
    // If at the top, break out
    if (middleRowIndex === rows.length - 1) {
      return []
    };
    
    // Go up one row and adjust middleSeatIndex to new row   
    middleRowIndex = middleRowIndex + 1
    middleSeatIndex = Math.floor(rows[middleRowIndex].length / 2 - maxSeats / 2)
    
    // Get new seats
    selectedSeats = rows[middleRowIndex].slice(middleSeatIndex, middleSeatIndex + maxSeats)
  }

  return selectedSeats
}