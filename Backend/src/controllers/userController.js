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

  }catch (error) {
    res.status(500).json({ error: "Problem fetching" });
  }
}

async function getProfile  (req, res) {
  try {
      //the email in the jwt token
    const Email = req.decoded.Email
    const userInfo = await userModel.getProfile(Email);
    res.json(userInfo[0][0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};



async function editUser(req, res) {
  const { userid, email, firstname, lastname, phone } = req.body;
  try {
    const result = await userModel.editUser(
      userid,
      email,
      firstname,
      lastname,
      phone
    );
    res.status(200).send({ message: "Information edited!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "A problem when editing users credentials occured." });
  }
}

export default { getProfile, editUser, getUserBookings };

