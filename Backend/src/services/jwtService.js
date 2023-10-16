import jwt from "jsonwebtoken";
import "dotenv/config";

async function generateToken(email) {
  let payload = {
    email: email,
  };
  let token = jwt.sign(payload, process.env.SUPER_SECRET, {
    expiresIn: "15m",
  });
  return token;
}

export default { generateToken };
