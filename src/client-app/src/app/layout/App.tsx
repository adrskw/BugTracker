import React, { useEffect } from "react";
import "bootswatch/dist/zephyr/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import TicketDashboard from "../../features/tickets/dashboard/TicketDashboard";
import LoadingComponent from "./loading/LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { ticketStore } = useStore();

  useEffect(() => {
    ticketStore.loadTickets();
  }, [ticketStore]);

  if (ticketStore.isLoading) return <LoadingComponent />

  return (
    <>
      <TopNavbar />
      <Container fluid>
        <Row >
          <Sidebar />
          <div className="ms-sm-auto col-sm-9 col-lg-10 px-4 py-2">
            <TicketDashboard />
          </div>
        </Row>
      </Container>
    </>
  )
}

export default observer(App);
