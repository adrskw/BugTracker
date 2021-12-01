import React from "react";
import "bootswatch/dist/zephyr/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row } from "react-bootstrap";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import TicketDashboard from "../../features/tickets/dashboard/TicketDashboard";
import { observer } from "mobx-react-lite";
import HomePage from "../../features/home/HomePage";
import { Route, Switch } from "react-router-dom";
import TicketDetails from "../../features/tickets/details/TicketDetails";
import ConfirmDeleteModal from "../../features/tickets/delete/ConfirmDeleteModal";
import TicketForm from "../../features/tickets/form/TicketForm";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";

function App() {
  return (
    <>
      <ToastContainer position='bottom-right' />
      <Route exact path="/" component={HomePage} />
      <Route path={'/(.+)'}
        render={() => (
          <>
            <TopNavbar />
            <Container fluid>
              <Row >
                <Sidebar />
                <div className="ms-sm-auto col-sm-9 col-lg-10 px-4 py-2">
                  <Switch>
                    <Route path="/tickets"
                      render={({ match: { url } }) => (
                        <>
                          <Route exact path={`${url}/`} component={TicketDashboard} />
                          <Switch>
                            <Route exact path={[`${url}/create`, `${url}/edit/:id`]} component={TicketForm} />
                            <Route exact path={[`${url}/:id`, `${url}/delete/:id`]} component={TicketDetails} />
                          </Switch>
                          <Route exact path={`${url}/delete/:id`} component={ConfirmDeleteModal} />
                        </>
                      )}
                    />
                    <Route exact path="/serverError" component={ServerError} />
                    <Route exact path="/login" component={LoginForm} />
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </Row>
            </Container>
          </>
        )}
      />
    </>
  )
}

export default observer(App);
