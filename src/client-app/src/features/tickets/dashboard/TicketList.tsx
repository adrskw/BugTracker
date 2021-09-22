import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Ticket } from '../../../app/models/ticket';

interface Props {
  tickets: Ticket[];
  selectTicket: (id: string) => void;
}

export default function TicketList({ tickets, selectTicket }: Props) {
  return (
    <ListGroup >
      {tickets.map(ticket => (
        <ListGroup.Item action
          onClick={() => selectTicket(ticket.id)}
          key={ticket.id}>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{ticket.title}</h5>
            <small className="text-muted">{ticket.creationDate}</small>
          </div>
          <p className="mb-1">{ticket.description}</p>
          <small className="text-muted">Reporter: {ticket.reporter}<br />Assignee: {ticket.assignee || "none"}</small>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}