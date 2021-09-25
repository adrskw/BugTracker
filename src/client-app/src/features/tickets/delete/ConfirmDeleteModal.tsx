import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Ticket } from '../../../app/models/ticket';

interface Props {
    ticket: Ticket;
    handleToggleConfirmDeleteModal: () => void;
}

export default function ConfirmDeleteModal({ ticket, handleToggleConfirmDeleteModal }: Props) {
    return (
        <Modal centered show="true" onHide={handleToggleConfirmDeleteModal}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Delete Ticket
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete the ticket <i>{ticket.title}</i> reported by <i>{ticket.reporter}</i>?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleToggleConfirmDeleteModal}>No</Button>
                <Button variant="outline-danger">Yes</Button>
            </Modal.Footer>
        </Modal>
    );
}