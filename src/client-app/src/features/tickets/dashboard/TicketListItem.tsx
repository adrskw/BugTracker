import { observer } from 'mobx-react-lite';
import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Ticket } from '../../../app/models/ticket';
import { format, parseISO } from 'date-fns';

interface Props {
  ticket: Ticket
}

export default observer(function TicketListItem({ ticket }: Props) {
  return (
    <ListGroup.Item action
      as={Link}
      to={`/tickets/${ticket.id}`}>
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{ticket.title}</h5>
        <small className="text-muted">{format(parseISO(ticket.creationDate), 'dd-MM-yyyy h:mm aa')}</small>
      </div>
      <p className="mb-1">{ticket.description}</p>
      <small className="text-muted">
        Reporter: {ticket.reporter}
        <br />
        Assignee: {ticket.assignee || "none"}
      </small>
    </ListGroup.Item>
  );
})