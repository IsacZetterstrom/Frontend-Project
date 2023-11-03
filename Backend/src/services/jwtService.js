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

function verify(token) {
  try {
    return jwt.verify(token, process.env.SUPER_SECRET);
  } catch (err) {
    let error = new Error();

    if (err.name == "JsonWebTokenError") {
      error.clientMessage = "Digital signing is invalid, request new token";
      error.serverMessage = "Token verification failed";
    }

    if (err.name == "TokenExpiredError") {
      error.clientMessage = "Digital signing is invalid, request new token";
      error.serverMessage = "Token expired";
    }

    throw error;
  }
}

export default { generateToken, verify };
