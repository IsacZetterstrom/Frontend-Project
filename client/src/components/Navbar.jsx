import React, { useState } from "react";
import { pages } from "../router/routes";
import { NavLink } from "react-router-dom";
import BootStrapNav from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Logotype from "../assets/Logotype.svg";
function Navbar() {
  const [isLoggedIn, SetIsLoggedIn] = useState(false);

  function checkUser() {
    if (localStorage.getItem(ref)) {
      SetIsLoggedIn(true);
    } else {
      SetIsLoggedIn(false);
    }
  }

  function renderLoggedIn() {
    return pages.map(({ label, path, inNav, rightNav, loggedIn }) => {
      if (loggedIn) {
        return (
          inNav &&
          rightNav && (
            <NavLink key={path} className="nav-link" to={path}>
              {label}
            </NavLink>
          )
        );
      }
    });
  }
  function renderGuest() {
    return pages.map(({ label, path, inNav, rightNav, loggedIn }) => {
      if (!loggedIn) {
        return (
          inNav &&
          rightNav && (
            <NavLink key={path} className="nav-link" to={path}>
              {label}
            </NavLink>
          )
        );
      }
    });
  }

  return (
    <>
      <BootStrapNav expand="md" className="navbar">
        <Container>
          <BootStrapNav.Brand className="d-md-none" href="#home">
            <img src={Logotype} alt="" width="100px" />
          </BootStrapNav.Brand>
          <BootStrapNav.Toggle aria-controls="navbar-nav"></BootStrapNav.Toggle>
          <BootStrapNav.Collapse id="basic-navbar-nav" style={{ width: "50%" }}>
            <Nav>
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
              <Container className="d-flex flex-row justify-content-center align-items-center">
                <Container className="navline d-none d-md-block" />
                <BootStrapNav.Brand
                  href="#home"
                  className="d-none d-md-block mx-auto px-2">
                  <img className="logo" src={Logotype} alt="" />
                </BootStrapNav.Brand>
                <Container className="navline d-none d-md-block" />
              </Container>

              {isLoggedIn ? renderLoggedIn() : renderGuest()}
            </Nav>
          </BootStrapNav.Collapse>
        </Container>
      </BootStrapNav>
    </>
  );
}

export default Navbar;
