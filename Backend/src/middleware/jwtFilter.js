import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (authHeader == undefined) {
    res.status(400);
    res.send("Authorization header is missing");
  } else {
    const authToken = authHeader.replace("Bearer ", "");
    try {
      req.decoded = jwt.verify(authToken, process.env.SUPER_SECRET);
      return next();
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
  }
}

export default { verifyToken };
