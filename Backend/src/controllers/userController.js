import User from "../models/userModel.js";

const GetAll = async (req, res) => {
  try {
    const users = await User.GetAll();
    console.log(users[0]);
    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { GetAll };
