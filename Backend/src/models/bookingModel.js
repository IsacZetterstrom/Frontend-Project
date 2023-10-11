import connection from "../config/database.js";


 async function deleteBooking(bookingId){

    const sql = `DELETE Booking,Ticket
    FROM Ticket
    JOIN Booking 
    ON Booking.Booking_id = Ticket.Booking_id
    WHERE Ticket.Booking_id =?`

    return await connection.promise().query(sql, [bookingId])
}

export default {deleteBooking}