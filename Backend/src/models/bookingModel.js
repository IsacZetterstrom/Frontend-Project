import connection from "../config/database.js";

/**
 * @Author Niklas Nguyen, Isac Zetterström, Oliver Andersson, Louise Johansson, Oskar Dahlberg
 * @Descriptions model handle bookings
 */
async function createBooking(totalPrice, userInfo) {
  //Add total price later
  if (userInfo) {
    //Insert if the user is logged in
    const [rows] = await connection.execute(
      "INSERT INTO Booking (User_id,Total_price,Ref_num) VALUES (?,?,(HEX(RANDOM_BYTES(3))))",
      [userInfo, totalPrice]
    );
    return rows;
  } else {
    //if not logged in
    const [rows] = await connection.execute(
      "INSERT INTO Booking (Total_price,Ref_num) VALUES (?,(HEX(RANDOM_BYTES(3))))",
      [totalPrice]
    );
    return rows;
  }
}

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
  if (bookingUserId[0].User_id !== userInfo[0].User_id)
    throw new Error("You dont have permission to remove this booking");

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

export default { deleteBooking, createBooking };
