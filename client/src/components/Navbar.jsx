import React, { useState } from "react";
import { pages } from "../router/routes";
import { NavLink } from "react-router-dom";
import BootStrapNav from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Logotype from "../assets/Logotype.svg";
import cacheService from "../service/CacheService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/**
 * @author Isac Zetterström
 * @description logic and render of the navbar.
 */

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [hasToken, setHasToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setHasToken(cacheService.isLoggedIn());
    if (hasToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  function logoutUser() {
    setHasToken(null);
    cacheService.removeLocalValue("token");
    setIsLoggedIn((isLoggedIn) => !isLoggedIn);
    navigate("/");
  }

  function renderUserMenu() {
    if (hasToken) {
      return pages.map(({ label, path, inNav, rightNav, loggedIn }) => {
        if (loggedIn) {
          return (
            inNav &&
            rightNav && (
              <NavLink key={path} className="nav-link text-nowrap" to={path}>
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
              <NavLink key={path} className="nav-link text-nowrap" to={path}>
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
      <BootStrapNav expand="md" className="navbar">
        <Container className="justify-content-between">
          <BootStrapNav.Brand className="d-md-none" href="/">
            <img src={Logotype} alt="" width="100px" />
          </BootStrapNav.Brand>
          <BootStrapNav.Toggle aria-controls="navbar-nav"></BootStrapNav.Toggle>
          <BootStrapNav.Collapse
            id="navbar-fixed-top"
            className=""
            style={{ width: "50%" }}>
            <Nav
              className="navbar-fixed-top justify-content-between"
              style={{ width: "100%" }}>
              {pages.map(({ label, path, inNav, rightNav }) => {
                return (
                  inNav &&
                  !rightNav && (
                    <NavLink
                      key={path}
                      className="nav-link text-nowrap"
                      to={path}>
                      {label}
                    </NavLink>
                  )
                );
              })}
              <Container className="flex-row align-items-center justify-content-center d-none d-md-flex desktop-logo-container">
                {/* <BootStrapNav.Brand href="/" className="desktop-nav-brand"> */}
                <img
                  className="logo"
                  src={Logotype}
                  onClick={() => {
                    navigate("/");
                  }}
                />
                {/* </BootStrapNav.Brand> */}
              </Container>

              {renderUserMenu()}
              {hasToken && (
                <NavLink
                  key={"logout"}
                  onClick={() => logoutUser()}
                  className="nav-link text-nowrap logout-btn">
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
