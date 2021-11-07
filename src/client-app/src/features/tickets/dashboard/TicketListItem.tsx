import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Ticket } from '../../../app/models/ticket';

interface Props {
  ticket: Ticket
}

export default function TicketListItem({ ticket }: Props) {
  return (
    <ListGroup.Item action
      as={Link}
      to={`/tickets/${ticket.id}`}>
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{ticket.title}</h5>
        <small className="text-muted">{ticket.creationDate}</small>
      </div>
      <p className="mb-1">{ticket.description}</p>
      <small className="text-muted">
        Reporter: {ticket.reporter}
        <br />
        Assignee: {ticket.assignee || "none"}
      </small>
    </ListGroup.Item>
  );
}