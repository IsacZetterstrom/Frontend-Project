import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./router/routes";
import "./styling/main.scss";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.querySelector("#root")).render(
    <React.StrictMode>
    <RouterProvider router={router} />
    </React.StrictMode>
);
