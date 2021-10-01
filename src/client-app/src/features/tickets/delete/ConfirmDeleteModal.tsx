import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import LoadingButtonContentComponent from '../../../app/layout/loading/LoadingButtonContentComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function ConfirmDeleteModal() {
  const { ticketStore } = useStore();
  const { selectedTicket: ticket,
    toggleIsConfirmDeleteModalDisplayed, deleteTicket, isProcessingRequest } = ticketStore;

  if (!ticket) return <></>;

  return (
    <Modal centered show="true" onHide={toggleIsConfirmDeleteModalDisplayed}>
      <Modal.Header closeButton>
        <Modal.Title>
          Delete Ticket
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete the ticket <i>{ticket.title}</i> reported by <i>{ticket.reporter}</i>?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={toggleIsConfirmDeleteModalDisplayed}>No</Button>
        <Button variant="outline-danger" onClick={() => deleteTicket(ticket.id)}>
          {(isProcessingRequest)
            ? <LoadingButtonContentComponent />
            : 'Yes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
});