import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaCog, FaSignOutAlt } from "react-icons/fa";

export default function TopNavbar() {
  return (
    <Navbar expand="sm" variant="dark" bg="primary" sticky="top" className="flex-sm-nowrap p-0 shadow topbar">
      <Navbar.Brand className="col-sm-3 col-lg-2 me-0 px-3">BugTracker</Navbar.Brand>
      <Nav className="ms-auto">
        <NavDropdown align="end" title="FirstName LastName" id="navbarDropdown" className="dropdown-menu-right">
          <NavDropdown.Item href="#"><FaCog className="nav-icon" />Settings</NavDropdown.Item>
          <NavDropdown.Item href="#"><FaSignOutAlt className="nav-icon" />Log out</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar >
  );
}
