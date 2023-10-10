import jwt from 'jsonwebtoken';
const SUPER_SECRET = 'catsareawesomebutdogsareawesometoo';

const generate = (email) =>{
    let payload = {
      Email: email
    }
    let token = jwt.sign(payload, SUPER_SECRET,{
      expiresIn: "15m",});
      console.log(token)
      return token;
  }

  const verifyToken = (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      req.decoded = jwt.verify(token, SUPER_SECRET);
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };

  export default {generate,verifyToken}