import bookingModel from "../models/bookingModel.js";
import screeningModel from "../models/screeningModel.js";
import ticketModel from "../models/ticketModel.js";
import clientsHandler from "../services/clientsHandler.js";
import mailService from "../services/mailService.js";

/**
 * @Author Niklas Nguyen
 * @Descriptions Controller to handle deleteBooking model
 */

async function delBooking(req, res) {
  const bookingId = req.params.bookingId;
  const userId = req.decoded.id;

  try {
    const result = await bookingModel.deleteBooking(bookingId, userId);
    if(result.length === 0) return res.status(400).json({ error: "Booking does not exist" })
    
    clientsHandler.broadcastTo(result[2][0].Screening_id)
    return res.status(200).json({ error: `The booking been deleted` })
  } catch (error) { 
    return res.status(400).json(error.message);
  }
}

/**
 * @Author Niklas Nguyen, Isac Zetterström, Oliver Andersson, Louise Johansson, Oskar Dahlberg
 * @Descriptions Controller to handle when a user books
 */
async function createBooking(req, res) {

  let {tickets,email} = req.body
  const screeningId = req.params.screeningId

  const test = await (screeningModel.getScreening(screeningId))

  for(let seats of test[0].bookedSeats){
    if(seats.Seat_id === tickets[0].Seat_id){
      return res.status(400).json({ error: "Dina platser blev tyvärr upptagna, vänligen välj andra platser" })
    }else if(seats.Seat_id === tickets[1].Seat_id){
      return res.status(400).json({ error: "Dina platser blev tyvärr upptagna, vänligen välj andra platser" })
    }
    
  }

  try {
    //Get the total price for all tickets combined
    const totalPrice = await ticketModel.getTotalPrice(tickets);
    //Create one booking for all the tickets
    const bookingId = await bookingModel.createBooking(totalPrice,req.decoded);
    //Create the individual tickets for the booking
    await ticketModel.createTicket(tickets, bookingId);

    const bookingData = (await bookingModel.getBooking(bookingId))[0];

    if(email == undefined && req.decoded == undefined) return res.status(500).json({ error: "no email or account provided" });
    if(email == undefined) email = req.decoded.email

    await mailService.sendBookingConfirmationEmail(bookingData,email)

    clientsHandler.broadcastTo(screeningId)

    res.status(200).json(bookingData)
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }


}

export default { delBooking, createBooking };
