import React from "react";

import { pages } from "../../router/routes";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Logotype from "../../assets/Logotype.svg";
import cacheService from "../../service/CacheService";
import UserMenu from "./UserMenu";

/**
 * @author Isac Zetterström
 * @description logic that renders links in the navmenu.
 */

function NavLinks({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  function logoutUser() {
    cacheService.removeLocalValue("token");
    setIsLoggedIn(false);
    navigate("/");
  }
  return (
    <>
      {pages.map(({ label, path, inNav, rightNav }) => {
        return (
          inNav &&
          !rightNav && (
            <NavLink key={path} className="nav-link text-nowrap" onClick={() => setExpanded(false)} to={path}>
              {label}
            </NavLink>
          )
        );
      })}
      <Container className="flex-row align-items-center justify-content-center d-none d-md-flex desktop-logo-container">
        <img
          className="logo"
          src={Logotype}
          onClick={() => {
            navigate("/");
          }}
        />
      </Container>

      <UserMenu {...{ isLoggedIn }} />
      {isLoggedIn && (
        <NavLink
          key={"logout"}
          onClick={() => {
            logoutUser(), setExpanded(false);
          }}
          className="nav-link text-nowrap logout-btn"
        >
          Logga Ut
        </NavLink>
      )}
    </>
  );
}

export default NavLinks;
