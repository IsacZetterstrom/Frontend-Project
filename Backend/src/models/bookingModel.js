import connection from "../config/database.js";


 async function deleteBooking(bookingId){
    const ticket = `DELETE FROM Ticket
       WHERE Ticket.Booking_id =?`
    const booking = `DELETE FROM Booking
        WHERE Booking.Booking_id =?`

    return await Promise.all([connection.promise().query(ticket, [bookingId]),
        connection.promise().query(booking, [bookingId])]) 
}

export default { deleteBooking };
