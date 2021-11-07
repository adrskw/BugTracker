import { observer } from "mobx-react-lite";
import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { FaArrowLeft, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { Ticket } from "../../../app/models/ticket";

interface Props {
  ticket: Ticket
}

export default observer(function TicketDetailsHeader({ ticket }: Props) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-2">
      <p className="h3">{ticket.title}</p>
      <ButtonGroup className="ms-2">
        <LinkContainer exact to="/tickets">
          <Button variant="outline-secondary">
            <FaArrowLeft className="title-icon" />
          </Button>
        </LinkContainer>
        <LinkContainer to={`/tickets/edit/${ticket.id}`}>
          <Button variant="outline-secondary">
            <FaRegEdit className="title-icon" />
          </Button>
        </LinkContainer>
        <LinkContainer to={`/tickets/delete/${ticket.id}`}>
          <Button variant="outline-secondary">
            <FaRegTrashAlt className="title-icon" />
          </Button>
        </LinkContainer>
      </ButtonGroup>
    </div>
  );
})