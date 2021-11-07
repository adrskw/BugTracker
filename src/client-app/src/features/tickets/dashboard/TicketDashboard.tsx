import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import LoadingComponent from '../../../app/layout/loading/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import TicketList from './TicketList';

export default observer(function TicketDashboard() {
  const { ticketStore } = useStore();
  const { ticketRegistry, loadTickets } = ticketStore;

  useEffect(() => {
    if (ticketRegistry.size <= 0) loadTickets();
  }, [loadTickets, ticketRegistry]);

  if (ticketStore.isLoading) return <LoadingComponent />

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mb-3">All tickets</h1>
        <LinkContainer to="tickets/create">
          <Button variant="outline-secondary">
            Create new ticket
          </Button>
        </LinkContainer>
      </div>

      <TicketList />
    </>
  );
});