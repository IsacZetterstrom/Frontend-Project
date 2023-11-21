import React from "react";
import Nav from "react-bootstrap/Nav";
import { pages } from "../../router/routes";
import { NavLink } from "react-router-dom";

/**
 * @author Isac Zetterström
 * @description logic and renders the usermenu, and changes it from login to logout et.c depending on
 * if user is logged in or not.
 */

function UserMenu({ isLoggedIn }) {
  if (isLoggedIn) {
    return pages.map(({ label, path, inNav, rightNav, loggedIn }) => {
      if (loggedIn) {
        return (
          inNav &&
          rightNav && (
            <NavLink key={path} className="nav-link text-nowrap" onClick={() => setExpanded(false)} to={path}>
              {label}
            </NavLink>
          )
        );
      }
    });
  } else {
    return pages.map(({ label, path, inNav, rightNav, loggedIn }) => {
      if (!loggedIn) {
        return (
          inNav &&
          rightNav && (
            <NavLink key={path} className="nav-link text-nowrap" onClick={() => setExpanded(false)} to={path}>
              {label}
            </NavLink>
          )
        );
      }
    });
  }
}

export default UserMenu;
