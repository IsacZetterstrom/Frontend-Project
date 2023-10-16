import connection from "../config/database.js";

/**
 * @Author Niklas Nguyen
 * @Description Model to removes specific bookings and tickets
 */

async function deleteBooking(bookingId, userInfo) {
  //Get user id from booking,
  const [bookingUserId] = await connection.execute(
    "SELECT Booking.User_id FROM Booking WHERE Booking.Booking_id = ?",
    [bookingId]
  );
  if (bookingUserId[0].User_id !== userInfo[0].User_id) {
    // check if doesnt  match
    throw new Error("You dont have permission to remove this booking");
  }
  //Delete tickets based on booking id
  const [ticketRows] = await connection.execute(
    "DELETE FROM Ticket WHERE Ticket.Booking_id =?",
    [bookingId]
  );
  //Delete the boooking  based on booking id
  const [bookingRows] = await connection.execute(
    "DELETE FROM Booking WHERE Booking.Booking_id =?",
    [bookingId]
  );
  return [ticketRows, bookingRows];
}

export default { deleteBooking };
