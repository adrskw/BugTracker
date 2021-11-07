import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../app/stores/store';
import TicketDetailsAttachements from './TicketDetailsAttachements';
import TicketDetailsComments from './TicketDetailsComments';
import TicketDetailsDescription from './TicketDetailsDescription';
import TicketDetailsGeneralInfo from './TicketDetailsGeneralInfo';
import TicketDetailsHeader from './TicketDetailsHeader';

export default observer(function TicketDetails() {
  const { ticketStore } = useStore();
  const { selectedTicket: ticket, openTicketForm,
    toggleIsConfirmDeleteModalDisplayed, cancelSelectedTicket } = ticketStore;

  if (!ticket) return <></>;


  return (
    <div className="ticket-view-container">
      <TicketDetailsHeader ticket={ticket} />
      <TicketDetailsGeneralInfo ticket={ticket} />
      <TicketDetailsDescription ticket={ticket} />
      <TicketDetailsAttachements />
      <TicketDetailsComments />
    </div>
  );
});