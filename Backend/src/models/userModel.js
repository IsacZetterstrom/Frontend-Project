import connection from "../config/database.js";

/**
 * Author*: Sara Johansson
 * Desciption: Function to retrieve user bookings based on user_id
 */
async function getUserBookings(userId) {
  const [bookings] = await connection.execute(
    `
    SELECT Movie.Title AS MovieTitle,
    Theater.Theater_name AS TheaterName,
    Seat.Number_row AS RowNumber,
    Seat.Number_seat AS SeatNumber,
    Booking.Ref_num AS ReferenceNumber,
    Screening.Screening_date AS ScreeningDate,
    Screening.Screening_startime AS ScreeningStartTime
    FROM Booking
    JOIN Ticket ON Booking.Booking_id = Ticket.Booking_id
    JOIN Screening ON Ticket.Screening_id = Screening.Screening_id
    JOIN Theater ON Screening.Theater_id = Theater.Theater_id
    JOIN Movie ON Screening.Movie_id = Movie.Movie_id
    JOIN Ticket_Type ON Ticket.Ticket_Type_id = Ticket_Type.Ticket_type_id
    JOIN Seat ON Ticket.Seat_id = Seat.Seat_id
    WHERE Booking.User_id = ?;
    `,
    [userId]
  );
  return bookings;
}

//Get userprofile (promise wrapper på mysql connection)
async function getProfile(email) {
  try {
    const [user] = await connection.execute(
      "SELECT * FROM User WHERE Email = ?",
      [email]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * @Author Isac Zetterström
 * @Description model for editing userinfo
 */
async function editUser(userid, email, firstname, lastname, phone) {
  const [userInfo] = await connection.execute(
    `UPDATE User SET
      Email = IFNULL(?, email),
      Firstname = IFNULL(?, firstName),
      Lastname = IFNULL(?, lastname),
      Phone = IFNULL(?, phone)
      WHERE User_id = ?`,
    [email, firstname, lastname, phone, userid]
  );
  return userInfo;
}

export default { editUser, getProfile, getUserBookings };
