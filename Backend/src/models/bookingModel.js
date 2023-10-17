import connection from "../config/database.js";

/**
 * @Author Niklas Nguyen, Isac Zetterström, Oliver Andersson, Louise Johansson, Oskar Dahlberg
 * @Descriptions model to get a specific booking
 */
async function getBooking(bookingId) {
  const [booking] = await connection.execute(
    `SELECT
    Movie.Title AS title,
    Screening.Screening_startime AS dateAndTime,
    Booking.Total_price AS priceSum,
    Booking.Ref_num AS bookingRef,
    Theater.Theater_name AS saloon,
    GROUP_CONCAT(  'Rad ',
    Seat.Number_row,
    ' Stol ',
    Seat.Number_seat ORDER BY Seat.Seat_id ASC) AS seats
    FROM Booking
    JOIN Ticket ON Ticket.Booking_id = Booking.Booking_id
    JOIN Seat ON Seat.Seat_id = Ticket.Seat_id
    JOIN Screening ON Screening.Screening_id = Ticket.Screening_id
    JOIN Movie ON Movie.Movie_id = Screening.Movie_id
    JOIN Theater ON Theater.Theater_id = Screening.Theater_id
    WHERE Booking.Booking_id = ?
    GROUP BY
    Movie.Title,
    Screening.Screening_startime,
    Booking.Total_price,
    Booking.Ref_num,
    Theater.Theater_name`,
    [bookingId]
  );
  return booking;
}

/**
 * @Author Niklas Nguyen, Isac Zetterström, Oliver Andersson, Louise Johansson, Oskar Dahlberg
 * @Descriptions model to create a booking
 */

async function createBooking(totalPrice, userInfo) {
  //Add total price later
  if (userInfo !== undefined) {
    //Insert if the user is logged in
    const [rows] = await connection.execute(
      "INSERT INTO Booking (User_id,Total_price,Ref_num) VALUES (?,?,(HEX(RANDOM_BYTES(3))))",
      [userInfo.id, totalPrice]
    );

    return rows.insertId;
  } else {
    //if not logged in
    const [rows] = await connection.execute(
      "INSERT INTO Booking (Total_price,Ref_num) VALUES (?,(HEX(RANDOM_BYTES(3))))",
      [totalPrice]
    );
    return rows.insertId;
  }
}

/**
 * @Author Niklas Nguyen
 * @Description Model to removes specific bookings and tickets
 */

async function deleteBooking(bookingId, userId) {
  //Get user id from booking,
  const [userData] = await connection.execute(
    "SELECT Booking.User_id FROM Booking WHERE Booking.Booking_id = ?",
    [bookingId]
  );

    if(userData.length === 0) return userData
  if (userData[0].User_id !== userId)
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

export default { deleteBooking, createBooking, getBooking };
