import connection from "../config/database.js";

/**
 * Author*: Sara Johansson
 * Desciption: Function to retrieve user bookings based on user_id
 */
async function getUserBookings(userId) {
  const [bookings] = await connection.execute(
    `
    SELECT Movie.Title AS movieTitle,
    Theater.Theater_name AS theaterName,
    Booking.Ref_num AS referenceNumber,
    Screening.Screening_date AS screeningDate,
    Screening.Screening_startime AS screeningStartTime,
    Booking.Total_price AS priceSum,
    Movie_Information.Poster AS poster,
    Movie_Information.Runtime AS runTime,
    GROUP_CONCAT(
        Seat.Number_row,
        '-',
        Seat.Number_seat
        ORDER BY Seat.Seat_id ASC
    ) AS seats
FROM Booking
    JOIN Ticket ON Booking.Booking_id = Ticket.Booking_id
    JOIN Screening ON Ticket.Screening_id = Screening.Screening_id
    JOIN Theater ON Screening.Theater_id = Theater.Theater_id
    JOIN Movie ON Screening.Movie_id = Movie.Movie_id
    JOIN Ticket_Type ON Ticket.Ticket_Type_id = Ticket_Type.Ticket_type_id
    JOIN Seat ON Ticket.Seat_id = Seat.Seat_id
    JOIN Movie_Information ON Movie_Information.Movie_id = Movie.Movie_id
WHERE Booking.User_id = 1
GROUP BY Movie.Title,
    Screening.Screening_startime,
    Booking.Total_price,
    Booking.Ref_num,
    Screening.Screening_date,
    Theater.Theater_name,
    Movie_Information.Poster,
    Movie_Information.Runtime;
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
