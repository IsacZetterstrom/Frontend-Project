import "dotenv/config";
import Express from "express";
import router from "./src/router/routes.js";

const app = Express();
const port = 3050;

app.use(router);
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

app.listen(port);
