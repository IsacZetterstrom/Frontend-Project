import userModel from "../models/userModel.js";

/**
 * Author*: Sara Johansson
 * Desciption: Function to handle the retrieval of bookings for a user
 */
async function getUserBookings(req, res) {
  try {
    const userId = req.decoded.id;
    const bookings = await userModel.getUserBookings(userId);
    const activeBookings = [];
    const expiredBookings = [];

    if (bookings.length > 0) {
      for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].screeningStartTime > Date.now()) {
          activeBookings.push(bookings[i]);
        } else {
          expiredBookings.push(bookings[i]);
        }
      }

      res.json({
        active: activeBookings,
        expired: expiredBookings,
      });
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

    res.json({
      email: userInfo[0].Email,
      firstName: userInfo[0].Firstname,
      lastName: userInfo[0].Lastname,
      phone: userInfo[0].Phone,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**
 * @Author Isac Zetterström
 * @Description Controller for editing userInfo
 */
async function editUser(req, res) {
  const userId = req.decoded.id;
  let { email, firstname, lastname, phone } = req.body;
  

   if (email === "") email = null
    if (firstname === "") firstname = null;
    if (lastname === "") lastname = null;
    if (phone === "") phone = null;

  try {
    await userModel.editUser(userId, email, firstname, lastname, phone);
    res.status(200).send({ message: "Information edited!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "A problem when editing users credentials occured." });
  }
}

export default { getProfile, editUser, getUserBookings };
