import bookingModel from "../models/bookingModel.js"

async function delBooking (req,res) {
const bookingId = req.params.booking_id


try {
const result = await bookingModel.deleteBooking(bookingId)
res.send(result)
} catch (error) {
    res.status(400)
}
}

export default {delBooking}