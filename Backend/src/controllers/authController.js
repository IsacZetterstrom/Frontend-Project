import AuthService from "../services/authService.js";
import User from "../models/userModel.js";
const authUser = async (req, res) =>{
    try {
        const { Email, Password } = req.body;
        const login = await AuthService.login(Email,Password)
        
        if (!login) {
            // Authentication failed
            return res.status(401).json({ error: "Invalid credentials" });
          }
        res.status(200).json(login);
      
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
}

export default {authUser}