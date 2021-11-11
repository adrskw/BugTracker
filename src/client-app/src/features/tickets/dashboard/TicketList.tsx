import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useStore } from '../../../app/stores/store';
import TicketListItem from './TicketListItem';

export default function TicketList() {
  const { ticketStore } = useStore();
  const { tickets } = ticketStore;

  return (
    <ListGroup >
      {tickets.map(ticket => (
        <TicketListItem ticket={ticket} key={ticket.id} />
      ))}
    </ListGroup>
  );
}