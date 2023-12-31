import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LandingPage from "../pages/LandingPage";
import BookingPage from "../pages/BookingPage";
import DetailPage from "../pages/DetailPage";
import LibraryPage from "../pages/LibraryPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import ErrorPage from "../pages/ErrorPage";

export const pages = [
  {
    path: "*",
    label: "*",
    inNav: false,
    rightNav: false,
    element: <ErrorPage />,
  },
  {
    path: "/",
    label: "Hem",
    inNav: true,
    rightNav: false,
    element: <LandingPage />,
  },
  {
    path: "/film/:movieId/boka/:screeningId",
    label: "Boka",
    rightNav: false,
    inNav: false,
    element: <BookingPage />,
  },
  {
    path: "/film/:movieId",
    label: "Detaljer",
    inNav: false,
    rightNav: false,
    element: <DetailPage />,
  },
  {
    path: "/filmer",
    label: "Filmer",
    inNav: true,
    rightNav: false,
    element: <LibraryPage />,
  },
  {
    path: "/logga-in",
    label: "Logga In",
    inNav: true,
    loggedIn: false,
    rightNav: true,
    element: <LoginPage />,
  },
  {
    path: "/registrera",
    label: "Bli Medlem",
    inNav: true,
    loggedIn: false,
    rightNav: true,
    element: <RegisterPage />,
  },
  {
    path: "/min-sida",
    label: "Min Sida",
    inNav: true,
    loggedIn: true,
    rightNav: true,
    element: <ProfilePage />,
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: pages,
  },
]);
