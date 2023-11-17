import connection from "../config/database.js";

/**
 * @Author Niklas Nguyen, Isac Zetterström, Oliver Andersson, Louise Johansson, Oskar Dahlberg
 * @Descriptions model to create a ticket for a specific booking id
 */

async function createTicket(tickets, bookingId) {
  //Calculate total price later
  const ticketsArray = [];
  for (const ticket of tickets) {
    const [bookedTicket] = await connection.execute(
      "INSERT INTO Ticket (Screening_id, Booking_id, Seat_id, Ticket_Type_id) VALUES (?,?,?,?)",
      [ticket.Screening_id, bookingId, ticket.Seat_id, ticket.Ticket_Type_id]
    );
    ticketsArray.push(bookedTicket);
  }
  return ticketsArray;
}

/**
 * @Author Niklas Nguyen, Isac Zetterström, Oliver Andersson, Louise Johansson, Oskar Dahlberg
 * @Descriptions model to calc the sum price of all the tickets that gets send in though a body
 */

async function getTotalPrice(tickets) {
  //Calculate total price later
  let priceSum = 0;
  for (const ticket of tickets) {
    const [ticketsPrice] = await connection.execute(
      "SELECT Ticket_Type.Price FROM Ticket_Type WHERE Ticket_Type_id = ?",
      [ticket.Ticket_Type_id]
    );
    priceSum += ticketsPrice[0].Price;
  }
  return priceSum;
}

async function ticketsExist(tickets) {
  for (const ticket of tickets) {
    const [rows] = await connection.execute("SELECT * FROM Ticket WHERE Ticket.Screening_id = ? AND Seat_id = ?", [
      ticket.Screening_id,
      ticket.Seat_id,
    ]);
    if (rows.length > 0) {
      return true;
    }
    return false;
  }
}

export default { createTicket, getTotalPrice, ticketsExist };
