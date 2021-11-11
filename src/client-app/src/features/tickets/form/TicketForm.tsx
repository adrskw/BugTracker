import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import LoadingButtonContentComponent from '../../../app/layout/loading/LoadingButtonContentComponent';
import LoadingComponent from '../../../app/layout/loading/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from "uuid";
import { LinkContainer } from 'react-router-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FloatingLabelTextInput from '../../../app/common/form/FloatingLabelTextInput';
import { ticketPriorityOptions } from '../../../app/common/options/ticketPriorityOptions';
import FloatingLabelSelectInput from '../../../app/common/form/FloatingLabelSelectInput';
import { ticketStatusOptions } from '../../../app/common/options/ticketStatusOptions';
import FloatingLabelTextArea from '../../../app/common/form/FloatingLabelTextArea';
import { Ticket } from '../../../app/models/ticket';


export default observer(function TicketForm() {
  const history = useHistory();
  const { ticketStore } = useStore();
  const { createTicket, updateTicket, loadTicket, isLoading, setIsLoading } = ticketStore;
  const { id } = useParams<{ id: string }>();

  const [ticket, setTicket] = useState<Ticket>({
    id: '',
    title: '',
    description: '',
    reporter: '',
    assignee: '',
    priority: '',
    status: '',
    creationDate: new Date().toISOString() // TODO: Handle creationDate on the server side
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    reporter: Yup.string().required('Reporter is required'),
    assignee: Yup.string().required('Assignee is required'),
    priority: Yup.string().required('Priority is required'),
    status: Yup.string().required('Status is required'),
  });

  useEffect(() => {
    if (id) {
      loadTicket(id).then(ticket => setTicket(ticket!));
    }
    else {
      setIsLoading(false);
    }
  }, [id, loadTicket, setIsLoading]);

  function handleFormSubmit(ticket: Ticket) {
    if (ticket.id.length === 0) {
      let newTicket = {
        ...ticket,
        id: uuid()
      }

      createTicket(newTicket).then(() => history.push(`/tickets/${newTicket.id}`));
    }
    else {
      updateTicket(ticket).then(() => history.push(`/tickets/${ticket.id}`));
    }
  }

  if (isLoading) return <LoadingComponent />

  return (
    <div className="ticket-view-container">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <p className="h3">{ticket.id ? "Edit Ticket" : "Create Ticket"}</p>
      </div>

      <Formik initialValues={ticket}
        validationSchema={validationSchema}
        onSubmit={values => handleFormSubmit(values)}
        enableReinitialize>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col xs={12}>
                <FloatingLabelTextInput label="Title" name="title" placeholder="title" />
              </Col>
              <Col md={6}>
                <FloatingLabelTextInput label="Reporter" name="reporter" placeholder="reporter" />
              </Col>
              <Col md={6}>
                <FloatingLabelTextInput label="Assignee" name="assignee" placeholder="assignee" />
              </Col>
              <Col md={6}>
                <FloatingLabelSelectInput label="Priority" name="priority" placeholder="priority" options={ticketPriorityOptions} />
              </Col>
              <Col md={6}>
                <FloatingLabelSelectInput label="Status" name="status" placeholder="status" options={ticketStatusOptions} />
              </Col>
              <Col xs={12}>
                <FloatingLabelTextArea label="Description" name="description" placeholder="describe the issue here" />
              </Col>
              <Col xs={12}>
                <LinkContainer exact to="/tickets">
                  <Button variant="outline-secondary me-1">
                    Cancel
                  </Button>
                </LinkContainer>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}>
                  {(isSubmitting) ? <LoadingButtonContentComponent /> : 'Submit'}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
});

