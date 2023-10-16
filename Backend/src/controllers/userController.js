import userModel from "../models/userModel.js";

/**
 * Author*: Sara Johansson
 * Desciption: Function to handle the retrieval of bookings for a user
 */
async function getUserBookings(req, res) {
  try {
    const email = req.decoded.email;
    const userInfo = await userModel.getProfile(email);
    const userId = userInfo[0].User_id;

    const bookings = await userModel.getUserBookings(userId);

    if (bookings.length > 0) {
      res.json(bookings);
    } else {
      res.json("Could not find your booking!");
    }
  } catch (error) {
    res.status(500).json({ error: "Problem fetching bookings" });
  }
}

async function getProfile(req, res) {
  try {
    //the email in the jwt token
    const email = req.decoded.email;
    const userInfo = await userModel.getProfile(email);
    res.json(userInfo[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**
 * @Author Isac Zetterström
 * @Description Controller for editing userInfo
 */
async function editUser(req, res) {
  const jwt = req.decoded.email;
  const { email, firstname, lastname, phone } = req.body;
  try {
    const userInfo = await userModel.getProfile(jwt);
    const result = await userModel.editUser(
      userInfo[0].User_id,
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
