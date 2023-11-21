import React, { useState } from "react";
import { pages } from "../router/routes";
import { NavLink, useNavigate } from "react-router-dom";
import BootStrapNav from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Logotype from "../assets/Logotype.svg";
import cacheService from "../service/CacheService";

/**
 * @author Isac Zetterström
 * @description logic and render of the navbar.
 */

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);

  function logoutUser() {
    cacheService.removeLocalValue("token");
    setIsLoggedIn(false);
    navigate("/");
  }

  function renderUserMenu() {
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

  return (
    <>
      <BootStrapNav expanded={expanded} expand="md" className="navbar fixed-top">
        <Container>
          <BootStrapNav.Brand className="d-md-none" href="/">
            <img src={Logotype} alt="" width="100px" />
          </BootStrapNav.Brand>
          <BootStrapNav.Toggle
            aria-controls="navbar-nav"
            onClick={() => {
              setExpanded(!expanded);
            }}
          ></BootStrapNav.Toggle>
          <BootStrapNav.Collapse id="navbar-fixed-top" className="" style={{ width: "50%" }}>
            <Nav className="navbar-fixed-top" style={{ width: "100%" }}>
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

              {renderUserMenu()}
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
            </Nav>
          </BootStrapNav.Collapse>
        </Container>
      </BootStrapNav>
    </>
  );
}

export default Navbar;
