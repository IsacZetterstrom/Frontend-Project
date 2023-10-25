import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LandingPage from "../pages/LandingPage";
import BookingPage from "../pages/BookingPage";
import DetailPage from "../pages/DetailPage";
import EditUserPage from "../pages/EditUserPage";
import LibraryPage from "../pages/LibraryPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";

export const pages = [
  {
    path: "/",
    label: "Hem",
    inNav: true,
    rightNav: false,
    element: <LandingPage />,
  },
  {
    path: "/film/:movieId/boka/:screenId",
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
    path: "/redigera-profil",
    label: "Redigera",
    inNav: false,
    rightNav: false,
    element: <EditUserPage />,
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
    label: "Registera",
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
