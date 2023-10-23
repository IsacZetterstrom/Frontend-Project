import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LibraryPage from "../pages/LibraryPage.jsx";
import LandingPage from "../pages/LandingPage.jsx";

export const pages = [
  { path: "/", label: "Start", element: <LandingPage /> },
  { path: "/filmer", label: "Våra filmer", element: <LibraryPage /> },
];
