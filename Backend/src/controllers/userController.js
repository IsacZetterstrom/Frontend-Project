import User from "../models/userModel.js";

const getProfile = async (req, res) => {
  try {
      //the email in the jwt token
    const Email = req.decoded.Email
    const userInfo = await User.getProfile(Email);
    res.json(userInfo[0][0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {getProfile};
