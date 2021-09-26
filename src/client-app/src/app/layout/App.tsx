import React, { useEffect, useState } from "react";
import "bootswatch/dist/zephyr/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import { Ticket } from "../models/ticket";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import TicketDashboard from "../../features/tickets/dashboard/TicketDashboard";
import { v4 as uuid } from 'uuid';
import agent from "../api/agent";
import LoadingComponent from "./loading/LoadingComponent";

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>(undefined);
  const [editTicketMode, setEditTicketMode] = useState(false);
  const [isConfirmDeleteModalDisplayed, setIsConfirmDeleteModalDisplayed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isProcessingRequest, setIsProcessingRequest] = useState(false);

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
    setIsProcessingRequest(true);

    if (ticket.id) {
      agent.Tickets.update(ticket).then(() => {
        setTickets([...tickets.filter(x => x.id !== ticket.id), ticket]);
        setSelectedTicket(ticket);
        setEditTicketMode(false);
        setIsProcessingRequest(false);
      })
    }
    else {
      ticket.id = uuid();
      agent.Tickets.create(ticket).then(() => {
        setTickets([...tickets, ticket]);
        setSelectedTicket(ticket);
        setEditTicketMode(false);
        setIsProcessingRequest(false);
      })
    }
  }

  const handleToggleConfirmDeleteModal = () => setIsConfirmDeleteModalDisplayed(state => !state);

  function handleDeleteTicket(id: string) {
    setIsProcessingRequest(true);
    agent.Tickets.delete(id).then(() => {
      setTickets([...tickets.filter(x => x.id !== id)]);
      handleToggleConfirmDeleteModal();
      handleCancelSelectedTicket();
      setIsProcessingRequest(false);
    })
  }

  useEffect(() => {
    agent.Tickets.list().then(response => {
      setTickets(response);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingComponent />

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
              deleteTicket={handleDeleteTicket}
              isProcessingRequest={isProcessingRequest} />
          </div>
        </Row>
      </Container>
    </>
  )
}

export default App;
