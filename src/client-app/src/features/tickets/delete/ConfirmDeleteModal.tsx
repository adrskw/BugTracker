import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import LoadingButtonContentComponent from '../../../app/layout/loading/LoadingButtonContentComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function ConfirmDeleteModal() {
  const history = useHistory();
  const { ticketStore } = useStore();
  const { selectedTicket: ticket, deleteTicket, isProcessingRequest, isLoading } = ticketStore;
  const { id } = useParams<{ id: string }>();

  function handleHideModal() {
    history.push(`/tickets/${id}`);
  }

  function handleSubmit(id: string) {
    deleteTicket(id).then(() => history.push('/tickets'));
  }

  if (isLoading || !ticket) return <></>;

  return (
    <Modal centered show="true" onHide={handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          Delete Ticket
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete the ticket <i>{ticket.title}</i> reported by <i>{ticket.reporter}</i>?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleHideModal}>No</Button>
        <Button variant="outline-danger" onClick={() => handleSubmit(ticket.id)}>
          {(isProcessingRequest)
            ? <LoadingButtonContentComponent />
            : 'Yes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
});