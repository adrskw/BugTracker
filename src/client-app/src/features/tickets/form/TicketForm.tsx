import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Col, FloatingLabel, Form, Offcanvas, Row } from 'react-bootstrap';
import { Ticket } from '../../../app/models/ticket';

interface Props {
  ticket: Ticket | undefined;
  closeForm: () => void;
  createEditTicket: (ticket: Ticket) => void;
}

export default function TicketForm({ ticket: selectedTicket, closeForm, createEditTicket }: Props) {
  console.log(selectedTicket)

  const initialState = selectedTicket ?? {
    id: '',
    title: '',
    description: '',
    reporter: '',
    assignee: '',
    priority: 0,
    status: 0,
    creationDate: new Date().toUTCString()
  };

  const [ticket, setTicket] = useState(initialState);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createEditTicket(ticket);
    console.log(ticket)
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
    <Offcanvas show={true} onHide={closeForm} placement="end" className="largeOffcanvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {selectedTicket ? "Edit Ticket" : "Create Ticket"}
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
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
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}