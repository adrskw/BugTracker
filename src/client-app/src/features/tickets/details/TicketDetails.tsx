import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, ButtonGroup, Col, Offcanvas, Row } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { useStore } from '../../../app/stores/store';

export default observer(function TicketDetails() {
  const { ticketStore } = useStore();
  const { selectedTicket: ticket, openTicketForm,
    toggleIsConfirmDeleteModalDisplayed, cancelSelectedTicket } = ticketStore;

  if (!ticket) return <></>;

  return (
    <Offcanvas show={true} onHide={cancelSelectedTicket} placement="end" className="largeOffcanvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {ticket.title}
          <ButtonGroup className="ms-2">
            <Button variant="outline-secondary" onClick={() => openTicketForm(ticket.id)}>
              <FaRegEdit className="title-icon" />
            </Button>
            <Button variant="outline-secondary" onClick={toggleIsConfirmDeleteModalDisplayed}>
              <FaRegTrashAlt className="title-icon" />
            </Button>
          </ButtonGroup>
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <p className="h6 text-uppercase">General Information</p>
        <Row as="dl" className="ps-2">
          <Col md={3} lg={2} as="dt" className="order-md-1 order-lg-1">Reporter</Col>
          <Col md={3} lg={2} as="dd" className="order-md-1 order-lg-1">{ticket.reporter}</Col>
          <Col md={3} lg={2} as="dt" className="order-md-2 order-lg-2">Assignee</Col>
          <Col md={3} lg={2} as="dd" className="order-md-2 order-lg-2">{ticket.assignee}</Col>
          <Col md={3} lg={2} as="dt" className="order-md-1 order-lg-1">Priority</Col>
          <Col md={3} lg={2} as="dd" className="order-md-1 order-lg-1">{ticket.priority}</Col>
          <Col md={3} lg={2} as="dt" className="order-md-2 order-lg-2">Status</Col>
          <Col md={3} lg={2} as="dd" className="order-md-2 order-lg-2">{ticket.status}</Col>
          <Col md={3} lg={2} as="dt" className="order-md-3 order-lg-1">Creation Date</Col>
          <Col md={3} lg={2} as="dd" className="order-md-3 order-lg-1">{ticket.creationDate}</Col>
        </Row>

        <p className="h6 text-uppercase">Description</p>
        <p>{ticket.description}</p>

        <p className="h6 text-uppercase">Attachements</p>
        <p>TODO</p>

        <p className="h6 text-uppercase">Comments</p>
        <p>TODO</p>
      </Offcanvas.Body>
    </Offcanvas>
  );
});