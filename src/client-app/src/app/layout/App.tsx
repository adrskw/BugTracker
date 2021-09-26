import React, { useEffect, useState } from "react";
import "bootswatch/dist/zephyr/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import { Ticket } from "../models/ticket";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import TicketDashboard from "../../features/tickets/dashboard/TicketDashboard";
import { v4 as uuid } from 'uuid';
import agent from "../api/agent";

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>(undefined);
  const [editTicketMode, setEditTicketMode] = useState(false);
  const [isConfirmDeleteModalDisplayed, setIsConfirmDeleteModalDisplayed] = useState(false);

  function handleSelectTicket(id: string) {
    setSelectedTicket(tickets.find(x => x.id === id));
  }

  function handleCancelSelectedTicket() {
    setSelectedTicket(undefined);
  }

  function handleTicketFormOpen(id?: string) {
    id ? handleSelectTicket(id) : handleCancelSelectedTicket();
    setEditTicketMode(true);
  }

  function handleTicketFormClose() {
    setEditTicketMode(false);
  }

  function handleCreateEditTicket(ticket: Ticket) {
    ticket.id
      ? setTickets([...tickets.filter(x => x.id !== ticket.id), ticket])
      : setTickets([...tickets, { ...ticket, id: uuid() }]);

    setSelectedTicket(ticket);
    setEditTicketMode(false);
  }

  const handleToggleConfirmDeleteModal = () => setIsConfirmDeleteModalDisplayed(state => !state);

  function handleDeleteTicket(id: string) {
    setTickets([...tickets.filter(x => x.id !== id)]);
    handleToggleConfirmDeleteModal();
    handleCancelSelectedTicket();
  }

  useEffect(() => {
    agent.Tickets.list().then(response => {
      setTickets(response);
    });
  }, []);

  return (
    <>
      <TopNavbar />
      <Container fluid>
        <Row >
          <Sidebar />
          <div className="ms-sm-auto col-sm-9 col-lg-10 px-4 py-2">
            <TicketDashboard
              tickets={tickets}
              selectedTicket={selectedTicket}
              selectTicket={handleSelectTicket}
              cancelSelectTicket={handleCancelSelectedTicket}
              editMode={editTicketMode}
              openForm={handleTicketFormOpen}
              closeForm={handleTicketFormClose}
              createEditTicket={handleCreateEditTicket}
              isConfirmDeleteModalDisplayed={isConfirmDeleteModalDisplayed}
              handleToggleConfirmDeleteModal={handleToggleConfirmDeleteModal}
              deleteTicket={handleDeleteTicket} />
          </div>
        </Row>
      </Container>
    </>
  )
}

export default App;
