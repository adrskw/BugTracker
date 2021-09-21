import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { FaAngleRight, FaProjectDiagram, FaTasks } from "react-icons/fa";

export default function Sidebar() {
  return (
    <Navbar collapseOnSelect expand="sm" className="col-sm-3 col-lg-2 d-sm-block bg-light sidebar">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" className="mb-1">MENU</Navbar.Toggle>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="flex-column flex-nowrap">
          <Nav.Item>
            <Nav.Link href="#"><FaProjectDiagram className="nav-icon" />Projects</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#"><FaTasks className="nav-icon" />Tickets</Nav.Link>
            {/* <Nav className="flex-column sidebar-submenu">
              <Nav.Link href="#"><FaAngleRight className="nav-icon" />all</Nav.Link>
              <Nav.Link href="#"><FaAngleRight className="nav-icon" />open</Nav.Link>
            </Nav> */}
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#"><FaTasks className="nav-icon" />More deets</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#"><FaTasks className="nav-icon" />More deets</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}