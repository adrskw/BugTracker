import React, { useEffect, useState } from "react";
import "bootswatch/dist/zephyr/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";

function App() {

  return (
    <>
      <TopNavbar />
      <Container fluid>
        <Row >
          <Sidebar />
        </Row>
      </Container>
    </>
  )
}

export default App;
