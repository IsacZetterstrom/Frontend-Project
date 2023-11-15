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
