import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useStore } from '../../../app/stores/store';
import ConfirmDeleteModal from '../delete/ConfirmDeleteModal';
import TicketDetails from '../details/TicketDetails';
import TicketForm from '../form/TicketForm';
import TicketList from './TicketList';

export default observer(function TicketDashboard() {

  const { ticketStore } = useStore();
  const { selectedTicket, isEditMode, isConfirmDeleteModalDisplayed, openTicketForm } = ticketStore;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mb-3">All tickets</h1>
        <Button variant="outline-secondary" onClick={() => openTicketForm()}>
          Create new ticket
        </Button>
      </div>

      <TicketList />

      {selectedTicket && !isEditMode && <TicketDetails />}

      {isEditMode && <TicketForm />}

      {selectedTicket && isConfirmDeleteModalDisplayed && <ConfirmDeleteModal />}
    </>
  );
});