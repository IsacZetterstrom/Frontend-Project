import connection from "../config/database.js";


/**
* Author*: Sara Johansson
* Desciption: Function to retrieve user bookings based on user_id
*/

async function getUserBookings (user_id) {
  try {
    const query = 
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
    `;

    const result = await connection.promise().query(query, [user_id]);    
    return result;
  } catch (error) {
    throw error;
  }
};

//Get userprofile ( including password to use)
async function getProfile  (Email)  {
  try {
    const [result] = await connection.promise().query('CALL User(?,?,?,?,?,?,?)', ["Select",Email, null,null,null,null,null]);
    return result;
  } catch (error) {
    throw error;
  }
};


async function editUser(userid, email, firstname, lastname, phone) {
  const sql = `UPDATE User SET
    Email = IFNULL(?, email),
    Firstname = IFNULL(?, firstName),
    Lastname = IFNULL(?, lastname),
    Phone = IFNULL(?, phone)
    WHERE User_id = ?`;

  const result = await connection
    .promise()
    .query(sql, [email, firstname, lastname, phone, userid]);
  return result;
}

export default { editUser,getProfile, getUserBookings };
