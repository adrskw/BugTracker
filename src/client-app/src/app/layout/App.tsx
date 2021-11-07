import React from "react";
import "bootswatch/dist/zephyr/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import TicketDashboard from "../../features/tickets/dashboard/TicketDashboard";
import { observer } from "mobx-react-lite";
import HomePage from "../../features/home/HomePage";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <TopNavbar />
      <Container fluid>
        <Row >
          <Sidebar />
          <div className="ms-sm-auto col-sm-9 col-lg-10 px-4 py-2">
            <Route exact path="/" component={HomePage} />
          </div>
        </Row>
      </Container>
    </>
  )
}

export default observer(App);
