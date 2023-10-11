import Express from "express";
import publicRoutes from "./src/router/publicRoutes.js";
import privateRoutes from "./src/router/privateRoutes.js";
import authRoutes from "./src/router/authRoutes.js";
import jwtService
 from "./src/services/jwtService.js";
const app = Express();
const port = 3050;

app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

app.use("/api", publicRoutes);
app.use("/profile", jwtService.verifyToken,privateRoutes);
app.use("/auth", authRoutes);

app.listen(port);
