import connection from "../config/database.js";

async function createTicket(tickets, bookingId) {
  //Calculate total price later
  const ticketsArray = [];
  for (const ticket of tickets) {
    console.log(ticket);
    const [rows] = await connection.execute(
      "INSERT INTO Ticket (Screening_id, Booking_id, Seat_id, Ticket_Type_id) VALUES (?,?,?,?)",
      [ticket.Screening_id, bookingId, ticket.Seat_id, ticket.Ticket_Type_id]
    );
    console.log(bookingId);
    ticketsArray.push(rows);
  }
  return ticketsArray;
}

async function GetTotalPrice(tickets) {
  //Calculate total price later
  let totalPrice = 0;
  for (const ticket of tickets) {
    console.log(ticket);
    const [rows] = await connection.execute(
      "SELECT Ticket_Type.Price FROM Ticket_Type WHERE Ticket_Type_id = ?",
      [ticket.Ticket_Type_id]
    );
    console.log(rows[0].Price);
    const price = rows[0].Price;
    totalPrice += price;
  }
  return totalPrice;
}
export default { createTicket, GetTotalPrice };
