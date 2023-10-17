import bookingModel from "../models/bookingModel.js";
import userModel from "../models/userModel.js";

/**
 * @Author Niklas Nguyen
 * @Descriptions Controller to handle deleteBooking model
 */

async function delBooking(req, res) {
  const bookingId = req.params.bookingId;
  const email = req.decoded.email;

  try {
    const userInfo = await userModel.getProfile(email);
    const result = await bookingModel.deleteBooking(bookingId, userInfo);

    res.send(result);
  } catch (error) {
    res.status(400).json({ error: "Booking does not exist" });
  }
}

/**
 * @Author Niklas Nguyen, Isac Zetterström, Oliver Andersson, Louise Johansson, Oskar Dahlberg
 * @Descriptions Controller to handle bookings
 */
async function createBooking(req, res) {
  console.log(req.decoded.id);
  console.log(req.decoded.email);
  console.log("HEJ");

  try {
    const result = await bookingModel.createBooking(120);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default { delBooking, createBooking };
