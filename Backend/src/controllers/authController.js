import authModel from "../models/authModel.js";
import AuthService from "../services/authService.js";
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

async function authUser(req, res) {
  try {
    const { Email, Password } = req.body;
    const login = await AuthService.login(Email, Password);

    if (!login) {
      // Authentication failed
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.status(200).json(login);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default { authUser, registerUser };
