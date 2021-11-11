import React from "react";
import "bootswatch/dist/zephyr/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row } from "react-bootstrap";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import TicketDashboard from "../../features/tickets/dashboard/TicketDashboard";
import { observer } from "mobx-react-lite";
import HomePage from "../../features/home/HomePage";
import { Route, Switch } from "react-router-dom";
import TicketDetails from "../../features/tickets/details/TicketDetails";
import ConfirmDeleteModal from "../../features/tickets/delete/ConfirmDeleteModal";
import TicketForm from "../../features/tickets/form/TicketForm";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer position='bottom-right' />
      <TopNavbar />
      <Container fluid>
        <Row >
          <Sidebar />
          <div className="ms-sm-auto col-sm-9 col-lg-10 px-4 py-2">
            <Route exact path="/" component={HomePage} />
            <Route exact path="/tickets" component={TicketDashboard} />
            <Switch>
              <Route exact path={["/tickets/create", "/tickets/edit/:id"]} component={TicketForm} />
              <Route exact path={["/tickets/:id", "/tickets/delete/:id"]} component={TicketDetails} />
            </Switch>
            <Route exact path="/tickets/delete/:id" component={ConfirmDeleteModal} />
          </div>
        </Row>
      </Container>
    </>
  )
}

export default observer(App);
