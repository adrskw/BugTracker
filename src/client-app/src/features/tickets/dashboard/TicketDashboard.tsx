import React from 'react';
import { Button } from 'react-bootstrap';
import { Ticket } from '../../../app/models/ticket';
import ConfirmDeleteModal from '../delete/ConfirmDeleteModal';
import TicketDetails from '../details/TicketDetails';
import TicketForm from '../form/TicketForm';
import TicketList from './TicketList';

interface Props {
  tickets: Ticket[];
  selectedTicket: Ticket | undefined;
  selectTicket: (id: string) => void;
  cancelSelectTicket: () => void;
  editMode: boolean;
  openForm: (id?: string) => void;
  closeForm: () => void;
  createEditTicket: (ticket: Ticket) => void;
  isConfirmDeleteModalDisplayed: boolean;
  handleToggleConfirmDeleteModal: () => void;
}

export default function TicketDashboard({ tickets, selectedTicket, selectTicket, cancelSelectTicket,
  editMode, openForm, closeForm, createEditTicket,
  isConfirmDeleteModalDisplayed, handleToggleConfirmDeleteModal }: Props) {

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mb-3">All tickets</h1>
        <Button variant="outline-secondary" onClick={() => openForm()}>
          Create new ticket
        </Button>
      </div>

      <TicketList tickets={tickets} selectTicket={selectTicket} />
      {selectedTicket && !editMode &&
        <TicketDetails
          ticket={selectedTicket}
          cancelSelectTicket={cancelSelectTicket}
          openForm={openForm}
          handleToggleConfirmDeleteModal={handleToggleConfirmDeleteModal} />}

      {editMode &&
        <TicketForm
          ticket={selectedTicket}
          closeForm={closeForm}
          createEditTicket={createEditTicket} />}

      {selectedTicket && isConfirmDeleteModalDisplayed &&
        <ConfirmDeleteModal
          ticket={selectedTicket}
          handleToggleConfirmDeleteModal={handleToggleConfirmDeleteModal} />}
    </>
  );
}