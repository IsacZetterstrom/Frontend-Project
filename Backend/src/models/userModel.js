import connection from "../config/database.js";

// Function to retrieve user bookings based on user_id
async function getUserBookings (user_id) {
  try {
    const query = 
    `
    SELECT
        Movie.Title AS MovieTitle,
        Theater.Theater_name AS TheaterName,
        Ticket.Seat_id AS Seat,
        Booking.Ref_num AS ReferenceNumber,
        Screening.Screening_date AS ScreeningDate,
        Screening.Screening_startime AS ScreeningStartTime
    FROM Booking
    JOIN Ticket ON Booking.Booking_id = Ticket.Booking_id
    JOIN Screening ON Ticket.Screening_id = Screening.Screening_id
    JOIN Theater ON Screening.Theater_id = Theater.Theater_id
    JOIN Movie ON Screening.Movie_id = Movie.Movie_id
    JOIN Ticket_Type ON Ticket.Ticket_Type_id = Ticket_Type.Ticket_type_id
    WHERE Booking.User_id = ?;
    `;

    const result = await connection.promise().query(query, [user_id]);    
    return result;
  } catch (error) {
    throw error;
  }
};

export default { getUserBookings };