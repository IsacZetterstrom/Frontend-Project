import userModel from "../models/userModel.js";

// Function to handle the retrieval of bookings for a user
async function getUserBookings(req, res) {
  try {
    const user_id = 1;
    const bookings = await userModel.getUserBookings(user_id);

    if (bookings.length > 0) {
      res.json(bookings[0]);
    } else {
      res.json("Could not find your booking!");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { getUserBookings };