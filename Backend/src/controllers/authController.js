import authModel from "../models/authModel.js";
import AuthService from "../services/authService.js";
import bcrypt from "bcrypt";

/**
 * @Author Isac Zetterström
 * @Description Controller for registering a user
 */
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

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const login = await AuthService.authenticate(email, password);

    if (!login) {
      // Authentication failed
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.status(200).json(login);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default { login, registerUser };
