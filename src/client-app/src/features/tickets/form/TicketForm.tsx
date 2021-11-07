import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import LoadingButtonContentComponent from '../../../app/layout/loading/LoadingButtonContentComponent';
import { useStore } from '../../../app/stores/store';
import { LinkContainer } from 'react-router-bootstrap';

export default observer(function TicketForm() {
  const { ticketStore } = useStore();
  const { selectedTicket, closeTicketForm,
    createTicket, updateTicket, isProcessingRequest } = ticketStore;

  const initialState = selectedTicket ?? {
    id: '',
    title: '',
    description: '',
    reporter: '',
    assignee: '',
    priority: 0,
    status: 0,
    creationDate: new Date().toISOString() // TODO: Handle creationDate on the server side
  };

  const [ticket, setTicket] = useState(initialState);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ticket.id ? updateTicket(ticket) : createTicket(ticket);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;

    setTicket({ ...ticket, [name]: value });
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;

    setTicket({ ...ticket, [name]: value });
  }

  return (
    <div className="ticket-view-container">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <p className="h3">{ticket.id ? "Edit Ticket" : "Create Ticket"}</p>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row className="g-3">
          <Col xs={12}>
            <FloatingLabel controlId="title" label="Title">
              <Form.Control type="text" placeholder="title" name="title" value={ticket.title} onChange={handleInputChange} />
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <FloatingLabel controlId="reporter" label="Reporter">
              <Form.Control type="text" placeholder="reporter" name="reporter" value={ticket.reporter} onChange={handleInputChange} />
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <FloatingLabel controlId="assignee" label="Assignee">
              <Form.Control type="text" placeholder="assignee" name="assignee" value={ticket.assignee} onChange={handleInputChange} />
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <FloatingLabel controlId="priority" label="Priority">
              <Form.Select aria-label="priority" name="priority" onChange={handleSelectChange}>
                <option>choose priority</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <FloatingLabel controlId="status" label="Status">
              <Form.Select aria-label="status" name="status" onChange={handleSelectChange}>
                <option>choose status</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col xs={12}>
            <FloatingLabel controlId="description" label="Description">
              <Form.Control as="textarea" placeholder="describe the issue here" name="description" value={ticket.description} onChange={handleInputChange} />
            </FloatingLabel>
          </Col>
          <Col xs={12}>
            <LinkContainer exact to="/tickets">
              <Button variant="outline-secondary me-1">
                Cancel
              </Button>
            </LinkContainer>
            <Button variant="primary" type="submit" disabled={isProcessingRequest}>
              {(isProcessingRequest) ? <LoadingButtonContentComponent /> : 'Submit'}
            </Button>
          </Col>
        </Row>
      </Form>
    </div >
  );
});