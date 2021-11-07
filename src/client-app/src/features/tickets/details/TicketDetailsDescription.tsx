import { observer } from "mobx-react-lite";
import React from "react";
import { Ticket } from "../../../app/models/ticket";

interface Props {
  ticket: Ticket
}

export default observer(function TicketDetailsDescription({ ticket }: Props) {
  return (
    <>
      <p className="h6 text-uppercase">Description</p>
      <p>{ticket.description}</p>
    </>
  );
})