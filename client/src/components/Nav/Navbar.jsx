import React, { useEffect, useRef, useState } from "react";

import BootStrapNav from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Logotype from "../../assets/Logotype.svg";

import NavLinks from "./NavLinks";

/**
 * @author Isac Zetterström
 * @description logic and render of the navbar.
 */

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [expanded, setExpanded] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    let clickInsideElement = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", clickInsideElement);
  });

  return (
    <>
      <BootStrapNav expanded={expanded} ref={menuRef} expand="md" className="navbar fixed-top">
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
              <NavLinks {...{ isLoggedIn, setIsLoggedIn }} />
            </Nav>
          </BootStrapNav.Collapse>
        </Container>
      </BootStrapNav>
    </>
  );
}

export default Navbar;
