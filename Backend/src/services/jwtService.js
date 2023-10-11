import jwt from 'jsonwebtoken';
import "dotenv/config";


async function generateToken(email){
    let payload = {
      Email: email
    }
    let token = jwt.sign(payload, process.env.SUPER_SECRET,{
      expiresIn: "15m",});
      return token;
  }

  async function verifyToken(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      req.decoded = jwt.verify(token, process.env.SUPER_SECRET);
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };

  export default  {generateToken,verifyToken}