import ticketModel from "../models/ticketModel.js";
import bookingModel from "../models/bookingModel.js";

async function createTicket(req, res) {
  console.log(req.decoded);

  const tickets = [
    {
      Screening_id: 1,
      Seat_id: 1,
      Ticket_Type_id: 1,
    },
    {
      Screening_id: 1,
      Seat_id: 2,
      Ticket_Type_id: 1,
    },
  ];
  try {
    const totalPrice = await ticketModel.GetTotalPrice(tickets);
    console.log(totalPrice);
    const bookingId = await bookingModel.createBooking(totalPrice);
    console.log(bookingId.insertId);
    const result = await ticketModel.createTicket(tickets, 12);
    return result;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default { createTicket };
