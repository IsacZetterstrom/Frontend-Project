import authModel from "../models/authModel.js";
import bcrypt from "bcrypt";

async function registerUser(req, res) {
  const { email, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 12);
  try {
    await authModel.registerUser(email, hashedPass);
    res.status(200).send({ message: "User registered!" });
  } catch (error) {
    res.status(500).json({ error: "A problem when registering user occured." });
  }
}

export default { registerUser };
