import bookingModel from "../models/bookingModel.js";
import userModel from "../models/userModel.js";
import ticketModel from "../models/ticketModel.js";

/**
 * @Author Niklas Nguyen
 * @Descriptions Controller to handle deleteBooking model
 */

async function delBooking(req, res) {
  const bookingId = req.params.bookingId;
  const email = req.decoded.email;

  try {
    const userInfo = await userModel.getProfile(email);
    const result = await bookingModel.deleteBooking(bookingId, userInfo);

    res.send(result);
  } catch (error) {
    res.status(400).json({ error: "Booking does not exist" });
  }
}

/**
 * @Author Niklas Nguyen, Isac Zetterström, Oliver Andersson, Louise Johansson, Oskar Dahlberg
 * @Descriptions Controller to handle bookings
 */
async function createBooking(req, res) {
  console.log(req.decoded);
  // ScreeningID kommer från params
  // MovieID kommer från params
  const { movieId, screeningId } = req.params;

  // Ta mail från req.decoded om den finns
  // annars från body

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
    //Get the total price for all tickets combined
    const totalPrice = await ticketModel.getTotalPrice(tickets);
    console.log(totalPrice);
    //Create one booking for all the tickets
    const bookingId = await bookingModel.createBooking(totalPrice);

    console.log(bookingId.insertId);
    //Create the individual tickets for the booking
    const result = await ticketModel.createTicket(tickets, bookingId.insertId);

    const bookingData = await bookingModel.getBooking(bookingId.insertId);

    return result;
    // res.json()
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default { delBooking, createBooking };
