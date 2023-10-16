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

export default { delBooking };
