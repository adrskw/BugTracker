import { observer } from "mobx-react-lite";
import React from "react";
import { Row, Col } from "react-bootstrap";
import { Ticket } from "../../../app/models/ticket";
import { format, parseISO } from 'date-fns';
import { ticketStatusOptions } from "../../../app/common/options/ticketStatusOptions";
import { ticketPriorityOptions } from "../../../app/common/options/ticketPriorityOptions";
import { getOptionDisplayedName } from "../../../app/common/options/optionsHelper";

interface Props {
  ticket: Ticket
}

export default observer(function TicketDetailsGeneralInfo({ ticket }: Props) {
  return (
    <>
      <p className="h6 text-uppercase">General Information</p>
      <Row as="dl" className="ps-2">
        <Col md={3} lg={2} as="dt" className="order-md-1 order-lg-1">Reporter</Col>
        <Col md={3} lg={2} as="dd" className="order-md-1 order-lg-1">{ticket.reporter}</Col>
        <Col md={3} lg={2} as="dt" className="order-md-2 order-lg-2">Assignee</Col>
        <Col md={3} lg={2} as="dd" className="order-md-2 order-lg-2">{ticket.assignee}</Col>
        <Col md={3} lg={2} as="dt" className="order-md-1 order-lg-1">Priority</Col>
        <Col md={3} lg={2} as="dd" className="order-md-1 order-lg-1">{getOptionDisplayedName(ticketPriorityOptions, ticket.priority)}</Col>
        <Col md={3} lg={2} as="dt" className="order-md-2 order-lg-2">Status</Col>
        <Col md={3} lg={2} as="dd" className="order-md-2 order-lg-2">{getOptionDisplayedName(ticketStatusOptions, ticket.status)}</Col>
        <Col md={3} lg={2} as="dt" className="order-md-3 order-lg-1">Creation Date</Col>
        <Col md={3} lg={2} as="dd" className="order-md-3 order-lg-1">{format(parseISO(ticket.creationDate), 'dd-MM-yyyy h:mm aa')}</Col>
      </Row>
    </>
  );
})