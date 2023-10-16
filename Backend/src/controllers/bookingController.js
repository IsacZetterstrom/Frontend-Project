import bookingModel from "../models/bookingModel.js"
import userModel from "../models/userModel.js";
async function delBooking (req,res) {
const bookingId = req.params.booking_id
const Email = req.decoded.Email

try {
const userInfo = await userModel.getProfile(Email);
const result = await bookingModel.deleteBooking(bookingId,userInfo)

res.send(result)
} catch (error) {
    res.status(400)
}
}

export default {delBooking}