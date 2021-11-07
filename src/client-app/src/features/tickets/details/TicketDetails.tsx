import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import LoadingComponent from '../../../app/layout/loading/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import TicketDetailsAttachements from './TicketDetailsAttachements';
import TicketDetailsComments from './TicketDetailsComments';
import TicketDetailsDescription from './TicketDetailsDescription';
import TicketDetailsGeneralInfo from './TicketDetailsGeneralInfo';
import TicketDetailsHeader from './TicketDetailsHeader';

export default observer(function TicketDetails() {
  const { ticketStore } = useStore();
  const { selectedTicket: ticket, loadTicket, isLoading } = ticketStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id)
      loadTicket(id);
  }, [id, loadTicket]);

  if (isLoading || !ticket) return <LoadingComponent /> // TODO: implement error handling if ticket is not found

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