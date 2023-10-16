import connection from "../config/database.js";


 async function deleteBooking(bookingId,userInfo){
    try{
        //Get user id from booking,
        const [BookingUserId] = await connection.execute(
            'SELECT Booking.User_id FROM Booking WHERE Booking.Booking_id = ?',
            [bookingId]
        );
        if (BookingUserId[0].User_id !== userInfo[0][0].User_id) {
            // check if doesnt  match
            return  "You don't have permission to delete this booking.";
        }
        //Delete tickets based on booking id
        const [ticketRows] =  await connection.execute(
        'DELETE FROM Ticket WHERE Ticket.Booking_id =?',
        [bookingId]);
        //Delete the boooking  based on booking id
        const [bookingRows] =  await connection.execute(
            'DELETE FROM Booking WHERE Booking.Booking_id =?',
            [bookingId]);
        return [ticketRows, bookingRows];
        }catch(error){
        throw error;
      }
      
}

export default { deleteBooking };
