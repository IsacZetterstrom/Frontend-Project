import React from "react";
import { pages } from "../router/routes";
import { NavLink } from "react-router-dom";
import BootStrapNav from "react-bootstrap/Navbar";

function Navbar() {
  // function isLoggedIn() {
  //   if (localStorage.getItem)
  // }

  return (
    <BootStrapNav>
      {pages.map(({ label, path, inNav, rightNav }) => {
        return (
          inNav &&
          !rightNav && (
            <NavLink key={path} className="nav-link" to={path}>
              {label}
            </NavLink>
          )
        );
      })}
      {<h1>JÄTTE FIN BILD</h1>}
      {pages.map(({ label, path, inNav, rightNav }) => {
        return (
          inNav &&
          rightNav && (
            <NavLink key={path} className="nav-link" to={path}>
              {label}
            </NavLink>
          )
        );
      })}
    </BootStrapNav>
  );
}

export default Navbar;
