import userModel from "../models/userModel.js";

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

export default {getProfile};
