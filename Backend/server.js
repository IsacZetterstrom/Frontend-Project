import Express from "express";
import publicRoutes from "./src/router/publicRoutes.js";
import privateRoutes from "./src/router/privateRoutes.js";
import authRoutes from "./src/router/authRoutes.js";
import jwtFilter from "./src/middleware/jwtFilter.js";
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, '../client', 'dist');

const app = Express();
const port = 3050;

app.use(Express.static(distPath));
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

app.use("/api", jwtFilter.loginCheck, publicRoutes);
app.use("/profile", jwtFilter.verifyToken, privateRoutes);
app.use("/auth", authRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port);

